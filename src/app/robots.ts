import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/* Required by output: 'export' — the file is written once at build time. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
