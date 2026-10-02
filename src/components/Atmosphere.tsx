import React from 'react';
import { ParticleField } from './ParticleField';
import { PetalDrift } from './PetalDrift';

/** Global, very quiet atmosphere: golden dust, a few petals, light leaks, grain. */
export function Atmosphere() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="leak absolute -left-[25vmax] -top-[25vmax] h-[70vmax] w-[70vmax] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #D8B878 0%, rgba(216,184,120,0) 65%)' }} />
        
        <div
          className="leak absolute -bottom-[30vmax] -right-[25vmax] h-[70vmax] w-[70vmax] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #C98298 0%, rgba(201,130,152,0) 65%)', animationDelay: '-11s' }} />
        
        <ParticleField density={0.45} />
        <PetalDrift count={6} />
      </div>
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.06] mix-blend-soft-light" />
    </>);

}