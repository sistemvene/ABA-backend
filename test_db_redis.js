/**
 * test_db_redis.js
 * Prueba end-to-end: PostgreSQL + Redis
 * - Crea tabla users (si no existe)
 * - Inserta usuario de prueba
 * - Recupera usuario
 * - Guarda token en Redis con TTL
 * - Recupera token
 *
 * Configuración mediante ENV (con valores por defecto):
 *   PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE
 *   REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_TTL_SECONDS
 */

import 'dotenv/config';
import pkg from 'pg';
import { createClient } from 'redis';
import crypto from 'crypto';

const { Pool } = pkg;

// ----------------------
// Config DB (con defaults)
// ----------------------
const PG_HOST = process.env.PG_HOST || '10.20.20.6';
const PG_PORT = +(process.env.PG_PORT || 5432);
const PG_USER = process.env.PG_USER || 'postgres';
const PG_PASSWORD = process.env.PG_PASSWORD || '1qaz2WSX';
const PG_DATABASE = process.env.PG_DATABASE || 'postgres';

// ----------------------
// Config Redis
// ----------------------
const REDIS_HOST = process.env.REDIS_HOST || '10.20.20.6';
const REDIS_PORT = +(process.env.REDIS_PORT || 6379);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'ChangeMe!';
const REDIS_TTL_SECONDS = +(process.env.REDIS_TTL_SECONDS || 300); // 5 min

// ----------------------
// Crear Pool PG
// ----------------------
const pool = new Pool({
  host: PG_HOST,
  port: PG_PORT,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  max: 5,
  idleTimeoutMillis: 5000
});

// ----------------------
// Crear Cliente Redis
// ----------------------
const redisUrl = `redis://:${encodeURIComponent(REDIS_PASSWORD)}@${REDIS_HOST}:${REDIS_PORT}`;
const redisClient = createClient({ url: redisUrl });

// Manejo de eventos Redis
redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('Redis conectado...'));

// ----------------------
// Función principal
// ----------------------
async function main() {
  console.log('*** Iniciando prueba DB + Redis ***');
  console.log(`Postgres -> ${PG_USER}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`);
  console.log(`Redis    -> ${redisUrl}`);

  // 1. Conectar Redis
  await redisClient.connect();

  // 2. Crear tabla users si no existe
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('Tabla users verificada/creada.');

  // 3. Insertar usuario de prueba
  const randomSuffix = crypto.randomBytes(4).toString('hex');
  const testEmail = `test_${randomSuffix}@example.com`;
  const testPassword = 'pass123'; // en producción: hash
  const testName = 'Usuario Test DB+Redis';

  const insertRes = await pool.query(
    `INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at`,
    [testEmail, testPassword, testName]
  );
  const user = insertRes.rows[0];
  console.log('Usuario insertado:', user);

  // 4. Select del usuario insertado
  const selectRes = await pool.query(
    `SELECT id, email, name, created_at FROM users WHERE id = $1`,
    [user.id]
  );
  console.log('Usuario recuperado:', selectRes.rows[0]);

  // 5. Guardar token de sesión en Redis
  const sessionToken = crypto.randomUUID();
  const redisKey = `session:user:${user.id}`;
  await redisClient.set(redisKey, sessionToken, { EX: REDIS_TTL_SECONDS });
  console.log(`Token de sesión guardado en Redis -> ${redisKey} = ${sessionToken} (TTL ${REDIS_TTL_SECONDS}s)`);

  // 6. Leer token de sesión de Redis
  const tokenFromRedis = await redisClient.get(redisKey);
  console.log('Token recuperado de Redis:', tokenFromRedis);

  // 7. Resultado final
  console.log('*** Prueba completada correctamente ***');
}

// ----------------------
// Ejecutar y limpiar
// ----------------------
main()
  .catch(err => {
    console.error('Fallo en prueba DB+Redis:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    // cerrar recursos
    try { await redisClient.quit(); } catch {}
    try { await pool.end(); } catch {}
  });
