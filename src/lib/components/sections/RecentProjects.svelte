<script lang="ts">
  import FadeUp from '$components/motion/FadeUp.svelte';
  import Button from '$components/ui/Button.svelte';
  import {
    recentProjects,
    projectImagePath,
    type RecentProjectAccent
  } from '$lib/data/recent-projects';

  interface Props {
    showViewAll?: boolean;
  }

  let { showViewAll = false }: Props = $props();

  const accentClass = (accent: RecentProjectAccent) =>
    accent === 'bottom-start' ? 'accent-bl' : 'accent-tl';
</script>

{#snippet imageBlock(project: (typeof recentProjects)[number])}
  <div class="relative {accentClass(project.accent)} min-w-0">
    <div
      class="relative aspect-[4/3] rounded-sm overflow-hidden bg-white/5 border border-white/10"
    >
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]"
      ></div>
      <img
        src={project.imageSrc ?? projectImagePath(project.id)}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        class="absolute inset-0 w-full h-full object-cover opacity-0 data-[loaded]:opacity-100 transition-opacity duration-500"
        onload={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
        onerror={(e) => {
          e.currentTarget.remove();
        }}
      />
    </div>
  </div>
{/snippet}

{#snippet textBlock(project: (typeof recentProjects)[number])}
  <div class="min-w-0 md:py-2">
    <h3 class="font-display text-h2 md:text-h1 text-white leading-tight">
      {project.title}
    </h3>
    <p class="mt-4 text-body-lg text-white/75 leading-relaxed max-w-xl">
      {project.body}
    </p>
  </div>
{/snippet}

<section
  id="recent-projects"
  class="relative py-16 md:py-24 px-4 md:px-10 overflow-hidden bg-abyss-teal text-white"
>
  <div
    aria-hidden="true"
    class="absolute inset-0 opacity-[0.18] bg-cover bg-center mix-blend-luminosity pointer-events-none"
    style="background-image: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=60&auto=format&fit=crop');"
  ></div>
  <div aria-hidden="true" class="absolute inset-0 bg-abyss-teal/88 pointer-events-none"></div>
  <div aria-hidden="true" class="absolute inset-0 contour-lines opacity-[0.12] pointer-events-none"></div>

  <div class="container mx-auto relative z-10">
    <FadeUp>
      <h2 class="font-display text-h1 md:text-display text-center leading-tight">
        Our Recent <span class="text-brand-teal">Projects</span>
      </h2>
    </FadeUp>

    <div class="mt-12 md:mt-16 flex flex-col gap-12 md:gap-16">
      {#each recentProjects as project (project.id)}
        <FadeUp>
          <article class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
            {#if project.layout === 'image-first'}
              {@render imageBlock(project)}
              {@render textBlock(project)}
            {:else}
              {@render textBlock(project)}
              {@render imageBlock(project)}
            {/if}
          </article>
        </FadeUp>
      {/each}
    </div>

    {#if showViewAll}
      <FadeUp class="mt-12 md:mt-16 flex justify-center">
        <Button href="/projects" variant="secondary" size="lg" magnetic>View all projects</Button>
      </FadeUp>
    {/if}
  </div>
</section>

<style>
  .accent-bl::before,
  .accent-bl::after,
  .accent-tl::before,
  .accent-tl::after {
    content: '';
    position: absolute;
    background: var(--color-brand-teal);
    pointer-events: none;
    z-index: 2;
  }

  .accent-bl::before {
    bottom: -0.5rem;
    left: -0.5rem;
    width: 5rem;
    height: 2px;
  }
  .accent-bl::after {
    bottom: -0.5rem;
    left: -0.5rem;
    width: 2px;
    height: 5rem;
  }

  .accent-tl::before {
    top: -0.5rem;
    left: -0.5rem;
    width: 5rem;
    height: 2px;
  }
  .accent-tl::after {
    top: -0.5rem;
    left: -0.5rem;
    width: 2px;
    height: 5rem;
  }
</style>
