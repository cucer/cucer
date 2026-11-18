import type { Metadata } from 'next';
import SpotlightHero, { type SpotlightContent } from '@/components/spotlight/SpotlightHero';
import { siteConfig } from '@/lib/site';

/* Shared by URL only: not linked from the home page, left out of the sitemap
   and kept out of search results. Its own title, description and preview
   image are what people see when the link is pasted into a chat. */
const title = siteConfig.defaultTitle;
const description = 'Original electronic music, where the machine meets the soul.';
const ogImage = '/assets/og-dj.jpg';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/dj/' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: '/dj/',
    title,
    description,
    locale: siteConfig.locale,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

const dj: SpotlightContent = {
  headline: ['CAGATAY UCER'],
  intro: [
    'Original electronic music, where the machine meets the soul.',
    'You can listen to my tracks on YouTube.',
  ],
  links: [
    { label: 'YouTube', href: siteConfig.socials.youtube, icon: 'youtube' },
    { label: 'SoundCloud', href: siteConfig.socials.soundcloud, icon: 'soundcloud' },
  ],
  card: {
    title: 'On Rotation',
    body: 'Mixing, producing and digging for new sounds.',
    image: '/assets/tt.webp',
    tag: 'Let’s connect',
  },
  slogan: 'MACHINE MEETS SOUL',
  specs: {
    title: 'Sound',
    rows: [
      { label: 'Sets', value: 'Whenever the mood hits' },
      { label: 'Production', value: 'Original electronic tracks' },
      { label: 'Vibe', value: 'Deep, warm, late-night' },
    ],
  },
  images: { base: '/assets/dj.webp', reveal: '/assets/djneon.webp', backdrop: '/assets/mars.webp' },
  atmosphere: 'dust',
};

export default function DjPage() {
  return <SpotlightHero content={dj} />;
}
