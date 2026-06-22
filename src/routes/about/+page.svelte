<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';
  import ImpactStats from '$components/sections/ImpactStats.svelte';
  import AboutYaz from '$components/sections/AboutYaz.svelte';

  const milestones = [
    {
      year: '2015',
      title: 'The Foundation',
      body: 'YAZ Development established with a vision to redefine contracting reliability.',
      highlight: false
    },
    {
      year: '2018',
      title: 'First Mega Project',
      body: 'Successfully delivered our first major commercial complex ahead of schedule.',
      highlight: false
    },
    {
      year: '2021',
      title: 'National Expansion',
      body: 'Opened regional offices to support nationwide infrastructure initiatives.',
      highlight: false
    },
    {
      year: '2024',
      title: 'Decade of Trust',
      body: 'Celebrating 10 years of architectural optimism and engineering precision.',
      highlight: true
    }
  ];
</script>

<svelte:head>
  <title>About — YAZ Development</title>
  <meta
    name="description"
    content="A decade of architectural optimism, building the foundations of a modern Kingdom through precision, transparency, and relentless innovation."
  />
</svelte:head>

<!-- HERO -->
<section
  class="relative flex items-center justify-center bg-white mesh-pattern overflow-hidden
         px-4 md:px-10 py-24 md:py-32 border-b border-line"
>
  <div class="container mx-auto relative z-10 text-center">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal mb-6">Our Story</p>
      <h1 class="font-display text-display text-ink max-w-4xl mx-auto leading-tight">
        Ten Years.<br />
        Fifty Projects.<br />
        <span class="text-brand-teal">One Kingdom.</span>
      </h1>
      <p class="mt-8 text-body-lg text-ink-2 max-w-2xl mx-auto">
        A decade of architectural optimism, building the foundations of a modern tomorrow
        through precision, transparency, and relentless innovation.
      </p>
      <div class="mt-10 flex justify-center">
        <Button href="#timeline" variant="primary" size="lg" magnetic>View Our Timeline</Button>
      </div>
    </FadeUp>
  </div>
</section>

<AboutYaz />

<!-- TIMELINE -->
<section id="timeline" class="bg-surface py-16 md:py-24 px-4 md:px-10 overflow-hidden">
  <div class="container mx-auto">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal">Milestones</p>
      <h2 class="mt-3 font-display text-h1 text-ink max-w-3xl">Evolution of Excellence</h2>
      <p class="mt-4 text-body-lg text-ink-2 max-w-xl">
        Milestones that defined our journey and reshaped skylines.
      </p>
    </FadeUp>

    <div class="relative mt-16">
      <!-- horizontal line for desktop -->
      <div
        aria-hidden="true"
        class="absolute left-0 right-0 h-px bg-line hidden md:block md:top-8 md:-translate-y-1/2"
      ></div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
        <FadeUp autoStagger class="contents">
          {#each milestones as m (m.year)}
            <div class="relative">
              <!-- node dot -->
              <div
                aria-hidden="true"
                class="absolute top-1/2 -left-1 -translate-y-1/2 w-4 h-4 rounded-pill border-4 border-surface z-10
                       md:top-8 md:left-1/2 md:-translate-x-1/2
                       {m.highlight ? 'bg-lime-bright' : 'bg-brand-teal'}"
              ></div>

              <div
                class="hover-lift bg-white p-6 md:p-7 rounded-lg border ml-6 md:ml-0 md:mt-16
                       {m.highlight ? 'border-brand-teal shadow-md' : 'border-line'}"
              >
                <span class="block font-display text-h2 text-brand-teal mb-2">{m.year}</span>
                <h3 class="text-body-lg font-display font-semibold text-ink mb-2">{m.title}</h3>
                <p class="text-body text-ink-2">{m.body}</p>
              </div>
            </div>
          {/each}
        </FadeUp>
      </div>
    </div>
  </div>
</section>

<!-- IMPACT -->
<ImpactStats surface="bg-white" />
