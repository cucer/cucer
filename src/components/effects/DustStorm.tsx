'use client';

import { useEffect, useRef } from 'react';

/* A dead, sunbaked world: grit and sand driven sideways by a wind that keeps
   gusting, with slow clouds of dust rolling through the scene. */
const DUST_CONFIG = {
  /* Grains per 10,000 px² of canvas, so phones are not overcrowded. */
  density: 0.22,
  maxGrains: 420,
  wind: { min: 0.8, max: 3.4 },
  size: { min: 0.5, max: 2.2 },
  clouds: 5,
};

const SAND_COLORS = ['#f3d2a2', '#e8b27a', '#d4965a', '#b8743f', '#3a2418'];

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

/* depth runs from far (0.2) to near (1): near grains are bigger, faster and
   streak more. */
type Grain = { x: number; y: number; depth: number; size: number; color: string; phase: number };
type Cloud = { x: number; y: number; radius: number; speed: number; alpha: number };

/* Windblown sand on a canvas that fills its positioned parent. */
export default function DustStorm({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const newGrain = (x: number): Grain => {
      const depth = randomInRange(0.2, 1);
      return {
        x,
        y: Math.random() * canvas.height,
        depth,
        size: randomInRange(DUST_CONFIG.size.min, DUST_CONFIG.size.max) * depth,
        color: SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      };
    };

    const newCloud = (x: number): Cloud => ({
      x,
      y: randomInRange(0.15, 1) * canvas.height,
      radius: randomInRange(0.25, 0.55) * Math.max(canvas.width, canvas.height),
      speed: randomInRange(0.15, 0.45),
      alpha: randomInRange(0.03, 0.08),
    });

    let grains: Grain[] = [];
    let clouds: Cloud[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = host.offsetHeight || window.innerHeight;
      const count = Math.min(
        DUST_CONFIG.maxGrains,
        Math.round(((canvas.width * canvas.height) / 10000) * DUST_CONFIG.density)
      );
      grains = Array.from({ length: count }, () => newGrain(Math.random() * canvas.width));
      clouds = Array.from({ length: DUST_CONFIG.clouds }, () => newCloud(Math.random() * canvas.width));
    };

    resizeCanvas();

    /* Two slow waves plus a rarer, sharper one: calm stretches broken by gusts. */
    const gustAt = (time: number) => {
      const swell = 0.5 + 0.5 * Math.sin(time * 0.00035);
      const flutter = 0.15 * Math.sin(time * 0.0017);
      const burst = Math.max(0, Math.sin(time * 0.00021 + 1.3)) ** 6;
      return 0.55 + swell * 0.6 + flutter + burst * 1.4;
    };

    const drawClouds = (gust: number) => {
      clouds.forEach((cloud, index) => {
        cloud.x -= cloud.speed * gust;
        if (cloud.x < -cloud.radius) clouds[index] = newCloud(canvas.width + cloud.radius);
        const haze = context.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        haze.addColorStop(0, `rgba(196, 128, 70, ${cloud.alpha})`);
        haze.addColorStop(1, 'rgba(196, 128, 70, 0)');
        context.globalAlpha = 1;
        context.fillStyle = haze;
        context.fillRect(cloud.x - cloud.radius, cloud.y - cloud.radius, cloud.radius * 2, cloud.radius * 2);
      });
    };

    const drawGrains = (time: number, gust: number, move: boolean) => {
      grains.forEach((grain, index) => {
        const speed = (DUST_CONFIG.wind.min + (DUST_CONFIG.wind.max - DUST_CONFIG.wind.min) * grain.depth) * gust;
        const lift = Math.sin(time * 0.002 + grain.phase) * 0.35 * grain.depth;
        if (move) {
          grain.x -= speed;
          grain.y += lift + 0.12;
          if (grain.x < -10 || grain.y > canvas.height + 10) {
            grains[index] = newGrain(canvas.width + randomInRange(0, 40));
            return;
          }
        }
        context.globalAlpha = 0.25 + grain.depth * 0.55;
        context.strokeStyle = grain.color;
        context.lineWidth = grain.size;
        context.lineCap = 'round';
        /* Near grains caught in a gust smear into short streaks. */
        const streak = Math.max(grain.size, speed * grain.depth * 2.2);
        context.beginPath();
        context.moveTo(grain.x, grain.y);
        context.lineTo(grain.x + streak, grain.y - lift);
        context.stroke();
      });
    };

    let frame = 0;

    const draw = (time: number) => {
      const gust = gustAt(time);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawClouds(gust);
      drawGrains(time, gust, true);
      frame = requestAnimationFrame(draw);
    };

    if (reduceMotion) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawGrains(0, 1, false);
    } else {
      frame = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
