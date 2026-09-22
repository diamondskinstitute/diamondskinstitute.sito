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
  | "Pedicure";

export const portfolioCategories: PortfolioCategory[] = [
  "Nail Art",
  "Semipermanente",
  "Ricostruzione",
  "Pedicure",
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
    src: "/images/portfolio/placeholder-01.svg",
    alt: "Nail art d'autore con dettagli in foglia oro su base nera",
    categoria: "Nail Art",
    formato: "tall",
  },
  {
    id: "p02",
    src: "/images/portfolio/placeholder-02.svg",
    alt: "Semipermanente nude dalla finitura lucida su forma ovale",
    categoria: "Semipermanente",
  },
  {
    id: "p03",
    src: "/images/portfolio/placeholder-03.svg",
    alt: "Ricostruzione in gel con struttura sottile e forma almond",
    categoria: "Ricostruzione",
  },
  {
    id: "p04",
    src: "/images/portfolio/placeholder-04.svg",
    alt: "Micro nail art geometrica oro su base champagne",
    categoria: "Nail Art",
  },
  {
    id: "p05",
    src: "/images/portfolio/placeholder-05.svg",
    alt: "Pedicure curativa con finitura naturale",
    categoria: "Pedicure",
    formato: "tall",
  },
  {
    id: "p06",
    src: "/images/portfolio/placeholder-06.svg",
    alt: "French semipermanente realizzata a mano libera",
    categoria: "Semipermanente",
  },
  {
    id: "p07",
    src: "/images/portfolio/placeholder-07.svg",
    alt: "Refill su ricostruzione con apex ribilanciato",
    categoria: "Ricostruzione",
    formato: "tall",
  },
  {
    id: "p08",
    src: "/images/portfolio/placeholder-08.svg",
    alt: "Nail art con glitter degradé in tonalità diamante",
    categoria: "Nail Art",
  },
  {
    id: "p09",
    src: "/images/portfolio/placeholder-09.svg",
    alt: "Semipermanente effetto specchio con pigmento argento",
    categoria: "Semipermanente",
  },
  {
    id: "p10",
    src: "/images/portfolio/placeholder-10.svg",
    alt: "Pedicure estetica con smalto in tinta unita bordeaux",
    categoria: "Pedicure",
  },
  {
    id: "p11",
    src: "/images/portfolio/placeholder-11.svg",
    alt: "Ricostruzione forma ballerina con copertura nude",
    categoria: "Ricostruzione",
    formato: "tall",
  },
  {
    id: "p12",
    src: "/images/portfolio/placeholder-12.svg",
    alt: "Nail art floreale dipinta a mano su base avorio",
    categoria: "Nail Art",
  },
];

// Anteprima mostrata in home (prime 6)
export const portfolioPreview: PortfolioItem[] = portfolioItems.slice(0, 6);
