var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var jwt = require('jsonwebtoken');
const config = require('config');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

//exports.local = passport.use(new localStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};
