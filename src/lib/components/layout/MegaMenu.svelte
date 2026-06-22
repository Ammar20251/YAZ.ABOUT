<script lang="ts">
  import type { Snippet } from 'svelte';

  interface MegaItem {
    href: string;
    title: string;
    description?: string;
    code?: string;
  }
  interface MegaSection {
    heading: string;
    items: MegaItem[];
  }
  interface Props {
    trigger: string;
    sections: MegaSection[];
    footer?: Snippet;
  }

  let { trigger, sections, footer }: Props = $props();
  let open = $state(false);

  let panelEl: HTMLDivElement | undefined = $state();

  const close = () => (open = false);

  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' || e.key === ' ') {
      open = !open;
      e.preventDefault();
    }
  };

  const onBlur = (e: FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (panelEl && next && !panelEl.contains(next)) close();
  };
</script>

<div class="relative" onmouseleave={close} role="presentation">
  <button
    type="button"
    aria-haspopup="true"
    aria-expanded={open}
    onmouseenter={() => (open = true)}
    onfocus={() => (open = true)}
    onkeydown={onTriggerKey}
    onblur={onBlur}
    class="text-label-mono px-3 py-2 rounded-md text-ink-2 hover:text-brand-teal hover:bg-sky-tint
           focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2
           transition-colors duration-200"
  >
    {trigger}
  </button>

  {#if open}
    <div
      bind:this={panelEl}
      role="menu"
      tabindex="-1"
      class="absolute top-full start-0 mt-2 w-[min(72rem,90vw)]
             bg-white border border-line rounded-xl shadow-lg p-6
             grid grid-cols-1 md:grid-cols-{sections.length} gap-6 z-50"
      onmouseleave={close}
    >
      {#each sections as section (section.heading)}
        <div class="flex flex-col gap-3">
          <h5 class="text-label-mono text-brand-teal font-semibold">{section.heading}</h5>
          {#each section.items as item (item.href)}
            <a
              href={item.href}
              role="menuitem"
              class="group flex flex-col gap-1 py-2 px-3 -mx-3 rounded-md
                     hover:bg-sky-tint transition-colors duration-200"
            >
              <span class="flex items-center justify-between gap-3">
                <span class="text-body font-semibold text-ink group-hover:text-brand-teal">{item.title}</span>
                {#if item.code}<span class="text-label-mono text-ink-3">{item.code}</span>{/if}
              </span>
              {#if item.description}
                <span class="text-small text-ink-3">{item.description}</span>
              {/if}
            </a>
          {/each}
        </div>
      {/each}

      {#if footer}
        <div class="md:col-span-{sections.length} pt-4 border-t border-line">
          {@render footer()}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .start-0 { left: 0; }
</style>
