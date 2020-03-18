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
const Redis = require('../services/redisService');

const STATUS_ACTIVE = 'Active';
const STATUS_BANNED = 'Banned';
const STATUS_DELETED = 'Deleted';

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
      const authUser = checkToken(req);
      if (authUser.isAuthorization) {
        subscribe = await UserEvent.findOne({
          where: { user_id: authUser.userId, event_id: id }
        });
        if (subscribe !== null) {
          event.isSubscribe = true;
        }
      }

      //     Redis.addUrlInCache(req.originalUrl, event);
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
    max_participants,
    min_age,
    cover,
    price
  } = req.body;
  await Event.create({
    name,
    owner_id: req.userId,
    description,
    location,
    datetime,
    duration,
    max_participants,
    min_age,
    cover: req.file.path,
    price
  })
    .then(() => {
      res.status(200).send({
        message: 'Event was create successful'
      });
    })
    .catch(err => {
      res.status(404).send({
        message: err.message || 'Something wrong'
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
      cover = cover || process.env.BACK_HOST + '/' + req.file.path;
      let oldCoverPath = event.cover.slice(process.env.BACK_HOST.length);
      event
        .update({
          name,
          description,
          location,
          datetime,
          duration,
          max_participants,
          min_age,
          cover: cover,
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
          if (oldCoverPath) {
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
  const limit = req.query.limit || 100;
  const offset = req.query.offset || 0;
  let searchQuery = null;
  if (req.query.q) {
    searchQuery = {
      status: STATUS_ACTIVE,
      [Op.or]: [
        { name: { [Op.iLike]: `%${req.query.q}%` } },
        { description: { [Op.iLike]: `%${req.query.q}%` } }
      ]
    };
  } else {
    searchQuery = { status: STATUS_ACTIVE };
  }

  await Event.findAndCountAll({
    where: searchQuery,
    offset,
    limit,
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name']
      },
      {
        model: Categories
      }
    ],
    order: [
      ['datetime', 'DESC'],
      ['id', 'DESC']
    ]
  })
    .then(events => {
      Redis.addUrlInCache(req.originalUrl, events);
      res.status(200).json(events);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || 'Bad Request'
      });
    });
};

exports.filterEvent = async (req, res) => {
  const limit = req.query.limit || null;
  const offset = req.query.offset || 0;
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;
  const category = req.query.category || null;
  let searchQuery = { status: STATUS_ACTIVE };
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
    order: [['datetime', 'DESC']]
  })
    .then(events => {
      Redis.addUrlInCache(req.originalUrl, events);
      res.status(200).json(events);
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
