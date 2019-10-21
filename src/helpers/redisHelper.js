import { config } from 'dotenv';
import redis from 'redis';
import { promisify } from 'util';

config();

const { REDIS_HOST, REDIS_PORT } = process.env;
const redisClient = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST,
});

export default {
  existsAsync: promisify(redisClient.exists).bind(redisClient),
  getAsync: promisify(redisClient.get).bind(redisClient),
  setAsync: promisify(redisClient.set).bind(redisClient)
};
