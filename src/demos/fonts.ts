import { Bitter, Playfair_Display, Lato, Manrope } from 'next/font/google';
import type { DemoFontKey } from './types';

/* latin-ext is not optional here — without it Turkish ı, ş, ğ and ç fall back
   to a system face mid-word. next/font needs these options as literals, so the
   subset list cannot be hoisted into a shared constant. */

/* The reference layout's display face: a slab serif set in caps with wide
   letterspacing. */
const slab = Bitter({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--demo-font-slab',
});

const serif = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--demo-font-serif',
});

/* Body copy: humanist, quiet, reads well centred at a narrow measure. */
const humanist = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--demo-font-humanist',
});

const sans = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--demo-font-sans',
});

const FONTS: Record<DemoFontKey, { variable: string; family: string }> = {
  slab: { variable: slab.variable, family: 'var(--demo-font-slab)' },
  serif: { variable: serif.variable, family: 'var(--demo-font-serif)' },
  humanist: { variable: humanist.variable, family: 'var(--demo-font-humanist)' },
  sans: { variable: sans.variable, family: 'var(--demo-font-sans)' },
};

/* Only the two faces a client actually picks get their variables applied, so
   the browser never downloads the others. */
export function fontClassNames(...keys: DemoFontKey[]): string {
  return Array.from(new Set(keys.map((key) => FONTS[key].variable))).join(' ');
}

export function fontFamily(key: DemoFontKey): string {
  return FONTS[key].family;
}
