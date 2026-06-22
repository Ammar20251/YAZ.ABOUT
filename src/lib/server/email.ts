/**
 * Resend transactional email — Phase 0 stub.
 * Full templates (lead-received internal, lead-confirmation external,
 * quote-request internal) land in Phase 3 with the contact form.
 */
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

let _client: Resend | null = null;
export const resend = (): Resend => {
  if (_client) return _client;
  const key = env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  _client = new Resend(key);
  return _client;
};

export const notifyRecipients = (): readonly string[] =>
  (env.NOTIFY_EMAIL ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
