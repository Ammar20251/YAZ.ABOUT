<script lang="ts">
  import type { Snippet } from 'svelte';

  type Tone = 'default' | 'selected' | 'success' | 'warning' | 'danger';

  interface Props {
    tone?: Tone;
    /** When true the chip is rendered as a <button> for filter toggles. */
    interactive?: boolean;
    selected?: boolean;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let { tone = 'default', interactive = false, selected = false, onclick, children }: Props = $props();

  const effective: Tone = $derived(selected ? 'selected' : tone);

  const toneClass: Record<Tone, string> = {
    default: 'bg-sky-tint text-brand-teal border-brand-teal/20',
    selected: 'bg-brand-teal text-white border-brand-teal',
    success: 'bg-lime-bright text-lime-deep border-lime/30',
    warning: 'bg-sand text-warning border-warning/30',
    danger: 'bg-danger/10 text-danger border-danger/30'
  };

  const base =
    'inline-flex items-center gap-1.5 px-3 py-1 rounded-pill border text-label-mono font-mono uppercase tracking-wider transition-colors duration-200';
</script>

{#if interactive}
  <button
    type="button"
    {onclick}
    aria-pressed={selected}
    class="{base} {toneClass[effective]} focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
  >
    {@render children()}
  </button>
{:else}
  <span class="{base} {toneClass[effective]}">
    {@render children()}
  </span>
{/if}
