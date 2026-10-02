import React, { useRef, useState } from 'react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { burst } from '../../utils/burst';
import { name, opening } from '../../data/gift';

interface OpeningProps {
  onReveal: () => void;
  onFinish: () => void;
}

export function Opening({ onReveal, onFinish }: OpeningProps) {
  const root = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const [opening_, setOpening] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const l1 = SplitText.create('.op-line-1', { type: 'chars' });
      const l2 = SplitText.create('.op-line-2', { type: 'words' });
      const n = SplitText.create('.op-name', { type: 'chars' });

      gsap.to('.op-float', { y: -10, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      gsap.
      timeline({ defaults: { ease: 'gift' }, delay: 0.3 }).
      from('.op-box', { opacity: 0, scale: 0.94, duration: 1.4 }).
      from(l1.chars, { opacity: 0, filter: 'blur(6px)', duration: 0.8, stagger: 0.03 }, '-=0.7').
      from(l2.words, { opacity: 0, y: 10, duration: 0.9, stagger: 0.12 }, '+=0.15').
      from(n.chars, { opacity: 0, yPercent: 50, duration: 1.1, stagger: 0.08 }, '+=0.1').
      from('.op-prompt', { opacity: 0, y: 8, duration: 0.6 }, '+=0.05');
    },
    { scope: root }
  );

  const open = contextSafe(() => {
    if (opening_) return;
    setOpening(true);
    gsap.killTweensOf('.op-text *');

    gsap.
    timeline({ defaults: { ease: 'gift' }, onComplete: onFinish }).
    to('.op-box', { rotation: -3, duration: 0.08, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 100%' }).
    to('.op-text', { opacity: 0, y: -12, duration: 0.5 }, 0).
    to('.op-lid', { y: -130, rotation: -18, opacity: 0, svgOrigin: '100 83', duration: 1 }, 0.3).
    fromTo('.op-glow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.35).
    add(() => {
      if (burstRef.current) burst(burstRef.current, { count: 54, spread: 360, petals: true });
    }, 0.45).
    fromTo(
      '.op-light',
      { scale: 0.1, opacity: 0 },
      { scale: 9, opacity: 1, duration: 1.1, ease: 'power2.inOut' },
      0.55
    ).
    to('.op-box', { opacity: 0, scale: 1.08, duration: 0.5 }, 1.15).
    add(onReveal, 1.45).
    to(root.current, { opacity: 0, duration: 0.9, ease: 'power1.out' }, 1.55);
  });

  return (
    <div
      ref={root}
      role="dialog"
      aria-label={`A gift for ${name}`}
      className="fixed inset-0 z-[80] flex flex-col items-center overflow-y-auto overscroll-contain bg-plum px-6 py-10">
      
      <div className="relative my-auto flex w-full flex-col items-center">
        <div
          aria-hidden="true"
          className="op-light pointer-events-none absolute left-1/2 top-1/2 h-[30vmax] w-[30vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
            'radial-gradient(circle, rgba(255,248,240,1) 0%, rgba(232,206,160,0.75) 32%, rgba(216,184,120,0) 70%)'
          }} />
        

        <div className="op-float relative">
          <div ref={burstRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="op-glow pointer-events-none absolute left-1/2 top-[40%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
            style={{ background: 'radial-gradient(circle, rgba(255,240,210,0.9), rgba(216,184,120,0) 70%)' }} />
          
          <button
            type="button"
            onClick={open}
            data-cursor="Open"
            aria-label="Open your gift"
            className="op-box relative block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70">
            
            <GiftBox />
          </button>
        </div>

        <div className="op-text relative mt-6 text-center [@media(max-height:640px)]:mt-4 sm:mt-10">
          <p className="op-line-1 font-display text-2xl italic text-ivory/80 md:text-3xl">{opening.lines[0]}</p>
          <p className="op-line-2 mt-2 font-display text-2xl italic text-ivory/80 md:text-3xl">{opening.lines[1]}</p>
          <p className="op-name mt-5 font-display text-5xl font-light tracking-[0.16em] text-ivory [@media(max-height:640px)]:mt-3 sm:mt-8 sm:tracking-[0.32em] md:text-7xl">
            {name.toUpperCase()}
          </p>
          <p className="op-prompt mt-5 text-sm text-gold/80 [@media(max-height:640px)]:mt-3 sm:mt-8">{opening.prompt}</p>
        </div>
      </div>
    </div>);

}

function GiftBox() {
  return (
    <svg viewBox="0 0 200 200" className="h-auto w-[min(48vw,210px)] [@media(max-height:640px)]:w-[min(38vw,150px)]" aria-hidden="true">
      <ellipse cx="100" cy="194" rx="70" ry="5" fill="#000" opacity="0.35" />
      <g>
        <rect x="32" y="92" width="136" height="98" rx="4" fill="#4A1F32" />
        <rect x="32" y="92" width="136" height="12" fill="#000" opacity="0.22" />
        <rect x="32" y="92" width="136" height="98" rx="4" fill="none" stroke="#D8B878" strokeOpacity="0.3" />
        <rect x="92" y="92" width="16" height="98" fill="#D8B878" />
        <rect x="92" y="92" width="4" height="98" fill="#FFF8F0" opacity="0.25" />
      </g>
      <g className="op-lid">
        <rect x="24" y="72" width="152" height="24" rx="4" fill="#5E2942" />
        <rect x="24" y="72" width="152" height="24" rx="4" fill="none" stroke="#D8B878" strokeOpacity="0.35" />
        <rect x="92" y="72" width="16" height="24" fill="#D8B878" />
        <path d="M100 72 C 82 42, 50 46, 62 66 C 70 78, 90 74, 100 72Z" fill="none" stroke="#D8B878" strokeWidth="5" strokeLinejoin="round" />
        <path d="M100 72 C 118 42, 150 46, 138 66 C 130 78, 110 74, 100 72Z" fill="none" stroke="#D8B878" strokeWidth="5" strokeLinejoin="round" />
        <path d="M96 74 L84 92 M104 74 L116 92" stroke="#D8B878" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="71" r="6.5" fill="#E9CF97" />
      </g>
    </svg>);

}