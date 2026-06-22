/**
 * Auth.js wiring — Phase 0 stub.
 * Full wiring lands in Phase 2 with DrizzleAdapter + Google OAuth + Resend magic link.
 */

export const adminAllowlist = (raw: string | undefined): readonly string[] =>
  (raw ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
