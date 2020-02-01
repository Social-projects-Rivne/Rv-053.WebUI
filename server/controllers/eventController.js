const Event = require("../models").event;
const Sequelize = require("sequelize");
const sequelize = require("../models").sequelize;
const Op = Sequelize.Op;

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|'"[\]\\]/g, "\\$&");
}

exports.searchEvent = async (req, res) => {
  console.log(req.originalUrl);
  console.log(req.query.q);
  const safeQuery = await escapeRegExp(req.query.q);
  console.log(safeQuery);
  if (req.query.q) {
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;
    console.log(`regex ${req.query.q},  limit ${limit},  offset ${offset}`);

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
        //console.log(data);
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).send({ message: err.message || "Not found" });
      });
  } else {
    //Get all events from DB
    res.status(200).send();
  }
};
