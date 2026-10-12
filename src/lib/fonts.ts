import { Inter, Orbitron } from 'next/font/google';

/* Body copy. */
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
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
