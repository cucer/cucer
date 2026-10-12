import { siteConfig } from '@/lib/site';

type SocialNavProps = {
  /* Suffixes the SVG gradient ids so the same nav can render more than once
     per document without colliding on id. */
  variant?: string;
  onNavigate?: () => void;
};

export default function SocialNav({ variant = 'Mobile', onNavigate }: SocialNavProps) {
  const linkedinGradient = `linkedinGradient${variant}`;
  const githubGradient = `githubGradient${variant}`;

  return (
    <nav className="social-nav">
      <a
        className="icon-link"
        href={siteConfig.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        onClick={onNavigate}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={linkedinGradient} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ce5bff" />
              <stop offset="100%" stopColor="#8af3fb" />
            </linearGradient>
          </defs>
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="4"
            fill={`url(#${linkedinGradient})`}
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />
          <rect x="6.6" y="10.2" width="2" height="6.8" rx="0.4" fill="#050505" />
          <circle cx="7.6" cy="8.5" r="1" fill="#050505" />
          <path
            d="M11.6 10.2h2v1.06h.03c.37-.77 1.29-1.23 2.47-1.23 2.52 0 3.2 1.64 3.2 4.07V17h-2v-3c0-1.04-.02-2.34-1.43-2.34-1.44 0-1.66 1.14-1.66 2.22V17h-2z"
            fill="#050505"
          />
        </svg>
      </a>
      <a
        className="icon-link"
        href={siteConfig.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        onClick={onNavigate}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id={githubGradient} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8af3fb" />
              <stop offset="100%" stopColor="#ce5bff" />
            </linearGradient>
          </defs>
          <path d="M9 19c-4 1-4-2-5-2" stroke={`url(#${githubGradient})`} />
          <path
            d="M15 21v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0018 3.77 5.07 5.07 0 0017.91 2s-1.18-.37-3.9 1.48a13.38 13.38 0 00-7 0C4.29 1.63 3.1 2 3.1 2a5.07 5.07 0 00-.09 1.77A5.44 5.44 0 002 7.52c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 007.5 17.13V21"
            stroke={`url(#${githubGradient})`}
          />
        </svg>
      </a>
    </nav>
  );
}
