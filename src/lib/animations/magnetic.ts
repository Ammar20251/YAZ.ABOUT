/**
 * Magnetic hover — Svelte action.
 * The element is pulled toward the pointer up to `strength` pixels, eased.
 *
 * DESIGN.md §4 rule 9: disabled below 1024px viewport, max 12px displacement,
 * eases back on pointerleave, no-ops under prefers-reduced-motion.
 *
 * Usage:
 *   <button use:magnetic>Click me</button>
 *   <button use:magnetic={{ strength: 8 }}>Subtler pull</button>
 *   <button use:magnetic={false}>Disabled</button>
 */
import { gsap } from './gsap';
import type { Action } from 'svelte/action';

export interface MagneticOptions {
  /** Max displacement in pixels. Default 12. */
  strength?: number;
  /** Disable below this viewport width. Default 1024. */
  minWidth?: number;
  /** Pointer-to-displacement ratio. Default 0.4 (lower = subtler). */
  ratio?: number;
}

type MagneticParam = MagneticOptions | boolean | undefined;

export const magnetic: Action<HTMLElement, MagneticParam> = (node, param) => {
  let opts = resolveOpts(param);
  let enabled = opts !== null;

  const isActive = () => {
    if (!enabled || !opts) return false;
    if (window.innerWidth < opts.minWidth) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  };

  const onMove = (e: PointerEvent) => {
    if (!isActive() || !opts) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clamp((e.clientX - cx) * opts.ratio, opts.strength);
    const dy = clamp((e.clientY - cy) * opts.ratio, opts.strength);
    gsap.to(node, { x: dx, y: dy, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
  };

  const onLeave = () => {
    gsap.to(node, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto'
    });
  };

  const attach = () => {
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
  };
  const detach = () => {
    node.removeEventListener('pointermove', onMove);
    node.removeEventListener('pointerleave', onLeave);
  };

  if (enabled) attach();

  return {
    update(next) {
      const nextOpts = resolveOpts(next);
      const nextEnabled = nextOpts !== null;
      if (nextEnabled !== enabled) {
        if (nextEnabled) attach();
        else {
          detach();
          gsap.set(node, { clearProps: 'transform' });
        }
        enabled = nextEnabled;
      }
      opts = nextOpts ?? opts;
    },
    destroy() {
      detach();
      gsap.set(node, { clearProps: 'transform' });
    }
  };
};

const clamp = (n: number, max: number): number => Math.max(Math.min(n, max), -max);

const resolveOpts = (
  param: MagneticParam
): Required<MagneticOptions> | null => {
  if (param === false) return null;
  const partial = (param === true || param === undefined ? {} : param) as MagneticOptions;
  return {
    strength: partial.strength ?? 12,
    minWidth: partial.minWidth ?? 1024,
    ratio: partial.ratio ?? 0.4
  };
};
