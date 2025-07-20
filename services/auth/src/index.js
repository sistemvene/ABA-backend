import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createRouter from './routes.js';
import pool from '../db.js';
import redisClient from '../redisClient.js';

dotenv.config();

const app = express();

// CORS con fallback
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['*'];
app.use(cors({ origin: corsOrigins }));

app.use(express.json());

app.get('/healthz', (_req, res) => res.json({ ok: true }));

async function startServer() {
  try {
    redisClient.on('error', console.error);
    console.log('Conectando a Redis en:', redisClient.options.url);
    await redisClient.connect();
    console.log('Redis conectado');
    
    // Configura rutas
    app.use('/api', createRouter(pool, redisClient));

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';

    app.listen(port, host, () => {
      console.log(`Service auth running on http://${host}:${port}`);
    });
  } catch (err) {
    console.error('Error inicializando el servidor auth:', err);
    process.exit(1);
  }
}

startServer();
