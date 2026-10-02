import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { getLenis, setLenis } from '../utils/smoothScroll';

// Mobile browsers collapse/expand their URL bar while scrolling, which fires a
// resize on nearly every frame. Re-measuring the whole document each time makes
// pinned sections jump, so ignore those height-only resizes and handle real
// resizes/orientation changes ourselves.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Smooth scrolling for precise pointers only (mouse/trackpad, reduced motion
 * off). Touch screens are left entirely to the browser, so a swipe tracks the
 * finger 1:1 with native momentum — the same as any normal web page.
 */
export function useSmoothScroll(paused: boolean) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    // On a phone (or with reduced motion) scrolling is left entirely to the
    // browser: no virtual scroller, no preventDefault, no extra speed.
    const lenis =
      !coarse && !reduce
        ? new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 })
        : null;

    setLenis(lenis);

    let tick: ((time: number) => void) | null = null;
    if (lenis) {
      if (paused) lenis.stop();
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Debounced so a rotation / window drag re-measures once, after it settles.
    let timer = 0;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', refresh);
    window.addEventListener('orientationchange', refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
      if (lenis) {
        if (tick) gsap.ticker.remove(tick);
        lenis.destroy();
      }
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (paused) lenis.stop(); else lenis.start();
  }, [paused]);
}