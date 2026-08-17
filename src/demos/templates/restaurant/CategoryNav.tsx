'use client';

import { useEffect, useRef, useState } from 'react';
import type { MenuCategory } from '@/demos/types';
import styles from './restaurant.module.css';

/* Anchors, not routes. The whole menu is one document so switching category on
   a bad restaurant connection costs nothing — the brief calls out poor wi-fi
   explicitly. The observer only tracks which chip is highlighted. */
export default function CategoryNav({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      /* Top band only, so the active chip matches what is under the nav bar
         rather than whatever happens to be largest on screen. */
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  /* Keep the active chip in view when the nav scrolls horizontally. */
  useEffect(() => {
    const chip = navRef.current?.querySelector<HTMLElement>(`[href="#${activeId}"]`);
    chip?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <nav className={styles.categoryNav} ref={navRef} aria-label="Menü kategorileri">
      {categories.map((category) => (
        <a
          key={category.id}
          href={`#${category.id}`}
          className={`${styles.categoryChip} ${
            activeId === category.id ? styles.categoryChipActive : ''
          }`}
          aria-current={activeId === category.id ? 'true' : undefined}
        >
          {category.name}
        </a>
      ))}
    </nav>
  );
}
