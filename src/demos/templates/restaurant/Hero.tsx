'use client';

import { useEffect, useRef, useState } from 'react';
import type { DemoImage } from '@/demos/types';
import Photo from './Photo';
import styles from './restaurant.module.css';

/* No copy over the hero — the photograph is the whole statement, as in the
   reference. With more than one image it becomes a swipeable strip; the track
   is a plain scroll-snap container so it works without JavaScript and the
   dots are only a readout of where you are. */
export default function Hero({ images, name }: { images: DemoImage[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length < 2) return;

    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setActive(Math.max(0, Math.min(images.length - 1, index)));
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [images.length]);

  return (
    <section className={styles.hero} aria-label={`${name} fotoğrafları`}>
      <div className={styles.heroTrack} ref={trackRef}>
        {images.length === 0 ? (
          <div className={styles.heroSlide}>
            <Photo name={`${name} — kapak fotoğrafı`} />
          </div>
        ) : (
          images.map((image, index) => (
            <div className={styles.heroSlide} key={image.src}>
              <Photo image={image} name={name} priority={index === 0} />
            </div>
          ))
        )}
      </div>

      {images.length > 1 ? (
        <div className={styles.heroDots} aria-hidden="true">
          {images.map((image, index) => (
            <span
              key={image.src}
              className={`${styles.heroDot} ${
                index === active ? styles.heroDotActive : ''
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
