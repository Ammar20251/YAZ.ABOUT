<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { motionContext } from '$animations/gsap';
  import { reveal } from '$animations/reveals';

  interface Props {
    /** Distance to translate from (px). Default 24. */
    distance?: number;
    /** Delay in seconds. */
    delay?: number;
    /** Stagger seconds for child elements with class .reveal-item. */
    stagger?: number;
    /** ScrollTrigger start string. */
    start?: string;
    /** When true, wraps each direct child with .reveal-item automatically. */
    autoStagger?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    distance = 24,
    delay = 0,
    stagger = 0.08,
    start = 'top 85%',
    autoStagger = false,
    class: extra = '',
    children
  }: Props = $props();

  let root: HTMLDivElement | undefined = $state();

  onMount(() => {
    if (!root) return;
    if (autoStagger) {
      Array.from(root.children).forEach((c) => c.classList.add('reveal-item'));
    }
    const targets = root.querySelectorAll('.reveal-item');
    const cleanup = motionContext(
      root,
      () => {
        const els = targets.length ? Array.from(targets) : [root];
        void reveal(els as Element[], { y: distance, delay, stagger, start });
      },
      () => {
        // Reduced motion: ensure final state.
        root!.style.opacity = '1';
        root!.style.transform = 'none';
      }
    );
    return cleanup;
  });
</script>

<div bind:this={root} class={extra}>
  {@render children()}
</div>
