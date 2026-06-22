/**
 * Upstash Redis rate limit — 5 req/min/IP per DESIGN.md §9.
 * Real ratelimit wired in Phase 3 alongside /api/leads and /api/quote.
 */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

let _limiter: Ratelimit | null = null;

export const limiter = (): Ratelimit => {
  if (_limiter) return _limiter;
  const url = env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set');
  }
  const redis = new Redis({ url, token });
  _limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
    prefix: 'yaz:rl'
  });
  return _limiter;
};

export const rateLimitDisabled = (): boolean =>
  env.RATE_LIMIT_DISABLED === 'true' && import.meta.env.DEV;
