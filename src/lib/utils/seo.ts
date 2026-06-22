/**
 * SEO helpers — meta tag + JSON-LD builders.
 * Real OG-image generation lands in Phase 5.
 */
import { env } from '$env/dynamic/public';

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export const buildCanonical = (path: string): string => {
  const base = env.PUBLIC_SITE_URL ?? 'https://yazdvs.com';
  return new URL(path.startsWith('/') ? path : `/${path}`, base).toString();
};
