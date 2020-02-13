const User = require('../models').users;
const User_Status = require('../models').user_status;

const { Op } = require('sequelize');

exports.getAllUsersOrSearch = async (req, res) => {
  const limit = req.query.limit || null;
  const offset = req.query.offset || 0;
  let searchQuery = {};
  if (req.query.q) {
    searchQuery = {
      [Op.or]: [
        { email: { [Op.iLike]: `%${req.query.q}%` } },
        { first_name: { [Op.iLike]: `%${req.query.q}%` } },
        { last_name: { [Op.iLike]: `%${req.query.q}%` } },
        { phone: { [Op.iLike]: `%${req.query.q}%` } }
      ]
    };
  }
  await User.findAndCountAll({
    where: searchQuery,
    attributes: { exclude: ['password'] },
    include: { model: User_Status, attributes: ['status'] },
    offset,
    limit,
    order: [['id', 'DESC']]
  })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).send({
        message: err.message || 'Not found'
      });
    });
};
