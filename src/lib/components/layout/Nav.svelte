<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { env } from '$env/dynamic/public';
  import Button from '$components/ui/Button.svelte';

  let scrolled = $state(false);
  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 8;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  const siteName = env.PUBLIC_SITE_NAME ?? 'YAZ Development';

  const links = [
    { href: '/projects', label: 'Projects' },
    { href: '/services', label: 'Services' },
    { href: '/devices', label: 'Devices' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  const isActive = (href: string) =>
    $page.url.pathname === href || $page.url.pathname.startsWith(`${href}/`);
</script>

<nav
  aria-label="Primary"
  class="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md transition-shadow duration-300
         flex items-center
         h-[var(--nav-h-mobile)] md:h-[var(--nav-h-desktop)]
         px-4 md:px-10
         {scrolled ? 'border-b border-line shadow-sm' : 'border-b border-transparent'}"
>
  <div class="container mx-auto flex items-center justify-between gap-6 w-full">
    <a
      href="/"
      class="font-display text-h3 font-bold text-brand-teal hover:opacity-80 transition-opacity"
      aria-label={siteName}
    >YAZ</a>

    <div class="hidden md:flex items-center gap-2">
      {#each links as link (link.href)}
        <a
          href={link.href}
          class="text-label-mono px-3 py-2 rounded-md transition-colors duration-200
                 {isActive(link.href)
                   ? 'text-brand-teal bg-sky-tint'
                   : 'text-ink-2 hover:text-brand-teal hover:bg-sky-tint'}"
          aria-current={isActive(link.href) ? 'page' : undefined}
        >
          {link.label}
        </a>
      {/each}
    </div>

    <div class="flex items-center gap-3">
      <Button href="/contact" variant="primary" size="md">Get a quote</Button>
    </div>
  </div>
</nav>
