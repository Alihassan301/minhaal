import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from '../utils/gsap';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { Atmosphere } from './Atmosphere';
import { Cursor } from './Cursor';
import { MusicToggle } from './MusicToggle';
import { ProgressIndicator } from './ProgressIndicator';
import { Opening } from './sections/Opening';
import { Hero } from './sections/Hero';
import { WordsForYou } from './sections/WordsForYou';
import { FlowerGarden } from './sections/FlowerGarden';
import { Wishes } from './sections/Wishes';
import { Memories } from './sections/Memories';
import { Surprise } from './sections/Surprise';
import { GardenOfWishes } from './sections/GardenOfWishes';
import { Appreciation } from './sections/Appreciation';
import { FinalMessage } from './sections/FinalMessage';
import { Finale } from './sections/Finale';

export function GiftExperience({ showOpening }: {showOpening: boolean;}) {
  const [fontsReady, setFontsReady] = useState(false);
  const [revealed, setRevealed] = useState(!showOpening);
  const [openingVisible, setOpeningVisible] = useState(showOpening);

  useSmoothScroll(openingVisible);

  // Text is split into lines/words, so wait for the typefaces before building sections.
  useEffect(() => {
    let alive = true;
    const done = () => alive && setFontsReady(true);
    if (document.fonts?.ready) document.fonts.ready.then(done);else
    done();
    const fallback = window.setTimeout(done, 2500);
    return () => {
      alive = false;
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('load', onLoad);
    };
  }, [fontsReady, revealed]);

  return (
    <div className="relative min-h-[100svh] w-full overflow-x-clip bg-plum text-ivory">
      <Atmosphere />

      {fontsReady &&
      <main className="relative z-[1]">
          <Hero ready={revealed} />
          <WordsForYou />
          <FlowerGarden />
          <Wishes />
          <Memories />
          <Surprise />
          <GardenOfWishes />
          <Appreciation />
          <FinalMessage />
          <Finale />
        </main>
      }

      {fontsReady && revealed && <ProgressIndicator />}
      <MusicToggle visible={revealed} />
      <Cursor />

      {openingVisible && <Opening onReveal={() => setRevealed(true)} onFinish={() => setOpeningVisible(false)} />}
    </div>);

}