import { gsap } from './gsap';

/**
 * Adds a bloom (bud → open flower) for a Flower SVG to a timeline.
 * Rings open outer-first, then the core settles in.
 */
export function addBloom(
tl: gsap.core.Timeline,
flower: Element | null,
position: gsap.Position = 0,
duration = 1)
{
  if (!flower) return tl;
  const rings = flower.querySelectorAll('.flower-ring');
  const core = flower.querySelector('.flower-core');
  tl.fromTo(
    rings,
    { scale: 0.12, rotation: -60, opacity: 0, svgOrigin: '0 0' },
    { scale: 1, rotation: 0, opacity: 1, svgOrigin: '0 0', duration, stagger: duration * 0.12, ease: 'gift' },
    position
  );
  if (core) {
    tl.fromTo(
      core,
      { scale: 0.2, opacity: 0, svgOrigin: '0 0' },
      { scale: 1, opacity: 1, svgOrigin: '0 0', duration: duration * 0.7, ease: 'gift' },
      `<${duration * 0.35}`
    );
  }
  return tl;
}