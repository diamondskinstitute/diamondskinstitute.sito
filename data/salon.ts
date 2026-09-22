// =====================================================================
//  DATI DELL'ATTIVITÀ — UNICO PUNTO DA MODIFICARE
//  Nome, indirizzo, telefono, orari, social, spedizioni: cambiandoli
//  qui si aggiornano automaticamente in tutto il sito.
//
//  TUTTI I VALORI SONO SEGNAPOSTO: sostituiscili con quelli reali.
// =====================================================================

export type OpeningDay = {
  giorno: string;
  orario: string;
  chiuso?: boolean;
};

export const salon = {
  // Nome commerciale mostrato ovunque nel sito (header, footer, SEO…).
  brandName: "K Institute",
  // Ragione sociale / nome storico dell'attività, usato nei testi legali.
  legalName: "Kara Nails Studio",

  claim: "Nail institute & shop professionale",
  citta: "Zürich",

  // --- Logo -----------------------------------------------------------
  // Il file ha lo sfondo nero: va usato SOLO su fondo scuro (oppure con
  // la classe `.logo-blend`, che applica mix-blend-mode: lighten).
  //
  // ➜ Appena il logo definitivo è in public/brand/logo.jpg, cambia
  //   questa singola riga in: logoSrc: "/brand/logo.jpg"
  logoSrc: "/brand/logo.svg",
  logoMarkSrc: "/brand/logo-mark.svg",

  indirizzo: {
    via: "Bahnhofstrasse 24",
    cap: "8001",
    citta: "Zürich",
    provincia: "ZH",
    completo: "Bahnhofstrasse 24, 8001 Zürich",
  },

  // Telefono in formato internazionale, senza spazi, per link tel: e WhatsApp
  telefono: "+39 345 678 9012",
  telefonoLink: "+393456789012",
  whatsapp: "+393456789012",
  whatsappMessaggio:
    "Ciao! Vorrei informazioni su un trattamento da K Institute.",

  email: "info@kinstitute.it",
  emailOrdini: "ordini@kinstitute.it",

  instagram: {
    handle: "@kinstitute",
    url: "https://instagram.com/kinstitute",
  },
  facebook: {
    handle: "K Institute",
    url: "https://facebook.com/kinstitute",
  },

  // Orari di apertura. `chiuso: true` mostra "Chiuso" ed esclude il giorno
  // dagli slot prenotabili.
  orari: [
    { giorno: "Lunedì", orario: "Chiuso", chiuso: true },
    { giorno: "Martedì", orario: "10:00 – 19:30" },
    { giorno: "Mercoledì", orario: "10:00 – 19:30" },
    { giorno: "Giovedì", orario: "10:00 – 19:30" },
    { giorno: "Venerdì", orario: "10:00 – 19:30" },
    { giorno: "Sabato", orario: "09:30 – 18:00" },
    { giorno: "Domenica", orario: "Chiuso", chiuso: true },
  ] as OpeningDay[],

  // Orari in formato macchina, usati per generare gli slot di prenotazione.
  // day: 0 = Domenica … 6 = Sabato (standard JS). null = chiuso.
  orariMacchina: {
    0: null, // Domenica
    1: null, // Lunedì
    2: { apertura: "10:00", chiusura: "19:30" }, // Martedì
    3: { apertura: "10:00", chiusura: "19:30" }, // Mercoledì
    4: { apertura: "10:00", chiusura: "19:30" }, // Giovedì
    5: { apertura: "10:00", chiusura: "19:30" }, // Venerdì
    6: { apertura: "09:30", chiusura: "18:00" }, // Sabato
  } as Record<number, { apertura: string; chiusura: string } | null>,

  mappaEmbedUrl:
    "https://www.google.com/maps?q=Bahnhofstrasse+24,+8001+Z%C3%BCrich&output=embed",
  mappaLink:
    "https://www.google.com/maps/search/?api=1&query=Bahnhofstrasse+24,+8001+Z%C3%BCrich",

  // --- Shop ------------------------------------------------------------
  shop: {
    valuta: "€",
    // Soglia per la spedizione gratuita (come sul sito di riferimento)
    spedizioneGratuitaDa: 99,
    costoSpedizione: 7.9,
    tempiConsegna: "2–4 giorni lavorativi",
    resiEntroGiorni: 14,
  },

  // --- Dati legali (segnaposto) ----------------------------------------
  legale: {
    partitaIva: "IT00000000000",
    rea: "ZH-0000000",
    sede: "Bahnhofstrasse 24, 8001 Zürich",
  },

  seo: {
    title: "K Institute — Nail Institute & Shop Professionale",
    description:
      "Nail institute e shop di prodotti professionali per unghie. Trattamenti su misura, gel, nail art, attrezzi e lampade. Prenota online o acquista nello shop.",
    url: "http://localhost:3018",
    keywords: [
      "prodotti professionali unghie",
      "gel ricostruzione",
      "semipermanente",
      "nail art",
      "shop nail",
      "nail institute",
      "K Institute",
    ],
  },
};

// Helper per link pronti all'uso
export const whatsappUrl = `https://wa.me/${salon.whatsapp.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(salon.whatsappMessaggio)}`;

export const telUrl = `tel:${salon.telefonoLink}`;
export const emailUrl = `mailto:${salon.email}`;

// Link WhatsApp con messaggio personalizzato (es. per un trattamento)
export function whatsappUrlFor(messaggio: string): string {
  return `https://wa.me/${salon.whatsapp.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(messaggio)}`;
}
