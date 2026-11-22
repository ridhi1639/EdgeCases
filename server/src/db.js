import pg from 'pg';
import { config } from './config.js';

// Return BIGINT/COUNT results as numbers (safe for our value ranges).
pg.types.setTypeParser(20, (v) => Number(v));

export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: config.databaseSsl ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30_000,
});

pool.on('error', (err) => console.error('Unexpected Postgres pool error:', err.message));

export const query = (text, params) => pool.query(text, params);

// Run several statements atomically.
export async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}