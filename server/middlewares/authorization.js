require('dotenv').config();
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// auth middleware which checks jwt token
module.exports = async (req, res, next) => {
  let token;
  if (req.header('Authorization')) {
    token = req.header('Authorization').split(' ')[1];
  } else {
    return res.status(401).json({ err: 'No token, authorization denied' });
  }
  //console.log("Authorization with token: " + token);
  try {
    const payload = await JWT.verify(token, JWT_SECRET);
    const userId = payload.userId;
    req.userId = userId;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message ? err.message : err });
  }
};
