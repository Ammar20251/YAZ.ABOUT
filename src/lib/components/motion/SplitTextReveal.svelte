<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { gsap, loadSplitText, loadScrollTrigger, motionContext } from '$animations/gsap';

  interface Props {
    /** Split mode. Default 'chars,words'. */
    splitMode?: 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines';
    /** Stagger in seconds. */
    stagger?: number;
    /** Delay before first character. */
    delay?: number;
    /** Tag name. Default 'h2'. */
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    class?: string;
    children: Snippet;
  }

  let {
    splitMode = 'chars,words',
    stagger = 0.03,
    delay = 0,
    as = 'h2',
    class: extra = '',
    children
  }: Props = $props();

  let el: HTMLElement | undefined = $state();

  onMount(() => {
    if (!el) return;
    const cleanup = motionContext(
      el,
      () => {
        void Promise.all([loadSplitText(), loadScrollTrigger()]).then(([SplitText]) => {
          const split = new SplitText(el!, { type: splitMode });
          const targets =
            splitMode.includes('chars') ? split.chars :
            splitMode.includes('words') ? split.words :
            split.lines;
          gsap.from(targets, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: { trigger: el!, start: 'top 85%', once: true }
          });
        });
      }
    );
    return cleanup;
  });
</script>

<svelte:element this={as} bind:this={el} class={extra}>
  {@render children()}
</svelte:element>
