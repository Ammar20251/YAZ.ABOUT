<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '$animations/gsap';
  import { countUp } from '$animations/counters';
  import { fmtNumber } from '$utils/format';

  interface Props {
    /** Target number to count up to. */
    to: number;
    /** Starting number. Default 0. */
    from?: number;
    /** Duration in seconds. Default 1.6. */
    duration?: number;
    /** Optional suffix (e.g. '+', '%'). */
    suffix?: string;
    /** ScrollTrigger start string. */
    start?: string;
    class?: string;
  }

  let {
    to,
    from = 0,
    duration = 1.6,
    suffix = '',
    start = 'top 85%',
    class: extra = ''
  }: Props = $props();

  let el: HTMLSpanElement | undefined = $state();
  // svelte-ignore state_referenced_locally
  let display = $state(fmtNumber(from));

  onMount(() => {
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      display = fmtNumber(to);
      return;
    }

    let disposed = false;
    let disposeTween: (() => void) | null = null;
    const ctx = gsap.context(() => {
      void countUp(el!, to, {
        from,
        duration,
        start,
        onUpdate: (v) => {
          display = fmtNumber(v);
        }
      }).then((dispose) => {
        if (disposed) dispose();
        else disposeTween = dispose;
      });
    }, el);

    return () => {
      disposed = true;
      disposeTween?.();
      ctx.revert();
    };
  });
</script>

<span bind:this={el} class={extra}>{display}{suffix}</span>
