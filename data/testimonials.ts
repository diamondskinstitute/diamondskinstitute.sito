// =====================================================================
//  RECENSIONI CLIENTI
//  Testimonianze mostrate in home. Sostituiscile con recensioni reali
//  (Google, Instagram) quando disponibili.
// =====================================================================

export type Testimonial = {
  id: string;
  nome: string;
  testo: string;
  dettaglio: string; // es. servizio ricevuto o città
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    nome: "Giulia R.",
    testo:
      "Non avevo mai visto una cura così maniacale del dettaglio. Kara ascolta, consiglia e realizza esattamente ciò che immagini. Le mie unghie non erano mai durate così a lungo.",
    dettaglio: "Semipermanente & Nail Art",
  },
  {
    id: "t2",
    nome: "Federica M.",
    testo:
      "Ambiente elegante, pulizia impeccabile e mani d'artista. Ogni appuntamento è un momento di puro benessere. Ho trovato la mia nail artist di fiducia a Milano.",
    dettaglio: "Ricostruzione Gel",
  },
  {
    id: "t3",
    nome: "Sara T.",
    testo:
      "La consulenza sul colore e sulla forma ha fatto la differenza. Kara ha uno stile inconfondibile, caldo e raffinato allo stesso tempo. Consigliatissima.",
    dettaglio: "Manicure Signature",
  },
];
