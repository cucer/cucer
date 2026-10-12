import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../globals.css';
import { inter, orbitron } from '@/lib/fonts';
import { siteConfig } from '@/lib/site';
import CometTrails from '@/components/effects/CometTrails';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    /* Sub-pages set only their own title; this appends the identity. */
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: { canonical: '/' },
  icons: { icon: '/assets/favicon.ico' },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: '/',
    title: siteConfig.defaultTitle,
    description: siteConfig.socialDescription,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Cagatay Ucer | Web & App Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.socialDescription,
    images: [siteConfig.ogImage],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#c45a18',
};

/* Root layout for the personal site. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language} className={`${inter.variable} ${orbitron.variable}`}>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${siteConfig.gaMeasurementId}');`}
        </Script>

        <main>{children}</main>
        <CometTrails />
      </body>
    </html>
  );
}
