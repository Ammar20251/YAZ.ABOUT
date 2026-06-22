/**
 * Single point of GSAP plugin registration.
 * Components import `gsap` (and helpers) from here — never directly from the gsap package.
 * Plugins are lazy-registered on demand per DESIGN.md §11 (perf budget).
 */
import { gsap } from 'gsap';

if (typeof window !== 'undefined') {
  gsap.defaults({ ease: 'power3.out', duration: 0.6 });
}

export { gsap };

/* ── Plugin lazy-loaders ──────────────────────────────────────
 * Each loader registers its plugin exactly once and returns it.
 * Call from inside the component that needs the plugin so the
 * import is route-scoped, not layout-scoped.
 * ───────────────────────────────────────────────────────────── */

let _stPromise: Promise<typeof import('gsap/ScrollTrigger').ScrollTrigger> | null = null;
export const loadScrollTrigger = () => {
  _stPromise ??= import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  });
  return _stPromise;
};

let _flipPromise: Promise<typeof import('gsap/Flip').Flip> | null = null;
export const loadFlip = () => {
  _flipPromise ??= import('gsap/Flip').then(({ Flip }) => {
    gsap.registerPlugin(Flip);
    return Flip;
  });
  return _flipPromise;
};

let _splitPromise: Promise<typeof import('gsap/SplitText').SplitText> | null = null;
export const loadSplitText = () => {
  _splitPromise ??= import('gsap/SplitText').then(({ SplitText }) => {
    gsap.registerPlugin(SplitText);
    return SplitText;
  });
  return _splitPromise;
};

/**
 * Run a motion block scoped to an element, with automatic reduced-motion handling.
 * `full` runs when the user accepts motion; `reduced` (optional) runs otherwise —
 * use it to set the final state immediately (DESIGN.md §4 rule 3).
 * Returns a cleanup function suitable for $effect return values.
 */
export const motionContext = (
  scope: Element,
  full: (ctx: { isRtl: boolean }) => void,
  reduced?: () => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  const mm = gsap.matchMedia();
  const isRtl = document.documentElement.dir === 'rtl';
  mm.add(
    {
      reduced: '(prefers-reduced-motion: reduce)',
      ok: '(prefers-reduced-motion: no-preference)'
    },
    (ctx) => {
      const conds = ctx.conditions as { reduced: boolean; ok: boolean } | undefined;
      if (conds?.reduced) {
        reduced?.();
      } else {
        // Scope all tweens created inside `full` to this element so revert() catches them.
        const inner = gsap.context(() => full({ isRtl }), scope);
        return () => inner.revert();
      }
    }
  );
  return () => mm.revert();
};

/** Multiplier for x-axis direction in RTL contexts. Use as `x: 24 * rtlSign()`. */
export const rtlSign = (): number =>
  typeof document !== 'undefined' && document.documentElement.dir === 'rtl' ? -1 : 1;
