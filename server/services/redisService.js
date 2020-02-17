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

const addUrlInCache = async (baseURL, value, time = process.env.REDIS_TIME) => {
  try {
    await clientRedis.setex(baseURL, time, JSON.stringify(value));
  } catch (err) {
    throw err;
  }
};

const getUrlFromCache = async baseUrl => {
  return new Promise((resolve, reject) => {
    clientRedis.get(baseUrl, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      if (data) {
        //console.log('Pass data ');
        resolve(JSON.parse(data));
      } else {
        //console.log('pass null ');
        resolve(null);
      }
    });
  });
};

module.exports = {
  addUrlInCache,
  getUrlFromCache
};
