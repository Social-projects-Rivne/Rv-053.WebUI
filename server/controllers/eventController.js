const { Op } = require('sequelize');
const Event = require('../models').event;
const User = require('../models').users;
const Categories = require('../models').category;
const Redis = require('../services/redisService');

const STATUS_ACTIVE = 'Active';
const STATUS_BANNED = 'Banned';

exports.getEventByID = async (req, res) => {
  const { id } = req.params;
  await Event.findOne({
    where: {
      id,
      status: 'Active'
    },
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'avatar']
      }
    ]
  })
    .then(event => {
      if (event === null) {
        res.status(404).send({
          message: 'Event not found'
        });
      }
      Redis.addUrlInCache(req.originalUrl, event);
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
  const { id } = req.params.id;
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

  await Event.findOne({
    where: {
      id
    }
  }).then(event => {
    if (req.userId === event.owner_id || req.role === 'Admin') {
      const cover = cover || req.file.path;
      Event.update(
        {
          name,
          description,
          location,
          datetime,
          duration,
          max_participants,
          min_age,
          cover,
          price
        },
        {
          where: {
            id: req.userId,
            owner_id: req.userId
          }
        }
      )
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
  const id = req.params.id;
  await Event.findOne({
    where: {
      id
    }
  })
    .then(event => {
      if (event === null) {
        res.status(404).json({
          message: 'Event not found'
        });
      }
      if (req.userId === event.owner_id || req.role === 'Admin') {
        Event.update(
          { status: 'Deleted' },
          {
            where: {
              id
            }
          }
        )
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
  if (req.query.q) {
    await Event.findAndCountAll({
      where: {
        status: 'Active',
        [Op.or]: [
          { name: { [Op.iLike]: `%${req.query.q}%` } },
          { description: { [Op.iLike]: `%${req.query.q}%` } }
        ]
      },
      raw: true,
      offset,
      limit,
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
  } else {
    await Event.findAndCountAll({
      where: {
        status: 'Active'
      },
      raw: true,
      offset,
      limit,
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
  }
};

exports.filterEvent = async (req, res) => {
  const limit = req.query.limit || null;
  const offset = req.query.offset || 0;
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;
  const category = req.query.category || null;
  let searchQuery = {};
  let includeQuery = null;

  if (startDate !== null && endDate === null) {
    searchQuery.datetime = {
      [Op.gte]: isNaN(parseInt(startDate)) ? 0 : parseInt(startDate)
    };
  }
  if (startDate !== null && endDate !== null) {
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
    includeQuery = {
      model: Categories,
      where: {
        id: isNaN(parseInt(category)) ? 0 : parseInt(category)
      }
    };
  }

  await Event.findAndCountAll({
    where: searchQuery,
    include: includeQuery,
    offset,
    limit,
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

exports.banEvent = async (req, res) => {
  try {
    let event = await Event.findByPk(req.params.id);
    if (event.status != STATUS_ACTIVE) {
      return res.status(400).send({
        message: 'Event is not Active'
      });
    }
    await event.update({ status: STATUS_BANNED });
    res.status(201).json({ status: 'success' });
  } catch (err) {
    res.status(400).send({
      message: err.message || 'Bad request'
    });
  }
};

exports.unbanEvent = async (req, res) => {
  try {
    let event = await Event.findByPk(req.params.id);
    if (event.status != STATUS_BANNED) {
      return res.status(400).send({
        message: 'Event is not Banned'
      });
    }
    await event.update({ status: STATUS_ACTIVE });
    res.status(201).json({ status: 'success' });
  } catch (err) {
    res.status(400).send({
      message: err.message || 'Bad request'
    });
  }
};
