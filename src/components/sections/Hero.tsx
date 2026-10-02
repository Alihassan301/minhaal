import React, { useRef } from 'react';
import { ArrowDownIcon } from 'lucide-react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { scrollToTarget } from '../../utils/smoothScroll';
import { hero, name } from '../../data/gift';
import { ParticleField } from '../ParticleField';
import { PetalDrift } from '../PetalDrift';

export function Hero({ ready }: {ready: boolean;}) {
  const root = useRef<HTMLElement>(null);

  // Scroll-linked depth
  useGSAP(
    () => {
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero-bg', { yPercent: 12, scale: 1.12, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-content', { yPercent: -22, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '75% top' } });
      gsap.to('.hero-rays', { opacity: 0, ease: 'none', scrollTrigger: st });
    },
    { scope: root }
  );

  // Entrance once the gift has opened
  useGSAP(
    () => {
      if (!ready) return;
      const split = SplitText.create('.hero-name', { type: 'chars', mask: 'chars' });
      gsap.
      timeline({ defaults: { ease: 'gift' } }).
      from('.hero-bg', { scale: 1.08, duration: 3 }, 0).
      from(split.chars, { yPercent: 115, rotate: 6, duration: 1.6, stagger: 0.07 }, 0.15).
      from('.hero-ornament', { scaleX: 0, opacity: 0, duration: 1.2 }, 0.9).
      from('.hero-tagline', { opacity: 0, y: 16, filter: 'blur(8px)', duration: 1.2 }, 1.1).
      from('.hero-subline', { opacity: 0, y: 12, duration: 1.2 }, 1.9).
      from('.hero-cta', { opacity: 0, y: 12, duration: 0.9 }, 2.3);
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section
      ref={root}
      id="intro"
      data-chapter="0"
      aria-label="Introduction"
      className="relative flex h-[100svh] min-h-[540px] w-full items-center justify-center overflow-hidden sm:min-h-[640px]">
      
      <div className="hero-bg absolute inset-[-4%] will-change-transform">
        <img src={hero.image} alt="" className="h-full w-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-plum/30" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-plum" aria-hidden="true" />

      <div className="hero-rays pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="ray absolute -top-[20%] left-[30%] h-[140%] w-[12vw] bg-gold/[0.07] blur-3xl" />
        <div className="ray absolute -top-[20%] left-[48%] h-[140%] w-[6vw] bg-ivory/[0.05] blur-2xl" style={{ animationDelay: '-5s' }} />
        <div className="ray absolute -top-[20%] left-[58%] h-[140%] w-[10vw] bg-rose/[0.05] blur-3xl" style={{ animationDelay: '-9s' }} />
      </div>

      <ParticleField density={1.1} />
      <PetalDrift count={14} />

      <div className="hero-content relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="hero-name font-display text-[clamp(3.5rem,19vw,17rem)] font-light leading-[0.9] tracking-[0.04em] text-ivory">
          {name.toUpperCase()}
        </h1>
        <div className="hero-ornament mt-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-16 bg-gold/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gold/60" />
        </div>
        <p className="hero-tagline mt-6 font-display text-[clamp(1.5rem,3vw,2.4rem)] italic text-ivory/90">{hero.tagline}</p>
        <p className="hero-subline mt-4 max-w-md text-[15px] leading-relaxed text-ivory/60">{hero.subline}</p>
        <button
          type="button"
          onClick={() => scrollToTarget('#words')}
          data-cursor="Open"
          className="hero-cta group mt-8 flex items-center gap-3 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-plum focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:mt-12">
          
          {hero.cta}
          <ArrowDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
        </button>
      </div>
    </section>);

}