import type { Metadata } from 'next';
import SpotlightHero, { type SpotlightContent } from '@/components/spotlight/SpotlightHero';
import { siteConfig } from '@/lib/site';

/* Shared by URL only: not linked from the home page, left out of the sitemap
   and kept out of search results. Its own title, description and preview
   image are what people see when the link is pasted into a chat. */
const title = 'Resident DJ, Events & Production';
const description =
  'A resident DJ for places with no DJ and no booth, two or three nights a week with the equipment included. Also DJ sets, event planning and electronic music production.';
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
    'I play the sets, plan and run music events for your place.',
    'I also produce electronic music in the studio. You can listen to my tracks on YouTube.',
  ],
  links: [{ label: 'YouTube', href: siteConfig.socials.youtube, icon: 'youtube' }],
  card: {
    title: 'Resident DJ',
    body: 'A resident DJ with the full setup, 2 to 3 nights a week. You open the doors, I bring the sound.',
    image: '/assets/tt.webp',
    tag: 'Let’s connect',
  },
  slogan: 'READY TO PLAY, GEAR INCLUDED',
  specs: {
    title: 'Services',
    rows: [
      { label: 'DJ', value: 'Club, bar & private sets' },
      { label: 'Events', value: 'Planned to the last track' },
      { label: 'Resident DJ', value: 'Weekly, 2 to 3 nights' },
      { label: 'Gear', value: 'Decks, mixer & sound included' },
    ],
  },
  images: { base: '/assets/dj.webp', reveal: '/assets/djneon.webp' },
};

export default function DjPage() {
  return <SpotlightHero content={dj} />;
}
