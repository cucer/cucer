import SpotlightHero, { type SpotlightContent } from '@/components/spotlight/SpotlightHero';
import { personSchema, siteConfig, websiteSchema } from '@/lib/site';

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    websiteSchema,
    {
      '@type': 'ProfilePage',
      '@id': `${siteConfig.url}/#webpage`,
      url: `${siteConfig.url}/`,
      name: 'Cagatay Ucer, Professional Tinkerer',
      isPartOf: { '@id': websiteSchema['@id'] },
      mainEntity: { '@id': personSchema['@id'] },
      primaryImageOfPage: `${siteConfig.url}${siteConfig.ogImage}`,
      dateCreated: '2024-01-01',
      dateModified: '2026-10-12',
      inLanguage: siteConfig.language,
    },
    personSchema,
  ],
};

const home: SpotlightContent = {
  headline: ['CAGATAY UCER'],
  intro: [
    'Good vibes, curious mind.',
    'Building with tech and AI along the way.',
  ],
  card: {
    title: 'Lately',
    body: 'Playing with AI and seeing what it can do.',
    image: '/assets/card.webp',
    tag: 'Let’s connect',
  },
  slogan: 'STAY CURIOUS',
  specs: {
    title: 'Into',
    rows: [
      { label: 'Tech', value: 'Building things for fun' },
      { label: 'AI', value: 'Always experimenting' },
      { label: 'Travel', value: 'New places, new ideas' },
      { label: 'Coffee', value: 'Non-negotiable' },
    ],
  },
  images: { base: '/assets/dev.webp', reveal: '/assets/devneon.webp', backdrop: '/assets/mars.webp' },
  atmosphere: 'dust',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <SpotlightHero content={home} />
    </>
  );
}
