import { Inter, Orbitron } from 'next/font/google';

/* Body copy. `subsets` only picks what is preloaded: every subset is still
   declared, so a latin-ext character would load its file on demand. The
   copy is plain Latin, so preloading latin-ext only wasted a request. */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

/* Headings. Self-hosted through next/font rather than loaded from a
   third-party font mirror; 500 is Orbitron's Medium cut. */
export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-orbitron',
});
