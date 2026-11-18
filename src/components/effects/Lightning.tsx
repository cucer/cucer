'use client';

import { useEffect, useRef } from 'react';

/* Distant lightning in the storm: every so often a forked bolt drops from the
   top of the sky and lights the dust around it for a moment. Kept soft and
   rare on purpose: no full-screen strobe, never more than three flickers. */
const LIGHTNING_CONFIG = {
  /* Seconds between strikes. */
  gap: { min: 5, max: 12 },
  /* Bolts land in the open sky either side of the figure, as fractions of the
     width; the middle is masked off in the stylesheet anyway. */
  lanes: [
    [0.04, 0.24],
    [0.88, 0.97],
  ],
  flickers: { min: 1, max: 3 },
  fadeMs: 420,
  /* On load: one strike on each side in turn (lane indexes), once the scene
     has faded in, before the random rhythm takes over. */
  intro: { lanes: [1, 0], delay: 1.6, gap: 0.9 },
};

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

type Point = { x: number; y: number };
type Segment = { points: Point[]; width: number };

/* A jagged line from (x, y) downward, with the odd thinner branch. */
function buildBolt(x: number, y: number, length: number, width: number, depth = 0): Segment[] {
  const points: Point[] = [{ x, y }];
  const segments: Segment[] = [];
  const step = length / 14;
  let current = { x, y };
  for (let i = 0; i < 14; i++) {
    current = { x: current.x + randomInRange(-step * 0.7, step * 0.7), y: current.y + step };
    points.push(current);
    if (depth < 2 && Math.random() < 0.18) {
      segments.push(...buildBolt(current.x, current.y, length * 0.4, width * 0.5, depth + 1));
    }
  }
  segments.unshift({ points, width });
  return segments;
}

/* Lightning on a canvas that fills its positioned parent. */
export default function Lightning({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    /* Flashes are exactly what reduced motion asks to avoid. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = host.offsetHeight || window.innerHeight;
    };

    resizeCanvas();

    let frame = 0;
    let timer = 0;

    const drawStrike = (bolt: Segment[], origin: Point, strength: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      /* The dust lit up around the bolt. */
      const glow = context.createRadialGradient(origin.x, origin.y + canvas.height * 0.3, 0, origin.x, origin.y + canvas.height * 0.3, canvas.height * 0.7);
      glow.addColorStop(0, `rgba(255, 214, 170, ${0.35 * strength})`);
      glow.addColorStop(1, 'rgba(255, 214, 170, 0)');
      context.globalAlpha = 1;
      context.fillStyle = glow;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.shadowColor = 'rgba(255, 220, 190, 0.9)';
      context.shadowBlur = 18;
      bolt.forEach((segment) => {
        context.globalAlpha = strength;
        context.strokeStyle = '#fff3e4';
        context.lineWidth = segment.width;
        context.beginPath();
        segment.points.forEach((point, index) =>
          index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y)
        );
        context.stroke();
      });
      context.shadowBlur = 0;
    };

    const introQueue = [...LIGHTNING_CONFIG.intro.lanes];

    const strike = () => {
      const lane = introQueue.shift() ?? Math.floor(Math.random() * LIGHTNING_CONFIG.lanes.length);
      const [from, to] = LIGHTNING_CONFIG.lanes[lane];
      const origin = { x: randomInRange(from, to) * canvas.width, y: -10 };
      const bolt = buildBolt(origin.x, origin.y, canvas.height * randomInRange(0.45, 0.75), randomInRange(1.6, 2.6));

      /* A few quick flickers, then a slow fade. */
      const flickers = Math.round(randomInRange(LIGHTNING_CONFIG.flickers.min, LIGHTNING_CONFIG.flickers.max));
      const schedule: number[] = [];
      let at = 0;
      for (let i = 0; i < flickers; i++) {
        schedule.push(at);
        at += randomInRange(90, 180);
      }
      const start = performance.now();
      const end = at + LIGHTNING_CONFIG.fadeMs;

      const animate = (now: number) => {
        const elapsed = now - start;
        if (elapsed > end) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          const wait =
            introQueue.length > 0
              ? LIGHTNING_CONFIG.intro.gap
              : randomInRange(LIGHTNING_CONFIG.gap.min, LIGHTNING_CONFIG.gap.max);
          timer = window.setTimeout(strike, wait * 1000);
          return;
        }
        const lastFlicker = schedule.filter((t) => t <= elapsed).pop() ?? 0;
        const sinceFlicker = elapsed - lastFlicker;
        const strength =
          elapsed >= at ? 1 - (elapsed - at) / LIGHTNING_CONFIG.fadeMs : sinceFlicker < 60 ? 1 : 0.35;
        drawStrike(bolt, origin, Math.max(0, strength));
        frame = requestAnimationFrame(animate);
      };

      frame = requestAnimationFrame(animate);
    };

    timer = window.setTimeout(strike, LIGHTNING_CONFIG.intro.delay * 1000);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
