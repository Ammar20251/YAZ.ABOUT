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

let _boot: Promise<SmoothScrollHandle> | null = null;

const bootSmoothScroll = async (): Promise<SmoothScrollHandle> => {
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

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: document.documentElement.clientWidth,
        height: window.innerHeight
      };
    }
  });

  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.addEventListener('refresh', () => {
    lenis.resize();
  });

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      _boot = null;
    }
  };
};

/** Boot Lenis once — safe to call from layout and motion modules. */
export const ensureSmoothScroll = (): Promise<SmoothScrollHandle> => {
  _boot ??= bootSmoothScroll();
  return _boot;
};

/** @deprecated Use ensureSmoothScroll — kept for existing imports. */
export const startSmoothScroll = ensureSmoothScroll;

/** Resolves once Lenis + ScrollTrigger scrollerProxy are wired. */
export const whenScrollReady = (): Promise<void> => ensureSmoothScroll().then(() => undefined);
