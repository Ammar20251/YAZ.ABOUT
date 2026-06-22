<script lang="ts">
  import { siteContact } from '$lib/data/site-contact';

  interface Props {
    /** Nav bar (compact) or footer (slightly larger). */
    size?: 'nav' | 'footer';
    class?: string;
  }

  let { size = 'nav', class: extra = '' }: Props = $props();

  const siteName = siteContact.legalName;
  const heightClass = size === 'footer' ? 'h-16 md:h-20' : 'h-11 md:h-14';
  const maxWidthClass = size === 'footer' ? 'max-w-[min(100%,20rem)]' : 'max-w-[min(100%,17rem)]';
</script>

<a
  href="/"
  class="inline-flex shrink-0 hover:opacity-90 transition-opacity duration-200 {extra}"
  aria-label={`${siteName} — home`}
>
  <img
    src="/images/yaz-logo.png"
    alt={siteName}
    class="w-auto {maxWidthClass} object-contain object-left {heightClass}"
    width="889"
    height="857"
    decoding="async"
    fetchpriority={size === 'nav' ? 'high' : 'auto'}
  />
</a>
