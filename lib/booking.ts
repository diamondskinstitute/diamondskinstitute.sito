// =====================================================================
//  PRENOTAZIONE ONLINE — UNICO PUNTO DA MODIFICARE
//  Tutti i pulsanti e i link "Prenota" del sito puntano qui.
//  Per cambiare destinazione basta cambiare questa riga.
// =====================================================================

export const BOOKING_URL =
  "https://www.fresha.com/book-now/diamonds-k-institute-ka8wx46u/services?lid=3152577&eid=5495693&share=true&pId=3050039";

// Attributi da applicare a ogni link di prenotazione: si apre in una
// nuova scheda, senza dare alla pagina di destinazione accesso a questa.
export const BOOKING_LINK_PROPS = {
  href: BOOKING_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
