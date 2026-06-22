<script lang="ts">
  import '../lib/styles/app.css';
  import type { Snippet } from 'svelte';
  import Nav from '$components/layout/Nav.svelte';
  import Footer from '$components/layout/Footer.svelte';
  import WhatsAppFab from '$components/layout/WhatsAppFab.svelte';
  import SmoothScroll from '$components/motion/SmoothScroll.svelte';

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<svelte:head>
  <title>YAZ Development — Precision That Builds Nations</title>
  <meta
    name="description"
    content="YAZ Development Contracting Co. Ltd. — Saudi surveying & construction, exclusive Hi-Target distributor. Working on NEOM, Riyadh Metro, KAFD, Diriyah Gate."
  />
</svelte:head>

<SmoothScroll />

<Nav />

<main id="main">
  {@render children()}
</main>

<Footer />
<WhatsAppFab />
