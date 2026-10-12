import { Fragment, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import StarField from '@/components/effects/StarField';
import SpotlightEffects from './SpotlightEffects';
import styles from './SpotlightHero.module.css';

export type SpotlightContent = {
  /* Each entry is one line of the headline. */
  headline: readonly string[];
  /* Each entry starts on a new line. */
  intro: readonly string[];
  /* Round icon links under the intro; optional. */
  links?: readonly { label: string; href: string; icon: 'youtube' }[];
  card: {
    title: string;
    body: string;
    image: string;
    /* Drawn as a button, but only a label: it does nothing when clicked. */
    tag: string;
  };
  /* Short line in the top-right corner; on a phone it follows the intro. */
  slogan: string;
  specs: { title: string; rows: readonly { label: string; value: string }[] };
  images: { base: string; reveal: string };
};

const WORD_STAGGER_S = 0.1;

/* Advance widths of Orbitron Medium, in em, read from the font file. Used only
   to find the widest headline line so phones can size the type to fit it.
   Orbitron has no middle dot, so "·" falls back to another font; 0.3em covers
   it, as it does any other character missing here. */
const ORBITRON_ADVANCE: Record<string, number> = {
  A: 0.836, B: 0.832, C: 0.822, D: 0.834, E: 0.766, F: 0.723, G: 0.83,
  H: 0.851, I: 0.214, J: 0.78, K: 0.797, L: 0.779, M: 0.928, N: 0.832,
  O: 0.828, P: 0.791, Q: 0.884, R: 0.825, S: 0.824, T: 0.759, U: 0.828,
  V: 1.003, W: 1.179, X: 0.812, Y: 0.806, Z: 0.821, ' ': 0.29, '/': 0.521,
  '&': 0.938, '-': 0.517, '.': 0.221, ',': 0.211, "'": 0.234,
};
const DIGIT_ADVANCE = 0.83;
const FALLBACK_ADVANCE = 0.3;
/* Matches the headings' letter-spacing in the stylesheet. */
const HEADING_TRACKING = 0.02;

const headlineWidth = (lines: readonly string[]) =>
  Math.max(
    ...lines.map((line) =>
      [...line.toUpperCase()].reduce(
        (sum, char) =>
          sum +
          HEADING_TRACKING +
          (ORBITRON_ADVANCE[char] ?? (/\d/.test(char) ? DIGIT_ADVANCE : FALLBACK_ADVANCE)),
        0
      )
    )
  );

/* Splits lines into words that rise one after another. The index runs on
   across lines, so a multi-line headline reads as one continuous sweep. Words
   are separated by real spaces, so the text copies and reads as words. */
function PullWords({
  lines,
  lineClass,
  firstLineHref,
}: {
  lines: readonly string[];
  lineClass?: string;
  /* Turns the first line into a link. */
  firstLineHref?: string;
}) {
  let index = 0;
  return lines.map((line, lineIndex) => {
    const words = line.split(/\s+/).filter(Boolean).map((word, position) => {
      const delay = `${(index++ * WORD_STAGGER_S).toFixed(2)}s`;
      return (
        <Fragment key={`${word}-${delay}`}>
          {position > 0 && ' '}
          <span className={styles.pullWord} style={{ animationDelay: delay }}>
            {word}
          </span>
        </Fragment>
      );
    });
    if (!lineClass) return words;
    return firstLineHref && lineIndex === 0 ? (
      <Link key={line} href={firstLineHref} className={lineClass}>
        {words}
      </Link>
    ) : (
      <span key={line} className={lineClass}>
        {words}
      </span>
    );
  });
}

/* Fades and un-blurs in once it scrolls into view, after `delay` seconds. */
function FadeUp({
  as: Tag = 'p',
  delay,
  className,
  children,
}: {
  as?: 'p' | 'div';
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`${styles.fadeUp}${className ? ` ${className}` : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

/* Off-site links open in a new tab. */
const externalLink = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

const ICONS: Record<NonNullable<SpotlightContent['links']>[number]['icon'], ReactNode> = {
  youtube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z" />
    </>
  ),
};

/* Full-viewport hero: a second scene shows through a spotlight that follows
   the pointer, with the copy, a featured card and a spec list laid over it. */
export default function SpotlightHero({ content }: { content: SpotlightContent }) {
  const { card, specs } = content;

  return (
    <section
      className={styles.hero}
      data-spotlight=""
      style={{ '--h1-w': headlineWidth(content.headline).toFixed(3) } as CSSProperties}
    >
      <div
        className={`${styles.baseImg} ${styles.imageAnimate}`}
        style={{ backgroundImage: `url("${content.images.base}")` }}
      />
      <div
        className={styles.revealImg}
        data-reveal=""
        style={{ backgroundImage: `url("${content.images.reveal}")` }}
      />
      <StarField className={styles.stars} />

      <div className={styles.ui}>
        <div className={styles.left}>
          <div className={styles.copy}>
            <h1 data-words="">
              {/* The first line is the name, and leads home from every page. */}
              <PullWords lines={content.headline} lineClass={styles.pullLine} firstLineHref="/" />
            </h1>
            <FadeUp delay={0.5}>
              {content.intro.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </FadeUp>
            {content.links && content.links.length > 0 && (
              <FadeUp as="div" delay={0.65} className={styles.iconRow}>
                {content.links.map((link) => (
                  <a
                    key={link.href}
                    className={styles.iconBtn}
                    href={link.href}
                    aria-label={link.label}
                    {...externalLink(link.href)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {ICONS[link.icon]}
                    </svg>
                  </a>
                ))}
              </FadeUp>
            )}
          </div>

          <article className={styles.card}>
            <div
              className={styles.thumb}
              aria-hidden="true"
              style={{ backgroundImage: `url("${card.image}")` }}
            />
            <div className={styles.cardBody}>
              <h2 data-words="">
                <PullWords lines={[card.title]} />
              </h2>
              <FadeUp delay={1.05}>{card.body}</FadeUp>
            </div>
            <span className={`${styles.cardTag} ${styles.fadeUp}`} style={{ animationDelay: '1.15s' }}>
              {card.tag}
            </span>
          </article>
        </div>

        <FadeUp as="div" delay={0.75} className={styles.marker}>
          {content.slogan}
        </FadeUp>

        <div className={styles.specs}>
          <h3 data-words="">
            <PullWords lines={[specs.title]} />
          </h3>
          {specs.rows.map((row, index) => (
            <FadeUp as="div" key={row.label} delay={1.2 + index * 0.1} className={styles.specRow}>
              <span className={styles.specLabel}>{row.label}</span>
              <span className={styles.specValue}>{row.value}</span>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Without JavaScript nothing would ever be revealed, so show it all. */}
      <noscript>
        <style>{`.${styles.pullWord},.${styles.fadeUp}{opacity:1!important;transform:none!important;translate:none!important;filter:none!important}`}</style>
      </noscript>

      <SpotlightEffects
        classes={{
          wordsVisible: styles.wordsVisible,
          fadeUp: styles.fadeUp,
          isVisible: styles.isVisible,
        }}
      />
    </section>
  );
}

