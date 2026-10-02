import { gsap } from './gsap';

interface BurstOptions {
  count?: number;
  spread?: number;
  petals?: boolean;
  colors?: string[];
}

/** Golden dust (and optional petals) bursting from the centre of a container. */
export function burst(
container: HTMLElement,
{ count = 32, spread = 280, petals = false, colors = ['#D8B878', '#FFF8F0', '#E8A7B8'] }: BurstOptions = {})
{
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 767px)').matches;
  const total = reduce ? Math.round(count / 4) : mobile ? Math.round(count * 0.6) : count;

  for (let i = 0; i < total; i++) {
    const isPetal = petals && i % 3 === 0;
    const color = isPetal ? i % 2 ? '#E8A7B8' : '#C98298' : colors[i % colors.length];
    const size = isPetal ? gsap.utils.random(9, 16) : gsap.utils.random(2, 5.5);
    const el = document.createElement('span');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = [
    'position:absolute',
    'left:50%',
    'top:50%',
    `width:${size}px`,
    `height:${isPetal ? size * 1.35 : size}px`,
    `margin:${-size / 2}px 0 0 ${-size / 2}px`,
    `border-radius:${isPetal ? '80% 0 80% 0' : '9999px'}`,
    `background:${color}`,
    'pointer-events:none',
    'will-change:transform,opacity',
    isPetal ? '' : `box-shadow:0 0 ${size * 3}px ${color}`].
    join(';');
    container.appendChild(el);

    const angle = gsap.utils.random(0, Math.PI * 2);
    const dist = gsap.utils.random(spread * 0.25, spread);
    gsap.fromTo(
      el,
      { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0 },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - gsap.utils.random(20, 90),
        opacity: 0,
        scale: gsap.utils.random(0.4, 1),
        rotation: gsap.utils.random(-220, 220),
        duration: gsap.utils.random(1.3, 2.4),
        ease: 'power3.out',
        onComplete: () => el.remove()
      }
    );
  }
}