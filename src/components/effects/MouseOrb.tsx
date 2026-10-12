'use client';

import { useEffect, useRef } from 'react';

/* A soft glow that eases after the pointer, carried over from the previous
   site; styled by .mouse-orb in globals.css. It starts in the middle of the
   screen and is skipped entirely for visitors who ask for reduced motion. */
export default function MouseOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return <div ref={orbRef} className="mouse-orb" aria-hidden="true" />;
}
