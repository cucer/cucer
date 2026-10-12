import localFont from 'next/font/local';

/* A Latin + Turkish subset of TeX Gyre Heros (the Helvetica / Neue Haas
   grotesque), renamed as its license asks — see src/fonts/LICENSE-CU-Grotesk.txt.
   The headline is laid out against this font's exact metrics, so it must never
   fall back to Inter or another Google font. `block` keeps the fallback from
   flashing in before the entrance starts. */
export const grotesk = localFont({
  src: [
    { path: '../fonts/cu-grotesk-regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/cu-grotesk-bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'block',
  variable: '--font-grotesk',
});
