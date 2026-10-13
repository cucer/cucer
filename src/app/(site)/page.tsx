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
      name: 'Cagatay Ucer, Web & App Developer',
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
  headline: ['CAGATAY UCER', '//', 'APPS · WEB · AI'],
  intro: [
    'Today, knowledge is the sharpest blade you can carry. Web and mobile products, AI integrations, and end-to-end solutions and consulting for whatever your business needs.',
  ],
  card: {
    title: 'AI Integration',
    body: 'LLM features, retrieval and agents wired into products that already have users.',
    image: '/assets/card.webp',
    tag: 'Let’s connect',
  },
  slogan: 'ONE CALL FOR EVERY TECH NEED',
  specs: {
    title: 'What I Deliver',
    rows: [
      { label: 'Web', value: 'Sites & platforms that scale' },
      { label: 'Mobile', value: 'iOS & Android apps' },
      { label: 'AI', value: 'Automation & AI content' },
      { label: 'Consulting', value: 'Strategy to launch' },
    ],
  },
  images: { base: '/assets/dev.webp', reveal: '/assets/devneon.webp' },
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
