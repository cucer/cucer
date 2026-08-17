import Image from 'next/image';
import type { DemoImage } from '@/demos/types';
import styles from './restaurant.module.css';

type PhotoProps = {
  image?: DemoImage;
  /* Used by the placeholder so an unshot slot still says what belongs there. */
  name: string;
  /* Omitted when a parent block sets the height itself (hero, split, banner). */
  ratio?: string;
  priority?: boolean;
  sizes?: string;
};

/* Photography is the product here, so a missing photo is shown as a labelled
   slot rather than hidden. */
export default function Photo({
  image,
  name,
  ratio,
  priority = false,
  sizes = '100vw',
}: PhotoProps) {
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (!image) {
    return (
      <div
        className={`${styles.photo} ${styles.photoEmpty}`}
        style={style}
        role="img"
        aria-label={`${name} — fotoğraf eklenecek`}
      >
        <span className={styles.photoEmptyLabel}>Fotoğraf</span>
        <span className={styles.photoEmptyName}>{name}</span>
      </div>
    );
  }

  return (
    <div className={styles.photo} style={style}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
      />
    </div>
  );
}
