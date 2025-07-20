import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: '10.20.20.6',        // IP del servidor Dev-database
  user: 'postgres',
  password: '1qaz2WSX',
  database: 'postgres',
  port: 5432,                // Puerto por defecto PostgreSQL
});

async function testDatabase() {
  try {
    // 1. Insertar usuario
    const insertResult = await pool.query(
      `INSERT INTO users (email, password, name, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`,
      ['testinsert@example.com', 'pass123', 'Usuario Test']
    );
    console.log('Usuario insertado:', insertResult.rows[0]);

    // 2. Seleccionar usuarios
    const selectResult = await pool.query(`SELECT * FROM users WHERE email = $1`, ['testinsert@example.com']);
    console.log('Usuario seleccionado:', selectResult.rows[0]);

    // 3. Actualizar usuario
    const updateResult = await pool.query(
      `UPDATE users SET name = $1 WHERE email = $2 RETURNING *`,
      ['Usuario Test Actualizado', 'testinsert@example.com']
    );
    console.log('Usuario actualizado:', updateResult.rows[0]);

  } catch (error) {
    console.error('Error en consulta:', error);
  } finally {
    await pool.end();
  }
}

testDatabase();
