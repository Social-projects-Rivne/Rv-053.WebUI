const Event = require('../models').event;

exports.getAllEvent = async (req, res) => {
  Event.findAll({
    raw: true
  }).then(events => {
    res.status(200).json(events);
  })
}
exports.getEventByID = async (req, res) => {
  const {
    id
  } = req.params;

  await Event.findAll({
    where: {
      id: id
    }
  }).then(event => {
    res.status(200).json(event);
  })
}