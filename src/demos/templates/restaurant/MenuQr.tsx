import QRCode from 'qrcode';
import styles from './restaurant.module.css';

/* The QR is generated at build time and inlined as SVG — no client JavaScript,
   no image request, and it stays sharp at whatever size a printed table card
   ends up being.

   Error correction M tolerates a scuffed table card without bloating the
   pattern. The colours come from the theme so the code sits inside the design
   rather than on top of it; contrast between the two is what a scanner needs,
   and dark-on-light is the only orientation every reader handles. */
export default async function MenuQr({
  url,
  label,
  caption,
}: {
  url: string;
  label: string;
  caption?: string;
}) {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 0,
  });

  return (
    <figure className={styles.qr}>
      <div
        className={styles.qrCode}
        role="img"
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption ? <figcaption className={styles.qrCaption}>{caption}</figcaption> : null}
    </figure>
  );
}
