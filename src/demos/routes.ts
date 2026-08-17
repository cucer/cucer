/* Every internal link in a demo goes through here. When a demo graduates to its
   own domain the paths collapse to '/' and '/menu/' — one file to change, and
   no template touches a URL directly. */
export function demoRoutes(slug: string) {
  return {
    home: `/demos/${slug}/`,
    menu: `/demos/${slug}/menu/`,
  };
}

/* Where a client's photography lives: public/demos/<slug>/. It sits alongside
   the generated /demos/<slug>/ route output in the export, which is fine — the
   route only ever writes index.html — but never name an asset index.html. */
export function demoAsset(slug: string, file: string): string {
  return `/demos/${slug}/${file}`;
}
