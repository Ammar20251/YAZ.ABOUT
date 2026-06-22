<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import Chip from '$components/ui/Chip.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';

  type Category = 'All' | 'GNSS RTK' | 'Total Stations' | 'Controllers' | 'Accessories';
  const categories: Category[] = ['All', 'GNSS RTK', 'Total Stations', 'Controllers', 'Accessories'];
  let activeCat = $state<Category>('All');

  interface Device {
    model: string;
    tagline: string;
    badge?: 'NEW' | 'POPULAR';
    badgeTone?: 'brand' | 'lime';
    category: Exclude<Category, 'All'>;
    features: string[];
    imageSrc: string;
    imageAlt: string;
  }

  const devices: Device[] = [
    {
      model: 'iRTK5',
      tagline: 'Premium IMU-RTK GNSS Receiver',
      badge: 'NEW',
      badgeTone: 'brand',
      category: 'GNSS RTK',
      features: ['IMU Tilt Survey', '1408 Channels', 'OLED Display'],
      imageAlt: 'Hi-Target iRTK5 GNSS receiver with bright orange top dome and matte black body',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAgBArX1VRNy8uuksSVcV9P66IiR8Ue3_sA2y86VhEr1TSp5qBLJwdw0a3dFEQeMmKm5WccjNQ6FcOo3UIrpL4XEnffGIjiwFI6cIGPuu_GYfCa13Mtwjb1tU4RABSzAota9DS171GwbhnQDO2E3K9HR5H2APDO9aefwsx9u1hbldwY8EBN8kHd_BbAPEk_GZ22lQ3R8gMGkczikcq5bsxgBYjX5aekEWEH5utinvUHelCudSa8qrTqVIQNFz6W77cVlX4APoFxkY8'
    },
    {
      model: 'V500',
      tagline: 'Compact Network RTK Receiver',
      category: 'GNSS RTK',
      features: ['Lightweight Design', 'Long Battery Life', 'Web UI'],
      imageAlt: 'Hi-Target V500 GNSS receiver with sleek grey and black casing',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBhEUDs_iUvi7jnwJEf-kZUo-HRY5bLVTxvwc5NrD1_9_XwSUHTTpBgUtIL71HNjuQn_MHjOSzRUj6_EbmGEiRPRRL6qFEoUgx4TtlAhIVvbKfh8s-iqklFYhE7Fgqe2qe4PsvWvBSmDX9zlw4K4Xs5-XuUnUNOymAbccm947lOaN1xwGrVHkKHQl12c4xUnu6aaP3ZUSO02Z9m4dBqek6-JPTZuimtwwG7WZ9BXOfCG1fTmN-qVmvjqnjr1Ur-e9p5WyqfIjJrPRM'
    },
    {
      model: 'HTS-720',
      tagline: 'Android Intelligent Total Station',
      badge: 'POPULAR',
      badgeTone: 'lime',
      category: 'Total Stations',
      features: ['5.5" Touch Screen', '2" Accuracy', '1000m Reflectorless'],
      imageAlt: 'Hi-Target HTS-720 Total Station with prominent telescope and touchscreen',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCTK2tNZcGntVQMGbQHTAp47BLFwO0RfZalbA9YNEjzAQThwWL1W_t-ZdprjxnGnE7osTj3JNxVBJNZvNs6BoyDBlz1POG0p0cpr3bKce_vJn2SO7PqApIu_8wLHblCZbwcDx6oPepQ1D_T4qIcx8htsVjbyEE9C0ZBzsmmr-J_OmAnte1akXFcafOdqbrOqGAWnk_RcIwi6xyYnDdcKRV-LGU6JCinLMcQJFU10t4zaffrog8XPwJmpuqASKSJpqCyGKOpZ-VpyjY'
    },
    {
      model: 'iHand55',
      tagline: 'Professional Field Controller',
      category: 'Controllers',
      features: ['Android 10', 'IP68 Rugged', 'Physical Keypad'],
      imageAlt: 'Hi-Target iHand55 field controller resembling a rugged tablet',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAZH-9IwPERAUxxri5p1nlzDQSj9zkWS8hV_RAP8VtsiH4TaEOackI65c_j65tbNSbiFr1WP_9AObkAE7Hig9RrLTlEKMk6htA3JQnLMNx-5kHG1b8L_GFsgfJNGhZOHPJATZXZXR4C3vRE15oFgut32_pMwMigaxD-0rS7RlF9hzBptYhD1ajIjulUa-pVRj1An1IvMHQRjEP1tOWCgwLJIMxLm7b9zZ7kwcjH0OvzvyRtJIP3zbSNpRZiPBgrJqCI8AIqBCxqjdo'
    }
  ];

  const visible = $derived(
    activeCat === 'All' ? devices : devices.filter((d) => d.category === activeCat)
  );
</script>

<svelte:head>
  <title>Devices — YAZ Development</title>
  <meta
    name="description"
    content="Authorized distributor of Hi-Target & Total surveying instruments — GNSS RTK, Total Stations, and field controllers backed by local support, calibration, and training."
  />
</svelte:head>

<!-- HERO -->
<section class="relative pt-24 pb-16 md:pb-24 overflow-hidden bg-white">
  <div class="absolute inset-0 mesh-pattern opacity-50"></div>
  <div
    aria-hidden="true"
    class="absolute top-1/4 -left-12 w-64 h-64 bg-sky-tint rounded-pill blur-3xl"
  ></div>
  <div
    aria-hidden="true"
    class="absolute bottom-1/4 -right-12 w-80 h-80 bg-mint-tint rounded-pill blur-3xl"
  ></div>

  <div class="container mx-auto px-4 md:px-10 relative z-10 text-center">
    <FadeUp>
      <div
        class="inline-flex items-center gap-2 bg-surface text-brand-teal px-4 py-2 rounded-pill text-label-mono mb-6 border border-line"
      >
        <span class="w-2 h-2 rounded-pill bg-lime-bright animate-pulse"></span>
        Authorized Partner
      </div>
      <h1 class="font-display text-display text-ink max-w-4xl mx-auto mb-6">
        Authorized Distributor —
        <br class="hidden md:block" /><span class="text-brand-teal">Hi-Target &amp; Total</span>
      </h1>
      <p class="text-body-lg text-ink-2 max-w-2xl mx-auto mb-10">
        Industry-leading GNSS, Total Stations, and field controllers — backed by local support,
        calibration, and training.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <Button href="/contact" variant="primary" size="lg" magnetic>Request a Demo →</Button>
        <Button href="/contact" variant="secondary" size="lg">Download Catalog ↓</Button>
      </div>
    </FadeUp>
  </div>
</section>

<!-- Category tabs (sticky) -->
<div
  class="sticky top-[var(--nav-h-desktop)] z-40 bg-white/90 backdrop-blur-md border-y border-line py-4"
>
  <div class="container mx-auto px-4 md:px-10 overflow-x-auto">
    <div class="flex items-center gap-3 min-w-max">
      {#each categories as c (c)}
        <Chip interactive selected={activeCat === c} onclick={() => (activeCat = c)}>{c}</Chip>
      {/each}
    </div>
  </div>
</div>

<!-- Device grid -->
<section class="py-16 md:py-24 bg-white">
  <div class="container mx-auto px-4 md:px-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FadeUp autoStagger class="contents">
        {#each visible as d (d.model)}
          <div
            class="hover-lift bg-white rounded-xl p-6 border border-line flex flex-col h-full group"
          >
            <div
              class="bg-sky-tint rounded-lg h-64 mb-6 flex items-center justify-center relative overflow-hidden"
            >
              <img
                class="h-48 object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                alt={d.imageAlt}
                src={d.imageSrc}
              />
            </div>
            <div class="flex-grow">
              <div class="flex justify-between items-start mb-2 gap-2">
                <h3 class="font-display text-h2 text-ink">{d.model}</h3>
                {#if d.badge}
                  <span
                    class="text-label-mono font-bold px-2 py-1 rounded-md shrink-0
                           {d.badgeTone === 'lime'
                      ? 'bg-lime-bright text-lime-deep'
                      : 'bg-sky-tint text-brand-teal'}"
                  >{d.badge}</span>
                {/if}
              </div>
              <p class="text-body text-ink-2 mb-4">{d.tagline}</p>
              <div class="flex flex-wrap gap-2 mb-6">
                {#each d.features as f, i (i)}
                  <span
                    class="bg-sky-tint text-deep-teal px-3 py-1 rounded-pill text-label-mono border border-brand-teal/20"
                  >{f}</span>
                {/each}
              </div>
            </div>
            <div class="mt-auto pt-4 border-t border-line flex items-center justify-between">
              <a
                href="/contact"
                class="text-label-mono text-brand-teal hover:text-deep-teal transition-colors flex items-center gap-1"
              >
                View Specs <span aria-hidden="true">↗</span>
              </a>
              <Button href="/contact" variant="primary" size="sm">Request Quote</Button>
            </div>
          </div>
        {/each}
      </FadeUp>
    </div>

    <div class="mt-16 text-center">
      <p class="text-body text-ink-2 mb-6">Compare flagship GNSS receivers side-by-side.</p>
      <Button href="/devices/compare" variant="secondary" size="lg">View Comparison Table</Button>
    </div>
  </div>
</section>
