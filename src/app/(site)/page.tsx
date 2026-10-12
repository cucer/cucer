import Stage, { type StageContent } from '@/components/stage/Stage';
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

const home: StageContent = {
  name: siteConfig.name,
  services: ['Web Development', 'Mobile Apps', 'AI Integration'],
  headline: {
    label: 'Apps, web, AI',
    lines: ['APPS', 'WEB', 'AI'],
  },
  /* Hotlinked from the CDN it was published on; nothing in this repo backs it
     up. If it ever disappears, the hero falls back to its gradient backdrop. */
  video:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_143740_52dbf3ef-ea20-4594-a1ad-91d6c2970159.mp4',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Stage content={home} />
    </>
  );
}
