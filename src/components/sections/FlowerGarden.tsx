import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsap';
import { addBloom } from '../../utils/bloom';
import { garden } from '../../data/gift';
import { gardenFlowers, gardenLeaves } from '../../data/garden';
import { Flower } from '../botanicals/Flower';
import { Leaf } from '../botanicals/Leaf';
import { ParticleField } from '../ParticleField';
import { PetalDrift } from '../PetalDrift';

const DEPTH_STYLE = ['opacity-50 blur-[1.5px]', 'opacity-95', 'opacity-90 blur-[3px]'];

export function FlowerGarden() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const flowers = gsap.utils.toArray<HTMLElement>('.garden-flower');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom bottom', scrub: 0.8 }
      });
      flowers.forEach((el, i) => addBloom(tl, el, i * 0.16, 1.2));

      flowers.forEach((el) => {
        const depth = Number(el.dataset.depth);
        const dir = Number(el.dataset.rotate) > 0 ? 1 : -1;
        gsap.to(el, {
          y: -(depth + 1) * 70,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
        });
        gsap.to(el.querySelector('svg'), {
          rotation: dir * 28,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      gsap.from('.garden-copy > *', {
        opacity: 0,
        y: 24,
        filter: 'blur(8px)',
        stagger: 0.15,
        duration: 1.3,
        ease: 'gift',
        scrollTrigger: { trigger: root.current, start: 'top 20%' }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-chapter="1" aria-label="A garden of flowers" className="relative h-[200vh] overflow-clip">
      <div className="sticky top-0 h-screen w-full">
        <ParticleField density={0.9} />
        <PetalDrift count={10} />

        {gardenLeaves.map((leaf, i) =>
        <div
          key={`leaf-${i}`}
          className="absolute"
          style={{ left: `${leaf.x}%`, top: `${leaf.y}%`, width: `${leaf.size}vmin`, transform: `rotate(${leaf.rotate}deg)` }}
          aria-hidden="true">
          
            <Leaf className="sway w-full opacity-70" style={{ animationDelay: `${-i * 1.3}s` }} />
          </div>
        )}

        {gardenFlowers.map((f, i) =>
        <div
          key={`flower-${i}`}
          className={`garden-flower absolute ${DEPTH_STYLE[f.depth]}`}
          data-depth={f.depth}
          data-rotate={f.rotate}
          style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.size}vmin`, zIndex: f.depth }}
          aria-hidden="true">
          
            <Flower kind={f.kind} className="h-auto w-full" style={{ transform: `rotate(${f.rotate}deg)` }} />
          </div>
        )}

        <div className="garden-copy relative z-[5] mx-auto flex h-full max-w-xl flex-col items-center justify-center px-8 text-center">
          <p className="font-script text-5xl text-gold md:text-6xl">{garden.accent}</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] text-ivory">{garden.title}</h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ivory/60">{garden.body}</p>
        </div>
      </div>
    </section>);

}