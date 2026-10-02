import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { words } from '../../data/gift';
import { RichLine } from '../RichLine';

export function WordsForYou() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.words-heading > *', {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
        duration: 1.4,
        stagger: 0.15,
        ease: 'gift',
        scrollTrigger: { trigger: '.words-heading', start: 'top 85%' }
      });

      gsap.utils.toArray<HTMLElement>('.words-line').forEach((line) => {
        const split = SplitText.create(line, { type: 'words' });
        gsap.from(split.words, {
          opacity: 0.1,
          y: '0.22em',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 85%', end: 'bottom 50%', scrub: 0.6 }
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="words" data-chapter="1" aria-labelledby="words-title" className="relative px-6 py-[22vh] md:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="words-heading md:sticky md:top-[22vh]">
            <h2 id="words-title" className="font-script text-6xl leading-none text-gold md:text-7xl">
              {words.heading}
            </h2>
            <p className="mt-5 max-w-[14rem] font-display text-lg italic text-ivory/50">{words.note}</p>
          </div>
        </div>
        <div className="space-y-[14vh] md:col-span-9">
          {words.lines.map((line, i) =>
          <p
            key={line}
            className={`words-line font-display text-[clamp(2.1rem,4.8vw,4.25rem)] font-light leading-[1.1] text-ivory ${
            i % 2 ? 'md:pl-[14%]' : ''}`
            }>
            
              <RichLine text={line} nameClassName="font-script text-[1.25em] text-gold" />
            </p>
          )}
        </div>
      </div>
    </section>);

}