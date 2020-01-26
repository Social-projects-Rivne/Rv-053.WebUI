const Event = require('../models').event;

exports.getListEvents = async (req, res) => {
  Event.findAll({
    raw: true
  }).then(event => {
    res.status(200).json(event);
  })
}