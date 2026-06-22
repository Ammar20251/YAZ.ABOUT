<script lang="ts">
  import { onMount } from 'svelte';
  import { startSmoothScroll } from '$animations/smooth-scroll';
  import type { SmoothScrollHandle } from '$animations/smooth-scroll';

  onMount(() => {
    let handle: SmoothScrollHandle | null = null;
    void startSmoothScroll().then((h) => {
      handle = h;
    });
    return () => {
      handle?.destroy();
    };
  });
</script>
