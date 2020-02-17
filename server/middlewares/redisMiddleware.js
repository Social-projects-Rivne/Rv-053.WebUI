const Redis = require('../services/redisService');

const CheckUrlInCache = async (req, res, next) => {
  Redis.getUrlFromCache(req.baseUrl).then(cache => {
    //   console.log('Cache ', cache);
    if (!cache) {
      return next();
    } else {
      return res.status(200).json(cache);
    }
  });
};
module.exports = {
  CheckUrlInCache
};
