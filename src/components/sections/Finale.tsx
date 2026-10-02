import React, { useRef } from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { addBloom } from '../../utils/bloom';
import { scrollToTarget } from '../../utils/smoothScroll';
import { finale, name } from '../../data/gift';
import { Flower } from '../botanicals/Flower';
import { ParticleField } from '../ParticleField';
import { PetalDrift } from '../PetalDrift';
import { RichLine } from '../RichLine';

export function Finale() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create('.fin-name', { type: 'chars', mask: 'chars' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: 1 }
      });
      gsap.utils.toArray<HTMLElement>('.fin-flower').forEach((f, i) => addBloom(tl, f, i * 0.2, 1.6));
      tl.from(split.chars, { yPercent: 110, stagger: 0.08, duration: 1, ease: 'gift' }, 0.3);

      gsap.from('.fin-line', {
        opacity: 0,
        y: 18,
        filter: 'blur(8px)',
        stagger: 0.5,
        duration: 1.4,
        ease: 'gift',
        scrollTrigger: { trigger: '.fin-lines', start: 'top 88%' }
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="finale"
      data-chapter="5"
      aria-labelledby="fin-title"
      className="relative flex h-[100svh] min-h-[520px] w-full flex-col items-center justify-center overflow-hidden px-4 sm:min-h-[600px] sm:px-6 md:min-h-[680px]">
      
      <ParticleField density={1.1} />
      <PetalDrift count={16} />

      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%]">
        <div className="slow-spin">
          <div className="fin-flower w-[min(86vw,600px)] opacity-35">
            <Flower kind="peony" className="h-auto w-full" />
          </div>
        </div>
        <div className="fin-flower absolute -left-[22%] top-[52%] w-[34%] opacity-60">
          <Flower kind="rose" className="h-auto w-full" />
        </div>
        <div className="fin-flower absolute -right-[20%] top-[8%] w-[30%] opacity-60">
          <Flower kind="sunflower" className="h-auto w-full" />
        </div>
      </div>

      <div className="relative z-10 text-center">
        <h2 id="fin-title" className="fin-name font-display text-[clamp(3rem,22vw,20rem)] font-light leading-[0.88] tracking-[0.03em] text-ivory">
          {name.toUpperCase()}
        </h2>
        <div className="fin-lines mt-6 space-y-3 sm:mt-8">
          <p className="fin-line font-display text-[clamp(1.4rem,2.8vw,2.25rem)] italic text-ivory/90">{finale.line}</p>
          <p className="fin-line font-script text-[clamp(2.4rem,5vw,3.75rem)] text-gold">
            <RichLine text={finale.closing} />
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToTarget(0)}
        data-cursor="View"
        className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm text-ivory/55 transition-colors duration-200 hover:text-ivory focus:outline-none focus-visible:ring-1 focus-visible:ring-gold">
        
        <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
        {finale.again}
      </button>
    </section>);

}