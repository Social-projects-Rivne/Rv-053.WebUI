const Redis = require('../services/redisService');

const CheckUrlInCache = async (req, res, next) => {
  Redis.getUrlFromCache(req.originalUrl)
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
