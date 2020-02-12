const User = require('../models').users;

exports.getAllUsers = async (req, res) => {
  const limit = req.query.limit || null;
  const offset = req.query.offset || 0;
  if (req.query.q) {
  } else {
    await User.findAndCountAll({
      attributes: { exclude: ['password'] },
      raw: true,
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
  }
};
