<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLTextareaAttributes, 'class' | 'value'> {
    value?: string;
    label: string;
    labelHidden?: boolean;
    name: string;
    id?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    rows?: number;
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
    rows = 4,
    value = $bindable(''),
    class: extra = '',
    ...rest
  }: Props = $props();

  const inputId = $derived(id ?? `ta-${name}`);
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
  <textarea
    id={inputId}
    {name}
    {rows}
    bind:value
    {required}
    aria-required={required || undefined}
    aria-invalid={!!error || undefined}
    aria-describedby={describedBy}
    class={[
      'w-full px-4 py-3 rounded-md bg-white text-body text-ink',
      'border-[1.5px]',
      error ? 'border-danger' : 'border-line',
      'placeholder:text-ink-3 resize-y min-h-[6rem]',
      'transition-shadow duration-200 ease-out',
      'focus:outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_var(--color-sky-tint)]',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    ].join(' ')}
    {...rest}
  ></textarea>
  {#if hint && !error}
    <p id={hintId} class="text-small text-ink-3">{hint}</p>
  {/if}
  {#if error}
    <p id={errId} class="text-small text-danger" aria-live="polite">{error}</p>
  {/if}
</div>
