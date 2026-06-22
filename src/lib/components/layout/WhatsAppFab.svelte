<script lang="ts">
  import { siteContact } from '$lib/data/site-contact';

  interface Props {
    /** Phone number override (digits only). Falls back to site contact. */
    number?: string;
    /** Prefilled message */
    message?: string;
  }
  let { number, message = '' }: Props = $props();

  const phone = $derived(number ?? siteContact.whatsappNumber);
  const href = $derived(
    `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  );
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp YAZ Development"
  class="fixed bottom-5 inline-end-5 z-40
         w-14 h-14 rounded-pill bg-[#25D366] text-white
         flex items-center justify-center shadow-lg
         hover:scale-110 transition-transform duration-200 ease-out
         focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2
         motion-reduce:hover:scale-100"
>
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.46 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.13s-.64.8-.78.96c-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.89 2.38 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"
    />
  </svg>
</a>

<style>
  .inline-end-5 {
    inset-inline-end: 1.25rem;
  }
</style>
