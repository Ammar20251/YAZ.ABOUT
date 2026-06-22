<script lang="ts">
  import CountUp from '$components/motion/CountUp.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';
  import { impactStats } from '$lib/data/site-contact';

  interface Props {
    eyebrow?: string;
    heading?: string;
    /** Background color class — defaults to bg-white. Use bg-surface / bg-mint-tint to alternate against neighbors. */
    surface?: string;
  }

  let {
    eyebrow = 'By the Numbers',
    heading = 'A decade measured in delivered ground truth.',
    surface = 'bg-white'
  }: Props = $props();

  const stats = impactStats;
</script>

<section
  id="impact"
  class={`${surface} py-16 md:py-24 px-4 md:px-10 border-y border-line`}
>
  <div class="container mx-auto">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal text-center">{eyebrow}</p>
      <h2 class="mt-3 font-display text-h1 text-ink text-center max-w-2xl mx-auto">
        {heading}
      </h2>
    </FadeUp>

    <div class="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
      <FadeUp autoStagger class="contents">
        {#each stats as s (s.label)}
          <div class="flex flex-col items-center text-center">
            <CountUp
              to={s.value}
              suffix={s.suffix}
              duration={2}
              start="top 90%"
              class="font-display font-bold text-brand-teal leading-none
                     text-[clamp(3rem,8vw+1rem,6rem)]"
            />
            <span class="mt-4 text-body-lg text-ink font-medium">{s.label}</span>
          </div>
        {/each}
      </FadeUp>
    </div>
  </div>
</section>
