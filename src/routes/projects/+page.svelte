<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import Chip from '$components/ui/Chip.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';

  type Tag = 'All Projects' | 'NEOM' | 'Infrastructure' | 'Commercial' | 'Heritage';
  const tags: Tag[] = ['All Projects', 'NEOM', 'Infrastructure', 'Commercial', 'Heritage'];
  let activeTag = $state<Tag>('All Projects');

  interface Project {
    id: string;
    tag: Exclude<Tag, 'All Projects'>;
    owner: string;
    title: string;
    span: 'lg' | 'md' | 'sm-tall' | 'sm';
    imageSrc: string;
    imageAlt: string;
  }

  const projects: Project[] = [
    {
      id: 'neom-line',
      tag: 'NEOM',
      owner: 'NEOM Giga-Project',
      title: 'The Line Infrastructure Core',
      span: 'lg',
      imageAlt:
        'Point cloud visualization of a futuristic linear city spanning a desert landscape',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ywX_o3Iq7OKqBSQt-TYZOTrS7qGvGIrRx0EbM_u82Qs5kRojlQkqpi4fHzK2yVgQnZyfpeQkCw5J4qVmLc5ZM_QHi-pT9VzNLFPkR2H5uaQqz4g-NR2zcxuT8QTM6UlJV4m1ueeMilL89lk4jhaiYNKwqHqnsZeXV4DKudL8slaZT8x82MEY5VddYXeZtj7UD5Q6ZXibEcAVIXP9DHonStmGgmpm8zR25TBlLkcsdinnODnayaOdHf9jn9LRUwo114lL5zdoksc'
    },
    {
      id: 'riyadh-metro',
      tag: 'Infrastructure',
      owner: 'Riyadh Development Authority',
      title: 'Riyadh Metro Deep Tunnels',
      span: 'sm-tall',
      imageAlt: 'Curved concrete underground transit tunnel under construction',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDwsyIm_yZRvcH98TlmKG1uHWogWoTo70xjDA30YLy6Z0Ug02h2pmPfop7UbNQHQqI7Un3bKxYnA1pC9vMCFwc8T9VbLINLcjtVVEto-SAZ7J9_HBwZpa0ca6k48q05ZCZnCPvFuWnSKRTdPCHmK72raagKPIaOPbX6TwZlKm8v8KxMf3a8H_qJVMhJe8e9rQaPRNFEQGsjpilNc36GErIjazLFa9m18VkaoxgqCI9huR34AhATX6rVQsch6fJddjTEyO_j_b6St8Y'
    },
    {
      id: 'kafd-plaza',
      tag: 'Commercial',
      owner: 'PIF',
      title: 'KAFD Central Plaza',
      span: 'md',
      imageAlt: 'High-angle drone photograph of a hyper-modern financial district',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuASaPEjoUboTNa2DDZiZTqh9-DUSsanjYcJ5x7rK4iPnOXBR_o4UOX20RTN-FM8pTTOxtuXi00a3W7oxAb3GFZzYgIAgFjMRWR0ZXq0vSqR1AirpF8FXX7uDvsc6A6TRN3WycLI7WREyBfCyZA5wpr3Y3rPlX3e-qL1hRYJ0zchhdgfUTPZTFaG5L1FpfKPFnCA94wwhr_HSPfC61Xvzb278s9g2zm52UgcJCyBNce3ik1rZnhXIgdSR_dBvZ8UGwsMa5RXUWT7i6k'
    },
    {
      id: 'king-salman-park',
      tag: 'Infrastructure',
      owner: 'Riyadh Municipality',
      title: 'King Salman Park Earthworks',
      span: 'md',
      imageAlt: 'Massive urban park landscaping site with surveyors in safety gear',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCeTeBuIXEjItH7tOpzEPfo4aAIA4sURfKMCd1fGfXNILKFb00JzDi-uxikeTG1msGR4gODgKxEjC-1H0INAo5xuZqsyPoVK3pwt-eA42uUMMxmxqPMrIxaAuI16bFGidBTjOyzJC7UZnXUQFgp3SN4kMH172A5YLtAKHcH7QXxaifQmR-Zs76kp0jGLEFf-o8rk59urWXDoJcvJjNxnGIN3z3Zn7gnnfDB-rtcnqhoNCrB32ZFhu1tl59ici2BdXa60fqd1x9rwqQ'
    },
    {
      id: 'kfsc-stadium',
      tag: 'Commercial',
      owner: 'Ministry of Sport',
      title: 'KFSC Stadium Canopy',
      span: 'md',
      imageAlt: 'BIM rendering of a futuristic sports stadium roof structure',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCbU3WxouNsmjMrjlNOFxwVEFTdi2BUWXDfQr-r7hXJbSQbNcLial_RH5wkcwJDrckwA_8zRZhZPU9V2r_FyB-XVtkJnwugbdBus7i6pWAP_awEDsdbQ3o59KGDRl3uCcuCQhBgk4BiMCXwm2oJ7v2Clp8_D592udBr3kh44woH_S7t1eMjppnykQ743nOkNxxYTqxjWmvzaNT7RTxfeJlRb5ChbbBF_PKbL-sh_LvdNV2MoJdlHEiXPWoRk-3cJujJRnaeFuwm2-o'
    }
  ];

  const spanClass: Record<Project['span'], string> = {
    lg: 'md:col-span-8 md:row-span-2',
    'sm-tall': 'md:col-span-4 md:row-span-2',
    md: 'md:col-span-4 md:row-span-1',
    sm: 'md:col-span-4 md:row-span-1'
  };

  const visible = $derived(
    activeTag === 'All Projects' ? projects : projects.filter((p) => p.tag === activeTag)
  );
</script>

<svelte:head>
  <title>Selected Work — YAZ Development</title>
  <meta
    name="description"
    content="Precision at scale across the Kingdom's most ambitious giga-projects: NEOM, Riyadh Metro, KAFD, King Salman Park, KFSC Stadium."
  />
</svelte:head>

<!-- HERO -->
<header class="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-10 bg-white contour-lines overflow-hidden">
  <div class="container mx-auto relative z-10">
    <FadeUp>
      <h1 class="font-display text-display text-ink mb-6 max-w-4xl">Selected Work</h1>
      <p class="text-body-lg text-ink-2 max-w-2xl leading-relaxed">
        Precision at scale across the Kingdom's most ambitious giga-projects. Engineering the
        future with architectural optimism.
      </p>
    </FadeUp>
  </div>
</header>

<!-- FILTER BAR (sticky) -->
<div
  class="sticky top-[var(--nav-h-desktop)] z-40 bg-white/90 backdrop-blur-md border-b border-line py-4 px-4 md:px-10"
>
  <div class="container mx-auto flex gap-3 overflow-x-auto pb-2 md:pb-0 items-center">
    {#each tags as t (t)}
      <Chip interactive selected={activeTag === t} onclick={() => (activeTag = t)}>{t}</Chip>
    {/each}
  </div>
</div>

<!-- PROJECTS GRID -->
<section class="py-16 md:py-24 px-4 md:px-10 bg-white">
  <div class="container mx-auto">
    <div
      class="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]"
    >
      <FadeUp autoStagger class="contents">
        {#each visible as p (p.id)}
          <a
            href={`/projects/${p.id}`}
            class="project-card group relative overflow-hidden rounded-lg border border-line bg-white
                   hover-lift block {spanClass[p.span]}"
          >
            <img
              class="w-full h-full object-cover transition-transform duration-700 ease-out"
              loading="lazy"
              decoding="async"
              alt={p.imageAlt}
              src={p.imageSrc}
            />
            <!-- Tag chip -->
            <div class="absolute top-6 start-6 z-20">
              <span
                class="bg-sky-tint text-brand-teal text-label-mono px-3 py-1.5 rounded-pill shadow-sm"
              >{p.tag}</span>
            </div>
            <!-- Info panel -->
            <div
              class="info-panel absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md
                     p-6 transform translate-y-[15%] group-hover:translate-y-0
                     transition-transform duration-300 ease-out border-t border-line"
            >
              <div class="flex justify-between items-end gap-4">
                <div>
                  <p class="text-label-mono text-deep-teal mb-2">{p.owner}</p>
                  <h3 class="font-display text-h3 text-ink leading-tight">{p.title}</h3>
                </div>
                <div
                  class="w-10 h-10 shrink-0 rounded-pill bg-brand-teal text-white flex items-center justify-center
                         transform group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                >→</div>
              </div>
            </div>
          </a>
        {/each}
      </FadeUp>
    </div>
  </div>
</section>

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

<style>
  .project-card :global(img) {
    will-change: transform;
  }
  .project-card:hover :global(img) {
    transform: scale(1.05);
  }
</style>
