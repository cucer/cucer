import { demoAsset } from '../routes';
import type { DemoClient, DemoImage } from '../types';

/* First client demo, built to the structure of The Fisherman Burger (Rome):
   full-bleed alternating blocks, hard edges, centred copy at a narrow measure,
   outlined accent buttons, photography carrying the weight.

   Yumurtacı by Halikarnas Tavukçusu — Geriş, Bodrum. Brand name, address, phone,
   Instagram and map are the real thing. Opening hours, e-mail and the actual
   dish names are still missing; nothing invents them.

   No prices. Not "prices we don't know yet" — this menu does not carry them at
   all. See the rule in README.md before adding a `price` to anything here.

   Photography is generated stand-in work shot to one art direction (grey stone,
   copper sahan pans, navy reactive-glaze stoneware, soft north light) so it
   reads as a single session — see docs/yumurtaci-gorsel-promptlari.md. It
   gets replaced by the real shoot once the client signs. Sources live outside
   the repo in docs/source-media/; everything under public/ is WebP resized to
   the width its slot actually renders at, because the export does no image
   optimisation of its own and this is opened on restaurant wi-fi. */

/* The random tail is the privacy measure: the demo is unlisted, so the URL is
   the only thing keeping it away from anyone the link was not sent to. It also
   names the asset folder, so the photographs are not guessable either. Rotate
   it (and public/demos/<slug>/ with it) if the link ever leaks. */
const SLUG = 'yumurtaci-724638b7';

/* Three palettes, one active. This is the whole theming story: swap PALETTE and
   every block, button, chip and hairline follows, with no CSS touched.

   onAccent is deliberately dark in all three. It sits on the accent as a fill —
   the active menu chip — and white on a gold or yolk field is around 2.5:1,
   which is unreadable at chip size. */
const PALETTES = {
  /* Sampled from the reference: The Fisherman Burger, Rome. */
  navy: {
    background: '#ffffff',
    surface: '#f2efe9',
    text: '#2a4266',
    muted: '#5c6b85',
    band: '#2a4266',
    onBand: '#ffffff',
    onBandMuted: 'rgba(255, 255, 255, 0.82)',
    accent: '#c89454',
    onAccent: '#1a1408',
    border: 'rgba(42, 66, 102, 0.18)',
  },
  /* Warm charcoal + yolk. The accent is the yolk in every photograph, so the
     page and the food agree; the ground is warm off-white, not paper white. */
  charcoal: {
    background: '#fbf8f2',
    surface: '#efe9dd',
    text: '#262320',
    muted: '#6c6459',
    band: '#221f1b',
    onBand: '#f7f2e8',
    onBandMuted: 'rgba(247, 242, 232, 0.78)',
    accent: '#d29520',
    onAccent: '#221f1b',
    border: 'rgba(38, 35, 32, 0.16)',
  },
  /* Bottle green + cream, with brass rather than gold so it sits with the
     copper pans instead of competing with them. */
  forest: {
    background: '#f8f4ea',
    surface: '#ece5d3',
    text: '#1d3a2c',
    muted: '#5a6b5f',
    band: '#1c3a2b',
    onBand: '#f6f1e4',
    onBandMuted: 'rgba(246, 241, 228, 0.80)',
    accent: '#c08a35',
    onAccent: '#142b20',
    border: 'rgba(29, 58, 44, 0.18)',
  },
} as const;

const PALETTE = PALETTES.forest;

const photo = (file: string, alt: string, width: number, height: number): DemoImage => ({
  src: demoAsset(SLUG, file),
  alt,
  width,
  height,
});

/* ---- Brand ---- */

const logo = photo('logo.webp', 'Yumurtacı by Halikarnas Tavukçusu logosu', 900, 722);
const emblem = photo('emblem.webp', '', 320, 130);

/* ---- Hero, 16:9 ---- */

const hero1 = photo(
  'egg-hero-01.webp',
  'Beyaz kare tabakta kuşkonmaz ve avokado üzerinde hollandaise soslu yumurta, yanında turşu ve bakır kaşık',
  1920,
  1072
);
const hero2 = photo(
  'egg-hero-02.webp',
  'Ocakta bakır tavada eriyen tereyağının içine yeni kırılmış yumurta',
  1920,
  1072
);
const hero3 = photo(
  'egg-hero-03.webp',
  'Kahvaltı masasının üstten görünümü: çeşitli yumurta tabakları, ince belli çay bardakları ve ekmek',
  1920,
  1072
);

/* ---- Strip, 1:1. Mekân, malzeme, detay — tabak değil. ---- */

const strip1 = photo(
  'egg-strip-01.webp',
  'Ahşap kasada samanın üzerinde duran kahverengi köy yumurtaları',
  900,
  900
);
const strip2 = photo(
  'egg-strip-02.webp',
  'Dövme bakır tavada köpürerek eriyen tereyağı dilimi',
  900,
  900
);
const strip3 = photo(
  'egg-strip-03.webp',
  'Sabah ışığında, servise hazırlanmış açık hava kahvaltı terası',
  900,
  900
);
const strip4 = photo(
  'egg-strip-04.webp',
  'Taş tezgâhta kırık yumurta kabukları, bakır çırpma teli ve un',
  900,
  900
);

/* ---- Banner ---- */

const banner = photo(
  'egg-banner-01.webp',
  'Tezgâhta yan yana dizilmiş beş bakır sahanda beş farklı yumurta tabağı',
  1800,
  1005
);

/* ---- Splits ---- */

const split1 = photo(
  'split-01.webp',
  'Lacivert sırlı kâsede ıspanak yatağında poşe yumurta, üzerine pul biberli yağ',
  1400,
  1875
);
const split2 = photo(
  'split-02.webp',
  'Kahvaltı masasındaki tabağı telefonuyla fotoğraflayan eller',
  1400,
  1875
);

/* ---- Gallery, 1:1 ---- */

const gallery1 = photo(
  'egg-gallery-01.webp',
  'Kahvaltı sonrası masa: boşalmış tabaklar, çay bardağı ve bakır sahan',
  900,
  900
);
const gallery2 = photo(
  'egg-gallery-02.webp',
  'Deniz manzaralı terasta kurulmuş kahvaltı masası',
  900,
  900
);
const gallery3 = photo(
  'egg-gallery-03.webp',
  'Bakır tabaklarda iki ince belli çay bardağı, Türk kahvesi ve cezve',
  900,
  900
);
const gallery4 = photo(
  'egg-gallery-04.webp',
  'Hasır sepette taze köy ekmeği ve lacivert kâsede tereyağı',
  900,
  900
);
const gallery5 = photo(
  'egg-gallery-05.webp',
  'Terasta kahvaltı eden iki kişi, arkadan görünüm',
  900,
  900
);
const gallery6 = photo(
  'egg-gallery-06.webp',
  'Lacivert tabakta çocuklar için gülen yüz şeklinde hazırlanmış yumurta',
  900,
  900
);

/* ---- Menu dishes ---- */

const hollandaise = photo(
  'egg1.webp',
  'Kuşkonmaz ve avokado üzerinde hollandaise soslu yumurta, yanında mevsim salatası',
  1200,
  1500
);
const pastirmali = photo(
  'egg2.webp',
  'Kaşar danteli üzerinde pastırmalı sahanda yumurta, közlenmiş soğan ve yeşillik ile',
  1200,
  1082
);
const kasarli = photo(
  'egg3.webp',
  'Eritilmiş kaşar üzerine üç sarısı bozulmamış yumurta, pul biberli',
  1200,
  1500
);
const cocuk = photo(
  'egg4.webp',
  'Çocuklar için gülen yüz şeklinde hazırlanmış sahanda yumurta tabağı',
  1200,
  1500
);
const menemen = photo(
  'menemen.webp',
  'Bakır sahanda domates ve yeşil biberli menemen, yanında ekmek',
  1200,
  1608
);
const sahanda = photo(
  'sahanda.webp',
  'Küçük bakır sahanda iki adet sahanda yumurta, sarıları bozulmamış',
  1200,
  1608
);
const sucuklu = photo(
  'sucuklu.webp',
  'Bakır sahanda kalın dilim sucuk ve yumurta, üzerine maydanoz',
  1200,
  1608
);
const cay = photo(
  'cay.webp',
  'Bakır tabakta ince belli bardakta demli çay ve iki kesme şeker',
  1200,
  1608
);
const kahve = photo(
  'kahve.webp',
  'Bakır tabakta bol köpüklü Türk kahvesi, yanında su ve lokum',
  1200,
  1608
);
const portakal = photo(
  'portakal.webp',
  'Bardakta taze sıkılmış portakal suyu, yanında portakal yarımları ve bakır sıkacak',
  1200,
  1608
);

export const yumurtaci: DemoClient = {
  slug: SLUG,
  template: 'restaurant',
  status: 'draft',
  internalNote:
    'Bodrum Geriş. Halikarnas Tavukçusu’nun kahvaltı/yumurta markası. Menü sadece yazı, sunum çok iyi. Referans: The Fisherman Burger (Roma). Menüde fiyat yok. Görseller üretilmiş vekil — gerçek çekim onaydan sonra. EKSİK: çalışma saatleri, e-posta, gerçek ürün adları.',

  /* Ticari unvan "Yumurtacı by Halikarnas Tavukçusu". Başlıkta ve adres
     şeridinde tam hâli taşımak satırı kırıyor, o yüzden ad kısa tutuldu ve alt
     marka tagline'a alındı — ikisi sayfa başlığında birleşiyor. */
  name: 'Yumurtacı',
  lang: 'tr',
  tagline: 'by Halikarnas Tavukçusu',

  /* Where the printed QR points. Change once when this moves to the
     restaurant's own domain — the table cards outlive the redesign. */
  baseUrl: 'https://cagatayucer.com',

  logo,
  emblem,

  theme: {
    ...PALETTE,
    /* Hard edges everywhere — the reference has no rounded corner on the page. */
    radius: '0',
    displayFont: 'slab',
    bodyFont: 'humanist',
  },

  hero: {
    images: [hero1, hero2, hero3],
  },

  intro: {
    title: 'Restoran',
    body: [
      'Halikarnas Tavukçusu’nun sabah hâli. Geriş’te, Bodrum’a bakan terasta, günün en iyi saatlerini tek bir şeye ayırmış bir mutfak.',
      'Menüde on beş çeşit yemek yok — sadece yumurta var, ve her biri kendi bakır sahanında pişer.',
    ],
    lead: 'Sabah ocak yanar, gerisi zamanlama meselesi.',
    cta: { label: 'Menüyü gör', href: `/demos/${SLUG}/menu/` },
  },

  strip: [strip1, strip2, strip3, strip4],

  band: {
    title: 'Yumurtamız',
    body: [
      'Tabağa giden her yumurta aynı sabah köyden gelir. Sarısı turuncu, kabuğu kalın, tereyağıyla tanıştığında rengini kaybetmeyen cinsten.',
      'Ne pişireceğine karar veremezsen, sahandaki en iyi hâlini bize bırak.',
    ],
    link: { label: 'menüdeki bütün tabaklar', href: `/demos/${SLUG}/menu/` },
  },

  splits: [
    {
      id: 'sahan',
      title: 'Sahan',
      body: [
        'Her tabak kendi bakır sahanında pişer ve masaya sahanıyla gelir. Yumurtanın kıvamını bozmadan sıcak kalmasının tek yolu bu.',
        'Kaşar eritilir, pastırma tavada kendi yağını bırakır, yumurta en son girer.',
      ],
      image: split1,
      side: 'right',
      tone: 'light',
    },
    {
      id: 'menu',
      title: 'Menü',
      body: [
        'İmza tabaklar, klasikler ve küçükler için hazırlanan porsiyonlar. Hepsi fotoğrafıyla, telefonunuzdan.',
        'Masadaki kodu okutun, daha sipariş vermeden yemeğin nasıl geleceğini görün.',
      ],
      image: split2,
      side: 'left',
      tone: 'band',
      qr: { label: 'Menüyü açan QR kodu', caption: 'Kamerayı doğrultun' },
      cta: { label: 'Dijital menüyü aç', href: `/demos/${SLUG}/menu/` },
    },
  ],

  banner,

  reservation: {
    title: 'Rezervasyon',
    body: [
      'Masa ayırtmak için aramanız ya da yazmanız yeterli.',
      'Hafta sonu sabahları doluyoruz, erken haber verin.',
    ],
    deliveryLead: 'Ya da evinizde yiyin',
    deliveryLinks: [],
  },

  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6],

  menu: {
    intro: 'Bugün ne yemek istersin?',
    categories: [
      {
        id: 'imza',
        name: 'İmza Yumurtalar',
        tagline: 'Bize adını veren tabaklar',
        items: [
          {
            id: 'pastirmali-dantel',
            name: 'Pastırmalı Kaşar Danteli',
            description:
              'Tavada kızaran kaşar dantelinin üzerine sahanda yumurta, ince dilim pastırma ve pul biber. Yanında közlenmiş soğan turşusu.',
            image: pastirmali,
            badge: 'En çok tercih edilen',
            featured: true,
          },
          {
            id: 'hollandaise',
            name: 'Kuşkonmazlı Avokado & Hollandaise',
            description:
              'Fırınlanmış kuşkonmaz ve taze avokado üzerine poşe yumurta, ev yapımı hollandaise sos ve tatlı toz biber.',
            image: hollandaise,
            badge: 'Şefin seçimi',
            featured: true,
          },
          {
            id: 'ispanakli-pose',
            name: 'Ispanaklı Poşe',
            description:
              'Tereyağında sotelediğimiz ıspanak yatağında iki poşe yumurta, üzerine pul biberli tereyağı.',
            image: split1,
            featured: true,
          },
        ],
      },
      {
        id: 'klasikler',
        name: 'Klasikler',
        tagline: 'Herkesin bildiği, bizim yaptığımız',
        items: [
          {
            id: 'kasarli-sahan',
            name: 'Kaşarlı Sahanda',
            description:
              'Eritilmiş eski kaşarın üzerine üç yumurta. Sarısı bozulmadan, tam kıvamında.',
            image: kasarli,
            featured: true,
          },
          {
            id: 'menemen',
            name: 'Menemen',
            description: 'Domates, yeşil biber, tereyağı. Ne az ne fazla.',
            image: menemen,
            featured: true,
          },
          {
            id: 'sucuklu',
            name: 'Sucuklu Yumurta',
            description: 'Kalın kesilmiş dana sucuk, bakır sahanda.',
            image: sucuklu,
            featured: true,
          },
          {
            id: 'sahanda',
            name: 'Sahanda Yumurta',
            description: 'İki yumurta, tereyağı, deniz tuzu.',
            image: sahanda,
            featured: true,
          },
        ],
      },
      {
        id: 'kucukler',
        name: 'Küçükler İçin',
        items: [
          {
            id: 'cocuk-tabagi',
            name: 'Gülen Yumurta',
            description:
              'İki sahanda yumurta, taze sebzeler ve yeşilliklerle. Çocuklar için hazırlanır.',
            image: cocuk,
            featured: true,
          },
        ],
      },
      {
        id: 'yanina',
        name: 'Yanına',
        items: [
          {
            id: 'cay',
            name: 'Demlik Çay',
            description: 'Sınırsız.',
            image: cay,
            featured: true,
          },
          { id: 'kahve', name: 'Türk Kahvesi', image: kahve, featured: true },
          {
            id: 'portakal',
            name: 'Taze Portakal Suyu',
            image: portakal,
            featured: true,
          },
        ],
      },
    ],
  },

  contact: {
    address: 'Geriş Mahallesi, Erdemil Caddesi, 6257 Sokak No: 14, Bodrum / Muğla',
    /* hours ve email müşteriden gelmedi. Uydurulmuş çalışma saati, uydurulmuş
       fiyat kadar kötü — restoran sahibi ilk onu fark eder. Gelene kadar boş. */
    phone: '+90 532 482 50 93',
    instagram: 'yumurtacibyhalikarnastavukcusu',
    mapsUrl:
      'https://www.google.com/maps/place/Yumurtaci+By+Halikarnas+Tavukcusu/@37.0883669,27.2658223,17z/data=!3m1!4b1!4m6!3m5!1s0x14be75171b095eab:0xfff750f773419200!8m2!3d37.0883669!4d27.2658223!16s%2Fg%2F11g24xy3hr',
    /* Koordinatlardan üretildi; embed uç noktası API anahtarı istemiyor. */
    mapEmbedUrl:
      'https://www.google.com/maps?q=37.0883669,27.2658223&z=16&hl=tr&output=embed',
  },
};
