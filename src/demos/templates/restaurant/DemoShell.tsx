import type { ReactNode } from 'react';
import { fontClassNames } from '@/demos/fonts';
import { themeVars } from '@/demos/theme';
import type { DemoClient } from '@/demos/types';

/* Applies the client's theme and fonts. `lang` sits here rather than on <html>
   because the (demos) root layout is shared by every client — a demo in another
   language only has to change its own data. */
export default function DemoShell({
  client,
  children,
}: {
  client: DemoClient;
  children: ReactNode;
}) {
  return (
    <div
      className={`demo-root ${fontClassNames(
        client.theme.displayFont,
        client.theme.bodyFont
      )}`}
      style={themeVars(client.theme)}
      lang={client.lang}
    >
      {children}
    </div>
  );
}
