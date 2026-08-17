/* Thin line icons, matching the hairline weight the reference uses around its
   phone and envelope marks. */

const base = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function PhoneIcon() {
  return (
    <svg {...base}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg {...base}>
      <rect x="2.5" y="5" width="19" height="14" rx="1" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg {...base} width={22} height={22}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg {...base} width={22} height={22}>
      <path d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8.1 19.5z" />
      <path d="M9 9.4c.3 2.2 3.4 5.3 5.6 5.6l1-1.4 1.9.9c-.2 1.2-1.4 1.6-2.4 1.4-3-.5-6-3.5-6.5-6.5-.2-1 .2-2.2 1.4-2.4l.9 1.9z" />
    </svg>
  );
}
