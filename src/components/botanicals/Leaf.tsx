import React from 'react';
import type { CSSProperties } from 'react';

interface LeafProps {
  className?: string;
  style?: CSSProperties;
}

export function Leaf({ className = '', style }: LeafProps) {
  return (
    <svg viewBox="0 0 60 120" className={className} style={style} aria-hidden="true">
      <path
        d="M30 118 C 4 90, 2 40, 30 2 C 58 40, 56 90, 30 118Z"
        fill="#3B4634"
        stroke="#D8B878"
        strokeOpacity={0.35}
        strokeWidth={0.8} />
      
      <path d="M30 116 L30 10" stroke="#D8B878" strokeOpacity={0.4} strokeWidth={0.8} />
      {[34, 54, 74, 94].map((y) =>
      <g key={y} stroke="#D8B878" strokeOpacity={0.22} strokeWidth={0.6} fill="none">
          <path d={`M30 ${y} Q 40 ${y - 8} 46 ${y - 16}`} />
          <path d={`M30 ${y} Q 20 ${y - 8} 14 ${y - 16}`} />
        </g>
      )}
    </svg>);

}