require('dotenv').config();
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const clientRedis = redis.createClient(REDIS_PORT, REDIS_HOST);
clientRedis.on('error', err => {
  console.log(err.message);
});
clientRedis.on('connect', function() {
  console.log('Redis connected');
});

const addUrlInCache = async (URL, value, time = process.env.REDIS_TIME) => {
  try {
    await clientRedis.setex(URL, time, JSON.stringify(value));
  } catch (err) {
    throw err;
  }
};

const getUrlFromCache = async Url => {
  return new Promise((resolve, reject) => {
    clientRedis.get(Url, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      if (data) {
        resolve(JSON.parse(data));
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = {
  addUrlInCache,
  getUrlFromCache
};
