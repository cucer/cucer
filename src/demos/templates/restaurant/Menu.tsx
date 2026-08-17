import Link from 'next/link';
import { demoRoutes } from '@/demos/routes';
import type { DemoClient, MenuCategory } from '@/demos/types';
import DemoShell from './DemoShell';
import Brand from './Brand';
import CategoryNav from './CategoryNav';
import { DishSpread, DishRow } from './Dish';
import styles from './restaurant.module.css';

/* What the QR code opens. A phone document first: one page, anchors instead of
   routes so switching category costs no network on restaurant wi-fi.

   Laid out as a magazine rather than a menu — warm paper ground, photographs
   running off alternating edges, captions overlapping them. The numbering runs
   straight through the whole menu rather than restarting per category, so the
   zigzag never breaks at a section boundary. */
/* Positions every photographed dish in one run across the whole menu, keyed by
   category so two categories can reuse an item id. This drives the left/right
   alternation, so it has to keep counting across a category boundary —
   restarting per section would put two spreads on the same side in a row.
   Worked out up front rather than counted during render: the order is a fact
   about the data, not a side effect of how React walks the tree. */
function spreadIndexes(categories: MenuCategory[]): Map<string, number> {
  const order = new Map<string, number>();
  let index = 0;
  for (const category of categories) {
    for (const item of category.items) {
      if (item.featured) order.set(`${category.id}/${item.id}`, index++);
    }
  }
  return order;
}

export default function Menu({ client }: { client: DemoClient }) {
  const categories = client.menu.categories;
  const routes = demoRoutes(client.slug);
  const order = spreadIndexes(categories);

  return (
    <DemoShell client={client}>
      <div className={styles.menuPage}>
        <header className={styles.menuHeader}>
          {/* Someone who scanned the code at the table arrived here with no
              history to go back through, so the mark has to be the way out to
              the rest of the site. */}
          <Brand
            client={client}
            className={styles.menuMasthead}
            href={routes.home}
            priority
          />
          <h1 className={styles.menuIntro}>{client.menu.intro ?? 'Menü'}</h1>
        </header>

        <CategoryNav categories={categories} />

        <main>
          {categories.map((category) => {
            const featured = category.items.filter((item) => item.featured);
            const rest = category.items.filter((item) => !item.featured);

            return (
              <section key={category.id} id={category.id} className={styles.category}>
                <div className={styles.categoryOpener}>
                  <h2 className={styles.categoryName}>{category.name}</h2>
                  {category.tagline ? (
                    <p className={styles.categoryTagline}>{category.tagline}</p>
                  ) : null}
                </div>

                {featured.map((item) => (
                  <DishSpread
                    key={item.id}
                    item={item}
                    index={order.get(`${category.id}/${item.id}`) ?? 0}
                  />
                ))}

                {rest.length ? (
                  <div className={styles.dishList}>
                    {rest.map((item) => (
                      <DishRow key={item.id} item={item} />
                    ))}
                  </div>
                ) : null}
              </section>
            );
          })}
        </main>

        <footer className={styles.menuFooter}>
          <Link href={routes.home}>← {client.name}</Link>
          {/* Ticaret Bakanlığı: a QR menu supplements the printed price list,
              it cannot replace it on demand. Stated on the menu itself so the
              restaurant is covered without being asked. */}
          <span className={styles.menuFooterNote}>
            Basılı fiyat listemiz talep hâlinde sunulmaktadır.
          </span>
        </footer>
      </div>
    </DemoShell>
  );
}
