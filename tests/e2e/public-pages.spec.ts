import { test, expect } from '@playwright/test';
import { publicPages } from './pages';

for (const pageDef of publicPages) {
  test(`${pageDef.path} loads with layout shell`, async ({ page }) => {
    const response = await page.goto(pageDef.path);
    expect(response?.ok()).toBe(true);

    await expect(page).toHaveTitle(pageDef.title);
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(pageDef.heading);
  });
}

test('primary nav links reach their pages', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation', { name: 'Primary' });
  const links = [
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Devices', path: '/devices' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  for (const link of links) {
    await nav.getByRole('link', { name: link.name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${link.path.replace('/', '\\/')}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.goto('/');
  }
});

test('home hero CTAs are present', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Explore Services' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View Projects' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get a quote' })).toBeVisible();
});
