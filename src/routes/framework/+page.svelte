<script lang="ts">
  import FadeUp from '$components/motion/FadeUp.svelte';
  import Button from '$components/ui/Button.svelte';
  import Chip from '$components/ui/Chip.svelte';

  const pillars = [
    {
      code: 'PILLAR-01',
      title: 'Precision',
      body: 'Every measurement, every line, every weld — within tolerance. Engineering rigor over creative whim.'
    },
    {
      code: 'PILLAR-02',
      title: 'Transparency',
      body: 'Open methodology, traceable data, auditable deliverables. Clients see the work, not just the result.'
    },
    {
      code: 'PILLAR-03',
      title: 'Architectural Optimism',
      body: 'Vision-2030 grade ambition tempered by quiet, deliberate execution. Build what lasts a century.'
    }
  ];

  const colorChips = [
    { name: 'Primary', token: '--color-brand-teal', value: '#0E7490' },
    { name: 'Deep', token: '--color-deep-teal', value: '#155E75' },
    { name: 'Abyss', token: '--color-abyss-teal', value: '#0F3D4D' },
    { name: 'Sky Tint', token: '--color-sky-tint', value: '#ECFEFF' },
    { name: 'Mint Tint', token: '--color-mint-tint', value: '#F0FDFA' },
    { name: 'Lime', token: '--color-lime', value: '#84CC16' }
  ];

  const typeScale = [
    { token: 'text-display', label: 'Display', sample: 'Builds Nations.' },
    { token: 'text-h1', label: 'Heading 1', sample: 'End-to-End Geospatial Solutions' },
    { token: 'text-h2', label: 'Heading 2', sample: 'Selected Work' },
    { token: 'text-h3', label: 'Heading 3', sample: '3D Laser Scanning' },
    { token: 'text-body-lg', label: 'Body Large', sample: 'Surveying, construction, and the exclusive Hi-Target distributor in Saudi Arabia.' },
    { token: 'text-body', label: 'Body', sample: 'Our primary terrestrial laser scanners operate with millimeter precision.' },
    { token: 'text-label-mono', label: 'Mono Label', sample: 'SVC-06 · IRTK5 · NEOM-LINE-CORE' }
  ];
</script>

<svelte:head>
  <title>Institutional Framework — YAZ Development</title>
  <meta
    name="description"
    content="The YAZ Development institutional framework: brand pillars, design tokens, typography, and the technical-modernist visual system."
  />
</svelte:head>

<!-- HERO -->
<section
  class="relative bg-white mesh-pattern overflow-hidden border-b border-line
         px-4 md:px-10 py-24 md:py-32"
>
  <div class="container mx-auto relative z-10 max-w-3xl">
    <FadeUp>
      <Chip>FRAMEWORK · v1</Chip>
    </FadeUp>
    <FadeUp delay={0.1}>
      <h1 class="mt-6 font-display text-display text-ink leading-tight">
        Institutional Framework
      </h1>
    </FadeUp>
    <FadeUp delay={0.2}>
      <p class="mt-6 text-body-lg text-ink-2 max-w-2xl">
        The contract every page, component, and animation obeys. Built on three pillars:
        precision, transparency, and architectural optimism.
      </p>
    </FadeUp>
  </div>
</section>

<!-- PILLARS -->
<section class="py-16 md:py-24 px-4 md:px-10 bg-surface">
  <div class="container mx-auto">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal">Foundations</p>
      <h2 class="mt-3 font-display text-h1 text-ink max-w-3xl">Three Pillars</h2>
    </FadeUp>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <FadeUp autoStagger class="contents">
        {#each pillars as p (p.code)}
          <article
            class="hover-lift bg-white p-8 rounded-lg border border-line flex flex-col h-full"
          >
            <span class="text-label-mono text-ink-3 mb-4">{p.code}</span>
            <h3 class="font-display text-h2 text-ink mb-3">{p.title}</h3>
            <p class="text-body text-ink-2">{p.body}</p>
          </article>
        {/each}
      </FadeUp>
    </div>
  </div>
</section>

<!-- COLOR TOKENS -->
<section class="py-16 md:py-24 px-4 md:px-10 bg-white">
  <div class="container mx-auto">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal">§ 1.1</p>
      <h2 class="mt-3 font-display text-h1 text-ink">Color Tokens</h2>
      <p class="mt-4 text-body-lg text-ink-2 max-w-2xl">
        The palette is anchored in a spectrum of teals. Lime is reserved exclusively for
        high-conversion accents.
      </p>
    </FadeUp>
    <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <FadeUp autoStagger class="contents">
        {#each colorChips as c (c.token)}
          <div class="rounded-lg border border-line overflow-hidden bg-white">
            <div class="aspect-square" style={`background:${c.value}`}></div>
            <div class="p-4">
              <p class="font-display text-body font-semibold text-ink">{c.name}</p>
              <p class="text-label-mono text-ink-3 mt-1 break-all">{c.token}</p>
              <p class="text-label-mono text-ink-2 mt-1">{c.value}</p>
            </div>
          </div>
        {/each}
      </FadeUp>
    </div>
  </div>
</section>

<!-- TYPOGRAPHY -->
<section class="py-16 md:py-24 px-4 md:px-10 bg-mint-tint">
  <div class="container mx-auto">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal">§ 1.2</p>
      <h2 class="mt-3 font-display text-h1 text-ink">Type Scale</h2>
      <p class="mt-4 text-body-lg text-ink-2 max-w-2xl">
        Space Grotesk for display. Inter for body. JetBrains Mono for chips, codes, and technical
        labels.
      </p>
    </FadeUp>
    <div class="mt-12 space-y-6">
      <FadeUp autoStagger class="contents">
        {#each typeScale as t (t.token)}
          <div
            class="bg-white p-6 md:p-8 rounded-lg border border-line flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6"
          >
            <span
              class="text-label-mono text-ink-3 shrink-0 md:w-40"
            >{t.token}</span>
            <span class={`${t.token} text-ink font-display`}>{t.sample}</span>
          </div>
        {/each}
      </FadeUp>
    </div>
  </div>
</section>

<!-- BUTTONS -->
<section class="py-16 md:py-24 px-4 md:px-10 bg-white">
  <div class="container mx-auto max-w-3xl">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal">§ 2 · Components</p>
      <h2 class="mt-3 font-display text-h1 text-ink">Buttons</h2>
      <p class="mt-4 text-body-lg text-ink-2">
        Four variants. Lime accent is reserved for Contact / Submit only.
      </p>
    </FadeUp>
    <FadeUp class="mt-12 flex flex-wrap gap-4">
      <Button variant="primary" size="md">Primary</Button>
      <Button variant="secondary" size="md">Secondary</Button>
      <Button variant="ghost" size="md">Ghost</Button>
      <Button variant="accent" size="md">Accent (lime)</Button>
    </FadeUp>
  </div>
</section>

<!-- CTA -->
<section class="py-16 md:py-24 px-4 md:px-10 bg-sky-tint">
  <div class="container mx-auto max-w-2xl text-center">
    <FadeUp>
      <h2 class="font-display text-h1 text-deep-teal">Build with the system, not around it.</h2>
      <p class="mt-4 text-body-lg text-deep-teal/80">
        Every new page, every PR — read DESIGN.md first, ship within tokens.
      </p>
      <div class="mt-8 flex justify-center">
        <Button href="/about" variant="primary" size="lg">Read Our Story</Button>
      </div>
    </FadeUp>
  </div>
</section>
