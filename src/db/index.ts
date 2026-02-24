import { drizzle } from 'drizzle-orm/node-postgres';
// import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';

function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  // const sql = neon(process.env.DATABASE_URL);
  // return drizzle(sql);
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  return drizzle(pool);
}

export const db = getDatabase();