require('dotenv').config();
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  let token;
  if (req.header('Authorization')) {
    token = req.header('Authorization').split(' ')[1];
  } else {
    return res.status(401).json({
      error: 'No token, authorization denied'
    });
  }

  try {
    const payload = await JWT.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    req.role = payload.role;
    if (payload.status_id == 1) {
      next();
    } else {
      return res.status(401).json({ error: 'User is banned' });
    }
  } catch (err) {
    res.status(401).json({
      error: err.message ? err.message : err
    });
  }
};
