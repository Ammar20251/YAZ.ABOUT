<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';
  import RecentProjects from '$components/sections/RecentProjects.svelte';
</script>

<svelte:head>
  <title>Projects — YAZ Development</title>
  <meta
    name="description"
    content="Our recent work across the Kingdom's giga-projects: King Salman Park, Riyadh Metro, NEOM, and KAFD."
  />
</svelte:head>

<!-- HERO -->
<header class="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-10 bg-white contour-lines overflow-hidden">
  <div class="container mx-auto relative z-10">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal mb-4">Portfolio</p>
      <h1 class="font-display text-display text-ink mb-6 max-w-4xl">Our Projects</h1>
      <p class="text-body-lg text-ink-2 max-w-2xl leading-relaxed">
        Precision at scale across the Kingdom's most ambitious developments — from urban parks and
        metro tunnels to giga-city infrastructure and financial districts.
      </p>
    </FadeUp>
  </div>
</header>

<RecentProjects />

<!-- CTA -->
<section class="py-16 md:py-24 px-4 md:px-10 bg-sky-tint relative overflow-hidden">
  <div class="absolute inset-0 contour-lines opacity-40 pointer-events-none"></div>
  <div class="container mx-auto max-w-3xl text-center relative z-10">
    <FadeUp>
      <h2 class="font-display text-display text-brand-teal mb-6">Start Your Project</h2>
      <p class="text-body-lg text-deep-teal mb-10 max-w-xl mx-auto">
        Partner with YAZ Development to bring architectural optimism and structural precision to
        your next giga-project.
      </p>
      <div class="flex justify-center">
        <Button href="/contact" variant="accent" size="lg" magnetic>Talk to Our Team →</Button>
      </div>
    </FadeUp>
  </div>
</section>
