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
  // Tagline ufficiale dal profilo Instagram. Non è ancora mostrata nel sito
  // (il claim sopra resta quello del logo): dillo e la sostituiamo.
  // TODO: confermare quale delle due usare in homepage e nel logo.
  claimUfficiale: "Nails & Braids Studio",
  // Nome completo dal profilo Instagram ufficiale. Il sito mostra `brandName`
  // ("K Institute"): non è stato cambiato di proposito.
  // TODO: confermare se il sito deve chiamarsi "Diamonds K Institute".
  nomeUfficiale: "Diamonds K Institute",
  citta: "Courtelary",

  // --- Logo -----------------------------------------------------------
  // Il file ha lo sfondo nero: va usato SOLO su fondo scuro (oppure con
  // la classe `.logo-blend`, che applica mix-blend-mode: lighten).
  //
  // ➜ Appena il logo definitivo è in public/brand/logo.jpg, cambia
  //   questa singola riga in: logoSrc: "/brand/logo.jpg"
  logoSrc: "/brand/logo.jpg",
  logoMarkSrc: "/brand/logo-mark.svg",

  indirizzo: {
    via: "Rue le Moulin 1",
    cap: "2608",
    citta: "Courtelary",
    provincia: "BE", // Canton Berna
    paese: "Svizzera",
    paeseCodice: "CH",
    completo: "Rue le Moulin 1, 2608 Courtelary",
    completoConPaese: "Rue le Moulin 1, 2608 Courtelary, Svizzera",
  },

  // Telefono in formato internazionale, senza spazi, per link tel: e WhatsApp
  // TODO: numero segnaposto svizzero — sostituire con quello reale.
  telefono: "+41 32 000 00 00",
  telefonoLink: "+41320000000",
  whatsapp: "+41320000000",
  whatsappMessaggio:
    "Ciao! Vorrei informazioni su un trattamento da K Institute.",

  // TODO: indirizzi segnaposto (dominio .it) — sostituire con quelli reali.
  email: "info@kinstitute.it",
  emailOrdini: "ordini@kinstitute.it",

  // --- Social ufficiali -------------------------------------------------
  instagram: {
    handle: "@diamonds_k_institute",
    url: "https://www.instagram.com/diamonds_k_institute",
  },
  tiktok: {
    handle: "@diamonds_institute",
    url: "https://www.tiktok.com/@diamonds_institute",
  },
  threads: {
    handle: "@diamonds_k_institute",
    url: "https://www.threads.net/@diamonds_k_institute",
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
    "https://www.google.com/maps?q=Rue+le+Moulin+1,+2608+Courtelary&output=embed",
  mappaLink:
    "https://www.google.com/maps/search/?api=1&query=Rue+le+Moulin+1,+2608+Courtelary",

  // --- Shop ------------------------------------------------------------
  shop: {
    valuta: "CHF",
    // Soglia per la spedizione gratuita (come sul sito di riferimento)
    spedizioneGratuitaDa: 99,
    costoSpedizione: 7.9,
    tempiConsegna: "2–4 giorni lavorativi",
    resiEntroGiorni: 14,
  },

  // --- Dati legali (segnaposto) ----------------------------------------
  legale: {
    // TODO: dati segnaposto — sostituire con IDE/IVA reali.
    partitaIva: "CHE-000.000.000",
    rea: "",
    sede: "Rue le Moulin 1, 2608 Courtelary, Svizzera",
  },

  seo: {
    title: "K Institute — Nail & Braids Studio a Courtelary",
    description:
      "Nail institute e shop di prodotti professionali per unghie a Courtelary (Berna). Semipermanente, ricostruzione gel, treccine e prodotti selezionati. Prenota online.",
    // TODO: sostituire con il dominio definitivo prima della pubblicazione.
    url: "http://localhost:3018",
    keywords: [
      "unghie Courtelary",
      "nail salon Courtelary",
      "treccine Courtelary",
      "semipermanente",
      "ricostruzione gel",
      "prodotti professionali unghie",
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
