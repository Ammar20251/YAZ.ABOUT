/**
 * ScrollTrigger-based reveal helpers — fade-up, fade-in, stagger groups.
 * Used by motion/FadeUp.svelte and section components.
 */
import { gsap, loadScrollTrigger, rtlSign } from './gsap';

export interface RevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  once?: boolean;
}

export const reveal = async (
  el: Element | Element[] | NodeListOf<Element>,
  opts: RevealOptions = {}
): Promise<gsap.core.Tween> => {
  const ST = await loadScrollTrigger();
  const {
    y = 24,
    x = 0,
    opacity = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0.08,
    ease = 'power3.out',
    start = 'top 85%',
    once = true
  } = opts;

  return gsap.from(el as gsap.TweenTarget, {
    y,
    x: x * rtlSign(),
    opacity,
    duration,
    delay,
    stagger,
    ease,
    scrollTrigger: {
      trigger: Array.isArray(el) ? el[0] : (el as Element),
      start,
      once
    }
  });
};
