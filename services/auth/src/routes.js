import { Router } from 'express';
import bcrypt from 'bcrypt';

export default function createRouter(pool, _redisClient) {
  const router = Router();

  // Ruta de prueba
  router.get('/', (_req, res) => {
    res.json({ message: 'Auth service running' });
  });

  // Ruta de registro
  router.post('/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      // Verificar si el usuario ya existe
      const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar usuario
      const result = await pool.query(
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
        [email, hashedPassword, name]
      );

      res.status(201).json({ user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  });

  return router;
}
