import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsap';
import { memories } from '../../data/gift';

interface MemoryLayout {
  figure: string;
  aspect: string;
  caption: string;
  frame: string;
}

// Editorial placement per photo — layout only, content lives in data/gift.ts.
const LAYOUTS: MemoryLayout[] = [
{
  figure: 'md:col-span-7 md:col-start-1',
  aspect: 'aspect-[4/5]',
  caption: 'md:col-span-4 md:col-start-9 md:self-end md:pb-16',
  frame: 'left-5 top-5 md:left-10 md:top-10'
},
{
  figure: 'md:col-span-7 md:col-start-6 md:order-2',
  aspect: 'aspect-[3/2]',
  caption: 'md:col-span-4 md:col-start-1 md:order-1 md:self-center md:text-right',
  frame: '-left-5 -top-5 md:-left-10 md:-top-10'
},
{
  figure: 'md:col-span-5 md:col-start-3',
  aspect: 'aspect-[4/5]',
  caption: 'md:col-span-4 md:col-start-9 md:self-start md:pt-28',
  frame: '-right-5 top-8 md:-right-10 md:top-14'
}];


export function Memories() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.mem-heading > *', {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
        stagger: 0.15,
        duration: 1.3,
        ease: 'gift',
        scrollTrigger: { trigger: '.mem-heading', start: 'top 80%' }
      });

      gsap.utils.toArray<HTMLElement>('.mem-item').forEach((item) => {
        const fig = item.querySelector('.mem-figure');
        const mask = item.querySelector('.mem-mask');
        const img = item.querySelector('.mem-img');
        const shift = item.querySelector('.mem-shift');
        const frame = item.querySelector('.mem-frame');
        const caption = item.querySelectorAll('.mem-caption > *');
        const reveal = { trigger: fig, start: 'top 78%' };
        const scrub = { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true };

        gsap.fromTo(
          mask,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'giftInOut', scrollTrigger: reveal }
        );
        gsap.fromTo(img, { scale: 1.35 }, { scale: 1.05, duration: 2.6, ease: 'gift', scrollTrigger: reveal });
        gsap.fromTo(shift, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: scrub });
        gsap.fromTo(frame, { y: 50, opacity: 0 }, { y: -50, opacity: 1, ease: 'none', scrollTrigger: scrub });
        gsap.from(caption, {
          opacity: 0,
          y: 24,
          filter: 'blur(6px)',
          stagger: 0.15,
          duration: 1.2,
          ease: 'gift',
          scrollTrigger: { trigger: item, start: 'top 55%' }
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="memories" data-chapter="3" aria-labelledby="mem-title" className="relative px-6 py-[20vh] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mem-heading mb-[14vh] max-w-2xl">
          <p className="font-script text-5xl text-gold md:text-6xl">{memories.accent}</p>
          <h2 id="mem-title" className="mt-2 font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.02] text-ivory">
            {memories.heading}
          </h2>
        </div>

        <div className="space-y-[18vh]">
          {memories.items.map((memory, i) => {
            const layout = LAYOUTS[i % LAYOUTS.length];
            return (
              <article key={memory.src} className="mem-item grid gap-10 md:grid-cols-12 md:gap-8">
                <figure className={`mem-figure relative ${layout.figure}`}>
                  <div
                    className={`mem-frame pointer-events-none absolute h-full w-full border border-gold/40 ${layout.frame}`}
                    aria-hidden="true" />
                  
                  <div className={`mem-mask relative overflow-hidden bg-burgundy/40 ${layout.aspect}`}>
                    <div className="mem-shift absolute inset-x-0 -bottom-[8%] -top-[8%]">
                      <img
                        src={memory.src}
                        alt={memory.alt}
                        loading="lazy"
                        decoding="async"
                        className="mem-img h-full w-full object-cover will-change-transform" />
                      
                    </div>
                  </div>
                </figure>
                <div className={`mem-caption ${layout.caption}`}>
                  <p className="font-script text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.1] text-gold">{memory.caption}</p>
                  <p className="mt-4 font-display text-xl italic leading-snug text-ivory/60">{memory.note}</p>
                </div>
              </article>);

          })}
        </div>
      </div>
    </section>);

}