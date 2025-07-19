import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';
import mysql from 'mysql2/promise';
import { createClient } from 'redis';

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['*']
}));
app.use(express.json());

// Conexiones
let db, redisClient;
(async () => {
  db = await mysql.createConnection(process.env.MYSQL_CONN);
  redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}`
  });
  redisClient.on('error', console.error);
  await redisClient.connect();
})();

// Rutas
app.use('/api', routes({ db, redis: redisClient }));

// Healthcheck
app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Service <${process.env.SERVICE_NAME || '<service>'}> running on port ${port}`);
});
