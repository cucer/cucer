import { formatPrice } from '@/demos/theme';
import type { MenuItem } from '@/demos/types';
import Photo from './Photo';
import styles from './restaurant.module.css';

/* A dish gets a spread, not a row: the photograph runs off one edge of the page
   and the caption sits on top of it, alternating side by side down the menu.
   The alternation is what stops it reading as a price list — your eye has to
   travel, the way it does across a magazine.

   Price is rendered only when the data carries one. Most demos carry none. */
export function DishSpread({ item, index }: { item: MenuItem; index: number }) {
  /* Odd items bleed left, even items bleed right. */
  const flipped = index % 2 === 1;

  return (
    <article className={`${styles.spread} ${flipped ? styles.spreadAlt : ''}`}>
      <div className={styles.spreadMedia}>
        <Photo
          image={item.image}
          name={item.name}
          ratio="4 / 5"
          sizes="(min-width: 760px) 50vw, 86vw"
        />
        {item.badge ? <span className={styles.spreadBadge}>{item.badge}</span> : null}
      </div>

      <div className={styles.spreadCaption}>
        <h3 className={styles.spreadName}>{item.name}</h3>
        {item.description ? (
          <p className={styles.spreadDescription}>{item.description}</p>
        ) : null}
        {item.price === undefined ? null : (
          <span className={styles.spreadPrice}>{formatPrice(item.price)}</span>
        )}
      </div>
    </article>
  );
}

/* The long tail — drinks, sides, anything without a photograph worth the
   space. Kept for menus with forty items; this client's has none. */
export function DishRow({ item }: { item: MenuItem }) {
  return (
    <article className={styles.dishRow}>
      <div>
        <h3 className={styles.dishRowName}>{item.name}</h3>
        {item.description ? (
          <p className={styles.dishRowDescription}>{item.description}</p>
        ) : null}
      </div>
      {item.price === undefined ? null : (
        <span className={styles.dishPrice}>{formatPrice(item.price)}</span>
      )}
    </article>
  );
}
