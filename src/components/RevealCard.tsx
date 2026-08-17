'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type RevealCardProps = {
  className: string;
  /* Position in its row, used to stagger the entrance. */
  index?: number;
  children: ReactNode;
};

/* Fades a card in the first time it scrolls into view. Visitors who ask for
   reduced motion are handled in globals.css, which shows .card-animated
   outright — so this only ever has to add the class, never race the
   preference. */
export default function RevealCard({ className, index = 0, children }: RevealCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`${className} card-animated${isVisible ? ' card-visible' : ''}`}
      style={{ '--card-stagger': `${index * 90}ms` } as CSSProperties}
    >
      {children}
    </article>
  );
}
