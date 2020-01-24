const JWT = require('jsonwebtoken');
//!!!!!!!!!
//Model User:
const User = require('../models').users;
//get value from config/default.json
const JWT_SECRET = require('config').get('JWT_SECRET');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

singToken = email => {
  return JWT.sign(
    {
      sub: email,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    },
    JWT_SECRET
  );
};

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });
    //if user exist return res
    if (foundUser) {
      return res.status(200).json({ error: 'Email is already in use' });
    }
    //else create new user into DB and generate token
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashPassword);
    await User.create({
      email: email,
      password: hashPassword,
      status_id: 1
    });

    //TODO: Refactoring
    //generate token
    //const token = singToken(email);
    //res.status(201).json({ success: true, token: token });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signIn = async (req, res) => {
  //Generate token
  console.log('start authController.signIn');

  const token = singToken(req.user);
  res.status(200).json({ success: true, token: token });
};
exports.signOut = async (req, res) => {
  if (req.session) {
    req.session.destroy();
    //   res.clearCookie('session-id');
  }
  res.status(200).json({ success: true });
};
exports.checkAuth = async (req, res) => {
  console.log('start authController.checkAuth');
  const token = req.header('authorization').split(' ')[1];
  console.log(token);
  //console.log(req.body.token);
  try {
    JWT.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ err });
  }
  res.status(200).json({ success: true });
};
