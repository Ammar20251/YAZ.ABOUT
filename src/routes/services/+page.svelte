<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import Chip from '$components/ui/Chip.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';

  const capabilities = [
    { id: 'service-01', code: 'SVC-01', title: 'Land Surveying' },
    { id: 'service-02', code: 'SVC-02', title: 'Topographic Mapping' },
    { id: 'service-03', code: 'SVC-03', title: 'Geotechnical Engineering' },
    { id: 'service-04', code: 'SVC-04', title: 'Structural Analysis' },
    { id: 'service-05', code: 'SVC-05', title: 'Photogrammetry' },
    { id: 'service-06', code: 'SVC-06', title: '3D Laser Scanning', flagship: true },
    { id: 'service-07', code: 'SVC-07', title: 'BIM Integration' },
    { id: 'service-08', code: 'SVC-08', title: 'Asset Management' },
    { id: 'service-09', code: 'SVC-09', title: 'Construction Layout' },
    { id: 'service-10', code: 'SVC-10', title: 'Deformation Monitoring' }
  ];

  const standardServices = [
    {
      id: 'service-01',
      code: 'SVC-01',
      title: 'Land Surveying',
      body: 'Foundational boundary and topographic surveys to establish precise property lines, easements, and physical features essential for initial site planning and legal documentation.',
      imageAlt:
        'Land surveyor operating a robotic total station on a construction site at sunrise',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA5pQu_bksP-n8QntW9944P442D9XBnarSGJzXz3BaehmckRzvE6GF5PlzntgHtnBcxu3eFSzXCRqG07QugmneqGzT4tIVy665py4JQ65tXtuR7bE7QrInMMKilX2xtopfPDZ_JqZcObfVxijoDr_z3TLQdKNd2YhW9IXr4WksILecK57oWNgwq4PJ59h5V7wYDGx-VAFIcoXnKCvgWG8eobYChueAbQlw1m2O-NEMyd2qoYL3_ZlhBfr7Z9PFGo9qyS2E-fhTJ_ZE',
      bg: 'bg-white',
      reverse: false
    },
    {
      id: 'service-03',
      code: 'SVC-03',
      title: 'Geotechnical Engineering',
      body: 'Subsurface investigations to determine soil and rock mechanics. We provide critical data for foundation design, slope stability analysis, and earthwork calculations to mitigate construction risks.',
      imageAlt: 'Geotechnical soil core samples neatly arranged in wooden boxes',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBz16Kcm1tAmFR1_5WkEyswoNzkAALB2ghH3vrYmJaj63APwji4gDuDSMbb0gjdAFWdlDNav-xzZ-PnRVGZCeyeKVOptR0r-GsugfTiveM-vP2uFlA3-05I3NiE5cyB6wx8gW84G2Ma25s0V69Wgd53l3CCUO6cmOa8RDNkj589oTzwnYMKe2RDCHNcED6PLL98v8tHtJvsoLFzIv4ofCtuTrUtsy2Olc7RvLFWUOyPwenaqubJZ8W5tHdhsQ_oALY6sXycb8Q99G0',
      bg: 'bg-surface',
      reverse: true
    },
    {
      id: 'service-07',
      code: 'SVC-07',
      title: 'BIM Integration',
      body: 'Translating spatial data into intelligent 3D models. Our BIM services coordinate architectural, structural, and MEP disciplines, facilitating clash detection and lifecycle facility management.',
      imageAlt:
        'Computer screen showing a complex Building Information Model of a commercial skyscraper',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBN877Ds-srJrWBkDZQhJzHRn069mN0fM7FKu_L4dMK6jf0rGa8wvIYSq1_jGLLK7CAW62X6YOLj3XcVos5fDpHjqTH4o3WFSilnjOokn7nPbE5AeT3daYY8bEmaHQN0mAxy3NJV6ubU_m2SG6ypYDIIfMbwvNBcA_pD1iolbYfxifjd5MDXy9VjlW0qh_bxuIYSPAynheHwkN1O74fcKDXQYlOu6cgaGqSiIpm4a-C0U_JsmCSz22YcbzoGWrBtrtn0U-HFOVPvkM',
      bg: 'bg-sky-tint',
      reverse: false
    }
  ];

  const faqItems = [
    {
      q: 'What is the typical turnaround time for a 3D Laser Scan?',
      a: 'Field capture for a standard 50,000 sq ft facility takes 1–2 days. Point cloud registration and basic mesh generation requires an additional 3–4 days. Full LOD 300 BIM modeling may take 2–4 weeks depending on architectural complexity.'
    },
    {
      q: 'What tolerances do your scanning instruments guarantee?',
      a: 'Our primary terrestrial laser scanners operate with a 3D point accuracy of 1.2mm at 10m and 3mm at 50m. Final registered point cloud tolerances typically fall within the 3mm to 5mm range for structural environments.'
    },
    {
      q: 'Do you provide raw data or only finished models?',
      a: 'Both. We provide unified, cleaned raw point cloud data (.rcp, .e57) for clients with in-house modeling teams, as well as fully realized CAD/BIM deliverables (.rvt, .dwg) upon request.'
    }
  ];
</script>

<svelte:head>
  <title>Services — YAZ Development</title>
  <meta
    name="description"
    content="End-to-end geospatial solutions: land surveying, topographic mapping, 3D laser scanning, BIM integration, and more across the Kingdom."
  />
</svelte:head>

<div class="container mx-auto px-4 md:px-10">
  <!-- HERO -->
  <header class="py-16 md:py-24 mesh-pattern flex flex-col items-start gap-8 border-b border-line">
    <FadeUp>
      <Chip>
        <span aria-hidden="true" class="text-brand-teal">⟁</span>
        OUR EXPERTISE
      </Chip>
    </FadeUp>
    <FadeUp delay={0.1}>
      <h1 class="font-display text-display text-ink max-w-4xl leading-tight">
        End-to-End Geospatial Solutions
      </h1>
    </FadeUp>
    <FadeUp delay={0.2}>
      <p class="text-body-lg text-ink-2 max-w-2xl">
        Delivering high-fidelity spatial data and architectural insights. From initial land surveys
        to comprehensive digital twins, our methodical approach ensures precision at every scale.
      </p>
    </FadeUp>
  </header>

  <!-- TWO-COLUMN: sidebar nav + content -->
  <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 py-16 md:py-24 relative">
    <!-- Sticky sidebar nav -->
    <aside class="w-full lg:w-1/4 hidden lg:block">
      <div class="sticky top-[100px] flex flex-col gap-1 border-l border-line pl-4">
        <h3 class="text-eyebrow text-ink-3 mb-4">Capabilities</h3>
        {#each capabilities as c (c.id)}
          <a
            href={`#${c.id}`}
            class="text-body py-2 flex items-center group transition-colors
                   {c.flagship ? 'text-brand-teal font-medium' : 'text-ink-2 hover:text-brand-teal'}"
          >
            <span
              aria-hidden="true"
              class="h-px mr-3 transition-all duration-200
                     {c.flagship
                ? 'w-8 bg-brand-teal'
                : 'w-4 bg-line group-hover:w-8 group-hover:bg-brand-teal'}"
            ></span>
            {c.title}
          </a>
        {/each}
      </div>
    </aside>

    <!-- Service blocks -->
    <main class="w-full lg:w-3/4 flex flex-col gap-16 md:gap-24">
      <!-- Flagship: 3D Laser Scanning -->
      <section id="service-06" class="scroll-mt-[100px]">
        <FadeUp>
          <div class="hover-lift bg-mint-tint rounded-xl p-8 md:p-12 border border-line">
            <div class="flex items-start justify-between gap-4 mb-8">
              <div class="flex items-center gap-4">
                <span
                  class="text-label-mono text-brand-teal bg-sky-tint px-3 py-1 rounded-md"
                >SVC-06</span>
                <h2 class="font-display text-h1 text-ink">3D Laser Scanning</h2>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p class="text-body-lg text-ink-2 mb-6">
                  High-density point cloud acquisition for as-built documentation, reverse
                  engineering, and clash detection. We deploy state-of-the-art terrestrial scanners
                  to capture environments with millimeter precision.
                </p>
                <ul class="space-y-4">
                  {#each [
                    'Sub-millimeter accuracy up to 130m range.',
                    'Rapid capture minimizes site disruption.',
                    'Direct export to Revit, AutoCAD, and Navisworks.'
                  ] as item, i (i)}
                    <li class="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        class="text-lime-deep mt-1 shrink-0"
                      >●</span>
                      <span class="text-body text-ink">{item}</span>
                    </li>
                  {/each}
                </ul>
              </div>
              <div
                class="relative h-64 md:h-auto rounded-lg overflow-hidden bg-surface-2 border border-line"
              >
                <img
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  alt="High-density 3D laser scan point cloud visualization of an industrial facility"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEKLCGfoQHzwDGg8U0W7vJSd2eMCJwdwhJAlQpNsCzpOWl1Z7EtPzLfEeYIKhY8hooKkoTOLL6_MwhHTPBKKhdwgU-SXuy6rpB4XcWtx0TOG5iRLCm5N5g3B29yUWFyDqz_vmcIpyWOHjuev_tDlJeYoChJZfa_79S0pO85GX3dx3j_5ljfJ1JUS5l-7qvkuzb5U_rDCDVcfE6D83QX2ERMt9R7uaE2yp1QrFB6cVYCUxJGx9E4us3v8Kndi489p6IzJlDgzQWriE"
                />
              </div>
            </div>

            <!-- Deliverables grid -->
            <div class="border-t border-line pt-8">
              <h4 class="text-eyebrow text-ink-3 mb-6">Deliverables &amp; Outputs</h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                {#each [
                  'Raw Point Clouds (.rcp, .e57)',
                  'Mesh Models (.obj, .stl)',
                  '2D Floor Plans & Elevations',
                  'LOD 300–500 Revit Models'
                ] as deliverable, i (i)}
                  <div
                    class="bg-white p-4 rounded-md border border-line flex flex-col items-center text-center gap-3"
                  >
                    <span
                      aria-hidden="true"
                      class="text-brand-teal text-h3 font-display"
                    >○</span>
                    <span class="text-label-mono text-ink">{deliverable}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      <!-- Standard service blocks -->
      {#each standardServices as svc (svc.id)}
        <section id={svc.id} class="scroll-mt-[100px]">
          <FadeUp>
            <div
              class="{svc.bg} rounded-xl p-6 md:p-8 border border-line flex flex-col gap-8
                     {svc.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}"
            >
              <div
                class="w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden relative bg-surface-2"
              >
                <img
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  alt={svc.imageAlt}
                  src={svc.imageSrc}
                />
              </div>
              <div class="w-full md:w-2/3 flex flex-col justify-center">
                <span class="text-label-mono text-ink-3 mb-2">{svc.code}</span>
                <h3 class="font-display text-h2 text-ink mb-4">{svc.title}</h3>
                <p class="text-body text-ink-2 mb-6">{svc.body}</p>
                <a
                  href="/contact"
                  class="text-label-mono text-brand-teal hover:text-deep-teal transition-colors w-fit
                         flex items-center group gap-1"
                >
                  View Methodology
                  <span
                    aria-hidden="true"
                    class="group-hover:translate-x-1 transition-transform"
                  >→</span>
                </a>
              </div>
            </div>
          </FadeUp>
        </section>
      {/each}
    </main>
  </div>
</div>

<!-- FAQ -->
<section class="bg-surface border-t border-line py-16 md:py-24 px-4 md:px-10">
  <div class="max-w-3xl mx-auto">
    <FadeUp>
      <h2 class="font-display text-h1 text-ink mb-12 text-center">Technical FAQ</h2>
    </FadeUp>
    <FadeUp autoStagger class="space-y-4">
      {#each faqItems as item, i (i)}
        <details class="group bg-white rounded-lg border border-line overflow-hidden">
          <summary
            class="flex cursor-pointer items-center justify-between gap-4 p-6 text-ink font-display text-h3
                   hover:bg-sky-tint transition-colors list-none [&::-webkit-details-marker]:hidden"
          >
            {item.q}
            <span
              aria-hidden="true"
              class="text-brand-teal transition-transform duration-300 group-open:rotate-180 shrink-0"
            >▾</span>
          </summary>
          <div class="px-6 pb-6 pt-2 text-body text-ink-2">{item.a}</div>
        </details>
      {/each}
    </FadeUp>
  </div>
</section>
