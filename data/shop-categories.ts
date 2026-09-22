// =====================================================================
//  CATEGORIE DELLO SHOP
//  L'ordine di questo elenco è l'ordine del mega-menu e della pagina
//  /shop. Per aggiungere una categoria: aggiungi una voce qui e usa il
//  suo `slug` nel campo `categoria` dei prodotti in data/products.ts.
// =====================================================================

export type ShopCategory = {
  slug: string;
  nome: string;
  // Sottotitolo mostrato nel mega-menu e nell'intestazione di categoria
  sottotitolo: string;
  // Elenco indicativo di cosa contiene, mostrato nel mega-menu
  esempi: string[];
  // Immagine di copertina della categoria (dentro /public)
  cover: string;
};

export const shopCategories: ShopCategory[] = [
  {
    slug: "gel-base",
    nome: "Gel & Base",
    sottotitolo: "Costruttori, basi rubber e top coat",
    esempi: ["Gel costruttore", "Base rubber", "Top coat", "Acrygel"],
    cover: "/images/products/gel-costruttore-diamond-clear.svg",
  },
  {
    slug: "nail-art",
    nome: "Nail Art",
    sottotitolo: "Colori, glitter e decori d'autore",
    esempi: ["Gel paint", "Glitter", "Foil", "Adesivi", "Pigmenti"],
    cover: "/images/products/set-glitter-diamond.svg",
  },
  {
    slug: "pennelli",
    nome: "Pennelli",
    sottotitolo: "Setole selezionate per ogni tecnica",
    esempi: ["Oval", "Liner", "One stroke", "Set completi"],
    cover: "/images/products/set-pennelli-nail-art.svg",
  },
  {
    slug: "lampade-fresette",
    nome: "Lampade & Fresette",
    sottotitolo: "Attrezzatura elettrica professionale",
    esempi: ["Lampade UV/LED", "Fresette", "Aspiratori", "Ricambi"],
    cover: "/images/products/lampada-uv-led-72w-pro.svg",
  },
  {
    slug: "tips-estensioni",
    nome: "Tips & Estensioni",
    sottotitolo: "Capsule, dual form e chablon",
    esempi: ["Soft gel tips", "Dual form", "Capsule", "Chablon"],
    cover: "/images/products/soft-gel-tips-almond.svg",
  },
  {
    slug: "lime-buffer",
    nome: "Lime & Buffer",
    sottotitolo: "Grane per ogni fase della lavorazione",
    esempi: ["Lime zebra", "Buffer", "Lime boomerang", "Ricambi"],
    cover: "/images/products/lime-zebra-100-180.svg",
  },
  {
    slug: "attrezzi",
    nome: "Attrezzi",
    sottotitolo: "Strumenti in acciaio, sterilizzabili",
    esempi: ["Tronchesine", "Spingicuticole", "Pinze", "Forbici"],
    cover: "/images/products/pinza-tronchesina-pro.svg",
  },
  {
    slug: "oli-liquidi",
    nome: "Oli & Liquidi",
    sottotitolo: "Cura, preparazione e rimozione",
    esempi: ["Olio cuticole", "Cleaner", "Primer", "Remover"],
    cover: "/images/products/olio-cuticole-argan-oro.svg",
  },
  {
    slug: "pedicure",
    nome: "Pedicure",
    sottotitolo: "Tutto per il trattamento del piede",
    esempi: ["Kit pedicure", "Raspe", "Creme", "Separadita"],
    cover: "/images/products/kit-pedicure-curativo.svg",
  },
  {
    slug: "gift-card",
    nome: "Gift Card",
    sottotitolo: "Il regalo che non sbaglia mai",
    esempi: ["Trattamenti", "Prodotti", "Importo libero"],
    cover: "/images/products/gift-card-k-institute.svg",
  },
];

export function getCategory(slug: string): ShopCategory | undefined {
  return shopCategories.find((c) => c.slug === slug);
}
