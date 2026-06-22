export type RecentProjectAccent = 'bottom-start' | 'top-start';
export type RecentProjectLayout = 'image-first' | 'text-first';

export interface RecentProject {
  id: string;
  title: string;
  body: string;
  imageAlt: string;
  layout: RecentProjectLayout;
  accent: RecentProjectAccent;
  /** Override default path under /images/projects/{id}.jpg */
  imageSrc?: string;
}

/** Featured giga-projects — drop photos at `static/images/projects/{id}.jpg`. */
export const recentProjects: RecentProject[] = [
  {
    id: 'king-salman-park',
    title: 'King Salman Park',
    body: "YAZ played a key role in the topographic and 3D laser scanning of the world's largest urban park, ensuring accurate design and planning.",
    imageAlt: 'King Salman Park — YAZ surveying and laser scanning',
    layout: 'image-first',
    accent: 'bottom-start'
  },
  {
    id: 'riyadh-metro',
    title: 'Riyadh Metro Project',
    body: 'Our team created a robust control point network and deployed over 30 specialized survey teams to ensure precision in tunnel and station construction. We also led Tunnel Boring Machine (TBM) operations for underground excavations.',
    imageAlt: 'Riyadh Metro — tunnel and station surveying',
    layout: 'image-first',
    accent: 'top-start'
  },
  {
    id: 'neom-city',
    title: 'NEOM City',
    body: 'YAZ provided essential surveying and utility detection services during the early stages of the NEOM project, helping shape this futuristic city\'s infrastructure.',
    imageAlt: 'NEOM City — early-stage surveying',
    layout: 'text-first',
    accent: 'bottom-start'
  },
  {
    id: 'kafd',
    title: 'Riyadh Financial District (KAFD)',
    body: 'We delivered high-resolution 3D laser scanning and precise construction layout services for this financial hub, ensuring the highest standards of execution.',
    imageAlt: 'KAFD — 3D laser scanning and layout',
    layout: 'text-first',
    accent: 'top-start'
  }
];

export function projectImagePath(id: string): string {
  return `/images/projects/${id}.jpg`;
}
