'use client';

import { useEffect, useRef } from 'react';

/* Carried over unchanged from the previous site's hero. */
const STAR_CONFIG = {
  count: 180,
  speed: { min: 0.3, max: 1.1 },
  size: { min: 0.6, max: 1.8 },
};

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

type Star = { x: number; y: number; size: number; speed: number; alpha: number };

/* Falling stars on a canvas that fills its positioned parent. */
export default function StarField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = host.offsetHeight || window.innerHeight;
    };

    resizeCanvas();

    const stars: Star[] = Array.from({ length: STAR_CONFIG.count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: randomInRange(STAR_CONFIG.size.min, STAR_CONFIG.size.max),
      speed: randomInRange(STAR_CONFIG.speed.min, STAR_CONFIG.speed.max),
      alpha: randomInRange(0.2, 0.8),
    }));

    let frame = 0;

    const drawStars = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -2;
          star.x = Math.random() * canvas.width;
        }
        context.globalAlpha = star.alpha;
        context.fillStyle = '#8af3fb';
        context.fillRect(star.x, star.y, star.size, star.size);
      });
      frame = requestAnimationFrame(drawStars);
    };

    frame = requestAnimationFrame(drawStars);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
