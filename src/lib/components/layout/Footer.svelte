<script lang="ts">
  import { siteContact, getSocialLinks } from '$lib/data/site-contact';
  import Logo from '$components/layout/Logo.svelte';

  const phone1 = siteContact.phone1;
  const phone2 = siteContact.phone2;
  const email = siteContact.email;
  const office = siteContact.officeFull;
  const siteName = siteContact.legalName;

  const socials = getSocialLinks();

  const navCols = [
    {
      heading: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/projects', label: 'Projects' },
        { href: '/devices', label: 'Devices' }
      ]
    },
    {
      heading: 'Contact',
      links: [
        { href: '/contact', label: 'Get in touch' },
        { href: `mailto:${email}`, label: email },
        { href: `tel:${phone1.replace(/\s/g, '')}`, label: phone1 }
      ]
    }
  ];

  const year = new Date().getFullYear();
</script>

<footer class="bg-surface mt-16 md:mt-24 border-t border-line">
  <div class="container mx-auto px-4 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
    <!-- Brand col -->
    <div class="md:col-span-4 flex flex-col gap-4">
      <Logo size="footer" />
      <p class="text-body text-ink-2 max-w-sm">
        Surveying, construction, and the exclusive Hi-Target distributor in Saudi Arabia.
      </p>
      <address class="not-italic text-small text-ink-3 leading-relaxed">
        {office}
      </address>
    </div>

    <!-- Nav cols -->
    {#each navCols as col (col.heading)}
      <div class="md:col-span-3 flex flex-col gap-3">
        <h4 class="text-label-mono text-brand-teal font-semibold">{col.heading}</h4>
        {#each col.links as link (link.href)}
          <a
            href={link.href}
            class="text-body text-ink-2 hover:text-brand-teal transition-colors duration-200"
          >{link.label}</a>
        {/each}
      </div>
    {/each}

    <!-- Social -->
    <div class="md:col-span-2 flex flex-col gap-3">
      <h4 class="text-label-mono text-brand-teal font-semibold">Social</h4>
      {#each socials as s (s.label)}
        <a
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          class="text-body text-ink-2 hover:text-brand-teal transition-colors duration-200"
        >{s.label}</a>
      {/each}
    </div>
  </div>

  <div class="border-t border-line">
    <div class="container mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-label-mono text-ink-3">
      <p>© {year} {siteName}. All rights reserved.</p>
      <p>{phone2}</p>
    </div>
  </div>
</footer>
