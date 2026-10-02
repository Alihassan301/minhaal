import React, { useRef, useState } from 'react';
import { gsap, SplitText, useGSAP } from '../../utils/gsap';
import { addBloom } from '../../utils/bloom';
import { burst } from '../../utils/burst';
import { surprise } from '../../data/gift';
import { Flower } from '../botanicals/Flower';
import { Envelope } from '../Envelope';
import type { FlowerKind } from '../../types/gift';

const CARD_FLOWERS: {kind: FlowerKind;className: string;}[] = [
{ kind: 'rose', className: '-left-10 -top-10 w-24 md:-left-14 md:-top-14 md:w-32' },
{ kind: 'blossom', className: '-right-8 -top-8 w-16 md:-right-10 md:-top-10 md:w-20' },
{ kind: 'sunflower', className: '-bottom-10 -right-10 w-24 md:-bottom-14 md:-right-14 md:w-32' },
{ kind: 'peony', className: '-bottom-8 -left-8 w-16 md:-bottom-10 md:-left-10 md:w-24' }];


export function Surprise() {
  const root = useRef<HTMLElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      gsap.from('.sp-intro > *', {
        opacity: 0,
        y: 24,
        filter: 'blur(8px)',
        stagger: 0.14,
        duration: 1.2,
        ease: 'gift',
        scrollTrigger: { trigger: '.sp-intro', start: 'top 80%' }
      });
      gsap.from('.sp-envelope-wrap', {
        opacity: 0,
        y: 40,
        duration: 1.4,
        ease: 'gift',
        scrollTrigger: { trigger: '.sp-stage', start: 'top 80%' }
      });
      gsap.to('.sp-float', { y: -8, rotation: 0.8, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    },
    { scope: root }
  );

  const open = contextSafe(() => {
    if (opened) return;
    setOpened(true);
    const message = SplitText.create('.sp-message', { type: 'words' });
    const tl = gsap.timeline({ defaults: { ease: 'gift' } });

    tl.to('.sp-seal', { scale: 0.6, opacity: 0, duration: 0.3 }).
    to('.sp-flap', { rotateX: 180, duration: 0.7, ease: 'giftInOut' }, 0.1).
    set('.sp-flap', { zIndex: 1 }, 0.45).
    to('.sp-letter', { yPercent: -46, duration: 0.8 }, 0.6).
    add(() => {
      if (burstRef.current) burst(burstRef.current, { count: 44, spread: 320, petals: true });
    }, 0.95).
    to('.sp-envelope-wrap', { autoAlpha: 0, y: 50, scale: 0.94, duration: 0.6 }, 1.3).
    fromTo('.sp-card', { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 1.4);

    gsap.utils.toArray<HTMLElement>('.sp-flower').forEach((f, i) => addBloom(tl, f, 1.6 + i * 0.12, 1.2));

    tl.from('.sp-salutation', { opacity: 0, y: 10, duration: 0.7 }, 1.8).
    from(message.words, { opacity: 0, y: 12, filter: 'blur(6px)', stagger: 0.07, duration: 0.8 }, 1.95).
    fromTo(
      '.sp-signature',
      { clipPath: 'inset(-20% 100% -20% 0%)' },
      { clipPath: 'inset(-20% 0% -20% 0%)', duration: 1.8, ease: 'power2.inOut' },
      '>-0.1'
    ).
    from('.sp-sign-line', { scaleX: 0, transformOrigin: 'left center', duration: 1 }, '<0.8');
  });

  return (
    <section
      ref={root}
      id="surprise"
      data-chapter="4"
      aria-labelledby="sp-title"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-[18vh]">
      
      <div className="sp-intro text-center">
        <h2 id="sp-title" className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-none text-ivory">
          {surprise.heading}
        </h2>
        <p className="mt-3 font-script text-5xl text-gold md:text-6xl">{surprise.prompt}</p>
      </div>

      <div className="sp-stage relative mt-14 grid min-h-[480px] w-full max-w-2xl place-items-center md:min-h-[520px]">
        <div ref={burstRef} className="pointer-events-none absolute inset-0 z-20" aria-hidden="true" />

        <div className="sp-envelope-wrap flex flex-col items-center [grid-area:1/1]">
          <div className="sp-float">
            <button
              type="button"
              onClick={open}
              disabled={opened}
              data-cursor="Open"
              aria-label="Open the envelope"
              className="block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              
              <Envelope />
            </button>
          </div>
          <p className="mt-8 text-sm text-ivory/50">{surprise.hint}</p>
        </div>

        <div
          className="sp-card relative w-[min(88vw,560px)] [grid-area:1/1]"
          style={{ visibility: 'hidden', opacity: 0 }}
          aria-live="polite"
          aria-hidden={!opened}>
          
          {CARD_FLOWERS.map((f) =>
          <div key={f.kind} className={`sp-flower absolute z-10 ${f.className}`} aria-hidden="true">
              <Flower kind={f.kind} className="h-auto w-full" />
            </div>
          )}
          <div className="relative rounded-sm bg-ivory px-8 py-14 text-center text-plum shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] md:px-16 md:py-20">
            <p className="sp-salutation font-display text-lg italic text-burgundy/70">{surprise.salutation}</p>
            <p className="sp-message mt-6 font-display text-[clamp(1.9rem,4vw,2.75rem)] font-normal italic leading-[1.15] text-plum">
              {surprise.message}
            </p>
            <div className="mt-10 flex flex-col items-center">
              <p className="sp-signature px-4 font-script text-5xl text-burgundy md:text-6xl">{surprise.signature}</p>
              <span className="sp-sign-line mt-2 block h-px w-40 bg-gold" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>);

}