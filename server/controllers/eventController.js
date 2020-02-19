const { Op } = require('sequelize');
const Event = require('../models').event;
const User = require('../models').users;
const Redis = require('../services/redisService');

exports.getEventByID = async (req, res) => {
  const { id } = req.params.id;
  await Event.findOne({
    where: {
      id
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
      Redis.addUrlInCache(req.baseUrl, event);
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
    cover,
    price
  })
    .then(() => {
      res.status(201).send({
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
  const { id } = req.params.id;
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
      }
      res.status(403).json({
        message: 'Access forbidden'
      });
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
          {
            name: {
              [Op.iLike]: `%${req.query.q}%`
            }
          },
          {
            description: {
              [Op.iLike]: `%${req.query.q}%`
            }
          }
        ]
      },
      offset,
      limit,
      order: [['datetime', 'DESC']]
    })
      .then(events => {
        Redis.addUrlInCache(req.baseUrl, events);
        res.status(200).json(events);
      })
      .catch(err => {
        res.status(404).send({
          message: err.message || 'Not found'
        });
      });
  } else {
    await Event.findAndCountAll(
      {
        where: {
          status: 'Active'
        }
      },
      {
        raw: true,
        offset,
        limit,
        order: [['datetime', 'DESC']]
      }
    )
      .then(events => {
        Redis.addUrlInCache(req.baseUrl, events);
        res.status(200).json(events);
      })
      .catch(err => {
        res.status(404).send({
          message: err.message || 'Not found'
        });
      });
  }
};
