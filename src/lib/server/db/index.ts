/**
 * Neon serverless + Drizzle ORM connection.
 * Real schema lands in Phase 2; this module exposes the `db` handle now
 * so other server modules can import a stable path.
 */
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

const url = env.DATABASE_URL ?? '';
if (!url) {
  // eslint-disable-next-line no-console
  console.warn('[db] DATABASE_URL is not set — db calls will fail until env is configured.');
}

const client = neon(url || 'postgres://placeholder');
export const db = drizzle(client, { schema, casing: 'snake_case' });
export type DB = typeof db;
