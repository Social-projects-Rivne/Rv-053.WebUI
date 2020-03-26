require('dotenv').config();
const fs = require('fs');
const { Sequelize, Op } = require('sequelize');
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Event = require('../models').event;
const User = require('../models').users;
const EventCategory = require('../models').event_category;
const Categories = require('../models').category;
const UserEvent = require('../models').user_event;
const EventGallery = require('../models').event_gallery;
const Feedbacks = require('../models').event_feedback;
const Redis = require('../services/redisService');
const UserCategory = require('../models').user_category;

const STATUS_ACTIVE = 'Active';
const STATUS_BANNED = 'Banned';
const STATUS_DELETED = 'Deleted';
const CURRENT_DATE = new Date().getTime();

function checkToken(req) {
  let token;
  let result = { isAuthorization: false };
  if (req.header('Authorization')) {
    token = req.header('Authorization').split(' ')[1];
    try {
      const payload = JWT.verify(token, JWT_SECRET);
      result = { isAuthorization: true, userId: payload.userId };
    } catch (err) {
      return result;
    }
  }
  return result;
}

async function getFollowedCategoriesForUser(id) {
  return await UserCategory.findAll({
    where: { user_id: id },
    raw: true,
    attributes: [],
    include: [Categories]
  }).catch(err => {
    console.log(err);
  });
}

function isEventInCategories(categories, categoryId) {
  for (index in categories) {
    if (categories[index]['category.id'] === categoryId) {
      return true;
    }
  }
  return false;
}

function reorderEventsByFolowedCategories(categories, events) {
  let beginning = [];
  let ending = [];
  for (let i = 0; i < 20; i++) {
    if (events[i] !== undefined) {
      if (
        isEventInCategories(categories, events[i].dataValues.categories[0].dataValues.id) === true
      ) {
        beginning.push(events[i]);
      } else {
        ending.push(events[i]);
      }
    }
  }
  return beginning.concat(ending);
}

exports.getEventByID = async (req, res) => {
  const id = req.params.id;
  await Event.findOne({
    where: {
      id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'first_name', 'last_name', 'avatar']
      },
      {
        model: Categories
      }
    ]
  })
    .then(async event => {
      if (event === null) {
        res.status(404).send({
          message: 'Event not found'
        });
      }
      event = event.toJSON();
      event.isSubscribe = false;
      event.past = false;
      const authUser = checkToken(req);
      if (authUser.isAuthorization) {
        subscribe = await UserEvent.findOne({
          where: { user_id: authUser.userId, event_id: id }
        });
        if (subscribe !== null) {
          event.isSubscribe = true;
          event.currentUser_id = authUser.userId;
        }
      }
      past = await Event.findOne({
        where: { id: id, datetime: { [Op.lt]: CURRENT_DATE } }
      });
      if (past !== null) {
        event.past = true;
      }
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(404).send({
        message: err.message || 'Not found'
      });
    });
};

exports.createEvent = async (req, res) => {
  const {
    name,
    description,
    location,
    datetime,
    duration,
    category,
    max_participants,
    min_age,
    price
  } = req.body;
  let cover;
  if (req.file) {
    cover = process.env.BACK_HOST + '/' + req.file.path;
  } else {
    cover = process.env.BACK_HOST + 'uploads/covers/logo.png';
  }
  await Event.create({
    name,
    owner_id: req.userId,
    description,
    location,
    datetime,
    duration,
    max_participants,
    min_age,
    cover,
    price
  })
    .then(event => {
      const eventId = event.id;
      EventCategory.create({
        event_id: eventId,
        category_id: category
      })
        .then(() => {
          res.status(200).send({
            message: 'Event was create successful'
          });
        })
        .catch(err => {
          res.status(404).send({
            message: 'Some problems with create event(category)' || err.message
          });
        });
    })
    .catch(err => {
      res.status(404).send({
        message: 'Some problems with create event' || err.message
      });
    });
};

exports.updateEvent = async (req, res) => {
  const id = req.params.id;
  let {
    name,
    description,
    location,
    datetime,
    duration,
    category,
    max_participants,
    min_age,
    cover,
    price
  } = req.body;
  await Event.findOne({
    where: {
      id
    }
  }).then(event => {
    if (req.userId === event.owner_id || req.role === 'Admin' || req.role === 'Moderator') {
      let oldCoverPath = null;
      if (!cover) {
        oldCoverPath = event.cover.slice(process.env.BACK_HOST.length);
      }
      cover = cover || process.env.BACK_HOST + '/' + req.file.path;
      event
        .update({
          name,
          description,
          location,
          datetime,
          duration,
          max_participants,
          min_age,
          cover,
          price
        })
        .then(event => {
          const eventID = event.id;
          EventCategory.findOne({
            where: {
              id: eventID
            }
          }).then(event_category => {
            event_category.update({
              event_id: eventID,
              category_id: category
            });
          });
        })
        .then(() => {
          if (oldCoverPath && req.file) {
            fs.unlink('.' + oldCoverPath, err => {
              if (err) {
                console.log('failed to delete local image:' + err);
              } else {
                console.log('successfully deleted local image');
              }
            });
          }
        })
        .then(() => {
          res.status(200).json({ status: 'Event was update successful' });
        })
        .catch(err => {
          res.status(404).json({
            message: err.message || 'Event not found'
          });
        });
    }
  });
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  await Event.findOne({
    where: {
      id
    }
  })
    .then(event => {
      if (event === null) {
        return res.status(404).json({
          message: 'Event not found'
        });
      }
      if (req.userId === event.owner_id || req.role === 'Admin') {
        event
          .update({ status: STATUS_DELETED })
          .then(() => {
            res.status(200).json({
              status: 'Event was deleted'
            });
          })
          .catch(err => {
            res.status(404).json({
              message: err.message || 'Event not found'
            });
          });
      } else {
        res.status(403).json({
          message: 'Access forbidden'
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        message: err.message || 'Event not found'
      });
    });
};

exports.searchEvent = async (req, res) => {
  const limit = req.query.limit || null;
  const offset = req.query.offset || 0;
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;
  const category = req.query.category || null;

  let searchQuery = {
    status: STATUS_ACTIVE
  };

  const userId = checkToken(req).userId;
  let categories;
  if (userId) {
    categories = await getFollowedCategoriesForUser(userId);
  }

  if (req.query.q) {
    searchQuery[Op.or] = [
      { name: { [Op.iLike]: `%${req.query.q}%` } },
      { description: { [Op.iLike]: `%${req.query.q}%` } }
    ];
  }

  let includeQuery = [
    {
      model: User,
      attributes: ['first_name', 'last_name']
    }
  ];

  if (startDate !== null && endDate === null) {
    searchQuery.datetime = {
      [Op.gte]: isNaN(parseInt(startDate)) ? 0 : parseInt(startDate)
    };
  }
  if (
    startDate !== null &&
    endDate !== null &&
    startDate !== 'undefined' &&
    endDate !== 'undefined'
  ) {
    searchQuery.datetime = {
      [Op.between]: [
        isNaN(parseInt(startDate)) ? 0 : parseInt(startDate),
        isNaN(parseInt(endDate)) ? 0 : parseInt(endDate)
      ]
    };
  }
  if (startDate === null && endDate !== null) {
    searchQuery.datetime = {
      [Op.lte]: isNaN(parseInt(endDate)) ? 0 : parseInt(endDate)
    };
  }
  if (category !== null) {
    if (!isNaN(parseInt(category))) {
      includeQuery.push({
        model: Categories,
        where: {
          id: parseInt(category)
        }
      });
    }
  } else {
    includeQuery.push({ model: Categories });
  }

  await Event.findAndCountAll({
    where: searchQuery,
    offset,
    limit,
    include: includeQuery,
    where:{
      datetime: {[Op.gt]: CURRENT_DATE}
    },
    order: [['datetime', 'ASC']]
  })
    .then(events => {
      let OrderedEvents = reorderEventsByFolowedCategories(categories, events.rows);
      Redis.addUrlInCache(req.originalUrl, {
        count: OrderedEvents.count,
        rows: OrderedEvents
      });
      res.status(200).json({ count: OrderedEvents.count, rows: OrderedEvents });
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || 'Bad Request'
      });
    });
};

exports.rejectEvent = async (req, res) => {
  try {
    let event = await Event.findByPk(req.params.id);
    if (event.status === STATUS_BANNED) {
      return res.status(400).send({
        message: 'Event is already rejected'
      });
    }
    await event.update({ status: STATUS_BANNED });
    res.status(201).json({ status: 'Rejected' });
  } catch (err) {
    res.status(400).send({
      message: err.message || 'Bad request'
    });
  }
};

exports.activateEvent = async (req, res) => {
  try {
    let event = await Event.findByPk(req.params.id);
    if (event.status === STATUS_ACTIVE) {
      return res.status(400).send({
        message: 'Event is already active'
      });
    }
    await event.update({ status: STATUS_ACTIVE });
    res.status(201).json({ status: 'Active' });
  } catch (err) {
    res.status(400).send({
      message: err.message || 'Bad request'
    });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    let event = await Event.findByPk(req.params.id);
    if (event.status === STATUS_DELETED) {
      return res.status(400).send({
        message: 'Event is already deleted'
      });
    }
    await event.update({ status: STATUS_DELETED });
    res.status(201).json({ status: 'DELETED' });
  } catch (err) {
    res.status(400).send({
      message: err.message || 'Bad request'
    });
  }
};

exports.getQuantityFollowedOnEventUsers = async (req, res) => {
  const id = req.params.id;
  await UserEvent.findAll({
    where: {
      event_id: id
    },

    attributes: [[Sequelize.fn('COUNT', Sequelize.col('user_id')), 'quantityUsers']]
  })
    .then(async resultRow => {
      if (resultRow === null) {
        res.status(404).send({
          message: 'Event not found'
        });
      }
      res.status(200).json(resultRow[0]);
    })
    .catch(err => {
      res.status(404).send({
        message: err.message || 'Not found'
      });
    });
};

exports.getGalleryOfEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await EventGallery.findAll({
      where: { event_id: id, is_deleted: false }
    });
    res.status(200).json(gallery);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Not found'
    });
  }
};

exports.deleteImageFromGallery = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    let includeQuery;
    if (req.role === 'Admin' || req.role === 'Moderator') {
      includeQuery = { model: Event };
    } else {
      includeQuery = { model: Event, where: { owner_id: req.userId } };
    }
    const img = await EventGallery.findOne({
      where: { event_id: id, id: imageId },
      include: includeQuery
    });
    if (img) {
      await img.update({ is_deleted: true });
      res.status(201).json({ status: 'DELETED' });
    } else {
      res.status(403).send({
        message: 'Forbidden'
      });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Not found'
    });
  }
};

exports.createImageOfGallery = async (req, res) => {
  const { id } = req.params;
  let { description, img_url } = req.body;
  try {
    const event = await Event.findOne({ where: { id } });
    if (req.userId === event.owner_id || req.role === 'Admin' || req.role === 'Moderator') {
      img_url = img_url || process.env.BACK_HOST + '/' + req.file.path;
      await EventGallery.create({
        img_url,
        description,
        event_id: id,
        is_deleted: false
      });
      res.status(201).json({ status: 'success' });
    } else {
      res.status(403).send({
        message: 'Forbidden'
      });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Not found'
    });
  }
};

exports.changeImageOfGallery = async (req, res) => {
  const { id, imageId } = req.params;
  let { description, img_url } = req.body;
  try {
    const event = await Event.findOne({ where: { id } });
    if (req.userId === event.owner_id || req.role === 'Admin' || req.role === 'Moderator') {
      const img = await EventGallery.findOne({
        where: { event_id: id, id: imageId }
      });
      if (img) {
        let oldImg = null;
        if (!img_url) {
          oldImg = img.img_url.slice(process.env.BACK_HOST.length);
          img_url = process.env.BACK_HOST + '/' + req.file.path;
        }
        await img.update({ img_url, description });
        if (oldImg) {
          fs.unlink('.' + oldImg, err => {
            if (err) {
              console.log('failed to delete local image:' + err);
            } else {
              console.log('successfully deleted local image');
            }
          });
        }
      }
      res.status(201).json({ status: 'success' });
    } else {
      res.status(403).send({
        message: 'Forbidden'
      });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Not found'
    });
  }
};

exports.leaveFeedback = async (req, res) => {
  try {
    let { feedback } = req.body;
    const userEvent = await UserEvent.findOne({
      where: {
        user_id: req.params.userId,
        event_id: req.params.eventId
      }
    });
    if (userEvent) {
      await Feedbacks.create({
        user_event_id: userEvent.id,
        feedback,
        date: CURRENT_DATE,
        status: STATUS_ACTIVE
      });
    }
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    eventId = req.params.id;
    const feedback_id = await UserEvent.findAll({
      where: {
        event_id: eventId
      }
    });
    if (feedback_id) {
      const feedbacks = await Feedbacks.findAll({
        order: [['id', 'DESC']],
        where: {
          status: STATUS_ACTIVE
        },
        include: [
          {
            model: UserEvent,
            where: {
              event_id: eventId
            },
            attributes: ['user_id'],
            include: [
              {
                model: User,
                attributes: ['first_name']
              }
            ]
          }
        ]
      });
      res.status(200).json({
        status: 'success',
        data: {
          feedbacks
        }
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedbacks.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: UserEvent,
          attributes: ['user_id']
        }
      ]
    }).then(feedback => {
      if (feedback === null) {
        res.status(404).json('Feedback is not found');
      }
      if (req.userId === feedback.user_event.user_id) {
        feedback.update({
          status: STATUS_DELETED
        });
        res.status(200).json('Feedback is deleted');
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    let { feedback } = req.body;
    await Feedbacks.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: UserEvent,
          attributes: ['user_id']
        }
      ]
    }).then(feedbackItem => {
      if (feedbackItem === null) {
        res.status(404).json('Feedback is not found');
      } else if (req.userId === feedbackItem.user_event.user_id) {
        feedbackItem.update({
          feedback,
          date: CURRENT_DATE
        });
        res.status(200).json('Feedback was updated!');
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
