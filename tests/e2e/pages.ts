/** Public routes exercised by Playwright smoke tests. */
export type PublicPage = {
  path: string;
  title: RegExp;
  heading: RegExp;
};

export const publicPages: PublicPage[] = [
  {
    path: '/',
    title: /YAZ Development/i,
    heading: /Precision That Builds Nations/i
  },
  {
    path: '/about',
    title: /About.*YAZ/i,
    heading: /About YAZ/i
  },
  {
    path: '/services',
    title: /Services.*YAZ/i,
    heading: /Services/i
  },
  {
    path: '/projects',
    title: /Projects.*YAZ/i,
    heading: /Projects/i
  },
  {
    path: '/devices',
    title: /Devices.*YAZ/i,
    heading: /Devices/i
  },
  {
    path: '/contact',
    title: /Contact.*YAZ/i,
    heading: /Contact/i
  }
];
