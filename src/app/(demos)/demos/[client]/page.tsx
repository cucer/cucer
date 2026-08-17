import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoSlugs, getDemoClient } from '@/demos/registry';
import { templates } from '@/demos/templates';

type Params = { params: Promise<{ client: string }> };

/* Static export needs the full list of slugs up front; dynamicParams: false
   keeps an unknown slug a build error rather than a silent 404 page. */
export function generateStaticParams() {
  return demoSlugs.map((client) => ({ client }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client: slug } = await params;
  const client = getDemoClient(slug);
  if (!client) return {};

  return {
    title: `${client.name} — ${client.tagline}`,
    description: client.intro.body[0] ?? client.tagline,
  };
}

export default async function DemoLandingPage({ params }: Params) {
  const { client: slug } = await params;
  const client = getDemoClient(slug);
  if (!client) notFound();

  const { Landing } = templates[client.template];
  return <Landing client={client} />;
}
