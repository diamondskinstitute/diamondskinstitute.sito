// =====================================================================
//  PORTFOLIO — LAVORI REALIZZATI SU CLIENTI
//
//  COME AGGIUNGERE UNA FOTO REALE (due passaggi, nient'altro):
//   1. Copia il file in  public/images/portfolio/     (es. cliente-01.jpg)
//   2. Aggiungi UNA riga qui sotto in `portfolioItems`:
//        { id: "p13", src: "/images/portfolio/cliente-01.jpg",
//          alt: "Descrizione della foto", categoria: "Nail Art",
//          formato: "tall" },
//
//  `formato: "tall"` rende la foto verticale nella griglia masonry;
//  omettilo per una foto quadrata. `categoria` deve essere una di
//  quelle elencate in `portfolioCategories`.
// =====================================================================

export type PortfolioCategory =
  | "Nail Art"
  | "Semipermanente"
  | "Ricostruzione"
  | "Treccine"
  | "Pedicure";

// Filtri mostrati nella galleria (Pedicure tornerà quando ci saranno foto)
export const portfolioCategories: PortfolioCategory[] = [
  "Nail Art",
  "Semipermanente",
  "Ricostruzione",
  "Treccine",
];

export type PortfolioItem = {
  id: string;
  src: string; // percorso dentro /public
  alt: string; // descrizione per accessibilità e lightbox
  categoria: PortfolioCategory;
  formato?: "tall" | "regular";
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p01",
    src: "/images/portfolio/nails-01.jpg",
    alt: "Stiletto lunghe con decoro verde menta e pietre gioiello",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p02",
    src: "/images/portfolio/nails-02.jpg",
    alt: "Almond blu elettrico con cuori di perle e strass",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p03",
    src: "/images/portfolio/treccine-01.jpg",
    alt: "Treccine laterali con baby hair definiti",
    categoria: "Treccine",
    formato: "tall",
  },
  {
    id: "p04",
    src: "/images/portfolio/nails-03.jpg",
    alt: "Stiletto rosse con nail art a cuori su base nude",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p05",
    src: "/images/portfolio/nails-04.jpg",
    alt: "Nail art a tema cartoon dipinta a mano",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p06",
    src: "/images/portfolio/nails-05.jpg",
    alt: "Almond rosa e bordeaux con fiori 3D e stelle oro",
    categoria: "Nail Art",
  },
  {
    id: "p07",
    src: "/images/portfolio/nails-06.jpg",
    alt: "Ricostruzione stiletto con french bianca e dettagli trasparenti",
    categoria: "Ricostruzione",
    formato: "tall",
  },
  {
    id: "p08",
    src: "/images/portfolio/treccine-02.jpg",
    alt: "Cornrows con disegno a onde",
    categoria: "Treccine",
    formato: "tall",
  },
  {
    id: "p09",
    src: "/images/portfolio/nails-07.jpg",
    alt: "Nail art a tema supereroe con ragnatele",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p10",
    src: "/images/portfolio/nails-08.jpg",
    alt: "French classica bianca su forma squadrata corta",
    categoria: "Semipermanente",
  },
  {
    id: "p11",
    src: "/images/portfolio/nails-09.jpg",
    alt: "Coffin rosse con glitter e sfumatura",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p12",
    src: "/images/portfolio/nails-10.jpg",
    alt: "Squadrate lunghe nude con cristalli olografici",
    categoria: "Nail Art",
  },
  {
    id: "p13",
    src: "/images/portfolio/treccine-03.jpg",
    alt: "Treccine sottili con capelli sciolti sulle punte",
    categoria: "Treccine",
    formato: "tall",
  },
  {
    id: "p14",
    src: "/images/portfolio/nails-11.jpg",
    alt: "Stiletto con french bianca profonda su base rosa",
    categoria: "Ricostruzione",
  },
  {
    id: "p15",
    src: "/images/portfolio/nails-12.jpg",
    alt: "Stiletto nude con dettagli cromati e charms",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p16",
    src: "/images/portfolio/nails-13.jpg",
    alt: "Squadrate con french rosa fluo",
    categoria: "Ricostruzione",
    formato: "tall",
  },
  {
    id: "p17",
    src: "/images/portfolio/nails-14.jpg",
    alt: "Nail art rossa con labbra e charms oro",
    categoria: "Nail Art",
  },
  {
    id: "p18",
    src: "/images/portfolio/treccine-04.jpg",
    alt: "Treccine con disegno a cuore",
    categoria: "Treccine",
    formato: "tall",
  },
  {
    id: "p19",
    src: "/images/portfolio/nails-15.jpg",
    alt: "Squadrate lunghe con french pastello e fiori",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p20",
    src: "/images/portfolio/nails-16.jpg",
    alt: "Stiletto extra lunghe nude lucide",
    categoria: "Ricostruzione",
  },
  {
    id: "p21",
    src: "/images/portfolio/nails-17.jpg",
    alt: "Almond nude con punte leopardate rosse",
    categoria: "Semipermanente",
    formato: "tall",
  },
  {
    id: "p22",
    src: "/images/portfolio/nails-18.jpg",
    alt: "French bianca con dettagli cromati e scritte",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p23",
    src: "/images/portfolio/nails-19.jpg",
    alt: "French bordeaux su forma squadrata",
    categoria: "Semipermanente",
  },
  {
    id: "p24",
    src: "/images/portfolio/nails-20.jpg",
    alt: "Coffin nude e marroni con charms",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p25",
    src: "/images/portfolio/nails-21.jpg",
    alt: "Squadrate con french colorata rosso e arancio",
    categoria: "Ricostruzione",
    formato: "tall",
  },
  {
    id: "p26",
    src: "/images/portfolio/nails-22.jpg",
    alt: "Almond nude con pois e punte arancio",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p27",
    src: "/images/portfolio/nails-23.jpg",
    alt: "Stiletto verdi gioiello, seconda angolazione",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p28",
    src: "/images/portfolio/nails-24.jpg",
    alt: "French bianca con accenti leopardati",
    categoria: "Semipermanente",
  },
  {
    id: "p29",
    src: "/images/portfolio/nails-25.jpg",
    alt: "Stiletto french bianca, vista dall'alto",
    categoria: "Ricostruzione",
    formato: "tall",
  },
  {
    id: "p30",
    src: "/images/portfolio/nails-26.jpg",
    alt: "Nail art rossa e oro fotografata al lago",
    categoria: "Nail Art",
    formato: "tall",
  },
];

// Anteprima mostrata in home (prime 6)
export const portfolioPreview: PortfolioItem[] = portfolioItems.slice(0, 6);

// --- Lookup helpers ----------------------------------------------------
//
//  The gallery is the single source of truth for the photos of real work:
//  other data files (e.g. data/treatments.ts) point at a photo by its `id`
//  instead of repeating the file path, so a path only ever lives here.

const itemsById = new Map(portfolioItems.map((item) => [item.id, item]));

export function getPortfolioItem(id: string): PortfolioItem | undefined {
  return itemsById.get(id);
}

export function getPortfolioSrc(id: string): string | undefined {
  return itemsById.get(id)?.src;
}
