const User = require('../models').users;

exports.getAllUsers = async (req, res) => {
  res.status(200).json({ message: 'GetAllUsers' });
};
