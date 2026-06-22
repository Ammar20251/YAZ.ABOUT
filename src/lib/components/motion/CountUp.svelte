<script lang="ts">
  import { onMount } from 'svelte';
  import { motionContext, gsap, loadScrollTrigger } from '$animations/gsap';
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
    class?: string;
  }

  let { to, from = 0, duration = 1.6, suffix = '', class: extra = '' }: Props = $props();
  let el: HTMLSpanElement | undefined = $state();
  // Display tracks the live count; initial value is the `from` snapshot at mount.
  // svelte-ignore state_referenced_locally
  let display = $state(fmtNumber(from));

  onMount(() => {
    if (!el) return;
    const counter = { v: from };
    const cleanup = motionContext(
      el,
      () => {
        void loadScrollTrigger().then(() => {
          gsap.to(counter, {
            v: to,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              display = fmtNumber(Math.round(counter.v));
            },
            scrollTrigger: { trigger: el!, start: 'top 85%', once: true }
          });
        });
      },
      () => {
        display = fmtNumber(to);
      }
    );
    return cleanup;
  });
</script>

<span bind:this={el} class={extra}>{display}{suffix}</span>
