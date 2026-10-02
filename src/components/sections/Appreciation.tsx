import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { appreciation } from '../../data/gift';
import { Flower } from '../botanicals/Flower';
import { ParticleField } from '../ParticleField';

export function Appreciation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const statement = SplitText.create('.ap-statement', { type: 'chars' });
      const follow = SplitText.create('.ap-follow', { type: 'words' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 55%', end: 'bottom bottom', scrub: 1 }
      });
      tl.from(statement.chars, { opacity: 0, scale: 1.18, filter: 'blur(24px)', stagger: 0.08, duration: 1, ease: 'gift' }).
      from(follow.words, { opacity: 0, y: 16, filter: 'blur(8px)', stagger: 0.1, duration: 0.8, ease: 'gift' }, '+=0.3').
      to({}, { duration: 0.6 });

      gsap.utils.toArray<HTMLElement>('.ap-shadow').forEach((el, i) => {
        gsap.fromTo(
          el,
          { rotation: i % 2 ? -20 : 20, yPercent: 10 },
          {
            rotation: i % 2 ? 25 : -25,
            yPercent: -10,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-chapter="5" aria-label={appreciation.statement} className="relative h-[200vh] bg-night">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Flower kind="peony" tone="#4A1F32" className="ap-shadow absolute -left-[12vmax] -top-[10vmax] w-[56vmax] opacity-40 blur-[6px]" />
          <Flower kind="rose" tone="#3A1828" className="ap-shadow absolute -bottom-[14vmax] -right-[10vmax] w-[60vmax] opacity-50 blur-[8px]" />
          <Flower kind="sunflower" tone="#2C1220" className="ap-shadow absolute -right-[6vmax] -top-[16vmax] w-[34vmax] opacity-50 blur-[4px]" />
        </div>
        <ParticleField density={0.7} />
        <div className="relative z-10 text-center">
          <h2 className="ap-statement font-display text-[clamp(4.5rem,17vw,16rem)] font-light leading-[0.9] text-ivory">
            {appreciation.statement}
          </h2>
          <p className="ap-follow mt-8 font-display text-[clamp(1.5rem,3vw,2.5rem)] italic text-gold">{appreciation.follow}</p>
        </div>
      </div>
    </section>);

}