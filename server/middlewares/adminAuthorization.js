require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  let token;
  try {
    if (req.header('Authorization')) {
      token = req.header('Authorization').split(' ')[1];

      const payload = await jwt.verify(token, JWT_SECRET);
      req.userId = payload.userId;
      if (payload.role === 'Admin') {
        next();
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  } catch (err) {
    res.status(404).json({ error: 'Not Found' });
  }
};
