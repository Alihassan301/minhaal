import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { addBloom } from '../../utils/bloom';
import { wishes } from '../../data/gift';
import { Flower } from '../botanicals/Flower';
import type { FlowerKind } from '../../types/gift';

const ALIGN = ['md:text-left md:pr-[28%]', 'md:text-right md:pl-[28%]', 'md:text-center md:px-[12%]', 'md:text-left md:pl-[10%] md:pr-[20%]'];
const ALIGN_FLOWER = ['md:justify-start', 'md:justify-end', 'md:justify-center', 'md:justify-start md:pl-[10%]'];
const KINDS: FlowerKind[] = ['blossom', 'rose', 'sunflower', 'peony'];

export function Wishes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.wishes-heading > *', {
        opacity: 0,
        y: 40,
        filter: 'blur(12px)',
        stagger: 0.18,
        duration: 1.4,
        ease: 'gift',
        scrollTrigger: { trigger: '.wishes-heading', start: 'top 80%' }
      });

      gsap.utils.toArray<HTMLElement>('.wish').forEach((wish, i) => {
        const text = wish.querySelector<HTMLElement>('.wish-text');
        if (!text) return;
        const tl = gsap.timeline({
          defaults: { ease: 'gift' },
          scrollTrigger: { trigger: wish, start: 'top 78%', toggleActions: 'play none none reverse' }
        });

        switch (i % 4) {
          case 0:{
              const s = SplitText.create(text, { type: 'words' });
              tl.from(s.words, { opacity: 0, filter: 'blur(16px)', scale: 1.06, duration: 1.3, stagger: 0.09 });
              break;
            }
          case 1:{
              const s = SplitText.create(text, { type: 'lines', mask: 'lines' });
              tl.from(s.lines, { yPercent: 105, duration: 1.2, stagger: 0.12 });
              break;
            }
          case 2:{
              const s = SplitText.create(text, { type: 'chars,words' });
              tl.from(s.chars, { opacity: 0, yPercent: 50, rotateX: -80, transformPerspective: 600, duration: 0.9, stagger: 0.022 });
              break;
            }
          default:
            tl.fromTo(
              text,
              { clipPath: 'inset(-10% 100% -10% 0%)' },
              { clipPath: 'inset(-10% 0% -10% 0%)', duration: 1.5, ease: 'giftInOut' }
            );
        }
        addBloom(tl, wish.querySelector('.wish-flower'), 0.1, 1.1);

        gsap.fromTo(
          text,
          { y: i % 2 ? 40 : -20 },
          {
            y: i % 2 ? -40 : 20,
            ease: 'none',
            scrollTrigger: { trigger: wish, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="wishes" data-chapter="2" aria-labelledby="wishes-title" className="relative px-6 py-[20vh] md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="wishes-title" className="wishes-heading mb-[14vh] text-center">
          <span className="block font-display text-[clamp(2.75rem,7vw,6rem)] font-light leading-none text-ivory">
            {wishes.heading}
          </span>
          <span className="mt-2 block font-script text-[clamp(3rem,8vw,6.5rem)] leading-none text-gold">{wishes.accent}</span>
        </h2>

        <ul className="space-y-[10vh]">
          {wishes.items.map((item, i) =>
          <li key={item} className={`wish text-center [perspective:800px] ${ALIGN[i % 4]}`}>
              <div className={`mb-5 flex justify-center ${ALIGN_FLOWER[i % 4]}`} aria-hidden="true">
                <div className="wish-flower w-9 md:w-11">
                  <Flower kind={KINDS[i % 4]} className="h-auto w-full" />
                </div>
              </div>
              <p
              className={`wish-text inline-block px-2 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[1.02] text-ivory ${
              i % 2 ? 'italic' : ''}`
              }>
              
                {item}
              </p>
            </li>
          )}
        </ul>
      </div>
    </section>);

}