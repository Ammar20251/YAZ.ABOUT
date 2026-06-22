import { env } from '$env/dynamic/public';

/** Display format for Saudi numbers stored compact or spaced in env. */
export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('966')) {
    const local = digits.slice(3);
    return `+966 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }
  return raw;
}

const defaultOffice = 'King Abdulaziz Road, King Fahd District, Riyadh 12274, Saudi Arabia';

export const siteContact = {
  get legalName(): string {
    return env.PUBLIC_SITE_NAME ?? 'YAZ Development Contracting Company Ltd.';
  },
  get email(): string {
    return env.PUBLIC_CONTACT_EMAIL ?? 'info@yazdv.com';
  },
  get phone1(): string {
    return formatPhoneDisplay(env.PUBLIC_CONTACT_PHONE_1 ?? '+966553932623');
  },
  get phone2(): string {
    return formatPhoneDisplay(env.PUBLIC_CONTACT_PHONE_2 ?? '+966539008757');
  },
  get phones(): [string, string] {
    return [this.phone1, this.phone2];
  },
  get officeFull(): string {
    return env.PUBLIC_OFFICE_ADDRESS ?? defaultOffice;
  },
  get addressLine1(): string {
    const full = this.officeFull;
    const comma = full.lastIndexOf(', Riyadh');
    if (comma > 0) return full.slice(0, comma);
    return 'King Abdulaziz Road, King Fahd District';
  },
  get addressLine2(): string {
    const full = this.officeFull;
    const match = full.match(/Riyadh[\s\S]*/);
    return match?.[0].replace(/^,\s*/, '') ?? 'Riyadh 12274 — Saudi Arabia';
  },
  get whatsappNumber(): string {
    return (env.PUBLIC_WHATSAPP_NUMBER ?? '966553932623').replace(/\D/g, '');
  }
};

export type SocialSvg = 'linkedin' | 'youtube' | 'tiktok' | 'facebook' | 'instagram';

export interface SocialLink {
  label: string;
  href: string;
  svg: SocialSvg;
}

export function getSocialLinks(): SocialLink[] {
  return (
    [
      {
        label: 'LinkedIn',
        href: env.PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/company/yaz-development-company/',
        svg: 'linkedin' as const
      },
      {
        label: 'YouTube',
        href: env.PUBLIC_YOUTUBE_URL ?? 'https://youtube.com/@yaz_development_survey',
        svg: 'youtube' as const
      },
      {
        label: 'TikTok',
        href: env.PUBLIC_TIKTOK_URL ?? '',
        svg: 'tiktok' as const
      },
      {
        label: 'Facebook',
        href: env.PUBLIC_FACEBOOK_URL ?? 'https://www.facebook.com/share/1AfPcEpvpi/',
        svg: 'facebook' as const
      },
      {
        label: 'Instagram',
        href: env.PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/yaz.development',
        svg: 'instagram' as const
      }
    ] satisfies SocialLink[]
  ).filter((s): s is SocialLink => Boolean(s.href));
}

/** Map embed — King Fahd District, Riyadh */
export const mapCoords = { lat: 24.752409, lng: 46.676834 } as const;

export const mapEmbedUrl = `https://maps.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}&hl=en&z=15&output=embed`;

export const mapExternalUrl =
  'https://www.google.com/maps?ll=24.752409,46.676834&z=15&cid=16021657983095926117';

/** Impact / KPI stats (site-wide). */
export const impactStats = [
  { value: 221, suffix: '+', label: 'Projects Done' },
  { value: 262, suffix: '+', label: 'Customers' },
  { value: 14, suffix: '+', label: 'Projects In Process' },
  { value: 255, suffix: '+', label: 'Satisfied Clients' }
] as const;
