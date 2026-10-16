import type { Metadata } from 'next';
import SpotlightHero, { type SpotlightContent } from '@/components/spotlight/SpotlightHero';
import { siteConfig } from '@/lib/site';

/* Shared by URL only: not linked from the home page, left out of the sitemap
   and kept out of search results. Its own title, description and preview
   image are what people see when the link is pasted into a chat. */
const title = 'Resident DJ, Events & Production';
const description =
  'A resident DJ for places with no DJ and no booth, on a schedule we plan together and with the equipment included. Also DJ sets, event planning and electronic music production.';
const ogImage = '/assets/og-dj.jpg';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/dj/' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: '/dj/',
    title: `${title} | ${siteConfig.name}`,
    description,
    locale: siteConfig.locale,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${siteConfig.name} | ${title}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [ogImage],
  },
};

const dj: SpotlightContent = {
  headline: ['CAGATAY UCER', '//', 'DJ · PRODUCER'],
  intro: [
    'Live sets. Planned events. Built for your place.',
    'Original electronic music, where the machine meets the soul.',
    'You can listen to my tracks on YouTube.',
  ],
  links: [
    { label: 'YouTube', href: siteConfig.socials.youtube, icon: 'youtube' },
    { label: 'SoundCloud', href: siteConfig.socials.soundcloud, icon: 'soundcloud' },
  ],
  card: {
    title: 'Resident DJ',
    body: 'A resident DJ with the full setup, on a schedule we plan together. You open the doors, I bring the sound.',
    image: '/assets/tt.webp',
    tag: 'Let’s connect',
  },
  slogan: 'READY TO PLAY, GEAR INCLUDED',
  specs: {
    title: 'Services',
    rows: [
      { label: 'DJ', value: 'Sets for every crowd' },
      { label: 'Events', value: 'Planned to the last track' },
      { label: 'Resident DJ', value: 'Flexible, on your schedule' },
      { label: 'Gear', value: 'Decks, mixer & sound included' },
    ],
  },
  images: { base: '/assets/dj.webp', reveal: '/assets/djneon.webp' },
};

export default function DjPage() {
  return <SpotlightHero content={dj} />;
}
