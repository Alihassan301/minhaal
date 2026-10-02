import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { getLenis, setLenis } from '../utils/smoothScroll';

// Mobile browsers collapse/expand their URL bar while scrolling, which fires a
// resize on nearly every frame. Re-measuring the whole document each time makes
// pinned sections jump, so ignore those height-only resizes and handle real
// resizes/orientation changes ourselves.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Lenis smooth scroll synced to GSAP's ticker and ScrollTrigger. */
export function useSmoothScroll(paused: boolean) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      lerp: reduce ? 1 : 0.085,
      smoothWheel: !reduce,
      wheelMultiplier: 0.9,
      // On touch screens let the browser's own (GPU) scrolling drive, and only
      // smooth on top of it. Re-simulating the gesture on the main thread is
      // what makes Lenis feel laggy on phones.
      syncTouch: coarse,
      touchMultiplier: 1.2
    });
    setLenis(lenis);
    if (paused) lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Debounced so a rotation / window drag re-measures once, after it settles.
    let timer = 0;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', refresh);
    window.addEventListener('orientationchange', refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (paused) lenis.stop();else
    lenis.start();
  }, [paused]);
}