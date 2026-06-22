<script lang="ts">
  import { env } from '$env/dynamic/public';

  interface Props {
    /** Nav bar (compact) or footer (slightly larger). */
    size?: 'nav' | 'footer';
    class?: string;
  }

  let { size = 'nav', class: extra = '' }: Props = $props();

  const siteName = env.PUBLIC_SITE_NAME ?? 'YAZ Development Contracting Company Ltd.';
  const heightClass = size === 'footer' ? 'h-14 md:h-16' : 'h-9 md:h-11';
</script>

<a
  href="/"
  class="inline-flex shrink-0 hover:opacity-90 transition-opacity duration-200 {extra}"
  aria-label={`${siteName} — home`}
>
  <img
    src="/images/yaz-logo.png"
    alt={siteName}
    class="w-auto max-w-[min(100%,14rem)] object-contain object-left {heightClass}"
    width="280"
    height="112"
    decoding="async"
    fetchpriority={size === 'nav' ? 'high' : 'auto'}
  />
</a>
