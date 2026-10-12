'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    /* Set by stageBootstrap in <head>. */
    __auFailsafe?: number;
  }
}

const FONT_WAIT_MS = 1200;
const SETTLE_TIMEOUT_MS = 2200;

/* Starts the entrance that stageBootstrap set up: once the fonts are in (or
   after 1.2s if they are not), plays the paused foreground on the next frame,
   then clears every entrance class as soon as the stage's animations end, so
   nothing keeps running afterwards. Does nothing when the document was never
   marked as entering — reduced motion, or the failsafe already fired. */
export default function Entrance() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains('is-entering')) return;

    let hasPlayed = false;
    let isCancelled = false;
    let frame = 0;
    const timers: number[] = [];

    const finish = () => {
      window.clearTimeout(window.__auFailsafe);
      html.classList.remove('is-entering', 'is-playing');
    };

    const play = () => {
      if (hasPlayed || isCancelled) return;
      hasPlayed = true;
      frame = requestAnimationFrame(() => {
        html.classList.add('is-playing');
        /* CSS modules rename keyframes, so the entrance is identified by where
           it runs — inside the stage — rather than by animation name. */
        const stage = document.querySelector('[data-stage]');
        const entrance = document.getAnimations().filter((animation) => {
          const target = (animation.effect as KeyframeEffect | null)?.target;
          return animation instanceof CSSAnimation && !!target && !!stage?.contains(target);
        });
        const settled = Promise.allSettled(entrance.map((animation) => animation.finished));
        const timeout = new Promise((resolve) => {
          timers.push(window.setTimeout(resolve, SETTLE_TIMEOUT_MS));
        });
        Promise.race([settled, timeout]).then(finish);
      });
    };

    timers.push(window.setTimeout(play, FONT_WAIT_MS));
    document.fonts?.ready.then(play);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
