// =====================================================================
//  CATALOGO PRODOTTI DELLO SHOP  (dati segnaposto)
//
//  Per aggiungere un prodotto:
//   1. Metti le foto in  public/images/products/   (es. mio-gel-1.jpg)
//   2. Aggiungi una voce qui sotto: `slug` univoco, `categoria` uguale a
//      uno slug di data/shop-categories.ts, e `immagini` con i percorsi.
//  Nient'altro da toccare: griglie, filtri, ricerca, carrello e checkout
//  leggono tutti da questo file.
// =====================================================================

export type VariantOption = {
  id: string;
  nome: string;
  // Differenza di prezzo rispetto al prezzo base (può essere negativa)
  prezzoDelta?: number;
};

export type VariantGroup = {
  // Etichetta mostrata sulla scheda prodotto (es. "Formato", "Forma")
  nome: string;
  opzioni: VariantOption[];
};

export type Product = {
  slug: string;
  nome: string;
  categoria: string; // slug di ShopCategory
  prezzo: number;
  // Se presente, mostra il prezzo barrato accanto a quello attuale
  prezzoPrecedente?: number;
  descrizioneBreve: string;
  descrizione: string;
  // Punti chiave mostrati a elenco sulla scheda prodotto
  caratteristiche: string[];
  immagini: string[];
  varianti?: VariantGroup;
  badge?: string; // es. "Novità", "Best seller"
  inEvidenza?: boolean;
  esaurito?: boolean;
};

export const products: Product[] = [
  // --- Gel & Base ----------------------------------------------------
  {
    slug: "gel-costruttore-diamond-clear",
    nome: "Gel Costruttore Diamond Clear",
    categoria: "gel-base",
    prezzo: 28.9,
    prezzoPrecedente: 34.0,
    descrizioneBreve:
      "Gel costruttore trasparente, autolivellante, per allungamenti strutturati.",
    descrizione:
      "Un costruttore medio-denso che si stende da solo senza colare, perfetto per costruire l'apex e mantenere una struttura leggera. La trasparenza cristallina lo rende ideale sotto qualunque colore o nail art, senza ingiallire nel tempo.",
    caratteristiche: [
      "Viscosità media, autolivellante",
      "Catalizza in 60 secondi in lampada LED",
      "Non ingiallisce, trasparenza stabile",
      "Adatto ad allungamenti fino a 2 misure",
    ],
    immagini: [
      "/images/products/gel-costruttore-diamond-clear.svg",
      "/images/products/gel-costruttore-diamond-clear-2.svg",
    ],
    varianti: {
      nome: "Formato",
      opzioni: [
        { id: "15ml", nome: "15 ml" },
        { id: "30ml", nome: "30 ml", prezzoDelta: 12 },
        { id: "50ml", nome: "50 ml", prezzoDelta: 24 },
      ],
    },
    badge: "Best seller",
    inEvidenza: true,
  },
  {
    slug: "base-rubber-gold-touch",
    nome: "Base Rubber Gold Touch",
    categoria: "gel-base",
    prezzo: 19.5,
    descrizioneBreve:
      "Base rubber nude con micro-riflesso dorato, livellante e protettiva.",
    descrizione:
      "Una base elastica che compensa le irregolarità della lamina e protegge l'unghia naturale. Il micro-riflesso dorato la rende già bellissima da sola, per una french morbida o un nude sofisticato.",
    caratteristiche: [
      "Elastica, non si stacca sulle unghie flessibili",
      "Livella la lamina senza limatura aggressiva",
      "Finitura nude con riflesso oro",
      "Tenuta fino a 3 settimane",
    ],
    immagini: ["/images/products/base-rubber-gold-touch.svg"],
    varianti: {
      nome: "Tonalità",
      opzioni: [
        { id: "nude-01", nome: "Nude 01 — Champagne" },
        { id: "nude-02", nome: "Nude 02 — Rosa cipria" },
        { id: "nude-03", nome: "Nude 03 — Caramello" },
      ],
    },
    inEvidenza: true,
  },
  {
    slug: "top-coat-no-wipe-brillante",
    nome: "Top Coat No-Wipe Brillante",
    categoria: "gel-base",
    prezzo: 17.9,
    descrizioneBreve:
      "Sigillante lucido senza strato dispersivo, brillantezza specchio.",
    descrizione:
      "Il top coat che chiude il lavoro con una lucentezza da vetrina e non richiede la passata di cleaner. Resiste ai graffi e mantiene la brillantezza per tutta la durata del servizio.",
    caratteristiche: [
      "Nessuno strato dispersivo da rimuovere",
      "Brillantezza specchio immediata",
      "Resistente ai graffi e ai detergenti",
      "Non ingiallisce",
    ],
    immagini: ["/images/products/top-coat-no-wipe-brillante.svg"],
  },

  // --- Nail Art ------------------------------------------------------
  {
    slug: "set-glitter-diamond",
    nome: "Set Glitter Diamond — 12 pz",
    categoria: "nail-art",
    prezzo: 24.0,
    descrizioneBreve:
      "Dodici glitter ultrafini dalle sfumature oro, champagne e diamante.",
    descrizione:
      "Una palette coordinata di glitter finissimi che si stendono uniformi senza grumi. Pensata per sfumature degradé, accenti su un dito solo o coperture total glitter dall'effetto gioiello.",
    caratteristiche: [
      "12 tonalità coordinate oro / argento / diamante",
      "Granulometria ultrafine, si livella facilmente",
      "Barattolini richiudibili da 2 g",
      "Compatibile con gel e semipermanente",
    ],
    immagini: [
      "/images/products/set-glitter-diamond.svg",
      "/images/products/set-glitter-diamond-2.svg",
    ],
    badge: "Novità",
    inEvidenza: true,
  },
  {
    slug: "gel-paint-linea-oro",
    nome: "Gel Paint Linea Oro",
    categoria: "nail-art",
    prezzo: 12.5,
    descrizioneBreve:
      "Gel paint denso e coprente per linee nette e decori a mano libera.",
    descrizione:
      "Un gel paint dalla consistenza cremosa che non cola e copre al primo passaggio. Perfetto per linee sottili, micro-decori e contorni netti anche con pennelli liner molto fini.",
    caratteristiche: [
      "Coprenza totale in una passata",
      "Non cola: la linea resta dove la metti",
      "Catalizza in 30 secondi",
      "Barattolo da 5 g",
    ],
    immagini: ["/images/products/gel-paint-linea-oro.svg"],
    varianti: {
      nome: "Colore",
      opzioni: [
        { id: "oro", nome: "Oro metallico" },
        { id: "nero", nome: "Nero assoluto" },
        { id: "bianco", nome: "Bianco latte" },
        { id: "argento", nome: "Argento diamante" },
      ],
    },
  },

  // --- Pennelli ------------------------------------------------------
  {
    slug: "pennello-gel-oval",
    nome: "Pennello Gel Oval",
    categoria: "pennelli",
    prezzo: 14.9,
    descrizioneBreve:
      "Pennello ovale in fibra sintetica per la stesura del costruttore.",
    descrizione:
      "La forma ovale distribuisce il gel in modo uniforme e permette di modellare l'apex con pochi gesti. La fibra sintetica non trattiene il prodotto e si pulisce in un attimo.",
    caratteristiche: [
      "Fibra sintetica di alta qualità",
      "Manico in legno laccato con ghiera oro",
      "Non perde setole",
      "Cappuccio di protezione incluso",
    ],
    immagini: ["/images/products/pennello-gel-oval.svg"],
    varianti: {
      nome: "Misura",
      opzioni: [
        { id: "4", nome: "#4 — fine", prezzoDelta: -2 },
        { id: "6", nome: "#6 — media" },
        { id: "8", nome: "#8 — larga", prezzoDelta: 2 },
      ],
    },
  },
  {
    slug: "set-pennelli-nail-art",
    nome: "Set Pennelli Nail Art — 5 pz",
    categoria: "pennelli",
    prezzo: 32.0,
    prezzoPrecedente: 39.5,
    descrizioneBreve:
      "Cinque pennelli per decoro: liner, one stroke, ventaglio, dettaglio e sfumatura.",
    descrizione:
      "Il set completo per iniziare con la nail art senza doverli comprare uno alla volta. Ogni pennello è pensato per una tecnica precisa e arriva in un astuccio rigido che li protegge.",
    caratteristiche: [
      "5 forme: liner, one stroke, ventaglio, dettaglio, sfumatura",
      "Astuccio rigido incluso",
      "Fibre sintetiche, adatte a gel e acrilico",
      "Ghiera oro anti-corrosione",
    ],
    immagini: [
      "/images/products/set-pennelli-nail-art.svg",
      "/images/products/set-pennelli-nail-art-2.svg",
    ],
    inEvidenza: true,
  },

  // --- Lampade & Fresette --------------------------------------------
  {
    slug: "lampada-uv-led-72w-pro",
    nome: "Lampada UV/LED 72W Pro",
    categoria: "lampade-fresette",
    prezzo: 89.0,
    descrizioneBreve:
      "Lampada professionale a doppia tecnologia, con sensore e display.",
    descrizione:
      "Catalizza qualunque gel o semipermanente in modo uniforme grazie ai 36 LED disposti su tutta la cupola. Il sensore di movimento avvia il ciclo da solo e il display mostra il tempo residuo.",
    caratteristiche: [
      "36 LED a doppia lunghezza d'onda (UV + LED)",
      "Cicli da 10 / 30 / 60 / 99 secondi",
      "Sensore di movimento e display LCD",
      "Fondo removibile per la pedicure",
    ],
    immagini: [
      "/images/products/lampada-uv-led-72w-pro.svg",
      "/images/products/lampada-uv-led-72w-pro-2.svg",
    ],
    badge: "Best seller",
    inEvidenza: true,
  },
  {
    slug: "fresa-professionale-35000",
    nome: "Fresa Professionale 35.000 giri",
    categoria: "lampade-fresette",
    prezzo: 119.0,
    descrizioneBreve:
      "Manipolo silenzioso e senza vibrazioni, con controllo continuo dei giri.",
    descrizione:
      "Un manipolo leggero che resta freddo anche dopo ore di lavoro e non vibra, così il controllo sulla limatura è totale. La rotazione è reversibile per lavorare con la stessa precisione su entrambe le mani.",
    caratteristiche: [
      "0 – 35.000 giri/min regolabili in continuo",
      "Rotazione avanti/indietro",
      "Manipolo con cambio punta rapido",
      "Meno di 55 dB: praticamente silenziosa",
    ],
    immagini: ["/images/products/fresa-professionale-35000.svg"],
  },

  // --- Tips & Estensioni ---------------------------------------------
  {
    slug: "soft-gel-tips-almond",
    nome: "Soft Gel Tips Almond — 504 pz",
    categoria: "tips-estensioni",
    prezzo: 26.5,
    descrizioneBreve:
      "Capsule in soft gel preformate, 12 misure, per la posa espressa.",
    descrizione:
      "Capsule sottilissime e già satinate all'interno, pronte da incollare con il gel: l'estensione si completa in metà tempo rispetto alla costruzione tradizionale e il risultato è naturale al tatto.",
    caratteristiche: [
      "504 capsule, 12 misure numerate",
      "Interno già opacizzato: nessuna limatura",
      "Bordo ultrasottile, invisibile sulla lamina",
      "Box organizer incluso",
    ],
    immagini: [
      "/images/products/soft-gel-tips-almond.svg",
      "/images/products/soft-gel-tips-almond-2.svg",
    ],
    varianti: {
      nome: "Forma",
      opzioni: [
        { id: "almond", nome: "Almond" },
        { id: "square", nome: "Square" },
        { id: "coffin", nome: "Coffin" },
        { id: "stiletto", nome: "Stiletto" },
      ],
    },
    inEvidenza: true,
  },
  {
    slug: "dual-form-popit-12-forme",
    nome: "Dual Form Popit — 12 forme",
    categoria: "tips-estensioni",
    prezzo: 21.9,
    descrizioneBreve:
      "Matrici riutilizzabili con apex già disegnato, 296 pezzi.",
    descrizione:
      "Le dual form con la curvatura e l'apex già costruiti: riempi, appoggia, catalizza e stacca. La struttura esce perfetta anche senza anni di esperienza nella costruzione a mano libera.",
    caratteristiche: [
      "296 matrici in 12 forme diverse",
      "Apex preformato, struttura corretta garantita",
      "Riutilizzabili decine di volte",
      "Tacche di riferimento per il centraggio",
    ],
    immagini: ["/images/products/dual-form-popit-12-forme.svg"],
    badge: "Novità",
  },

  // --- Lime & Buffer -------------------------------------------------
  {
    slug: "lime-zebra-100-180",
    nome: "Lime Zebra 100/180 — 10 pz",
    categoria: "lime-buffer",
    prezzo: 8.9,
    descrizioneBreve:
      "Lime a doppia grana, anima resistente, confezione da dieci.",
    descrizione:
      "La lima di tutti i giorni: grana 100 per sgrossare la struttura e 180 per rifinire il profilo. L'anima non si piega e il rivestimento resiste anche sul gel più duro.",
    caratteristiche: [
      "Doppia grana 100 / 180",
      "Anima rigida che non si deforma",
      "Lavabili e disinfettabili",
      "Confezione da 10 pezzi",
    ],
    immagini: ["/images/products/lime-zebra-100-180.svg"],
    varianti: {
      nome: "Grana",
      opzioni: [
        { id: "100-180", nome: "100 / 180" },
        { id: "150-180", nome: "150 / 180" },
        { id: "180-240", nome: "180 / 240" },
      ],
    },
  },

  // --- Attrezzi ------------------------------------------------------
  {
    slug: "pinza-tronchesina-pro",
    nome: "Pinza Tronchesina Professionale",
    categoria: "attrezzi",
    prezzo: 27.0,
    descrizioneBreve:
      "Acciaio inox temperato, taglio netto, completamente sterilizzabile.",
    descrizione:
      "Una tronchesina affilata a mano che taglia la cuticola in modo pulito, senza strappare. L'acciaio temperato mantiene il filo a lungo e sopporta i cicli in autoclave senza opacizzarsi.",
    caratteristiche: [
      "Acciaio inox temperato affilato a mano",
      "Testina da 4 mm per il lavoro di precisione",
      "Sterilizzabile in autoclave",
      "Molla a doppia lamina, apertura morbida",
    ],
    immagini: ["/images/products/pinza-tronchesina-pro.svg"],
  },

  // --- Oli & Liquidi -------------------------------------------------
  {
    slug: "olio-cuticole-argan-oro",
    nome: "Olio Cuticole Argan & Oro",
    categoria: "oli-liquidi",
    prezzo: 11.5,
    descrizioneBreve:
      "Olio nutriente ad assorbimento rapido con micro-particelle dorate.",
    descrizione:
      "Un olio leggero che si assorbe senza lasciare l'unto e mantiene la cuticola morbida tra un appuntamento e l'altro. Le micro-particelle dorate gli danno un riflesso prezioso sulla pelle.",
    caratteristiche: [
      "Argan, jojoba e vitamina E",
      "Assorbimento rapido, non unge",
      "Applicatore a pennello di precisione",
      "Profumazione delicata di vaniglia",
    ],
    immagini: ["/images/products/olio-cuticole-argan-oro.svg"],
    varianti: {
      nome: "Formato",
      opzioni: [
        { id: "10ml", nome: "10 ml — pennello" },
        { id: "30ml", nome: "30 ml — contagocce", prezzoDelta: 8 },
      ],
    },
  },

  // --- Pedicure ------------------------------------------------------
  {
    slug: "kit-pedicure-curativo",
    nome: "Kit Pedicure Curativo",
    categoria: "pedicure",
    prezzo: 39.0,
    descrizioneBreve:
      "Tutto l'occorrente per il trattamento professionale del piede.",
    descrizione:
      "Un kit completo con raspa, sgrassante, crema cheratolitica e separadita, pensato per il pedicure curativo in istituto ma adatto anche alla manutenzione a casa fra un appuntamento e l'altro.",
    caratteristiche: [
      "Raspa in acciaio con ricambi",
      "Crema cheratolitica 100 ml",
      "Sgrassante e crema finale",
      "Separadita monouso inclusi",
    ],
    immagini: ["/images/products/kit-pedicure-curativo.svg"],
  },

  // --- Gift Card -----------------------------------------------------
  {
    slug: "gift-card-k-institute",
    nome: "Gift Card K Institute",
    categoria: "gift-card",
    prezzo: 50,
    descrizioneBreve:
      "Valida su tutti i trattamenti e su tutto lo shop, per 12 mesi.",
    descrizione:
      "Un cofanetto in nero e oro con la gift card personalizzata: chi la riceve sceglie liberamente fra un trattamento in istituto e i prodotti dello shop. Validità dodici mesi dalla data di acquisto.",
    caratteristiche: [
      "Valida su trattamenti e prodotti",
      "Validità 12 mesi",
      "Cofanetto regalo incluso",
      "Personalizzabile con un messaggio",
    ],
    immagini: ["/images/products/gift-card-k-institute.svg"],
    varianti: {
      nome: "Importo",
      opzioni: [
        { id: "50", nome: "€ 50" },
        { id: "80", nome: "€ 80", prezzoDelta: 30 },
        { id: "120", nome: "€ 120", prezzoDelta: 70 },
        { id: "200", nome: "€ 200", prezzoDelta: 150 },
      ],
    },
    inEvidenza: true,
  },
];

// --- Helper ------------------------------------------------------------

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(categoria: string): Product[] {
  return products.filter((p) => p.categoria === categoria);
}

export const featuredProducts: Product[] = products.filter((p) => p.inEvidenza);

// Prodotti correlati: stessa categoria, poi riempie con altri in evidenza.
export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.categoria === product.categoria && p.slug !== product.slug
  );
  const others = products.filter(
    (p) => p.categoria !== product.categoria && p.slug !== product.slug
  );
  return [...sameCategory, ...others].slice(0, limit);
}

// Prezzo finale tenendo conto della variante scelta.
export function priceWithVariant(
  product: Product,
  variantId?: string
): number {
  if (!variantId || !product.varianti) return product.prezzo;
  const opt = product.varianti.opzioni.find((o) => o.id === variantId);
  return product.prezzo + (opt?.prezzoDelta ?? 0);
}

// Intervallo di prezzo dell'intero catalogo, per il filtro di /shop.
export const priceRange = {
  min: Math.floor(Math.min(...products.map((p) => p.prezzo))),
  max: Math.ceil(Math.max(...products.map((p) => p.prezzo))),
};
