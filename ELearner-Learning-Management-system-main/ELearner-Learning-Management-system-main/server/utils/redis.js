import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

// const redisClient = () => {
//   if (process.env.REDIS_URL) {
//     console.log(`redis connected`);
//     return process.env.REDIS_URL;
//   } else {
//     throw new Error('redis connection failed');
//   }
// };

const redis = new Redis();

export default redis;
