'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/* Rendered by the server so it covers the page from the very first paint, then
   dismissed on load — with a hard 4s ceiling so a stalled asset can never trap
   the visitor behind it. */
export default function SplashScreen() {
  const [isHidden, setHidden] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    const hideAfterLoad = () => {
      timers.push(window.setTimeout(() => setHidden(true), 1600));
    };

    if (document.readyState === 'complete') {
      hideAfterLoad();
    } else {
      window.addEventListener('load', hideAfterLoad, { once: true });
    }

    timers.push(window.setTimeout(() => setHidden(true), 4000));

    return () => {
      window.removeEventListener('load', hideAfterLoad);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className={`splash-screen${isHidden ? ' hide' : ''}`} aria-hidden="true">
      <div className="splash-inner">
        <div className="splash-logo">
          <Image
            src="/assets/logo.webp"
            alt=""
            width={500}
            height={500}
            aria-hidden="true"
            priority
          />
        </div>
        <p className="splash-title">Cagatay Ucer</p>
        <p className="splash-tagline">Setting the stage for the next drop</p>
        <div className="splash-progress" role="progressbar" aria-label="Preparing site">
          <span className="splash-progress-bar"></span>
        </div>
        <small className="splash-note">Almost there...</small>
      </div>
      <div className="splash-glow"></div>
    </div>
  );
}
