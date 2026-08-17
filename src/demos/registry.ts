import type { DemoClient } from './types';
import { yumurtaci } from './clients/yumurtaci';

/* Every demo the site can build. Adding a client is one import plus one entry —
   routes, static params and the private index all read from here. */
const clients: DemoClient[] = [yumurtaci];

export const demoClients: ReadonlyMap<string, DemoClient> = new Map(
  clients.map((client) => [client.slug, client])
);

export const demoSlugs: string[] = clients.map((client) => client.slug);

export function getDemoClient(slug: string): DemoClient | undefined {
  return demoClients.get(slug);
}

/* Ordered for the private index: what I am about to pitch comes first. */
export function listDemoClients(): DemoClient[] {
  const rank = { draft: 0, ready: 1, archived: 2 } as const;
  return [...clients].sort(
    (a, b) => rank[a.status] - rank[b.status] || a.name.localeCompare(b.name, 'tr')
  );
}
