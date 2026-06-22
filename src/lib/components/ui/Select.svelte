<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';

  interface Option {
    value: string;
    label: string;
    disabled?: boolean;
  }

  interface Props extends Omit<HTMLSelectAttributes, 'class' | 'value'> {
    value?: string;
    label: string;
    labelHidden?: boolean;
    name: string;
    id?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    options: Option[];
    placeholder?: string;
    class?: string;
  }

  let {
    label,
    labelHidden = false,
    name,
    id,
    hint,
    error,
    required = false,
    options,
    placeholder,
    value = $bindable(''),
    class: extra = '',
    ...rest
  }: Props = $props();

  const inputId = $derived(id ?? `sel-${name}`);
  const hintId = $derived(hint ? `${inputId}-hint` : undefined);
  const errId = $derived(error ? `${inputId}-err` : undefined);
  const describedBy = $derived([hintId, errId].filter(Boolean).join(' ') || undefined);
</script>

<div class={`flex flex-col gap-1.5 ${extra}`}>
  <label
    for={inputId}
    class={labelHidden ? 'sr-only' : 'text-small font-medium text-ink-2'}
  >
    {label}
    {#if required}<span aria-hidden="true" class="text-danger">*</span>{/if}
  </label>
  <select
    id={inputId}
    {name}
    bind:value
    {required}
    aria-required={required || undefined}
    aria-invalid={!!error || undefined}
    aria-describedby={describedBy}
    class={[
      'h-11 px-4 pe-10 rounded-md bg-white text-body text-ink appearance-none',
      'border-[1.5px]',
      error ? 'border-danger' : 'border-line',
      'transition-shadow duration-200 ease-out',
      'focus:outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_var(--color-sky-tint)]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'bg-[url(\'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230F172A%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>\')]',
      'bg-no-repeat bg-[length:16px] bg-[position:right_1rem_center]',
      "rtl:bg-[position:left_1rem_center]"
    ].join(' ')}
    {...rest}
  >
    {#if placeholder}
      <option value="" disabled selected={!value}>{placeholder}</option>
    {/if}
    {#each options as opt (opt.value)}
      <option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
    {/each}
  </select>
  {#if hint && !error}
    <p id={hintId} class="text-small text-ink-3">{hint}</p>
  {/if}
  {#if error}
    <p id={errId} class="text-small text-danger" aria-live="polite">{error}</p>
  {/if}
</div>
