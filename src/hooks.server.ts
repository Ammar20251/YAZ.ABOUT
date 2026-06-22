import type { Handle } from '@sveltejs/kit';

/**
 * EN-only build — no i18n hook needed.
 * Admin guard is reserved here; full Auth.js wiring lands in Phase 2.
 */
export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/admin') && event.url.pathname !== '/admin/signin') {
    // Real session check lands with Auth.js in Phase 2 (DESIGN.md §10).
  }
  return resolve(event);
};
