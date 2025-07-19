import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createRouter from './routes.js';
import mysql from 'mysql2/promise';
import { createClient } from 'redis';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGINS.split(',') || ['*']
}));
app.use(express.json());

let db, redisClient;
(async () => {
  db = await mysql.createConnection(process.env.MYSQL_CONN);
  redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}` });
  redisClient.on('error', console.error);
  await redisClient.connect();
})();

app.use('/api', createRouter({ db, redis: redisClient }));

app.get('/healthz', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Service catalog running on port ${port}`);
});
