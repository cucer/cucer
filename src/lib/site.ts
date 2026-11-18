/* Single source of truth for anything that has to stay in sync between the
   metadata, the JSON-LD graph and the rendered markup. */

export const siteConfig = {
  name: 'Cagatay Ucer',
  jobTitle: 'Professional Tinkerer',
  url: 'https://cagatayucer.com',
  locale: 'en_US',
  language: 'en',
  gaMeasurementId: 'G-2VLW7KEBEF',
  defaultTitle: 'Cagatay Ucer · Personal Site',
  defaultDescription:
    'Good vibes, curious mind. Building with tech and AI along the way.',
  socialDescription:
    'Good vibes, curious mind. Building with tech and AI along the way.',
  ogImage: '/assets/og-image.jpg',
  socials: {
    youtube: 'https://www.youtube.com/@cagatayucer',
    soundcloud: 'https://soundcloud.com/cagatayucer',
  },
} as const;

export const personSchema = {
  '@type': 'Person',
  '@id': `${siteConfig.url}/#person`,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  image: `${siteConfig.url}/assets/logo.webp`,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.defaultDescription,
  knowsAbout: ['Technology', 'Artificial Intelligence', 'Travel'],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  inLanguage: siteConfig.language,
  publisher: { '@id': personSchema['@id'] },
};
