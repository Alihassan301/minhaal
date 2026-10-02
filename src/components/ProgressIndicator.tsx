import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { chapters } from '../data/gift';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { scrollToTarget } from '../utils/smoothScroll';

const EASE = [0.23, 1, 0.32, 1] as const;

export function ProgressIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-chapter]');
    const triggers = sections.map((section) =>
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) setActive(Number(section.dataset.chapter));
      }
    })
    );
    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const current = chapters[active];

  return (
    <>
      <motion.nav
        aria-label="Chapters of the gift"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        
        <ol className="flex flex-col items-end gap-4">
          {chapters.map((chapter, i) => {
            const isActive = i === active;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => scrollToTarget(`#${chapter.id}`)}
                  aria-current={isActive ? 'step' : undefined}
                  data-cursor="Explore"
                  className="group flex items-center gap-3 rounded-full py-1 pl-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold">
                  
                  <AnimatePresence initial={false}>
                    {isActive &&
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="whitespace-nowrap font-display text-base italic text-ivory">
                      
                        {chapter.label}
                      </motion.span>
                    }
                  </AnimatePresence>
                  <span
                    className={`font-display text-sm tabular-nums transition-colors duration-200 ${
                    isActive ? 'text-gold' : 'text-ivory/35 group-hover:text-ivory/70'}`
                    }>
                    
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block h-px transition-[width,background-color] duration-200 ${
                    isActive ? 'w-8 bg-gold' : 'w-3 bg-ivory/25 group-hover:w-5'}`
                    } />
                  
                </button>
              </li>);

          })}
        </ol>
      </motion.nav>

      <div className="fixed bottom-5 right-5 z-50 md:hidden" aria-live="polite">
        <div className="flex items-center gap-2 rounded-full border border-ivory/15 bg-plum/60 px-4 py-2.5 backdrop-blur-md">
          <span className="font-display text-sm tabular-nums text-gold">{String(active + 1).padStart(2, '0')}</span>
          <span className="h-3 w-px bg-ivory/20" aria-hidden="true" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="whitespace-nowrap font-display text-sm italic text-ivory">
              
              {current.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </>);

}