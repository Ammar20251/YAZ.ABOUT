<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';

  interface Row {
    model: string;
    channels: string;
    accuracy: string;
    battery: string;
    feature: string;
  }

  const rows: Row[] = [
    {
      model: 'iRTK5',
      channels: '1408 Channels',
      accuracy: '8mm + 0.5ppm / 15mm + 0.5ppm',
      battery: '12h',
      feature: 'IMU Tilt Survey'
    },
    {
      model: 'V500',
      channels: '1408 Channels',
      accuracy: '8mm + 0.5ppm / 15mm + 0.5ppm',
      battery: '15h',
      feature: 'Visual Positioning'
    },
    {
      model: 'V200',
      channels: '1408 Channels',
      accuracy: '8mm + 0.5ppm / 15mm + 0.5ppm',
      battery: '12h',
      feature: 'Ultra-Compact Design'
    }
  ];
</script>

<svelte:head>
  <title>Device Comparison — YAZ Development</title>
  <meta
    name="description"
    content="Detailed technical specifications across flagship Hi-Target GNSS RTK receivers: iRTK5, V500, and V200."
  />
</svelte:head>

<!-- HERO -->
<section class="relative pt-24 pb-12 md:pb-16 overflow-hidden bg-white">
  <div class="absolute inset-0 mesh-pattern opacity-50"></div>
  <div class="container mx-auto px-4 md:px-10 relative z-10 text-center">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal mb-4">Spec Sheet</p>
      <h1 class="font-display text-display text-ink max-w-4xl mx-auto mb-6">
        Technical Comparison —<br /><span class="text-brand-teal">GNSS Series</span>
      </h1>
      <p class="text-body-lg text-ink-2 max-w-2xl mx-auto">
        Detailed specifications across our flagship RTK receivers — pick the right rig for your
        survey crew.
      </p>
    </FadeUp>
  </div>
</section>

<!-- COMPARISON TABLE -->
<section class="py-12 md:py-16 px-4 md:px-10 bg-white">
  <div class="container mx-auto">
    <FadeUp>
      <div class="overflow-x-auto rounded-lg border border-line shadow-sm">
        <table class="w-full text-start border-collapse">
          <thead>
            <tr class="bg-surface">
              <th
                class="px-6 py-4 font-display text-small font-semibold text-ink-2 border-b border-line text-start"
              >Model</th>
              <th
                class="px-6 py-4 font-display text-small font-semibold text-ink-2 border-b border-line text-start"
              >Channels</th>
              <th
                class="px-6 py-4 font-display text-small font-semibold text-ink-2 border-b border-line text-start"
              >Accuracy (H / V)</th>
              <th
                class="px-6 py-4 font-display text-small font-semibold text-ink-2 border-b border-line text-start"
              >Battery Life</th>
              <th
                class="px-6 py-4 font-display text-small font-semibold text-ink-2 border-b border-line text-start"
              >Key Feature</th>
            </tr>
          </thead>
          <tbody class="text-label-mono">
            {#each rows as r (r.model)}
              <tr class="hover:bg-surface transition-colors">
                <td class="px-6 py-4 border-b border-line font-bold text-brand-teal">{r.model}</td>
                <td class="px-6 py-4 border-b border-line text-ink-2">{r.channels}</td>
                <td class="px-6 py-4 border-b border-line text-ink-2">{r.accuracy}</td>
                <td class="px-6 py-4 border-b border-line text-ink-2">{r.battery}</td>
                <td class="px-6 py-4 border-b border-line text-ink-2">{r.feature}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </FadeUp>

    <div class="mt-12 text-center flex flex-col sm:flex-row gap-3 justify-center">
      <Button href="/devices" variant="secondary" size="lg">← Back to Catalog</Button>
      <Button href="/contact" variant="primary" size="lg" magnetic>Request a Demo</Button>
    </div>
  </div>
</section>
