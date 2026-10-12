'use client';

import { useEffect } from 'react';

type Classes = {
  wordsVisible: string;
  fadeUp: string;
  isVisible: string;
};

const HIDDEN_MASK = 'radial-gradient(circle 0px at -999px -999px, #fff, transparent)';

/* Spotlight radius follows the screen: a phone gets a smaller circle. */
const spotlightRadius = () =>
  window.innerWidth < 480 ? 120 : window.innerWidth < 720 ? 160 : 260;

const spotlightMask = (x: number, y: number, radius: number) =>
  `radial-gradient(circle ${radius}px at ${x}px ${y}px, #fff 0%, #fff 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, transparent 100%)`;

/* The hero's behaviour: the reveal layer shows through a circle that follows
   the pointer, and the words and fade-ups start once they scroll into view.
   Class names come in as props because the CSS module renames them; headings
   that split into words are marked with data-words. */
export default function SpotlightEffects({ classes }: { classes: Classes }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-spotlight]');
    const reveal = root?.querySelector<HTMLElement>('[data-reveal]');
    if (!root || !reveal) return;

    /* Spotlight, at most once per frame. */
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      if (!pointer) return;
      const rect = reveal.getBoundingClientRect();
      const mask = spotlightMask(pointer.x - rect.left, pointer.y - rect.top, spotlightRadius());
      reveal.style.webkitMaskImage = mask;
      reveal.style.maskImage = mask;
    };

    const track = (x: number, y: number) => {
      pointer = { x, y };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMouseMove = (event: MouseEvent) => track(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) track(touch.clientX, touch.clientY);
    };

    reveal.style.webkitMaskImage = HIDDEN_MASK;
    reveal.style.maskImage = HIDDEN_MASK;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    /* Scroll reveal. */
    const words = root.querySelectorAll<HTMLElement>('[data-words]');
    const fades = root.querySelectorAll<HTMLElement>(`.${classes.fadeUp}`);
    const observers: IntersectionObserver[] = [];

    if (typeof IntersectionObserver === 'undefined') {
      words.forEach((element) => element.classList.add(classes.wordsVisible));
      fades.forEach((element) => element.classList.add(classes.isVisible));
    } else {
      const observe = (
        elements: NodeListOf<HTMLElement>,
        threshold: number,
        visibleClass: string
      ) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add(visibleClass);
              observer.unobserve(entry.target);
            });
          },
          { threshold }
        );
        elements.forEach((element) => observer.observe(element));
        observers.push(observer);
      };

      observe(words, 0.2, classes.wordsVisible);
      observe(fades, 0.15, classes.isVisible);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [classes]);

  return null;
}
