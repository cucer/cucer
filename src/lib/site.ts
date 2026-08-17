/* Single source of truth for anything that has to stay in sync between the
   metadata, the JSON-LD graph and the rendered markup. */

export const siteConfig = {
  name: 'Cagatay Ucer',
  jobTitle: 'Web & App Developer',
  url: 'https://cagatayucer.com',
  locale: 'en_US',
  language: 'en',
  gaMeasurementId: 'G-2VLW7KEBEF',
  defaultTitle: 'Cagatay Ucer | Web & App Developer | React, Next.js, AI',
  defaultDescription:
    'Cagatay Ucer builds web and mobile products with React, React Native and Next.js, plus AI and LLM integrations, from roadmap through to launch.',
  socialDescription:
    'Web and mobile products built with React, React Native and Next.js, plus AI and LLM integrations, from roadmap through to launch.',
  ogImage: '/assets/og-image.jpg',
  socials: {
    linkedin: 'https://www.linkedin.com/in/cagatayucer',
    github: 'https://github.com/cucer',
  },
} as const;

export const personSchema = {
  '@type': 'Person',
  '@id': `${siteConfig.url}/#person`,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  image: `${siteConfig.url}/assets/logo.webp`,
  jobTitle: siteConfig.jobTitle,
  description:
    'Web and mobile developer building products with React, React Native, Next.js and Node.js, alongside agile project management.',
  knowsAbout: [
    'Web Development',
    'App Development',
    'React',
    'React Native',
    'Next.js',
    'Node.js',
    'AI Integration',
    'Large Language Models',
    'Retrieval Augmented Generation',
    'Project Management',
    'Digital Marketing',
  ],
  sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  inLanguage: siteConfig.language,
  publisher: { '@id': personSchema['@id'] },
};
