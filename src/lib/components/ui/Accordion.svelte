<script lang="ts">
  import type { Snippet } from 'svelte';

  interface AccordionItem {
    id: string;
    title: string;
    body: Snippet;
  }

  interface Props {
    items: AccordionItem[];
    /** Allow more than one panel open at a time. */
    multi?: boolean;
    /** Initially-open item id (single) or ids (multi). */
    openIds?: string[];
  }

  let { items, multi = false, openIds = [] }: Props = $props();
  // Accordion is uncontrolled after mount — `openIds` seeds the initial open set,
  // user interactions drive it thereafter.
  // svelte-ignore state_referenced_locally
  let openSet = $state(new Set<string>(openIds));

  const isOpen = (id: string) => openSet.has(id);

  const toggle = (id: string) => {
    const next = new Set(openSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (!multi) next.clear();
      next.add(id);
    }
    openSet = next;
  };

  /** Roving focus handler for keyboard nav per DESIGN.md §3. */
  const onKey = (e: KeyboardEvent, idx: number) => {
    const triggers = document.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]');
    const move = (target: number) => {
      const t = triggers.item(target);
      t?.focus();
      e.preventDefault();
    };
    if (e.key === 'ArrowDown') move((idx + 1) % triggers.length);
    else if (e.key === 'ArrowUp') move((idx - 1 + triggers.length) % triggers.length);
    else if (e.key === 'Home') move(0);
    else if (e.key === 'End') move(triggers.length - 1);
  };
</script>

<div class="divide-y divide-line border border-line rounded-lg overflow-hidden bg-white">
  {#each items as item, idx (item.id)}
    {@const open = isOpen(item.id)}
    <div>
      <h3 class="m-0">
        <button
          type="button"
          data-accordion-trigger
          aria-expanded={open}
          aria-controls={`acc-panel-${item.id}`}
          id={`acc-trig-${item.id}`}
          onclick={() => toggle(item.id)}
          onkeydown={(e) => onKey(e, idx)}
          class="w-full flex items-center justify-between gap-4 px-6 py-5 text-start
                 text-h3 font-display text-ink hover:bg-sky-tint
                 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-[-2px]
                 transition-colors duration-200"
        >
          <span>{item.title}</span>
          <span
            aria-hidden="true"
            class={`text-brand-teal transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
          >▾</span>
        </button>
      </h3>
      {#if open}
        <div
          id={`acc-panel-${item.id}`}
          role="region"
          aria-labelledby={`acc-trig-${item.id}`}
          class="px-6 pb-6 text-body text-ink-2"
        >
          {@render item.body()}
        </div>
      {/if}
    </div>
  {/each}
</div>
