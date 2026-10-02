import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsap';

/** Subtle desktop cursor that becomes a label ("Open", "Read"…) over [data-cursor] elements. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const lastLabel = useRef('');
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!enabled || !ring || !dot) return;
    document.documentElement.classList.add('has-custom-cursor');

    gsap.set([ring, dot], { xPercent: 0, yPercent: 0, x: -100, y: -100 });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });

    const move = (e: PointerEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.('[data-cursor]');
      const next = target?.getAttribute('data-cursor') ?? null;
      if (next) lastLabel.current = next;
      setLabel(next);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div className={`cursor-ring ${label ? 'is-active' : ''}`}>
          <span className="cursor-label">{label ?? lastLabel.current}</span>
        </div>
      </div>
      <div ref={dotRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div className={`-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold transition-opacity duration-150 ${label ? 'opacity-0' : 'opacity-100'}`} />
      </div>
    </>);

}