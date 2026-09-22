// =====================================================================
//  TESTI DEL SITO  (tutti i contenuti visibili, in italiano)
//  Nessun testo va scritto dentro i componenti: si modifica solo qui.
//  I dati dell'attività (indirizzo, orari, telefono) stanno invece in
//  data/salon.ts.
// =====================================================================

import { salon } from "./salon";

export const site = {
  // Striscia promozionale in cima a ogni pagina
  topBar: {
    testo: `Spedizione gratuita da €${salon.shop.spedizioneGratuitaDa} · Consegna in ${salon.shop.tempiConsegna}`,
    linkLabel: "Vai allo shop",
    linkHref: "/shop",
  },

  hero: {
    eyebrow: "Nail institute & shop",
    titolo: "L'arte delle unghie,",
    titoloAccento: "curata come un gioiello",
    sottotitolo:
      "Trattamenti su misura nel nostro istituto e prodotti professionali selezionati, per chi lavora con le unghie e per chi le vuole impeccabili.",
    ctaPrimaria: { label: "Prenota un trattamento", href: "/prenota" },
    ctaSecondaria: { label: "Scopri lo shop", href: "/shop" },
  },

  // Striscia dei punti di forza sotto l'hero
  highlights: [
    {
      titolo: "Prodotti professionali",
      testo:
        "Solo referenze testate in istituto, prima di finire sugli scaffali dello shop.",
    },
    {
      titolo: "Trattamenti su misura",
      testo:
        "Ogni servizio parte dall'analisi della lamina: nessun protocollo uguale per tutte.",
    },
    {
      titolo: "Igiene certificata",
      testo:
        "Strumenti sterilizzati in autoclave e monouso per tutto ciò che non è sterilizzabile.",
    },
    {
      titolo: "Spedizione rapida",
      testo: `Ordini evasi in giornata, consegna in ${salon.shop.tempiConsegna}.`,
    },
  ],

  sezioniHome: {
    prodotti: {
      eyebrow: "Lo shop",
      titolo: "I prodotti che usiamo ogni giorno",
      intro:
        "Nessun catalogo infinito: mettiamo in vendita soltanto ciò che usiamo davvero in istituto, perché sappiamo come si comporta sotto le mani.",
      cta: { label: "Tutto lo shop", href: "/shop" },
    },
    trattamenti: {
      eyebrow: "L'istituto",
      titolo: "I trattamenti più richiesti",
      intro:
        "Dalla manicure classica alla ricostruzione strutturale: ogni trattamento ha la sua scheda, con fasi, durata e consigli per il mantenimento.",
      cta: { label: "Tutti i trattamenti", href: "/trattamenti" },
    },
    portfolio: {
      eyebrow: "I nostri lavori",
      titolo: "Realizzati su clienti reali",
      intro:
        "Nessun render, nessuna foto d'archivio: sono le mani delle persone che si siedono da noi.",
      cta: { label: "Vedi la galleria completa", href: "/lavori" },
    },
    chiSiamo: {
      eyebrow: "Chi siamo",
      titolo: "Dall'istituto alla marca",
      testo:
        "K Institute nasce dall'idea che un prodotto vada capito prima di essere venduto. Tutto ciò che trovi nello shop passa prima dalle nostre postazioni di lavoro: se non regge una giornata in istituto, non finisce nel catalogo.",
      cta: { label: "La nostra storia", href: "/chi-siamo" },
    },
    testimonianze: {
      eyebrow: "Dicono di noi",
      titolo: "Le parole delle nostre clienti",
    },
    instagram: {
      eyebrow: "Instagram",
      titolo: "Seguici per ogni nuovo lavoro",
      testo:
        "Pubblichiamo ogni set appena finito, i dietro le quinte e le novità dello shop.",
      cta: { label: `Seguici su ${salon.instagram.handle}`, href: salon.instagram.url },
    },
    mappa: {
      eyebrow: "Dove trovarci",
      titolo: "Vieni a trovarci in istituto",
      cta: { label: "Contatti & mappa", href: "/contatti" },
    },
  },

  shop: {
    eyebrow: "Shop",
    titolo: "Prodotti professionali",
    intro:
      "Gel, colori, attrezzi e lampade selezionati uno per uno. Spedizione gratuita sopra i €" +
      salon.shop.spedizioneGratuitaDa +
      ".",
    filtri: {
      categoria: "Categoria",
      prezzo: "Prezzo massimo",
      ordina: "Ordina per",
      tutte: "Tutte le categorie",
      azzera: "Azzera filtri",
      nessunRisultato:
        "Nessun prodotto corrisponde ai filtri selezionati. Prova ad allargare la ricerca.",
    },
    ordinamenti: [
      { id: "rilevanza", label: "Rilevanza" },
      { id: "prezzo-asc", label: "Prezzo crescente" },
      { id: "prezzo-desc", label: "Prezzo decrescente" },
      { id: "nome", label: "Nome A–Z" },
    ],
    aggiungiAlCarrello: "Aggiungi al carrello",
    esaurito: "Esaurito",
    correlati: "Ti potrebbe interessare anche",
    caratteristiche: "Caratteristiche",
    quantita: "Quantità",
  },

  carrello: {
    titolo: "Il tuo carrello",
    vuoto: "Il carrello è vuoto.",
    vuotoCta: { label: "Scopri lo shop", href: "/shop" },
    subtotale: "Subtotale",
    spedizione: "Spedizione",
    spedizioneGratuita: "Gratuita",
    totale: "Totale",
    vaiAlCheckout: "Vai al checkout",
    continuaAcquisti: "Continua gli acquisti",
    rimuovi: "Rimuovi",
    mancanoPerSpedizioneGratuita: (mancante: string) =>
      `Ti mancano ${mancante} per la spedizione gratuita.`,
  },

  checkout: {
    titolo: "Checkout",
    intro:
      "Compila i tuoi dati: riceverai una email di conferma con il riepilogo e le istruzioni per il pagamento.",
    sezioneDati: "I tuoi dati",
    sezioneSpedizione: "Indirizzo di spedizione",
    sezioneRiepilogo: "Riepilogo ordine",
    invia: "Invia la richiesta d'ordine",
    inviando: "Invio in corso…",
    // Il pagamento online non è ancora attivo: lo stub è in lib/payments.ts
    notaPagamento:
      "Il pagamento online non è ancora attivo. Ricevuta la richiesta ti contattiamo entro 24 ore con le modalità di pagamento e la conferma della disponibilità.",
    // Il testo è spezzato perché in mezzo vanno due link
    privacyPrefisso: "Ho letto e accetto la",
    privacyCongiunzione: "e i",
  },

  ordineConfermato: {
    eyebrow: "Grazie",
    titolo: "Richiesta d'ordine ricevuta",
    testo:
      "Ti abbiamo inviato un riepilogo via email. Ti contattiamo entro 24 ore per confermare disponibilità e modalità di pagamento.",
    numeroOrdine: "Numero della richiesta",
    cta: { label: "Torna allo shop", href: "/shop" },
  },

  trattamenti: {
    eyebrow: "L'istituto",
    titolo: "I trattamenti",
    intro:
      "Ogni trattamento ha una scheda completa: a cosa serve, come si svolge, quanto dura e come mantenerlo a casa. Scegli il tuo e prenota online.",
    prenotaQuesto: "Prenota questo trattamento",
    aCosaServe: "A chi è consigliato",
    comeSiSvolge: "Come si svolge",
    mantenimento: "Il mantenimento a casa",
    domande: "Domande frequenti",
    durata: "Durata",
    prezzoDa: "Prezzo",
    altriTrattamenti: "Altri trattamenti",
  },

  lavori: {
    eyebrow: "Portfolio",
    titolo: "I nostri lavori",
    intro:
      "Una selezione di set realizzati in istituto. Filtra per tipo di lavoro e clicca su una foto per vederla ingrandita.",
    tutte: "Tutti",
    chiudi: "Chiudi",
    precedente: "Precedente",
    successiva: "Successiva",
  },

  chiSiamo: {
    eyebrow: "Chi siamo",
    titolo: "La nostra storia",
    sottotitolo:
      "Un istituto che è diventato anche un negozio, senza smettere di essere un istituto.",
    paragrafi: [
      "K Institute nasce nel cuore della città come studio dedicato alla cura delle unghie. Dietro c'è Kara, che ha imparato il mestiere partendo dalla tecnica: struttura, apex, tenuta. Solo dopo è arrivata l'estetica.",
      "Negli anni la domanda più frequente delle clienti — e poi delle colleghe — è diventata sempre la stessa: «che prodotto usi?». Da lì l'idea dello shop: mettere a disposizione le stesse referenze che usiamo ogni giorno, con la stessa selezione severa.",
      "Oggi l'istituto e lo shop si alimentano a vicenda. Ogni prodotto nuovo viene provato per settimane sulle nostre postazioni prima di entrare in catalogo. Se non convince, non arriva sullo scaffale.",
    ],
    valori: [
      {
        titolo: "La tecnica prima dell'estetica",
        testo:
          "Una struttura corretta dura. Una struttura sbagliata si rompe, per quanto sia bella la nail art sopra.",
      },
      {
        titolo: "Selezione, non catalogo",
        testo:
          "Preferiamo dieci prodotti che conosciamo a mille che non abbiamo mai aperto.",
      },
      {
        titolo: "Igiene senza compromessi",
        testo:
          "Autoclave per tutto ciò che è sterilizzabile, monouso per tutto il resto. Senza eccezioni.",
      },
      {
        titolo: "Trasparenza sui prezzi",
        testo:
          "Il preventivo si definisce prima di iniziare. Nessuna sorpresa al momento di pagare.",
      },
    ],
    spazio: {
      titolo: "Lo spazio",
      testo:
        "Due postazioni, luce naturale e aspirazione dedicata su ogni tavolo. Lavoriamo su appuntamento per garantire a ogni cliente il tempo che il suo trattamento richiede.",
    },
    certificazioni: {
      titolo: "Formazione e certificazioni",
      testo:
        "Elenco segnaposto: sostituisci con le certificazioni reali (corsi, attestati, abilitazioni).",
      elenco: [
        "Attestato professionale di onicotecnica",
        "Corso avanzato di ricostruzione strutturale",
        "Formazione HACCP e sterilizzazione",
        "Aggiornamento annuale su prodotti e sicurezza",
      ],
    },
    team: {
      titolo: "Il team",
      testo:
        "Segnaposto: aggiungi qui i membri del team con foto e specializzazione.",
      membri: [
        {
          nome: "Kara",
          ruolo: "Founder & onicotecnica",
          bio: "Specializzata in ricostruzione strutturale e nail art a mano libera.",
          foto: "/images/kara-ritratto.svg",
        },
        {
          nome: "Nome Cognome",
          ruolo: "Onicotecnica",
          bio: "Segnaposto: sostituisci con la biografia reale.",
          foto: "/images/kara-ritratto.svg",
        },
      ],
    },
  },

  contatti: {
    eyebrow: "Dove trovarci",
    titolo: "Contatti",
    intro:
      "Scrivici per informazioni sui trattamenti, sui prodotti o per un ordine. Rispondiamo entro 24 ore nei giorni di apertura.",
    form: {
      titolo: "Scrivici",
      nome: "Nome e cognome",
      email: "Email",
      messaggio: "Il tuo messaggio",
      invia: "Invia messaggio",
      inviando: "Invio in corso…",
      successo:
        "Messaggio inviato. Ti rispondiamo il prima possibile, grazie!",
    },
    orariTitolo: "Orari di apertura",
    indirizzoTitolo: "Indirizzo",
    scriviWhatsapp: "Scrivici su WhatsApp",
  },

  prenota: {
    eyebrow: "Prenotazione",
    titolo: "Prenota il tuo appuntamento",
    intro:
      "Scegli il trattamento, il giorno e l'orario. Ricevi subito il riepilogo: confermiamo entro poche ore.",
  },

  cookie: {
    testo:
      "Usiamo solo cookie tecnici necessari al funzionamento del sito (carrello e preferenze). Nessun cookie di profilazione, nessun tracciamento pubblicitario.",
    accetta: "Ho capito",
    dettagli: "Leggi la cookie policy",
    dettagliHref: "/cookie",
  },

  newsletter: {
    titolo: "Novità e offerte",
    testo: "Le nuove referenze e le promozioni, una email al mese. Niente spam.",
    placeholder: "La tua email",
    cta: "Iscriviti",
    // Segnaposto: collegare a un servizio reale (Mailchimp, Brevo…)
    conferma: "Grazie! Ti abbiamo aggiunta alla lista.",
  },

  footer: {
    claim:
      "Nail institute e shop di prodotti professionali. Trattamenti su misura e referenze selezionate, testate ogni giorno sulle nostre postazioni.",
    contattiTitolo: "Contatti",
    orariTitolo: "Orari",
    seguici: "Seguici",
    copyright: (anno: number) =>
      `© ${anno} ${salon.brandName} — ${salon.legalName}. Tutti i diritti riservati.`,
    piva: `P. IVA ${salon.legale.partitaIva}`,
  },

  errore404: {
    titolo: "Pagina non trovata",
    testo:
      "La pagina che cerchi non esiste o è stata spostata. Torna alla home o vai allo shop.",
    cta: { label: "Torna alla home", href: "/" },
    ctaSecondaria: { label: "Vai allo shop", href: "/shop" },
  },

  ricerca: {
    placeholder: "Cerca un prodotto o un trattamento…",
    apri: "Cerca",
    chiudi: "Chiudi la ricerca",
    prodotti: "Prodotti",
    trattamenti: "Trattamenti",
    nessunRisultato: "Nessun risultato. Prova con un altro termine.",
    suggerimento: "Scrivi almeno due lettere per cercare.",
  },
};
