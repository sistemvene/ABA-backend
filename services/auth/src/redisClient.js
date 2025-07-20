const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || '10.20.20.6',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || 'ChangeMe!',
});

module.exports = redis;
