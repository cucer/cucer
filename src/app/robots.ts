import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/* Required by output: 'export' — the file is written once at build time. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    /* Deliberately says nothing about /demos/. robots.txt is a public file, so
       a Disallow line would announce the path to anyone who reads it — and by
       blocking the crawl it would stop bots from ever seeing the noindex tag
       the demo layout sends, which is what actually keeps those pages out of
       search results. Letting them be crawled and refused is the stronger
       arrangement. */
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
