import React from 'react';
import type { CSSProperties } from 'react';
import type { FlowerKind } from '../../types/gift';

interface Ring {
  count: number;
  length: number;
  width: number;
  fill: string;
  rotate: number;
  opacity?: number;
}

interface FlowerProps {
  kind: FlowerKind;
  className?: string;
  style?: CSSProperties;
  /** Render as a single-colour silhouette (used for floral shadows). */
  tone?: string;
}

const RINGS: Record<FlowerKind, Ring[]> = {
  rose: [
  { count: 5, length: 92, width: 66, fill: '#4A1F32', rotate: 0 },
  { count: 5, length: 78, width: 58, fill: '#6E2B45', rotate: 36 },
  { count: 5, length: 62, width: 48, fill: '#9A4D66', rotate: 12 },
  { count: 4, length: 46, width: 40, fill: '#C98298', rotate: 52 },
  { count: 4, length: 30, width: 28, fill: '#E8A7B8', rotate: 8 }],

  sunflower: [
  { count: 22, length: 94, width: 15, fill: '#A9843F', rotate: 8 },
  { count: 22, length: 84, width: 14, fill: '#D8B878', rotate: 0 }],

  blossom: [
  { count: 5, length: 74, width: 50, fill: '#E8A7B8', rotate: 0, opacity: 0.95 },
  { count: 5, length: 48, width: 30, fill: '#FFF8F0', rotate: 36, opacity: 0.55 }],

  peony: [
  { count: 8, length: 92, width: 50, fill: '#A9586F', rotate: 0 },
  { count: 8, length: 76, width: 44, fill: '#C98298', rotate: 22.5 },
  { count: 7, length: 58, width: 36, fill: '#E8A7B8', rotate: 10 },
  { count: 6, length: 38, width: 26, fill: '#F6D5DD', rotate: 30 }]

};

// Golden-angle seed pattern for the sunflower disc.
const SEEDS = Array.from({ length: 70 }, (_, i) => {
  const r = 28 * Math.sqrt(i / 70);
  const a = i * 2.39996;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
});

function petalPath(l: number, w: number) {
  return `M0,0 C${w * 0.9},${-l * 0.25} ${w * 0.75},${-l * 0.95} 0,${-l} C${-w * 0.75},${-l * 0.95} ${-w * 0.9},${-l * 0.25} 0,0Z`;
}

export function Flower({ kind, className = '', style, tone }: FlowerProps) {
  const rings = RINGS[kind];
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} aria-hidden="true" overflow="visible">
      {rings.map((ring, ri) =>
      <g key={ri} className="flower-ring">
          {Array.from({ length: ring.count }).map((_, pi) =>
        <g key={pi} transform={`rotate(${ring.rotate + 360 / ring.count * pi})`}>
              <path
            d={petalPath(ring.length, ring.width)}
            fill={tone ?? ring.fill}
            fillOpacity={ring.opacity ?? 1}
            stroke={tone ? 'none' : '#D8B878'}
            strokeOpacity={0.3}
            strokeWidth={0.6} />
          
              {!tone &&
          <path d={`M0,-6 L0,${-ring.length * 0.72}`} stroke="#FFF8F0" strokeOpacity={0.12} strokeWidth={0.6} />
          }
            </g>
        )}
        </g>
      )}
      <g className="flower-core">
        <FlowerCore kind={kind} tone={tone} />
      </g>
    </svg>);

}

function FlowerCore({ kind, tone }: {kind: FlowerKind;tone?: string;}) {
  if (tone) return <circle r={kind === 'sunflower' ? 30 : 10} fill={tone} />;
  switch (kind) {
    case 'rose':
      return (
        <>
          <circle r={14} fill="#F2C3CF" />
          <path
            d="M0,0 c3,-5 10,-4 10,3 c0,8 -11,11 -16,3 c-5,-10 5,-19 16,-15"
            fill="none"
            stroke="#9A4D66"
            strokeWidth={1.4}
            strokeLinecap="round" />
          
        </>);

    case 'sunflower':
      return (
        <>
          <circle r={32} fill="#3A1726" />
          <circle r={32} fill="none" stroke="#D8B878" strokeOpacity={0.5} strokeWidth={1} />
          {SEEDS.map((s, i) =>
          <circle key={i} cx={s.x} cy={s.y} r={1.3} fill="#D8B878" fillOpacity={0.55} />
          )}
        </>);

    case 'blossom':
      return (
        <>
          {Array.from({ length: 9 }).map((_, i) => {
            const a = i / 9 * Math.PI * 2;
            return (
              <g key={i}>
                <line x1={0} y1={0} x2={Math.cos(a) * 17} y2={Math.sin(a) * 17} stroke="#D8B878" strokeWidth={0.9} />
                <circle cx={Math.cos(a) * 17} cy={Math.sin(a) * 17} r={1.8} fill="#D8B878" />
              </g>);

          })}
          <circle r={5} fill="#D8B878" />
        </>);

    case 'peony':
      return (
        <>
          <circle r={14} fill="#FFF8F0" fillOpacity={0.85} />
          <circle cx={-5} cy={-3} r={5} fill="#F6D5DD" />
          <circle cx={5} cy={2} r={6} fill="#E8A7B8" />
          <circle cx={-1} cy={6} r={4} fill="#D8B878" fillOpacity={0.7} />
        </>);

  }
}