import { config } from 'dotenv';
import redis from 'redis';
import { promisify } from 'util';

config();

const { REDIS_URL } = process.env;
const redisClient = redis.createClient({
  url: REDIS_URL,
});

export default {
  existsAsync: promisify(redisClient.exists).bind(redisClient),
  getAsync: promisify(redisClient.get).bind(redisClient),
  setAsync: promisify(redisClient.set).bind(redisClient)
};
