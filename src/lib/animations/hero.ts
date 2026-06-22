/**
 * Hero entrance timeline — page-load sequence orchestrated with GSAP + SplitText.
 *
 * Expects the hero <section> to contain elements tagged with these data attrs:
 *   data-hero-chip      — the eyebrow chip
 *   data-hero-headline  — the display <h1>
 *   data-hero-sub       — the subtitle <p>
 *   data-hero-ctas      — wrapper around the primary/secondary CTAs
 *   data-hero-stats     — the stats strip
 *
 * Respects prefers-reduced-motion (no-op, elements stay in final state).
 * Self-cleaning via gsap.context() + SplitText.revert() on the returned dispose.
 */
import { gsap, loadSplitText, loadScrollTrigger } from './gsap';

export const startHero = async (root: HTMLElement): Promise<() => void> => {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const [SplitText] = await Promise.all([loadSplitText(), loadScrollTrigger()]);

  let split: InstanceType<typeof SplitText> | null = null;

  const ctx = gsap.context(() => {
    const chip = root.querySelector<HTMLElement>('[data-hero-chip]');
    const headline = root.querySelector<HTMLElement>('[data-hero-headline]');
    const sub = root.querySelector<HTMLElement>('[data-hero-sub]');
    const ctas = root.querySelector<HTMLElement>('[data-hero-ctas]');
    const stats = root.querySelector<HTMLElement>('[data-hero-stats]');

    if (headline) {
      split = new SplitText(headline, { type: 'chars,words', linesClass: 'split-line' });
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.1
    });

    if (chip) tl.from(chip, { y: -16, opacity: 0, duration: 0.6 }, 0);
    if (split) {
      tl.from(
        split.chars,
        { y: 48, opacity: 0, stagger: 0.022, duration: 0.8, ease: 'power4.out' },
        0.1
      );
    }
    if (sub) tl.from(sub, { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');
    if (ctas && ctas.children.length) {
      tl.from(
        Array.from(ctas.children),
        { y: 24, opacity: 0, stagger: 0.1, duration: 0.6 },
        '-=0.35'
      );
    }
    if (stats) tl.from(stats, { y: 32, opacity: 0, duration: 0.7 }, '-=0.4');
  }, root);

  return () => {
    split?.revert();
    ctx.revert();
  };
};
