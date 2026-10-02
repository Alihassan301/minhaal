import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { addBloom } from '../../utils/bloom';
import { finalMessage } from '../../data/gift';
import { Flower } from '../botanicals/Flower';
import { Leaf } from '../botanicals/Leaf';
import { ParticleField } from '../ParticleField';
import { PetalDrift } from '../PetalDrift';
import { RichLine } from '../RichLine';
import type { FlowerKind } from '../../types/gift';

const FRAME_FLOWERS: {kind: FlowerKind;className: string;}[] = [
{ kind: 'rose', className: '-left-[8vmin] -top-[8vmin] w-[34vmin]' },
{ kind: 'blossom', className: 'left-[22vmin] top-[6vmin] w-[10vmin] opacity-80' },
{ kind: 'sunflower', className: '-right-[10vmin] -bottom-[10vmin] w-[38vmin]' },
{ kind: 'peony', className: '-left-[6vmin] -bottom-[8vmin] w-[28vmin]' },
{ kind: 'rose', className: '-right-[4vmin] -top-[6vmin] w-[22vmin]' },
{ kind: 'blossom', className: 'right-[24vmin] bottom-[6vmin] w-[9vmin] opacity-80' }];


export function FinalMessage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ isPhone: '(max-width: 767px)', isWide: '(min-width: 768px)' }, (context) => {
        const { isPhone } = context.conditions as { isPhone: boolean; isWide: boolean };
        const lines = gsap.utils.toArray<HTMLElement>('.fm-line');
        const splits = lines.map((line) => SplitText.create(line, { type: 'chars,words' }));
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: isPhone ? '+=320%' : '+=440%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        gsap.utils.toArray<HTMLElement>('.fm-flower').forEach((f, i) => addBloom(tl, f, i * 0.15, 1.4));
        tl.from('.fm-leaf', { opacity: 0, scale: 0.4, stagger: 0.1, duration: 0.8, ease: 'gift' }, 0.2);
        tl.fromTo('.fm-glow', { scale: 0.4, opacity: 0 }, { scale: 1.4, opacity: 1, duration: 6.5, ease: 'none' }, 0);
        tl.to('.fm-flower svg', { rotation: (i) => i % 2 ? 30 : -30, duration: 7, ease: 'none' }, 0);

        splits.forEach((split, i) => {
          const at = 0.6 + i * 1.6;
          tl.fromTo(
            split.chars,
            { opacity: 0, y: 24, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.035, duration: 0.6, ease: 'gift' },
            at
          );
          if (i < splits.length - 1) {
            tl.to(lines[i], { opacity: 0, y: -30, filter: 'blur(8px)', duration: 0.5, ease: 'none' }, at + 1.15);
          }
        });
        tl.to({}, { duration: 0.8 });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const last = finalMessage.lines.length - 1;

  return (
    <section
      ref={root}
      data-chapter="5"
      aria-label="A final message"
      className="relative flex h-[100svh] min-h-[480px] w-full items-center justify-center overflow-hidden sm:min-h-[540px] md:min-h-[600px]">
      
      <div
        aria-hidden="true"
        className="fm-glow pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(216,184,120,0.16) 0%, rgba(216,184,120,0) 65%)' }} />
      
      <ParticleField density={1} />
      <PetalDrift count={12} />

      {FRAME_FLOWERS.map((f, i) =>
      <div key={i} className={`fm-flower pointer-events-none absolute ${f.className}`} aria-hidden="true">
          <Flower kind={f.kind} className="h-auto w-full" />
        </div>
      )}
      <div className="fm-leaf pointer-events-none absolute left-[18vmin] top-[22vmin] w-[7vmin] rotate-[120deg]" aria-hidden="true">
        <Leaf className="sway w-full" />
      </div>
      <div className="fm-leaf pointer-events-none absolute bottom-[24vmin] right-[20vmin] w-[7vmin] -rotate-[60deg]" aria-hidden="true">
        <Leaf className="sway w-full" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative z-10 grid w-full place-items-center px-4 text-center sm:px-6">
        {finalMessage.lines.map((line, i) =>
        <p
          key={line}
          className={`fm-line font-display font-light leading-[1.05] text-ivory [grid-area:1/1] ${
          i === last ? 'text-[clamp(2.25rem,9vw,8rem)]' : 'text-[clamp(1.9rem,7vw,6.5rem)] italic'}`
          }>
          
            <RichLine text={line} nameClassName="font-script text-[1.2em] text-gold" />
          </p>
        )}
      </div>
    </section>);

}