import Hero from '@/components/Hero';
import AiSection from '@/components/AiSection';
import Portfolio from '@/components/Portfolio';
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
      dateModified: '2026-07-31',
      inLanguage: siteConfig.language,
    },
    personSchema,
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Hero />
      <AiSection />
      <Portfolio />
    </>
  );
}
