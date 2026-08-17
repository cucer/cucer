import type { Metadata, Viewport } from 'next';
import '@/demos/demo.css';

/* Second root layout. /demos/* renders its own <html> and <body>, which is the
   whole point of the (demos) route group: no globals.css, no splash screen, no
   cursor effects, no analytics from the personal site. Moving between the two
   groups is a full page load — fine, since nothing links across them. */

export const metadata: Metadata = {
  /* Client work in progress. Not for search results, and not for AI crawlers
     or link previews either. */
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  /* QR menus are read one-handed in a restaurant; let people pinch. */
  maximumScale: 5,
};

export default function DemosRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
