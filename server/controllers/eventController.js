require('dotenv').config();
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { Op } = require('sequelize');
const Event = require('../models').event;
const User = require('../models').users;
const Categories = require('../models').category;
const UserEvent = require('../models').user_event;
const Redis = require('../services/redisService');

const STATUS_ACTIVE = 'Active';
const STATUS_BANNED = 'Banned';

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
async function addFlagIsSubscribe(req, res, events) {
  const authUser = checkToken(req);
  let newSubscribe = [];
  if (authUser.isAuthorization) {
    const subscribe = await UserEvent.findAll({
      where: { user_id: authUser.userId },
      attributes: ['event_id'],
      raw: true
    });
    newSubscribe = subscribe.map(el => el.event_id);
  }
  events.rows.forEach((item, index, array) => {
    if (newSubscribe.indexOf(item.id) === -1) {
      item.isSubscribe = false;
    } else {
      item.isSubscribe = true;
    }
  });

  //console.log(req.originalUrl + (authUser.userId || 'anonymouse'));
  // Redis.addUrlInCache(req.originalUrl, events);
  res.status(200).json(events);
}

exports.getEventByID = async (req, res) => {
  const { id } = req.params;

  try {
    let event = await Event.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name', 'avatar']
        },
        { model: Categories }
      ]
    });
    if (event === null) {
      return res.status(404).send({ message: 'Event not found' });
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

    //Redis.addUrlInCache(req.originalUrl, event);
    res.status(200).json(event);
  } catch (err) {
    res.status(404).send({
      message: err.message || 'Not found'
    });
  }
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
  const { id } = req.params;
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
  const { id } = req.params;
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
  let queryString;
  if (req.query.q) {
    queryString = {
      status: STATUS_ACTIVE,
      [Op.or]: [
        { name: { [Op.iLike]: `%${req.query.q}%` } },
        { description: { [Op.iLike]: `%${req.query.q}%` } }
      ]
    };
  } else {
    queryString = {
      status: STATUS_ACTIVE
    };
  }
  try {
    let events = await Event.findAndCountAll({
      where: queryString,
      offset,
      limit,
      order: [['datetime', 'DESC']],
      raw: true,
      nest: true
    });
    addFlagIsSubscribe(req, res, events);
  } catch (err) {
    res.status(400).send({
      message: err.message || 'Bad Request'
    });
  }
};

exports.filterEvent = async (req, res) => {
  const limit = req.query.limit || null;
  const offset = req.query.offset || 0;
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;
  const category = req.query.category || null;
  let searchQuery = { status: STATUS_ACTIVE };
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
      },
      attributes: ['id', 'category'],
      through: {
        attributes: []
      }
    };
  }
  try {
    let events = await Event.findAndCountAll({
      where: searchQuery,
      include: includeQuery,
      offset,
      limit,
      order: [['datetime', 'DESC']],
      raw: true,
      nest: true
    });
    addFlagIsSubscribe(req, res, events);
  } catch (err) {
    res.status(400).send({
      message: err.message || 'Bad Request'
    });
  }
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
