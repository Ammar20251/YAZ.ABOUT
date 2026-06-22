<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, motionContext, loadScrollTrigger } from '$animations/gsap';

  interface Props {
    src: string;
    alt: string;
    /** Total Y-translate range (px). Default 60. */
    range?: number;
    /** Aspect ratio class, e.g. 'aspect-[16/9]'. */
    aspect?: string;
    /** Object-fit position. Default 'center'. */
    position?: string;
    class?: string;
  }

  let {
    src,
    alt,
    range = 60,
    aspect = 'aspect-[16/9]',
    position = 'center',
    class: extra = ''
  }: Props = $props();

  let wrap: HTMLDivElement | undefined = $state();
  let img: HTMLImageElement | undefined = $state();

  onMount(() => {
    if (!wrap || !img) return;
    const cleanup = motionContext(
      wrap,
      () => {
        void loadScrollTrigger().then(() => {
          gsap.fromTo(
            img!,
            { yPercent: -range / 4 },
            {
              yPercent: range / 4,
              ease: 'none',
              scrollTrigger: {
                trigger: wrap!,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        });
      }
      // reduced motion: no-op, image renders centered as default
    );
    return cleanup;
  });
</script>

<div bind:this={wrap} class={`relative overflow-hidden ${aspect} ${extra}`}>
  <img
    bind:this={img}
    {src}
    {alt}
    loading="lazy"
    decoding="async"
    class="absolute inset-0 w-full h-[120%] object-cover"
    style:object-position={position}
  />
</div>
