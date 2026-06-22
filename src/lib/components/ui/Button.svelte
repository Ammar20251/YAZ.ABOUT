<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { magnetic as magneticAction, type MagneticOptions } from '$animations/magnetic';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'accent';
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    variant?: Variant;
    size?: Size;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    /**
     * Magnetic-hover effect. `true` enables defaults (12px strength, ≥1024px viewport).
     * Pass options to tune. Default `false` — opt-in per DESIGN.md §3.
     */
    magnetic?: boolean | MagneticOptions;
    iconBefore?: Snippet;
    iconAfter?: Snippet;
    children: Snippet;
    rest?: HTMLAnchorAttributes | HTMLButtonAttributes;
  }

  let {
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    disabled = false,
    loading = false,
    fullWidth = false,
    magnetic = false,
    iconBefore,
    iconAfter,
    children,
    ...rest
  }: Props = $props();

  const variantClass: Record<Variant, string> = {
    primary:
      'bg-brand-teal text-white hover:bg-deep-teal focus-visible:bg-deep-teal active:bg-abyss-teal',
    secondary:
      'bg-transparent text-brand-teal border-[1.5px] border-brand-teal hover:bg-sky-tint active:bg-mint-tint',
    ghost: 'bg-transparent text-brand-teal hover:bg-sky-tint',
    accent: 'bg-lime text-abyss-teal hover:bg-lime-deep hover:text-white'
  };

  const sizeClass: Record<Size, string> = {
    sm: 'h-9 px-4 text-sm gap-1.5',
    md: 'h-11 px-6 text-label-mono gap-2',
    lg: 'h-14 px-8 text-base gap-2'
  };

  const isAnchor = $derived(typeof href === 'string' && !disabled);
  const sharedClass = $derived(
    [
      'inline-flex items-center justify-center font-mono font-medium rounded-md',
      'transition-colors duration-200 ease-out',
      'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      fullWidth ? 'w-full' : '',
      variantClass[variant],
      sizeClass[size]
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

{#if isAnchor}
  <a
    {href}
    class={sharedClass}
    aria-disabled={disabled || undefined}
    data-loading={loading || undefined}
    use:magneticAction={magnetic}
    {...rest as HTMLAnchorAttributes}
  >
    {#if iconBefore}{@render iconBefore()}{/if}
    {@render children()}
    {#if iconAfter}{@render iconAfter()}{/if}
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={sharedClass}
    data-loading={loading || undefined}
    aria-busy={loading || undefined}
    use:magneticAction={magnetic}
    {...rest as HTMLButtonAttributes}
  >
    {#if iconBefore}{@render iconBefore()}{/if}
    {@render children()}
    {#if iconAfter}{@render iconAfter()}{/if}
  </button>
{/if}
