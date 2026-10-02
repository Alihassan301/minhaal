import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsap';
import { addBloom } from '../../utils/bloom';
import { gardenOfWishes } from '../../data/gift';
import { Flower } from '../botanicals/Flower';
import { Leaf } from '../botanicals/Leaf';
import { ParticleField } from '../ParticleField';

// Stem heights (% of each column) and head sizes give the row a natural, uneven skyline.
const HEIGHTS = [68, 86, 74, 92, 70, 96];
const HEAD = ['w-[min(22vw,120px)]', 'w-[min(20vw,104px)]', 'w-[min(22vw,118px)]', 'w-[min(24vw,128px)]', 'w-[min(22vw,116px)]', 'w-[min(24vw,132px)]'];

export function GardenOfWishes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // The pin distance differs between phone and desktop. Rebuilding through
      // matchMedia (instead of reading the breakpoint once) keeps it correct
      // when the window is resized or a tablet is rotated.
      const mm = gsap.matchMedia();

      mm.add({ isPhone: '(max-width: 767px)', isWide: '(min-width: 768px)' }, (context) => {
        const { isPhone } = context.conditions as { isPhone: boolean; isWide: boolean };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: isPhone ? '+=240%' : '+=340%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        tl.from('.gow-head > *', { opacity: 0, y: 20, filter: 'blur(8px)', stagger: 0.1, duration: 0.5, ease: 'gift' }, 0).from(
          '.gow-ground',
          { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'none' },
          0.1
        );

        gsap.utils.toArray<HTMLElement>('.gow-col').forEach((col, i) => {
          const at = 0.5 + i * 0.85;
          tl.fromTo(col.querySelector('.gow-stem'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'none' }, at).
          from(col.querySelectorAll('.gow-leaf'), { scale: 0.1, opacity: 0, transformOrigin: '50% 100%', stagger: 0.12, duration: 0.5, ease: 'gift' }, at + 0.3).
          from(col.querySelector('.gow-num'), { opacity: 0, duration: 0.3 }, at + 0.2);
          addBloom(tl, col.querySelector('.gow-flower'), at + 0.45, 0.9);
          tl.from(col.querySelector('.gow-label'), { opacity: 0, y: 14, filter: 'blur(6px)', duration: 0.5, ease: 'gift' }, at + 0.85);
        });
        tl.to({}, { duration: 0.6 });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="garden"
      data-chapter="5"
      aria-labelledby="gow-title"
      className="relative flex h-[100svh] min-h-[480px] w-full flex-col overflow-hidden px-4 pb-8 pt-[10svh] sm:min-h-[540px] sm:pb-10 md:min-h-[600px] md:px-12 md:pt-[12vh]">
      
      <ParticleField density={0.8} />
      <div className="gow-head relative z-10 text-center">
        <h2 id="gow-title" className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-light leading-none text-ivory">
          {gardenOfWishes.heading}
        </h2>
        <p className="mt-2 font-script text-4xl text-gold md:text-5xl">{gardenOfWishes.accent}</p>
      </div>

      <div className="relative mx-auto mt-4 grid w-full max-w-6xl flex-1 grid-cols-3 grid-rows-2 gap-x-1.5 gap-y-3 sm:mt-6 sm:gap-x-2 sm:gap-y-4 md:grid-cols-6 md:grid-rows-1 md:gap-x-4">
        <span className="gow-ground absolute inset-x-0 bottom-6 hidden h-px bg-gold/40 md:block" aria-hidden="true" />
        {gardenOfWishes.flowers.map((flower, i) =>
        <div
          key={flower.label}
          className="gow-col relative flex flex-col items-center self-end"
          style={{ height: `${HEIGHTS[i]}%` }}>
          
            <p className="gow-label mb-2 max-w-[8.5rem] text-center font-display text-[clamp(0.78rem,2.4vw,1.5rem)] italic leading-tight text-ivory sm:mb-3 sm:max-w-[11rem] md:text-[clamp(1rem,1.7vw,1.5rem)]">
              {flower.label}
            </p>
            <div className={`gow-flower relative z-10 -mb-[22%] ${HEAD[i]}`} aria-hidden="true">
              <Flower kind={flower.kind} className="h-auto w-full" />
            </div>
            <div className="relative w-10 flex-1" aria-hidden="true">
              <svg viewBox="0 0 40 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                <path
                className="gow-stem"
                d="M20 100 C 12 76, 28 46, 20 0"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="0"
                fill="none"
                stroke="#6F7D5C"
                strokeWidth={2.2}
                strokeLinecap="round" />
              
              </svg>
              <div className="absolute right-1/2 top-[42%] w-5 -rotate-[50deg] md:w-6" style={{ transformOrigin: '100% 100%' }}>
                <Leaf className="gow-leaf w-full" />
              </div>
              <div className="absolute left-1/2 top-[64%] w-5 rotate-[50deg] md:w-6" style={{ transformOrigin: '0% 100%' }}>
                <Leaf className="gow-leaf w-full" />
              </div>
            </div>
            <span className="gow-num mt-1.5 font-display text-[11px] tabular-nums text-ivory/45 sm:mt-2 sm:text-xs">
              No. {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </section>);

}