/* Shape of a client demo. Everything a demo needs lives in one typed object so
   a new client is a data file, not a new codebase. Nothing here imports from
   src/app or src/components — the whole src/demos tree is portable, so a demo
   that turns into a paid project can be lifted into its own repo intact. */

export type DemoImage = {
  /* Path under /public — build it with demoAsset() in routes.ts. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/* A photograph, or a reserved slot still waiting for one. */
export type DemoPhotoSlot = DemoImage | null;

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  /* Whole lira, formatted at render time. Optional and off by default: a demo
     shows no prices unless the client has explicitly given them and asked for
     them on the menu. Never invent one to fill the slot — a wrong price in
     front of a restaurant owner costs more than an empty line. */
  price?: number;
  image?: DemoImage;
  /* "Şefin seçimi", "En çok tercih edilen" — keep to one per item. */
  badge?: string;
  /* Gets the large treatment. Aim for 8–12 across the whole menu. */
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  tagline?: string;
  image?: DemoImage;
  items: MenuItem[];
};

/* Colours are raw CSS values, applied as custom properties on the demo root.
   Keeping them as data means a client theme never needs its own stylesheet. */
export type DemoTheme = {
  /* Light blocks */
  background: string;
  surface: string;
  text: string;
  muted: string;
  /* Full-bleed colour blocks that alternate with the light ones */
  band: string;
  onBand: string;
  onBandMuted: string;
  /* Outlined buttons and small caps labels */
  accent: string;
  onAccent: string;
  border: string;
  /* '0' for the hard-edged editorial look; a length if a client wants softer. */
  radius: string;
  displayFont: DemoFontKey;
  bodyFont: DemoFontKey;
};

export type DemoFontKey = 'slab' | 'serif' | 'humanist' | 'sans';

export type DemoTemplate = 'restaurant';

/* draft  — not ready to be shown to anyone
   ready  — safe to send the link to the client
   archived — kept for the portfolio, no longer pitched */
export type DemoStatus = 'draft' | 'ready' | 'archived';

export type DemoLink = { label: string; href: string };

/* A 50/50 row: copy on one side, photograph on the other. `side` is which side
   the photo takes, and consecutive splits should alternate. */
export type DemoSplit = {
  id: string;
  title: string;
  body: string[];
  image?: DemoImage;
  side: 'left' | 'right';
  /* Paints the copy half in the band colour instead of leaving it light. */
  tone?: 'light' | 'band';
  cta?: DemoLink;
  /* Renders the scannable menu code in the copy half. The point of the section
     is the artefact that goes on the table, so show it rather than describe it. */
  qr?: { label: string; caption?: string };
};

export type DemoClient = {
  slug: string;
  template: DemoTemplate;
  status: DemoStatus;
  /* Shown only on the private /demos index, never to the client. */
  internalNote?: string;

  name: string;
  lang: string;
  tagline: string;
  theme: DemoTheme;

  /* Origin the QR code points at. A printed table card outlives any redesign,
     so this has to be the address the menu will really live on — change it once
     when the demo moves to the client's own domain. */
  baseUrl: string;

  /* Full lockup — mark plus wordmark — used large and centred in the footer.
     Falls back to the name set in type. */
  logo?: DemoImage;
  /* Mark on its own, for the header bar. At 38px a full lockup's wordmark is
     unreadable, so the bar pairs this with the name set in live type. */
  emblem?: DemoImage;

  hero: {
    /* The reference layout puts no copy over the hero — the photograph is the
       whole statement. More than one turns it into a slider. */
    images: DemoImage[];
  };

  /* The opening white block: name of the place, what it is, one action. */
  intro: {
    title: string;
    body: string[];
    lead?: string;
    cta?: DemoLink;
  };

  /* Full-bleed row of photos directly under the intro. Four reads best.
     `null` reserves a slot whose photograph has not been shot yet — it renders
     as a labelled placeholder. Omit the field entirely to drop the row. */
  strip?: DemoPhotoSlot[];

  /* The band: a colour block that interrupts the white and resets the eye. */
  band: {
    title: string;
    body: string[];
    link?: DemoLink;
  };

  splits: DemoSplit[];

  /* One wide photograph on its own, between the splits and the reservation. */
  banner?: DemoPhotoSlot;

  reservation: {
    title: string;
    body: string[];
    /* Bold line above the delivery links, e.g. "ya da evinde ye". */
    deliveryLead?: string;
    deliveryLinks?: DemoLink[];
  };

  /* Closing photo grid. Six reads best: three across, two down. */
  gallery?: DemoPhotoSlot[];

  menu: {
    intro?: string;
    categories: MenuCategory[];
  };

  contact: {
    address?: string;
    hours?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    instagram?: string;
    mapsUrl?: string;
    /* Google Maps share URL with &output=embed — no API key needed. */
    mapEmbedUrl?: string;
  };
};
