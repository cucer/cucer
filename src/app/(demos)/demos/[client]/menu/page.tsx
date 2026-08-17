import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoSlugs, getDemoClient } from '@/demos/registry';
import { templates } from '@/demos/templates';

type Params = { params: Promise<{ client: string }> };

/* The URL the QR code points at. Keep it stable: reprinting table cards is the
   client's cost, so the route must outlive any redesign behind it. */
export function generateStaticParams() {
  return demoSlugs.map((client) => ({ client }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client: slug } = await params;
  const client = getDemoClient(slug);
  if (!client) return {};

  return {
    title: `${client.name} — Menü`,
    description: client.menu.intro ?? client.tagline,
  };
}

export default async function DemoMenuPage({ params }: Params) {
  const { client: slug } = await params;
  const client = getDemoClient(slug);
  if (!client) notFound();

  const { Menu } = templates[client.template];
  return <Menu client={client} />;
}
