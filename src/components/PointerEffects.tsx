'use client';

import { useEffect } from 'react';

const MAX_TRAILS = 32;

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

/* Comet trails are spawned at pointer rate, so they are written straight to the
   DOM rather than through React state — re-rendering a list on every mousemove
   would cost far more than the effect is worth. */
export default function PointerEffects() {
  useEffect(() => {
    const blockContextMenu = (event: MouseEvent) => event.preventDefault();
    window.addEventListener('contextmenu', blockContextMenu);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => window.removeEventListener('contextmenu', blockContextMenu);
    }

    const trails: HTMLSpanElement[] = [];

    const spawnTrail = (event: PointerEvent) => {
      const trail = document.createElement('span');
      trail.className = 'comet-trail';
      trail.style.width = `${randomInRange(18, 42)}px`;
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;

      const angle =
        Math.atan2(event.movementY || 0.001, event.movementX || 0.001) * (180 / Math.PI);
      trail.style.setProperty('--comet-angle', `${angle}deg`);

      document.body.appendChild(trail);
      trails.push(trail);

      if (trails.length > MAX_TRAILS) {
        trails.shift()?.remove();
      }

      trail.addEventListener(
        'animationend',
        () => {
          trail.remove();
          const index = trails.indexOf(trail);
          if (index > -1) trails.splice(index, 1);
        },
        { once: true }
      );
    };

    window.addEventListener('pointermove', spawnTrail);

    return () => {
      window.removeEventListener('contextmenu', blockContextMenu);
      window.removeEventListener('pointermove', spawnTrail);
      trails.forEach((trail) => trail.remove());
    };
  }, []);

  return null;
}
