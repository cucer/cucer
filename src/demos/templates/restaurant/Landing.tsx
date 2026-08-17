import Link from 'next/link';
import { demoRoutes } from '@/demos/routes';
import type { DemoClient, DemoPhotoSlot, DemoSplit } from '@/demos/types';
import DemoShell from './DemoShell';
import Hero from './Hero';
import Photo from './Photo';
import Brand from './Brand';
import MenuQr from './MenuQr';
import { InstagramIcon, MailIcon, PhoneIcon } from './icons';
import styles from './restaurant.module.css';

/* Pads a photo row out to the count the layout is designed around, so an
   unfinished demo shows the shape it will have rather than a short row. */
function fillSlots(slots: DemoPhotoSlot[], count: number): DemoPhotoSlot[] {
  return Array.from({ length: Math.max(count, slots.length) }, (_, i) => slots[i] ?? null);
}

function Split({
  split,
  index,
  menuUrl,
}: {
  split: DemoSplit;
  index: number;
  menuUrl: string;
}) {
  return (
    <section
      className={`${styles.split} ${
        split.side === 'right' ? styles.splitPhotoRight : ''
      }`}
      id={split.id}
    >
      <div className={styles.splitMedia}>
        <Photo
          image={split.image}
          name={split.title}
          sizes="(min-width: 720px) 50vw, 100vw"
          priority={index === 0}
        />
      </div>
      <div
        className={`${styles.splitCopy} ${
          split.tone === 'band' ? styles.splitCopyBand : ''
        }`}
      >
        <h2 className={styles.heading}>{split.title}</h2>
        <div className={`${styles.body} ${styles.measure}`}>
          {split.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        {split.qr ? (
          <MenuQr url={menuUrl} label={split.qr.label} caption={split.qr.caption} />
        ) : null}

        {split.cta ? (
          <div>
            <Link className={styles.button} href={split.cta.href}>
              {split.cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function Landing({ client }: { client: DemoClient }) {
  const routes = demoRoutes(client.slug);
  /* Absolute, because a phone camera scanning a printed card has no origin to
     resolve a relative path against. */
  const menuUrl = new URL(routes.menu, client.baseUrl).toString();
  const { contact } = client;

  return (
    <DemoShell client={client}>
      {/* One page, so no navigation: there is nowhere to go but down, and the
          menu is reached by scanning the code at the table rather than by
          clicking a link. That leaves the masthead to do one job — say whose
          place this is — so it is centred and nothing shares the row. */}
      <header className={styles.masthead}>
        <Brand client={client} className={styles.mastheadBrand} priority />
      </header>

      <Hero images={client.hero.images} name={client.name} />

      <section className={`${styles.block} ${styles.blockCenter}`} id="restoran">
        <h1 className={styles.heading}>{client.intro.title}</h1>
        <div className={`${styles.body} ${styles.measure}`}>
          {client.intro.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          {client.intro.lead ? <p className={styles.lead}>{client.intro.lead}</p> : null}
        </div>
        {client.intro.cta ? (
          <div>
            <Link className={styles.button} href={client.intro.cta.href}>
              {client.intro.cta.label}
            </Link>
          </div>
        ) : null}
      </section>

      {client.strip ? (
        <div className={styles.strip}>
          {fillSlots(client.strip, 4).map((image, index) => (
            <Photo
              key={image?.src ?? `strip-${index}`}
              image={image ?? undefined}
              name={`Şerit ${index + 1}`}
              ratio="1 / 1"
              sizes="(min-width: 720px) 25vw, 50vw"
            />
          ))}
        </div>
      ) : null}

      <section className={`${styles.block} ${styles.blockBand} ${styles.blockCenter}`}>
        <h2 className={styles.heading}>{client.band.title}</h2>
        <div className={`${styles.body} ${styles.measure}`}>
          {client.band.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        {client.band.link ? (
          <div>
            <a className={styles.textLink} href={client.band.link.href}>
              {client.band.link.label}
            </a>
          </div>
        ) : null}
      </section>

      {client.splits.map((split, index) => (
        <Split key={split.id} split={split} index={index} menuUrl={menuUrl} />
      ))}

      {client.banner !== undefined ? (
        <div className={styles.banner}>
          <Photo image={client.banner ?? undefined} name="Geniş görsel" />
        </div>
      ) : null}

      <section
        className={`${styles.block} ${styles.blockCenter}`}
        id="rezervasyon"
      >
        <h2 className={styles.heading}>{client.reservation.title}</h2>
        <div className={`${styles.body} ${styles.measure}`}>
          {client.reservation.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        {contact.phone ? (
          <div className={styles.contactRow}>
            <span className={styles.contactIcon}>
              <PhoneIcon />
            </span>
            <a className={styles.button} href={`tel:${contact.phone.replace(/\s/g, '')}`}>
              {contact.phone}
            </a>
          </div>
        ) : null}

        {contact.email ? (
          <div className={styles.contactRow}>
            <span className={styles.contactIcon}>
              <MailIcon />
            </span>
            <a className={styles.button} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        ) : null}

        {/* The lead only makes sense above actual links — on its own it reads
            as a promise the page does not keep. */}
        {client.reservation.deliveryLinks?.length ? (
          <>
            {client.reservation.deliveryLead ? (
              <p className={styles.deliveryLead}>{client.reservation.deliveryLead}</p>
            ) : null}
            <div className={styles.deliveryLinks}>
              {client.reservation.deliveryLinks.map((link) => (
                <a
                  className={styles.button}
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {contact.mapEmbedUrl ? (
        <iframe
          className={styles.map}
          src={contact.mapEmbedUrl}
          title={`${client.name} konumu`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}

      {/* Sits below the map rather than above it: the map and the gallery are
          both full-bleed image blocks, and butted together they read as one
          undifferentiated slab. The band separates them, and the address works
          better as a caption under the map than as a heading over it. */}
      {contact.address ? (
        <div className={styles.addressStrip} id="iletisim">
          <strong>{client.name}</strong>
          {contact.address}
        </div>
      ) : null}

      {client.gallery ? (
        <div className={styles.grid}>
          {fillSlots(client.gallery, 6).map((image, index) => (
            <Photo
              key={image?.src ?? `gallery-${index}`}
              image={image ?? undefined}
              name={`Galeri ${index + 1}`}
              ratio="1 / 1"
              sizes="(min-width: 720px) 33vw, 50vw"
            />
          ))}
        </div>
      ) : null}

      <footer className={styles.footer}>
        <Brand client={client} className={styles.footerMark} />

        <div className={styles.footerCols}>
          <div>
            <p className={styles.footerTitle}>Bizi takip et</p>
            <div className={styles.footerSocial}>
              {contact.instagram ? (
                /* The handle itself is far too long to set as a link label. */
                <a
                  href={`https://instagram.com/${contact.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram: @${contact.instagram}`}
                >
                  <InstagramIcon />
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <p className={styles.footerTitle}>{contact.hours ?? 'İletişim'}</p>
            <div className={styles.footerLines}>
              {contact.address ? <span>{contact.address}</span> : null}
              {contact.phone ? <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a> : null}
              {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : null}
            </div>
          </div>

          <div>
            <p className={styles.footerTitle}>Menü</p>
            <div className={styles.footerLines}>
              <Link href={routes.menu}>Dijital menüyü aç</Link>
              {contact.mapsUrl ? (
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Yol tarifi
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <p className={styles.footerNote}>
          © {new Date().getFullYear()} {client.name}
        </p>
      </footer>
    </DemoShell>
  );
}
