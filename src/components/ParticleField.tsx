import React, { useEffect, useRef } from 'react';

interface ParticleFieldProps {
  density?: number;
  className?: string;
  /** rgb triplet as "r,g,b" */
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
}

/** Floating golden dust. Only animates while on screen. */
export function ParticleField({ density = 1, className = '', color = '216,184,120' }: ParticleFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    // A lower backing-store resolution on phones buys back a lot of fill rate,
    // and the dust is soft enough that nobody can tell.
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
    const halo = !mobile;
    let w = 0;
    let h = 0;
    let raf = 0;
    let inView = false;
    let hidden = document.visibilityState === 'hidden';
    let particles: Particle[] = [];

    const seed = () => {
      const count = Math.round(Math.min(150, w * h / 14000 * density * (mobile ? 0.45 : 1)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -(Math.random() * 0.26 + 0.04),
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.006
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const alpha = 0.35 + Math.sin(p.phase) * 0.3;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${Math.max(alpha, 0.05)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (halo && p.r > 1.4) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${color},${Math.max(alpha, 0.05) * 0.12})`;
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.speed;
        if (p.y < -6) {
          p.y = h + 6;
          p.x = Math.random() * w;
        }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    /** Start/stop the loop only when this canvas is both visible and on screen. */
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (inView && !hidden && !reduce) raf = requestAnimationFrame(step);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    // rootMargin starts the loop slightly before the canvas scrolls in, so the
    // dust is already moving instead of snapping to life on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: '160px 0px' }
    );
    io.observe(canvas);

    const onVisibility = () => {
      hidden = document.visibilityState === 'hidden';
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, color]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}