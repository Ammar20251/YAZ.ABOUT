/**
 * Lenis smooth scroll, integrated with ScrollTrigger.
 * Disabled under prefers-reduced-motion per DESIGN.md §11.
 */
import Lenis from 'lenis';
import { gsap, loadScrollTrigger } from './gsap';

export interface SmoothScrollHandle {
  destroy: () => void;
  lenis: Lenis | null;
}

export const startSmoothScroll = async (): Promise<SmoothScrollHandle> => {
  if (typeof window === 'undefined') return { destroy: () => {}, lenis: null };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return { destroy: () => {}, lenis: null };

  const ScrollTrigger = await loadScrollTrigger();

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    }
  };
};
