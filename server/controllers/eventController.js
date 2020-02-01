const Event = require("../models").event;
const Sequelize = require("sequelize");
const sequelize = require("../models").sequelize;
const Op = Sequelize.Op;

exports.searchEvent = async (req, res) => {
  //If there is query 'q=some text'
  if (req.query.q) {
    const limit = req.query.limit || 100;
    const offset = req.query.offset || 0;
    //Search in DB event by 'name' or 'description'
    //[Op.iLike] means case insensitive searching
    //Order by 'datetime'
    Event.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${req.query.q}%` } },
          { description: { [Op.iLike]: `%${req.query.q}%` } }
        ]
      },
      offset: offset,
      limit: limit,
      order: [sequelize.literal("datetime DESC")]
    })
      .then(data => {
        //send result to front-end
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).send({ message: err.message || "Not found" });
      });
  } else {
    //Else get all events from DB
    //TODO: uncomment when method will be ready
    //this.getAllEvent(req, res);
  }
};
