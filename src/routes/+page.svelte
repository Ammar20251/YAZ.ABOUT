<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$components/ui/Button.svelte';
  import Card from '$components/ui/Card.svelte';
  import Chip from '$components/ui/Chip.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';
  import CountUp from '$components/motion/CountUp.svelte';
  import AboutYaz from '$components/sections/AboutYaz.svelte';
  import ImpactStats from '$components/sections/ImpactStats.svelte';
  import { startHero } from '$animations/hero';

  let heroEl: HTMLElement | undefined = $state();

  onMount(() => {
    let dispose: (() => void) | null = null;
    let cancelled = false;
    if (heroEl) {
      void startHero(heroEl).then((d) => {
        if (cancelled) d();
        else dispose = d;
      });
    }
    return () => {
      cancelled = true;
      dispose?.();
    };
  });

  const services = [
    {
      code: 'SVC-01',
      icon: '🛰',
      title: 'Topographic Surveying',
      body: 'High-resolution digital terrain modeling and contour mapping for vast developmental tracts.'
    },
    {
      code: 'SVC-02',
      icon: '📐',
      title: 'Construction Layout',
      body: 'Precise spatial positioning for foundations, structures, and critical infrastructure alignments.'
    },
    {
      code: 'SVC-03',
      icon: '🗺',
      title: 'GIS Mapping',
      body: 'Comprehensive geographic information systems for urban planning and resource management.'
    },
    {
      code: 'SVC-04',
      icon: '🛠',
      title: 'BIM & Modeling',
      body: 'Building information models for design coordination, clash detection, and as-built documentation.'
    },
    {
      code: 'SVC-05',
      icon: '📡',
      title: 'Hi-Target Equipment',
      body: 'Exclusive distributor of GNSS RTK, total stations, controllers, and field accessories.'
    }
  ];

  const stats = [
    { value: 50, suffix: '+', label: 'Projects' },
    { value: 10, suffix: '', label: 'Years' },
    { value: 30, suffix: '+', label: 'Survey Teams' }
  ];

</script>

<!-- HERO -->
<section
  bind:this={heroEl}
  class="relative flex flex-col justify-center bg-white mesh-pattern contour-lines
         px-4 md:px-10 overflow-hidden border-b border-line
         min-h-[calc(100vh-var(--nav-h-mobile))] md:min-h-[calc(100vh-var(--nav-h-desktop))]"
>
  <div aria-hidden="true" class="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-sky-tint/40 rounded-pill blur-3xl -translate-y-1/2 translate-x-1/3"></div>
  <div aria-hidden="true" class="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-mint-tint/50 rounded-pill blur-3xl translate-y-1/3 -translate-x-1/4"></div>

  <div class="container mx-auto w-full z-10 py-16 md:py-24">
    <div data-hero-chip class="inline-block">
      <Chip>
        <span class="text-brand-teal">⟁</span> GEOSPATIAL INTELLIGENCE &amp; SURVEYING
      </Chip>
    </div>

    <h1
      data-hero-headline
      class="mt-6 font-display text-display text-abyss-teal max-w-4xl"
    >
      Precision That<br />Builds Nations.
    </h1>

    <p data-hero-sub class="mt-6 text-body-lg text-ink-2 max-w-2xl">
      Surveying, construction, and the exclusive Hi-Target distributor in Saudi Arabia.
      Unparalleled topographic intelligence and the foundational grid for visionary infrastructure across the Kingdom.
    </p>

    <div data-hero-ctas class="mt-10 flex flex-col sm:flex-row gap-3">
      <Button href="/services" variant="primary" size="lg" magnetic>Explore Services</Button>
      <Button href="/projects" variant="secondary" size="lg" magnetic>View Projects</Button>
    </div>
  </div>

  <!-- Stats strip -->
  <div data-hero-stats class="absolute bottom-0 inset-x-0 bg-surface/80 border-t border-line backdrop-blur-sm">
    <div class="container mx-auto px-4 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 text-label-mono text-deep-teal">
      {#each stats as s (s.label)}
        <span class="flex items-center gap-2">
          <CountUp to={s.value} suffix={s.suffix} class="text-h3 font-display text-brand-teal" />
          <span class="uppercase">{s.label}</span>
        </span>
      {/each}
      <span class="flex items-center gap-2 text-lime-deep">
        <span aria-hidden="true" class="w-2 h-2 rounded-pill bg-lime"></span>
        VISION 2030 PARTNER
      </span>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="bg-mint-tint py-16 md:py-24 px-4 md:px-10" id="services">
  <div class="container mx-auto">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal">Core Capabilities</p>
      <h2 class="mt-3 font-display text-h1 text-abyss-teal max-w-3xl">
        Methodology, instrumentation, and absolute geospatial accuracy.
      </h2>
      <p class="mt-4 text-body-lg text-ink-2 max-w-2xl">
        Deploying advanced instrumentation and rigorous methodology to deliver absolute geospatial accuracy across surveying, construction, and GIS workflows.
      </p>
    </FadeUp>

    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      <FadeUp autoStagger class="contents">
        {#each services as svc (svc.code)}
          <Card hoverLift code={svc.code}>
            <div class="w-12 h-12 rounded-md bg-sky-tint flex items-center justify-center text-2xl text-brand-teal mb-5" aria-hidden="true">
              {svc.icon}
            </div>
            <h3 class="text-h3 font-display text-ink mb-2">{svc.title}</h3>
            <p class="text-small text-ink-2">{svc.body}</p>
            {#snippet footer()}
              <a class="text-label-mono text-brand-teal hover:text-deep-teal transition-colors" href="/services">
                Details →
              </a>
            {/snippet}
          </Card>
        {/each}
      </FadeUp>
    </div>
  </div>
</section>

<!-- IMPACT — By the Numbers -->
<ImpactStats />

<!-- ABOUT -->
<AboutYaz />
