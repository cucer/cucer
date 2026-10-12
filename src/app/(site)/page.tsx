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
    'Web and mobile products built with React, React Native and Next.js, plus AI and LLM integrations, from first roadmap through to launch.',
  ],
  card: {
    title: 'AI Integration',
    body: 'LLM features, retrieval and agents wired into products that already have users.',
    image: '/assets/card.webp',
    tag: 'Let’s connect',
  },
  slogan: 'ONE CALL FOR EVERY TECH NEED',
  specs: {
    title: 'Stack',
    rows: [
      { label: 'Web', value: 'React · Next.js' },
      { label: 'Mobile', value: 'React Native' },
      { label: 'AI', value: 'LLM · RAG · Agents' },
      { label: 'Backend', value: 'Node.js' },
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
