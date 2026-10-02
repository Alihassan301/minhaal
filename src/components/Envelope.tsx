import React from 'react';
import { name } from '../data/gift';

/** Closed envelope. Animated parts: .sp-flap, .sp-letter, .sp-seal */
export function Envelope() {
  return (
    <div className="relative aspect-[3/2] w-[min(84vw,400px)] [perspective:1200px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-md bg-[#3A1828] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.8)]" />

      <div className="sp-letter absolute inset-x-[6%] bottom-[6%] top-[6%] z-[2] rounded-sm bg-ivory p-[8%]">
        <div className="space-y-2.5">
          <span className="block h-px w-1/2 bg-burgundy/20" />
          <span className="block h-px w-3/4 bg-burgundy/15" />
          <span className="block h-px w-2/3 bg-burgundy/15" />
        </div>
      </div>

      <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute inset-0 z-[3] h-full w-full">
        <path d="M0 0 L150 112 L0 200Z" fill="#4A1F32" />
        <path d="M300 0 L150 112 L300 200Z" fill="#4A1F32" />
        <path d="M0 200 L150 98 L300 200Z" fill="#5B2740" />
        <path d="M0 200 L150 98 L300 200" fill="none" stroke="#D8B878" strokeOpacity="0.3" strokeWidth="0.8" />
      </svg>

      <div className="sp-flap absolute inset-x-0 top-0 z-[4] h-[58%] origin-top [transform-style:preserve-3d]">
        <svg viewBox="0 0 300 116" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 0 L300 0 L150 116Z" fill="#62294A" />
          <path d="M0 0 L150 116 L300 0" fill="none" stroke="#D8B878" strokeOpacity="0.35" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="sp-seal absolute left-1/2 top-[58%] z-[5] -ml-7 -mt-7 grid h-14 w-14 place-items-center rounded-full bg-gold shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
        <span className="font-script text-3xl leading-none text-burgundy">{name.charAt(0)}</span>
      </div>
    </div>);

}