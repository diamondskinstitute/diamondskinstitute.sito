// Dizionario ITALIANO — fonte di riferimento per la struttura.
// Ogni altra lingua segue questa stessa forma (con fallback all'italiano).

export const it = {
  nav: {
    home: "Home",
    chiSono: "Chi è Kara",
    servizi: "Servizi",
    galleria: "Galleria",
    contatti: "Contatti",
    prenotaOra: "Prenota ora",
    apriMenu: "Apri menu",
    chiudiMenu: "Chiudi menu",
    cambiaLingua: "Cambia lingua",
    tagline: "Studio · Zurigo",
  },
  common: {
    skip: "Vai al contenuto",
    prenotaOra: "Prenota ora",
    scopriGalleria: "Scopri la galleria",
    scopriServizi: "Scopri i servizi",
    scopriGalleriaCompleta: "Scopri la galleria completa",
    vediTuttiServizi: "Vedi tutti i servizi",
    laMiaStoria: "La mia storia",
    contattiMappa: "Contatti & mappa",
    tornaHome: "Torna alla home",
    chiuso: "Chiuso",
    da: "da",
  },
  days: {
    // indice per giorno JS: 0 = Domenica ... 6 = Sabato
    full: [
      "Domenica",
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
    ],
    // abbreviazioni con Lunedì come primo giorno (per il calendario)
    abbrMon: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
  },
  months: [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ],
  orari: {
    // etichette dei giorni per la tabella orari (Lun → Dom)
    Lunedì: "Lunedì",
    Martedì: "Martedì",
    Mercoledì: "Mercoledì",
    Giovedì: "Giovedì",
    Venerdì: "Venerdì",
    Sabato: "Sabato",
    Domenica: "Domenica",
  } as Record<string, string>,
  hero: {
    claim: "Nail atelier di lusso — Zurigo",
    title1: "L’arte delle unghie,",
    titleAccent: "curata nel dettaglio",
    subtitle:
      "Manicure, semipermanente, ricostruzione e nail art d’autore. Igiene totale, prodotti premium e uno stile che unisce calore caraibico ed eleganza europea.",
  },
  about: {
    eyebrow: "La nail artist",
    title: "Ciao, sono Kara",
    p1: "Nata nella Repubblica Dominicana e cresciuta con l’amore per i colori e il dettaglio, ho portato a Zurigo la mia idea di bellezza: unghie curate come piccole opere d’arte, in un ambiente dove ti senti a casa.",
    p2: "Unisco il calore e la vivacità caraibica alla raffinatezza europea, con una regola che non tradisco mai: precisione, igiene e prodotti di altissima qualità.",
    badgeNumber: "10+",
    badgeLabel: "anni di passione",
  },
  featured: {
    eyebrow: "Il listino",
    title: "Servizi in evidenza",
    intro:
      "Una selezione dei trattamenti più amati. Il listino completo, con tutte le categorie e i prezzi, ti aspetta nella pagina dedicata.",
  },
  galleryPreview: {
    eyebrow: "Il portfolio",
    title: "Lavori realizzati",
    intro:
      "Un assaggio delle unghie che ho creato per le mie clienti. Ogni set racconta una personalità diversa.",
  },
  pillars: {
    eyebrow: "Il valore aggiunto",
    title: "Perché scegliere Kara",
    intro: "Quattro promesse che ritrovi in ogni singolo appuntamento.",
    items: [
      {
        titolo: "Igiene totale",
        testo:
          "Strumenti sterilizzati in autoclave e materiale monouso per ogni cliente. La tua sicurezza non è un dettaglio: è la base di tutto.",
      },
      {
        titolo: "Prodotti premium",
        testo:
          "Solo brand professionali selezionati, gel e smalti di alta qualità che rispettano l’unghia naturale e durano nel tempo.",
      },
      {
        titolo: "Cura personalizzata",
        testo:
          "Ogni appuntamento inizia da una consulenza su colore e forma, pensata sulla tua mano, sul tuo stile e sulla tua giornata.",
      },
      {
        titolo: "Ambiente rilassante",
        testo:
          "Un atelier intimo e curato dove prenderti il tuo tempo. Luci calde, musica soffusa e la sensazione di essere davvero al centro.",
      },
    ],
  },
  testimonialsSection: {
    eyebrow: "Le parole delle clienti",
    title: "Chi si affida a me",
  },
  testimonials: {
    t1: {
      testo:
        "Non avevo mai visto una cura così maniacale del dettaglio. Kara ascolta, consiglia e realizza esattamente ciò che immagini. Le mie unghie non erano mai durate così a lungo.",
      dettaglio: "Semipermanente & Nail Art",
    },
    t2: {
      testo:
        "Ambiente elegante, pulizia impeccabile e mani d’artista. Ogni appuntamento è un momento di puro benessere. Ho trovato la mia nail artist di fiducia a Zurigo.",
      dettaglio: "Ricostruzione Gel",
    },
    t3: {
      testo:
        "La consulenza sul colore e sulla forma ha fatto la differenza. Kara ha uno stile inconfondibile, caldo e raffinato allo stesso tempo. Consigliatissima.",
      dettaglio: "Manicure Signature",
    },
  } as Record<string, { testo: string; dettaglio: string }>,
  location: {
    eyebrow: "Dove siamo",
    title: "Nel cuore di Zurigo",
    intro:
      "Ci trovi sulla Bahnhofstrasse, nel cuore elegante di Zurigo, tra le boutique più prestigiose della città. Un indirizzo raffinato per un momento tutto tuo.",
    indirizzo: "Indirizzo",
    orari: "Orari",
  },
  cta: {
    eyebrow: "Il tuo momento",
    title: "Prenota il tuo appuntamento",
    intro:
      "Regalati un’ora di cura, precisione e bellezza. Scegli il servizio, il giorno e l’orario: al resto pensiamo noi.",
  },
  footer: {
    description:
      "Nail atelier di lusso nel cuore di Zurigo. Precisione, igiene totale e uno stile che unisce calore caraibico ed eleganza europea.",
    esplora: "Esplora",
    contatti: "Contatti",
    doveSiamo: "Dove siamo",
    scriviWhatsapp: "Scrivi su WhatsApp",
    prenotaOnline: "Prenota online",
    serviziListino: "Servizi & Listino",
    instagram: "Instagram",
    rights: "Tutti i diritti riservati.",
    piva: "P.IVA da inserire · Realizzato con cura a Zurigo",
  },
  whatsapp: {
    label: "Scrivici su WhatsApp",
  },
  chiSono: {
    header: {
      eyebrow: "La nail artist",
      title: "La storia di Kara",
      intro:
        "Dai colori dei Caraibi all’eleganza di Zurigo: la mia idea di bellezza nasce dalla passione e dalla cura per ogni dettaglio.",
    },
    origini: {
      eyebrow: "Le origini",
      title: "Dalla Repubblica Dominicana a Zurigo",
      p1: "Sono cresciuta nella Repubblica Dominicana, in un mondo fatto di colori vivi, luce e attenzione alla cura di sé. Fin da ragazza le unghie sono state per me un piccolo linguaggio: un modo per esprimere personalità ed eleganza.",
      p2: "Quando mi sono trasferita a Zurigo ho scoperto una nuova idea di raffinatezza, più essenziale e discreta. Invece di scegliere tra le due anime, ho deciso di unirle: il calore caraibico e la sobrietà europea convivono in ogni lavoro che realizzo.",
      p3: "Oggi apro le porte del mio primo atelier: uno spazio intimo dove ogni cliente riceve tempo, ascolto e la cura che merita.",
    },
    filosofia: {
      eyebrow: "La mia filosofia",
      quote:
        "“Un’unghia curata non è mai un dettaglio superfluo: è il modo più silenzioso ed elegante di prendersi cura di sé.”",
      testo:
        "Credo nella lentezza giusta, quella che permette di fare le cose per bene. Niente lavori affrettati, niente compromessi sull’igiene. Solo attenzione, qualità e il piacere di vederti uscire felice.",
    },
    metodo: {
      eyebrow: "Come lavoro",
      title: "Il metodo Kara",
      intro:
        "Quattro passaggi che seguo con ogni cliente, per un risultato impeccabile dalla prima all’ultima limatura.",
      steps: [
        {
          titolo: "Consulenza",
          testo:
            "Ci prendiamo un momento per capire cosa desideri: stile di vita, forma delle mani, colori che ami. Insieme scegliamo la forma e la nuance perfette per te.",
        },
        {
          titolo: "Preparazione",
          testo:
            "Preparo l’unghia con cura e con strumenti sterilizzati e monouso. Una base impeccabile è ciò che garantisce durata, salute e un risultato pulito.",
        },
        {
          titolo: "Applicazione",
          testo:
            "Lavoro con prodotti premium e mano ferma: colore, struttura o nail art vengono realizzati con precisione, senza fretta e senza sbavature.",
        },
        {
          titolo: "Finitura & cura a casa",
          testo:
            "Sigillo il lavoro, curo i dettagli finali e ti lascio consigli semplici per mantenere le tue unghie perfette il più a lungo possibile.",
        },
      ],
    },
    atelierLabel: "L’Atelier · Zurigo",
  },
  servizi: {
    header: {
      eyebrow: "Il listino",
      title: "Servizi & Listino",
      intro:
        "Ogni trattamento è pensato per valorizzare le tue mani con prodotti premium e la massima cura. I prezzi possono variare in base alla lunghezza e alla complessità del lavoro.",
    },
    nota: "Non sai quale trattamento scegliere? Prenota comunque: durante la consulenza iniziale troveremo insieme la soluzione più adatta alle tue unghie e al tuo stile.",
    prenotaCta: "Prenota il tuo appuntamento",
  },
  // Categorie servizi (nome + sottotitolo) per id
  serviceCategories: {
    manicure: {
      nome: "Manicure Classica",
      sottotitolo: "Mani curate, naturali, impeccabili",
    },
    semipermanente: {
      nome: "Semipermanente",
      sottotitolo: "Colore brillante che dura fino a tre settimane",
    },
    ricostruzione: {
      nome: "Gel / Ricostruzione",
      sottotitolo: "Struttura, resistenza e forma su misura",
    },
    "nail-art": {
      nome: "Nail Art",
      sottotitolo: "Piccole opere d’arte sulla punta delle dita",
    },
    pedicure: {
      nome: "Pedicure",
      sottotitolo: "Piedi curati, leggerezza ritrovata",
    },
    "trattamenti-mani": {
      nome: "Trattamenti Mani",
      sottotitolo: "Rituali di bellezza e benessere",
    },
  } as Record<string, { nome: string; sottotitolo: string }>,
  // Singoli servizi (nome + descrizione) per id
  serviceItems: {
    "manicure-signature": {
      nome: "Manicure Signature",
      descrizione:
        "Limatura su misura, cura delle cuticole, massaggio nutriente e finitura lucida. Il rituale che riporta le mani al loro splendore naturale.",
    },
    "manicure-express": {
      nome: "Manicure Express",
      descrizione:
        "Un ritocco rapido ma raffinato: forma, cuticole e smalto in tinta unita per chi ha poco tempo e nessun compromesso.",
    },
    "semipermanente-mani": {
      nome: "Semipermanente Mani",
      descrizione:
        "Applicazione a regola d’arte con preparazione dell’unghia, colore ricco e sigillatura lucida. Tenuta perfetta, zero sbavature.",
    },
    "semipermanente-rimozione": {
      nome: "Rimozione & Nuova Applicazione",
      descrizione:
        "Rimozione delicata del vecchio semipermanente, trattamento ristrutturante e nuovo colore. La cura completa in un unico gesto.",
    },
    "french-semipermanente": {
      nome: "French Semipermanente",
      descrizione:
        "L’eleganza intramontabile della french, realizzata a mano libera con linee nette e finitura naturale.",
    },
    "ricostruzione-gel": {
      nome: "Ricostruzione Gel",
      descrizione:
        "Costruzione dell’unghia con gel di alta qualità per una forma armoniosa e resistente, modellata sulla tua mano.",
    },
    "refill-gel": {
      nome: "Refill Gel",
      descrizione:
        "Mantenimento della ricostruzione ogni 3–4 settimane per unghie sempre perfette e in salute.",
    },
    "copertura-gel": {
      nome: "Copertura in Gel su Naturale",
      descrizione:
        "Rinforzo dell’unghia naturale con una velatura di gel: resistenza e lucentezza senza allungamento.",
    },
    "nail-art-essenziale": {
      nome: "Nail Art Essenziale",
      descrizione:
        "Dettagli d’autore su una o più dita: micro-decori, linee dorate, effetti materici. Da abbinare a qualsiasi servizio.",
    },
    "nail-art-signature": {
      nome: "Nail Art Signature Caraibica",
      descrizione:
        "Il mio stile firmato: colori caldi, geometrie e finiture preziose ispirate ai Caraibi e reinterpretate con gusto europeo.",
    },
    "pedicure-spa": {
      nome: "Pedicure Spa",
      descrizione:
        "Pediluvio aromatico, esfoliazione, cura delle cuticole e massaggio rilassante. Un rituale di benessere dalla testa ai piedi.",
    },
    "pedicure-semipermanente": {
      nome: "Pedicure con Semipermanente",
      descrizione:
        "Tutta la cura del pedicure spa con l’aggiunta del colore semipermanente per piedi impeccabili a lungo.",
    },
    "trattamento-idratante": {
      nome: "Rituale Idratante Mani",
      descrizione:
        "Scrub, maschera nutriente e massaggio con oli preziosi per mani vellutate e luminose. Il complemento perfetto a ogni manicure.",
    },
    "trattamento-rinforzante": {
      nome: "Trattamento Rinforzante Unghie",
      descrizione:
        "Percorso ristrutturante per unghie fragili o sfaldate, con prodotti professionali e consigli personalizzati per la cura a casa.",
    },
  } as Record<string, { nome: string; descrizione: string }>,
  galleria: {
    header: {
      eyebrow: "Il portfolio",
      title: "Galleria",
      intro:
        "Ogni set di unghie è un piccolo progetto su misura. Filtra per categoria e tocca un’immagine per vederla da vicino.",
    },
    filterAll: "Tutte",
    lightboxClose: "Chiudi",
    lightboxPrev: "Immagine precedente",
    lightboxNext: "Immagine successiva",
    dialogLabel: "Immagine ingrandita",
  },
  galleryCategories: {
    "Nail Art": "Nail Art",
    Semipermanente: "Semipermanente",
    Ricostruzione: "Ricostruzione",
    Pedicure: "Pedicure",
  } as Record<string, string>,
  galleryItems: {
    g01: "Nail art d’autore con dettagli oro champagne su base avorio",
    g02: "Semipermanente rosa cipria dalla finitura lucida",
    g03: "Ricostruzione gel a mandorla con forma allungata ed elegante",
    g04: "Nail art geometrica con linee dorate su fondo nero profondo",
    g05: "Pedicure con semipermanente nei toni del nude",
    g06: "French semipermanente moderna dalle linee nette",
    g07: "Ricostruzione gel con copertura glitterata champagne",
    g08: "Nail art caraibica con colori caldi e finiture materiche",
    g09: "Semipermanente rosso profondo dall’effetto specchio",
    g10: "Pedicure spa con smalto nude luminoso",
    g11: "Ricostruzione a ballerina con nail art minimale oro",
    g12: "Nail art floreale dipinta a mano su base avorio",
  } as Record<string, string>,
  prenota: {
    header: {
      eyebrow: "Appuntamenti",
      title: "Prenota il tuo momento",
      intro:
        "In pochi passaggi scegli il trattamento, il giorno e l’orario. Ti ricontatteremo per la conferma.",
    },
    steps: ["Servizio", "Data & ora", "I tuoi dati", "Conferma"],
    step0Title: "Quale trattamento desideri?",
    step1Title: "Scegli data e orario",
    step2Title: "I tuoi dati",
    step3Title: "Controlla e conferma",
    fieldNome: "Nome e cognome",
    fieldTelefono: "Telefono",
    fieldEmail: "Email",
    fieldNote: "Note (facoltative)",
    notePlaceholder: "Idee, ispirazioni, allergie, richieste particolari…",
    selectDate: "Seleziona prima una data",
    slotsAppear: "Gli orari disponibili appariranno qui.",
    loadingSlots: "Carico gli orari…",
    noSlots: "Nessun orario disponibile in questa data.",
    calendarNote: "Lunedì e domenica il salone è chiuso.",
    prevMonth: "Mese precedente",
    nextMonth: "Mese successivo",
    back: "Indietro",
    continua: "Continua",
    conferma: "Conferma prenotazione",
    inviando: "Invio in corso…",
    riepilogoServizio: "Servizio",
    riepilogoPrezzo: "Prezzo indicativo",
    riepilogoData: "Data",
    riepilogoOrario: "Orario",
    riepilogoNome: "Nome",
    riepilogoTelefono: "Telefono",
    riepilogoEmail: "Email",
    riepilogoNote: "Note",
    disclaimer:
      "Inviando la richiesta accetti di essere ricontattata per la conferma dell’appuntamento. I prezzi sono indicativi e possono variare in base alla lunghezza e alla complessità del lavoro.",
    grazie: "Grazie, {nome}!",
    confermaTesto:
      "La tua richiesta di appuntamento è stata registrata. Ti ricontatteremo al più presto per confermare l’orario.",
    errServizio: "Scegli un servizio per continuare.",
    errData: "Scegli una data.",
    errOra: "Scegli un orario.",
    errNome: "Inserisci il tuo nome.",
    errTelefono: "Inserisci un numero di telefono valido.",
    errEmail: "Inserisci un indirizzo email valido.",
    errGenerale: "Si è verificato un errore.",
    errConnessione: "Errore di connessione. Riprova.",
  },
  contatti: {
    header: {
      eyebrow: "Restiamo in contatto",
      title: "Contatti",
      intro:
        "Siamo felici di risponderti. Scrivici per informazioni, consigli o per prenotare il tuo appuntamento.",
    },
    doveTrovarci: "Dove trovarci",
    labelIndirizzo: "Indirizzo",
    labelTelWhatsapp: "Telefono & WhatsApp",
    labelEmail: "Email",
    labelInstagram: "Instagram",
    labelOrari: "Orari",
    scriviWhatsapp: "Scrivi su WhatsApp →",
    formHeading: "Scrivici due righe",
    formIntro: "Compila il modulo: ti risponderemo al più presto.",
    formNome: "Nome",
    formEmail: "Email",
    formMessaggio: "Messaggio",
    formInvia: "Invia messaggio",
    formInviando: "Invio…",
    successTitle: "Messaggio inviato",
    successText:
      "Grazie per averci scritto. Ti risponderemo il prima possibile.",
    errNome: "Inserisci il tuo nome.",
    errEmail: "Inserisci un indirizzo email valido.",
    errMessaggio: "Scrivi il tuo messaggio.",
    errConnessione: "Errore di connessione. Riprova.",
  },
  notFound: {
    code: "Errore 404",
    title: "Pagina non trovata",
    text: "La pagina che cerchi non esiste o è stata spostata. Torniamo insieme al punto di partenza.",
    home: "Torna alla home",
    prenota: "Prenota un appuntamento",
  },
};

export type Dictionary = typeof it;
