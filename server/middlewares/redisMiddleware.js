const Redis = require('../services/redisService');

function checkToken(req) {
  let token;
  let result = { isAuthorization: false };
  if (req.header('Authorization')) {
    token = req.header('Authorization').split(' ')[1];
    try {
      const payload = JWT.verify(token, JWT_SECRET);
      result = { isAuthorization: true, userId: payload.userId };
    } catch (err) {
      return result;
    }
  }
  return result;
}

const CheckUrlInCache = async (req, res, next) => {
  Redis.getUrlFromCache(req.originalUrl + '-' + checkToken(req).userId)
    .then(cache => {
      if (!cache) {
        return next();
      }
      return res.status(200).json(cache);
    })
    .catch(() => {
      return next();
    });
};
module.exports = {
  CheckUrlInCache
};
