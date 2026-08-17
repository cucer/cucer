import type { Metadata } from 'next';
import Link from 'next/link';
import { listDemoClients } from '@/demos/registry';
import { demoRoutes } from '@/demos/routes';
import styles from './index.module.css';

export const metadata: Metadata = {
  title: 'Demolar',
};

const STATUS_LABEL = {
  draft: 'Taslak',
  ready: 'Gösterime hazır',
  archived: 'Arşiv',
} as const;

/* Internal index of every client demo. Unlisted rather than private — anyone
   with the URL can read it, so nothing commercial belongs on this page. */
export default function DemosIndexPage() {
  const clients = listDemoClients();

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Demolar</h1>
      <p className={styles.note}>
        Müşteri sunumları için hazırlanan demolar. Arama motorlarına kapalı ama
        bağlantıyı bilen herkes açabilir — buraya fiyat veya ticari not yazma.
      </p>

      {clients.length === 0 ? (
        <p className={styles.empty}>Henüz demo yok.</p>
      ) : (
        <ul className={styles.list}>
          {clients.map((client) => (
            <li className={styles.card} key={client.slug}>
              <div className={styles.cardHead}>
                <h2 className={styles.name}>{client.name}</h2>
                <span
                  className={`${styles.status} ${
                    client.status === 'ready' ? styles.statusReady : ''
                  }`}
                >
                  {STATUS_LABEL[client.status]}
                </span>
              </div>
              {client.internalNote ? (
                <p className={styles.internal}>{client.internalNote}</p>
              ) : null}
              <div className={styles.links}>
                <Link className={styles.link} href={demoRoutes(client.slug).home}>
                  Site
                </Link>
                <Link className={styles.link} href={demoRoutes(client.slug).menu}>
                  QR menü
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
