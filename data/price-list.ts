// =====================================================================
//  LISTINO UFFICIALE  —  prezzi in franchi svizzeri (CHF)
//
//  Questo file riporta il listino fornito dalla titolare, voce per voce.
//  È la fonte di verità dei prezzi: non aggiungere voci che non siano nel
//  listino e non inventare importi. Fra parentesi, nel commento di ogni
//  gruppo, la dicitura francese originale.
//
//  Reso dalla sezione "Listino" della pagina /trattamenti.
// =====================================================================

export type PriceListItem = {
  // chiave della traduzione: dict.listino.voci["<gruppo>.<key>"]
  key: string;
  nome: string;
  // Importo in CHF. Omesso quando la voce è gratuita o su richiesta.
  prezzo?: number;
  gratis?: boolean;
  suRichiesta?: boolean;
};

export type PriceListGroup = {
  id: string;
  titolo: string;
  sottotitolo?: string;
  items: PriceListItem[];
};

export const priceList: PriceListGroup[] = [
  {
    // Ongle
    id: "unghie",
    titolo: "Unghie",
    items: [
      { key: "semipermanente", nome: "Semipermanente", prezzo: 40 },
      { key: "manicure-uomo", nome: "Manicure uomo", prezzo: 30 },
      { key: "rimozione", nome: "Rimozione", prezzo: 25 },
    ],
  },
  {
    // Ongle en gel — Pose complète
    id: "gel-pose-completa",
    titolo: "Unghie in gel — Pose completa",
    sottotitolo: "Prezzo per misura",
    items: [
      { key: "s", nome: "S", prezzo: 65 },
      { key: "m", nome: "M", prezzo: 73 },
      { key: "l", nome: "L", prezzo: 85 },
      { key: "xl", nome: "XL", prezzo: 93 },
      { key: "xxl", nome: "XXL", prezzo: 100 },
    ],
  },
  {
    // Ongle en gel — Remplissage
    id: "gel-riempimento",
    titolo: "Unghie in gel — Riempimento",
    sottotitolo: "Prezzo per misura",
    items: [
      { key: "s", nome: "S", prezzo: 60 },
      { key: "m", nome: "M", prezzo: 65 },
      { key: "l", nome: "L", prezzo: 73 },
      { key: "xl", nome: "XL", prezzo: 85 },
      { key: "xxl", nome: "XXL", prezzo: 93 },
    ],
  },
  {
    // Extras
    id: "extra",
    titolo: "Extra",
    items: [
      { key: "unghia-rotta", nome: "Un'unghia rotta", gratis: true },
      { key: "piu-unghie-rotte", nome: "Più di un'unghia rotta", prezzo: 3 },
      { key: "babycolors", nome: "BabyColors", prezzo: 3 },
      { key: "babyboomer", nome: "BabyBoomer", prezzo: 3 },
      { key: "french", nome: "French", prezzo: 5 },
      { key: "strass", nome: "Strass singolo", prezzo: 1 },
      { key: "altri-extra", nome: "Altri extra", suRichiesta: true },
    ],
  },
  {
    // Pédicures
    id: "pedicure",
    titolo: "Pedicure",
    items: [
      { key: "semipermanente", nome: "Semipermanente", prezzo: 58 },
      { key: "acrygel", nome: "Unghie Acrygel", prezzo: 63 },
      { key: "cura-piedi", nome: "Cura dei piedi", suRichiesta: true },
    ],
  },
  {
    id: "treccine",
    titolo: "Treccine",
    items: [{ key: "treccine", nome: "Treccine", prezzo: 90 }],
  },
];
