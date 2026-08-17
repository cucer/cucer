import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* GitHub Pages serves plain files, so every route is pre-rendered to out/. */
  output: 'export',
  /* Emits /about/index.html instead of /about.html, which is what Pages needs
     to resolve extensionless URLs. */
  trailingSlash: true,
  images: {
    /* No image optimization server exists on Pages. */
    unoptimized: true,
  },
  /* `page.dev.tsx` counts as a route only while `next dev` is running, so the
     internal demo index — which lists every client and my notes on them — is
     never written into the export. It cannot be reached on the live site
     because it is not built at all, which is a stronger guarantee than a
     redirect on a host that runs no server code. */
  pageExtensions:
    process.env.NODE_ENV === 'development'
      ? ['dev.tsx', 'tsx', 'ts', 'jsx', 'js']
      : ['tsx', 'ts', 'jsx', 'js'],
  experimental: {
    /* Turns on app/global-not-found.tsx. Required here because the app has two
       root layouts — (site) and (demos) — so a plain not-found.tsx has no
       single layout to render inside. */
    globalNotFound: true,
  },
};

export default nextConfig;
