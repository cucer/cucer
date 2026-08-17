import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/* Required by output: 'export' — the file is written once at build time. */
export const dynamic = 'force-static';

/* Add new routes here as pages land so the sitemap cannot drift away from what
   is actually deployed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
