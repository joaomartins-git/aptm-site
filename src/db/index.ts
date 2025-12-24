import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql);
}

export const db = getDatabase();