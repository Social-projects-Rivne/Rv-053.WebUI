const Event = require("../models").event;
const User = require("../models").users;
const Sequelize = require("sequelize");
const sequelize = require("../models").sequelize;
const Op = Sequelize.Op;

// Get event by ID
exports.getEventByID = async (req, res) => {
  // Get event ID from req.params
  const {
    id
  } = req.params;
  await Event.findOne({
    where: {
      id: id
    },
    include: [{
      // Add info about the user to res
      model: User,
      attributes: ['first_name', 'last_name', 'avatar']
    }]
  }).then(event => {
    if (event === null) {
      res.status(404).send({
        message: 'Event not found'
      });
    }
    res.status(200).json(event);
  }).catch(err => {
    res.status(404).send({
      message: err.message || "Not found"
    });
  });
}

// Add new event to DB
exports.createEvent = async (req, res) => {
  // Get event ID from req.params
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
  const ownerID = req.userId;

  await Event.create({
    name,
    owner_id: 1,
    // owner_id: req.userId,
    description,
    location,
    datetime,
    duration,
    max_participants,
    min_age,
    cover,
    price
  }).then(() => {
    res.status(200).send({
      message: 'Event was create successful'
    });
  }).catch(err => {
    res.status(404).send({
      message: err.message || "Something wrong"
    });
  });
}

exports.searchEvent = async (req, res) => {
  //If there is query 'q=some text'
  const limit = req.query.limit || 100;
  const offset = req.query.offset || 0;
  if (req.query.q) {
    //Search in DB event by 'name' or 'description'
    //[Op.iLike] means case insensitive searching
    //Order by 'datetime'
    await Event.findAndCountAll({
        where: {
          [Op.or]: [{
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
        order: [sequelize.literal("datetime DESC")]
      })
      .then(data => {
        //send result to front-end
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).send({
          message: err.message || "Not found"
        });
      });
  } else {
    //Else get all events from DB
    await Event.findAndCountAll({
      raw: true,
      offset,
      limit
    }, ).then(events => {
      res.status(200).json(events);
    }).catch(err => {
      res.status(404).send({
        message: err.message || "Not found"
      });
    });
  }
};