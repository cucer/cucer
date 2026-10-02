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
  experimental: {
    /* Turns on app/global-not-found.tsx, which returns the 404 document on its
       own instead of rendering inside the (site) layout. */
    globalNotFound: true,
  },
};

export default nextConfig;
