import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';

interface PetalDriftProps {
  count?: number;
  className?: string;
}

const COLORS = ['#E8A7B8', '#C98298', '#F6D5DD', '#D8B878'];

// Deterministic pseudo-random so petals don't reshuffle between renders.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function PetalDrift({ count = 12, className = '' }: PetalDriftProps) {
  const petals = useMemo(
    () =>
    Array.from({ length: count }, (_, i) => ({
      left: rand(i + 1) * 100,
      size: 7 + rand(i + 11) * 10,
      duration: 16 + rand(i + 21) * 16,
      delay: rand(i + 31) * 30,
      drift: (rand(i + 41) - 0.5) * 260,
      spin: (rand(i + 51) - 0.5) * 720,
      opacity: 0.35 + rand(i + 61) * 0.45,
      color: COLORS[i % COLORS.length],
      blur: rand(i + 71) > 0.7
    })),
    [count]
  );

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) =>
      <span
        key={i}
        className={`petal absolute top-[-6%] ${p.blur ? 'blur-[2px]' : ''}`}
        style={
        {
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 1.3,
          background: p.color,
          opacity: p.opacity,
          animationDuration: `${p.duration}s`,
          animationDelay: `${-p.delay}s`,
          '--drift': `${p.drift}px`,
          '--spin': `${p.spin}deg`
        } as CSSProperties
        } />

      )}
    </div>);

}