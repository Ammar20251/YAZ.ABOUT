<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'flat' | 'elevated' | 'outlined';
  type Padding = 'sm' | 'md' | 'lg';

  interface Props {
    variant?: Variant;
    padding?: Padding;
    hoverLift?: boolean;
    radius?: 'md' | 'lg' | 'xl';
    href?: string;
    /** Mono code label rendered in the top-end corner — e.g. "SVC-01" */
    code?: string;
    class?: string;
    children: Snippet;
    header?: Snippet;
    footer?: Snippet;
  }

  let {
    variant = 'outlined',
    padding = 'md',
    hoverLift = false,
    radius = 'lg',
    href,
    code,
    class: extra = '',
    children,
    header,
    footer
  }: Props = $props();

  const variantClass: Record<Variant, string> = {
    flat: 'bg-surface',
    elevated: 'bg-white shadow-sm',
    outlined: 'bg-white border border-line'
  };
  const padClass: Record<Padding, string> = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  const radiusClass: Record<'md' | 'lg' | 'xl', string> = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  };

  const cls = $derived(
    [
      'relative flex flex-col h-full',
      variantClass[variant],
      padClass[padding],
      radiusClass[radius],
      hoverLift ? 'hover-lift cursor-pointer' : '',
      extra
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

{#snippet body()}
  {#if code}
    <span
      class="absolute top-4 inline-end-4 text-label-mono text-ink-3"
      aria-hidden="true">{code}</span>
  {/if}
  {#if header}<div class="mb-4">{@render header()}</div>{/if}
  <div class="flex-grow">{@render children()}</div>
  {#if footer}<div class="mt-4 pt-4 border-t border-line">{@render footer()}</div>{/if}
{/snippet}

{#if href}
  <a {href} class={cls}>
    {@render body()}
  </a>
{:else}
  <div class={cls}>
    {@render body()}
  </div>
{/if}

<style>
  /* Logical-property helper since Tailwind 4 doesn't ship inline-end-* by default. */
  .inline-end-4 {
    inset-inline-end: 1rem;
  }
</style>
