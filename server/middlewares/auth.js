const JWT = require('jsonwebtoken');
const JWT_SECRET = require('config').get('JWT_SECRET');

// auth middleware which checks jwt token
module.exports = async (req, res, next) => {
  const token = req.body.token;
  console.log(token);
  try {
    await JWT.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: err.message ? err.message : err });
  }
};
