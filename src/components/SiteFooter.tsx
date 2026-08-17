import { siteConfig } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © 2010–2026 <span className="footer-name">{siteConfig.name}</span>. All rights
        reserved.
      </p>
    </footer>
  );
}
