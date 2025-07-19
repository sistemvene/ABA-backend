import { Router } from 'express';

export default function createRouter({ db, redis }) {
  const router = Router();

  // Ejemplo de endpoint básico
  router.get('/', (_req, res) => {
    res.json({ service: process.env.SERVICE_NAME, status: 'ok' });
  });

  // Agrega aquí tus rutas específicas...
  // e.g., router.post('/items', async (req, res) => { ... });

  return router;
}
