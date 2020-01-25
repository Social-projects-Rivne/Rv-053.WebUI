const JWT = require('jsonwebtoken');
//!!!!!!!!!
//Model User:
const User = require('../models').users;
//get value from config/default.json
const JWT_SECRET = require('config').get('JWT_SECRET');
const JWT_EXPIRE_IN = require('config').get('JWT_EXPIRE_IN');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

singToken = user => {
  return JWT.sign(
    {
      sub: user.id,
      iat: new Date().getTime(), //current time
      exp: new Date().getTime() + JWT_EXPIRE_IN //current time + JWT_EXPIRE_IN
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

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signIn = async (req, res) => {
  //Generate token
  console.log('start authController.signIn ' + req.user);
  const token = singToken(req.user);
  res.status(200).json({ success: true, token: token });
};

exports.signOut = async (req, res) => {
  //Create expiration token and pass to front-end
  const token = JWT.sign(
    {
      sub: 'Logout',
      iat: new Date().getTime(), //current time
      exp: new Date().getTime() //current time
    },
    JWT_SECRET
  );
  res.status(200).json({ success: true, token: token });
};

exports.checkAuth = async (req, res) => {
  console.log('start authController.checkAuth');
  //const token = req.header('authorization').split(' ')[1];  //get token from header

  //Get token from JSON

  res.status(200).json({ success: true });
};
