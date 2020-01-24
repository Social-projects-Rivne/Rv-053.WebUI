const User = require('../models').user;
const passport = require('passport');

const login = async (req, res) => {
  const { email, password } = req.body;
  // handle with passport
  res.send('logout');
};
const logout = async (req, res) => {
  const { email, password } = req.body;
  // handle with passport
  res.send('logout');
};
const register = async (req, res) => {
  const { email, password } = req.body;
  // handle with passport
  res.send('logout');
};

exports.login = login;
exports.logout = logout;
exports.register = register;
