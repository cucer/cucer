'use client';

import { useEffect, useRef, useState } from 'react';

const STAR_CONFIG = {
  count: 180,
  speed: { min: 0.3, max: 1.1 },
  size: { min: 0.6, max: 1.8 },
};

/* Reveal slots, in the order they light up. The gap at 3 is the retired CTA
   group — keeping it preserves the original cadence of the entrance. */
const REVEAL_EYEBROW = 0;
const REVEAL_HEADING = 1;
const REVEAL_LEDE = 2;
const REVEAL_VISUAL = 4;
const REVEAL_SLOTS = 5;
const REVEAL_STEP_MS = 180;

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

type Star = { x: number; y: number; size: number; speed: number; alpha: number };

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  /* Entrance animation */
  useEffect(() => {
    const timers: number[] = [];
    let hasStarted = false;

    const startReveal = () => {
      if (hasStarted) return;
      hasStarted = true;
      for (let slot = 0; slot < REVEAL_SLOTS; slot += 1) {
        timers.push(
          window.setTimeout(() => setRevealedCount(slot + 1), slot * REVEAL_STEP_MS)
        );
      }
    };

    const onLoad = () => timers.push(window.setTimeout(startReveal, 1600));

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    timers.push(window.setTimeout(startReveal, 2200));

    return () => {
      window.removeEventListener('load', onLoad);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  /* Star field */
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = hero.offsetHeight || window.innerHeight;
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

  /* Cursor orb + parallax */
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const parallaxItems =
      document.querySelectorAll<HTMLElement>('[data-parallax]');
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const orbPos = { x: pointer.x, y: pointer.y };
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const animate = () => {
      orbPos.x += (pointer.x - orbPos.x) * 0.1;
      orbPos.y += (pointer.y - orbPos.y) * 0.1;
      orb.style.transform = `translate(${orbPos.x - orb.offsetWidth / 2}px, ${
        orbPos.y - orb.offsetHeight / 2
      }px)`;

      const xRatio = orbPos.x / window.innerWidth - 0.5;
      const yRatio = orbPos.y / window.innerHeight - 0.5;

      parallaxItems.forEach((item) => {
        const depth = parseFloat(item.dataset.parallax || '15');
        item.style.transform = `translate3d(${xRatio * depth}px, ${
          yRatio * depth
        }px, 0)`;
      });

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  const revealClass = (slot: number) => (revealedCount > slot ? ' is-in' : '');

  return (
    <section id="hero" ref={heroRef}>
      <canvas id="sparks" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="mouse-orb" ref={orbRef} aria-hidden="true"></div>
      <div className="hero-wrapper">
        <div className="hero-copy">
          <p className={`eyebrow${revealClass(REVEAL_EYEBROW)}`}>
            Old-school craft, modern AI tooling
          </p>
          <h1 className={revealClass(REVEAL_HEADING).trim()}>Web &amp; App developer</h1>
          <p className={`lede${revealClass(REVEAL_LEDE)}`}>
            Every product starts as a rough idea and ends as something people quietly
            depend on. I work that whole distance, from shaping the concept to building
            it properly, then staying for the unglamorous part that keeps it worth
            returning to.
          </p>
        </div>

        <div className={`hero-visual${revealClass(REVEAL_VISUAL)}`} data-parallax="25">
          <div className="tech-panel">
            <div className="panel-glow"></div>
            <div className="panel-grid"></div>
            <div className="panel-content">
              <p className="panel-label">Full-cycle orchestration</p>
              <h2>Projects, web, and apps</h2>
              <ul className="panel-stats">
                <li>
                  <span>01</span>Project management: roadmap rituals, risk boards, and
                  concise reporting
                </li>
                <li>
                  <span>02</span>Web development: modern component systems + honest API
                  wiring
                </li>
                <li>
                  <span>03</span>App development: React Native twins, native bridges,
                  and testflight-ready drops
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
