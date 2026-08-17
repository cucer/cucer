import Image from 'next/image';
import Link from 'next/link';
import type { DemoClient } from '@/demos/types';
import styles from './restaurant.module.css';

/* Mark above, name in live type below. The supplied logo file bakes the wordmark
   into the artwork, which both fixes its spelling and turns it to mush at small
   sizes — setting the name in type avoids each of those.

   Used in three places: the landing masthead, the footer, and the top of the QR
   menu. Pass `href` where it should carry you home. */
export default function Brand({
  client,
  className,
  href,
  priority = false,
}: {
  client: DemoClient;
  className: string;
  href?: string;
  priority?: boolean;
}) {
  const content = (
    <>
      {client.emblem ? (
        <Image
          src={client.emblem.src}
          alt=""
          width={client.emblem.width}
          height={client.emblem.height}
          priority={priority}
        />
      ) : null}
      <span className={styles.brandName}>{client.name}</span>
      <span className={styles.brandTagline}>{client.tagline}</span>
    </>
  );

  /* The brand name is the link's accessible name, which is the convention for a
     logo that goes home — no extra label needed. */
  return href ? (
    <Link className={className} href={href}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
