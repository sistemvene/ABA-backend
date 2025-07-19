import { Router } from 'express';

export default function createRouter({ db, redis }) {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json({ service: 'media', status: 'ok' });
  });

  // aquí añadirás login, verify, etc.

  return router;
}
