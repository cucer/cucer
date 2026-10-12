import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { grotesk } from '@/lib/fonts';
import { siteConfig } from '@/lib/site';
import styles from './global-not-found.module.css';

/* The 404 for the whole site — what GitHub Pages serves from out/404.html for
   any URL that was never built.

   It is `global-not-found` rather than the usual `not-found`: this file
   bypasses layouts and returns the document itself, which also means it has to
   bring its own stylesheet and font — nothing above it runs.

   Deliberately without the entrance and analytics: a 404 is a dead end, and
   the one thing it owes the visitor is the way back. */

export const metadata: Metadata = {
  title: `404 | ${siteConfig.name}`,
  description: 'This page does not exist.',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang={siteConfig.language} className={grotesk.variable}>
      <body>
        <main className={styles.wrap}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>This page doesn&apos;t exist</h1>
          <p className={styles.text}>
            The link may be outdated, or the page has moved somewhere else.
          </p>
          <Link className={styles.link} href="/">
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
