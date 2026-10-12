import type { CSSProperties } from 'react';
import Link from 'next/link';
import Entrance from './Entrance';
import styles from './Stage.module.css';

export type StageContent = {
  /* Wordmark in the top-left corner, the only thing in the top bar; it links
     home. */
  name: string;
  /* Left, centre and right labels above the rule. */
  services: readonly [string, string, string];
  /* Accessible name of the headline, and the words it is drawn with. */
  headline: { label: string; lines: readonly string[] };
  /* Muted, looping background video. */
  video: string;
};

/* Advance widths of TeX Gyre Heros Bold (CU Grotesk), in em, read from the font
   file. Used only to find the widest headline line so the type can be sized to
   fit it; kerning is left out, which errs on the wide, safe side. */
const BOLD_ADVANCE: Record<string, number> = {
  A: 0.722, B: 0.722, C: 0.722, D: 0.722, E: 0.667, F: 0.611, G: 0.778,
  H: 0.722, I: 0.278, J: 0.556, K: 0.722, L: 0.611, M: 0.833, N: 0.722,
  O: 0.778, P: 0.667, Q: 0.778, R: 0.722, S: 0.667, T: 0.611, U: 0.722,
  V: 0.667, W: 0.944, X: 0.667, Y: 0.667, Z: 0.611, ' ': 0.278, '&': 0.722,
  '-': 0.333, '.': 0.278, '/': 0.278, "'": 0.238,
};
const DIGIT_ADVANCE = 0.556;
const UNKNOWN_ADVANCE = 0.722;
/* Headline tracking, in em. Measured off the reference layout, whose letters
   sit on average 0.065em tighter than the font's own spacing. */
const HEADLINE_TRACKING = -0.065;
/* Distance between headline baselines, in em. */
const HEADLINE_PITCH = 0.7839;

const advance = (char: string) =>
  BOLD_ADVANCE[char] ?? (/\d/.test(char) ? DIGIT_ADVANCE : UNKNOWN_ADVANCE);

const lineWidth = (line: string) => {
  const chars = [...line.toUpperCase()];
  const glyphs = chars.reduce((sum, char) => sum + advance(char), 0);
  return glyphs + HEADLINE_TRACKING * Math.max(chars.length - 1, 0);
};

/* Runs in <head> before first paint. Marks the document as entering so the
   foreground starts hidden, with a failsafe that releases it whatever happens
   next; if JavaScript never runs, the page is simply static. Visitors who ask
   for reduced motion get no entrance and a paused video instead. */
export const stageBootstrap = `(function(){var d=document.documentElement;
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){
document.addEventListener('DOMContentLoaded',function(){var v=document.querySelectorAll('[data-stage] video');
for(var i=0;i<v.length;i++){v[i].removeAttribute('autoplay');v[i].autoplay=false;v[i].pause();}});return;}
d.classList.add('is-entering');
window.__auFailsafe=setTimeout(function(){d.classList.remove('is-entering','is-playing');},4500);})();`;

/* A single full-viewport hero: background video, wordmark,
   services row and a headline set at display size along the bottom edge. */
export default function Stage({ content }: { content: StageContent }) {
  const { lines } = content.headline;
  const widest = Math.max(...lines.map(lineWidth));

  return (
    <section
      className={styles.hero}
      data-stage=""
      style={{ '--hl-w': widest.toFixed(4) } as CSSProperties}
    >
      {/* Written as markup so `muted`, `autoplay` and `playsinline` reach the
          static HTML as attributes; React only sets `muted` as a property,
          and mobile browsers refuse to autoplay without the attribute. */}
      <div
        className={styles.photo}
        role="presentation"
        dangerouslySetInnerHTML={{
          __html: `<video src="${encodeURI(content.video)}" muted autoplay loop playsinline preload="auto" aria-hidden="true"></video>`,
        }}
      />

      <Link href="/" className={styles.logo} aria-label={`${content.name} — home`}>
        {content.name}
      </Link>

      <ul className={`${styles.services} ${styles.small}`} aria-label="Services">
        {content.services.map((service) => (
          <li key={service}>
            <span className={styles.rv}>{service}</span>
          </li>
        ))}
      </ul>

      <div className={styles.rule} aria-hidden="true" />

      <h1 className={styles.hl} aria-label={content.headline.label}>
        {lines.map((line, index) => (
          <span
            key={line}
            className={styles.hlLine}
            aria-hidden="true"
            style={
              {
                '--b': `${((lines.length - 1 - index) * HEADLINE_PITCH).toFixed(5)}em`,
              } as CSSProperties
            }
          >
            <span className={styles.hlClip}>
              <span className={styles.hlTrack}>{line}</span>
            </span>
          </span>
        ))}
      </h1>

      <Entrance />
    </section>
  );
}
