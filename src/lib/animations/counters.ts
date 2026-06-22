/**
 * KPI counter tween — scroll-triggered count-up from `from` → `to`.
 * Used by motion/CountUp.svelte.
 */
import { gsap, loadScrollTrigger } from './gsap';
import { whenScrollReady } from './smooth-scroll';

export interface CountUpOptions {
  from?: number;
  duration?: number;
  ease?: string;
  /** ScrollTrigger start string. Default: when element enters lower viewport. */
  start?: string;
  once?: boolean;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
}

/** Run a count-up tween when `el` scrolls into view. Returns a dispose function. */
export const countUp = async (
  el: Element,
  to: number,
  opts: CountUpOptions
): Promise<() => void> => {
  await whenScrollReady();
  const ScrollTrigger = await loadScrollTrigger();
  const {
    from = 0,
    duration = 1.6,
    ease = 'power2.out',
    start = 'top 85%',
    once = true,
    onUpdate,
    onComplete
  } = opts;

  const counter = { v: from };
  onUpdate(from);

  const tween = gsap.to(counter, {
    v: to,
    duration,
    ease,
    paused: true,
    onUpdate: () => onUpdate(Math.round(counter.v)),
    onComplete
  });

  const trigger = ScrollTrigger.create({
    trigger: el,
    start,
    once,
    onEnter: () => tween.play(),
    onEnterBack: () => {
      if (!once) {
        counter.v = from;
        onUpdate(from);
        tween.restart();
      }
    }
  });

  const maybePlay = () => {
    if (trigger.progress > 0) tween.play();
  };

  maybePlay();
  ScrollTrigger.addEventListener('refresh', maybePlay);

  ScrollTrigger.refresh();

  return () => {
    ScrollTrigger.removeEventListener('refresh', maybePlay);
    trigger.kill();
    tween.kill();
  };
};
