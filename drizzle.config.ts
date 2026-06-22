import { defineConfig } from 'drizzle-kit';

const url =
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.DATABASE_URL ??
  '';

if (!url) {
  // eslint-disable-next-line no-console
  console.warn(
    '[drizzle.config] No DATABASE_URL_UNPOOLED or DATABASE_URL set — drizzle-kit will fail at runtime.'
  );
}

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url },
  strict: true,
  verbose: true,
  casing: 'snake_case'
});
