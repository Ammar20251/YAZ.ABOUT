<script lang="ts">
  import FadeUp from '$components/motion/FadeUp.svelte';

  /**
   * AboutYaz section — used on the home page and (eventually) the /about hero.
   * The image source defaults to a temporary Unsplash placeholder.
   * Drop the real YAZ surveyor photo at `static/images/about-surveyor.jpg`
   * and the default will resolve to it automatically.
   */
  interface Props {
    /** Local image path (preferred) or absolute URL. */
    imageSrc?: string;
    imageAlt?: string;
  }

  let {
    imageSrc = '/images/about-surveyor.webp',
    imageAlt = 'A YAZ Development surveyor on-site with a Hi-Target total station'
  }: Props = $props();

  /** Fallback so the section still renders something until the real photo lands. */
  const PLACEHOLDER =
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1400&q=80&auto=format&fit=crop';

  let useFallback = $state(false);
  const handleError = () => {
    useFallback = true;
  };

  const effectiveSrc = $derived(useFallback ? PLACEHOLDER : imageSrc);
</script>

<section
  id="about"
  class="relative bg-white py-16 md:py-24 px-4 md:px-10 overflow-hidden"
>
  <!-- Subtle ambient wash + decorative contour line between cols -->
  <div
    aria-hidden="true"
    class="absolute inset-y-0 start-1/2 hidden lg:block w-px bg-line/40"
  ></div>
  <div
    aria-hidden="true"
    class="absolute inset-0 contour-lines opacity-60 pointer-events-none"
  ></div>

  <div class="container mx-auto relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
    <FadeUp class="lg:col-span-6">
      <p class="text-eyebrow text-brand-teal mb-3">Est. 2015 · Riyadh, KSA</p>
      <h2 class="font-display text-h2 leading-tight text-ink">
        About <span class="text-brand-teal">YAZ Development</span>
      </h2>

      <p class="mt-6 text-body-lg text-ink-2 leading-relaxed">
        Since our founding in 2015, YAZ Development has rapidly grown into one of Saudi Arabia's
        leading surveying contractors and the
        <span class="font-semibold text-ink">exclusive agent for</span>
        <a
          href="/devices"
          class="text-brand-teal font-semibold underline-offset-4 hover:underline hover:text-deep-teal transition-colors"
        >Hi-Target</a>.
        Over the past decade we have built a solid reputation for delivering high-quality services
        across diverse sectors — infrastructure, construction, and urban development.
      </p>

      <p class="mt-5 text-body-lg text-ink-2 leading-relaxed">
        Our services range from topographic and aerial surveying to advanced utility detection,
        laser scanning, GPR, and quantity surveying — ensuring our clients receive the best possible
        support for every project.
      </p>

      <div class="mt-8 flex flex-wrap gap-6 text-label-mono text-deep-teal">
        <span class="flex items-center gap-2">
          <span aria-hidden="true" class="w-2 h-2 rounded-pill bg-brand-teal"></span>
          Topographic &amp; Aerial
        </span>
        <span class="flex items-center gap-2">
          <span aria-hidden="true" class="w-2 h-2 rounded-pill bg-brand-teal"></span>
          Utility Detection &amp; GPR
        </span>
        <span class="flex items-center gap-2">
          <span aria-hidden="true" class="w-2 h-2 rounded-pill bg-brand-teal"></span>
          Laser Scanning
        </span>
        <span class="flex items-center gap-2">
          <span aria-hidden="true" class="w-2 h-2 rounded-pill bg-brand-teal"></span>
          Quantity Surveying
        </span>
      </div>
    </FadeUp>

    <FadeUp class="lg:col-span-6">
      <div class="relative rounded-xl overflow-hidden shadow-md aspect-[16/10] bg-surface-2">
        <img
          src={effectiveSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          class="absolute inset-0 w-full h-full object-cover object-center"
          onerror={handleError}
        />
      </div>
    </FadeUp>
  </div>
</section>
