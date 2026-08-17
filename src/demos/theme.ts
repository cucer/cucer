import type { CSSProperties } from 'react';
import { fontFamily } from './fonts';
import type { DemoTheme } from './types';

/* Turns a client's theme object into the custom properties the template
   stylesheet reads, so re-skinning a demo never means touching CSS. */
export function themeVars(theme: DemoTheme): CSSProperties {
  return {
    '--demo-bg': theme.background,
    '--demo-surface': theme.surface,
    '--demo-text': theme.text,
    '--demo-muted': theme.muted,
    '--demo-band': theme.band,
    '--demo-on-band': theme.onBand,
    '--demo-on-band-muted': theme.onBandMuted,
    '--demo-accent': theme.accent,
    '--demo-on-accent': theme.onAccent,
    '--demo-border': theme.border,
    '--demo-radius': theme.radius,
    '--demo-display': fontFamily(theme.displayFont),
    '--demo-body': fontFamily(theme.bodyFont),
  } as CSSProperties;
}

const priceFormatter = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}
