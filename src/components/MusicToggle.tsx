import React from 'react';
import { motion } from 'framer-motion';
import { useAmbientMusic } from '../hooks/useAmbientMusic';
import { music } from '../data/gift';

export function MusicToggle({ visible }: {visible: boolean;}) {
  const { playing, toggle } = useAmbientMusic();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
      data-cursor={playing ? 'Pause' : 'Play'}
      initial={{ opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      whileTap={{ scale: 0.96 }}
      className={`fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-full border px-4 py-2.5 backdrop-blur-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:bottom-7 md:left-7 ${
      playing ? 'border-gold/60 bg-gold/15 text-ivory' : 'border-ivory/15 bg-plum/50 text-ivory/80 hover:border-gold/40'} ${
      visible ? '' : 'pointer-events-none'}`}>
      
      <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) =>
        <motion.span
          key={i}
          className="block w-[2px] origin-bottom rounded-full bg-gold"
          style={{ height: 14 }}
          animate={playing ? { scaleY: [0.3, 1, 0.5, 0.85, 0.3] } : { scaleY: 0.3 }}
          transition={playing ? { duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' } : { duration: 0.2 }} />

        )}
      </span>
      <span className="text-[13px] font-medium tracking-wide">♪ {music.label}</span>
    </motion.button>);

}