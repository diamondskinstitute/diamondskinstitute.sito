import type { LocaleDict } from "./deep";

// Dizionario SVIZZERO TEDESCO (Schwiizerdütsch)
// Titoli, menu e pulsanti in dialetto; testi lunghi in tedesco svizzero
// standard (sempre "ss", mai "ß").
export const gsw: LocaleDict = {
  nav: {
    home: "Home",
    chiSono: "Über d’Kara",
    servizi: "Behandlige",
    galleria: "Galerie",
    contatti: "Kontakt",
    prenotaOra: "Jetz buche",
    apriMenu: "Menü ufmache",
    chiudiMenu: "Menü zuemache",
    cambiaLingua: "Sprooch wächsle",
    tagline: "Studio · Züri",
  },
  common: {
    skip: "Zum Inhalt",
    prenotaOra: "Jetz buche",
    scopriGalleria: "Zur Galerie",
    scopriServizi: "Behandlige entdecke",
    scopriGalleriaCompleta: "Zur ganze Galerie",
    vediTuttiServizi: "Ali Behandlige aaluege",
    laMiaStoria: "Mini Gschicht",
    contattiMappa: "Kontakt & Charte",
    tornaHome: "Zur Startsite",
    chiuso: "Zue",
    da: "ab",
  },
  days: {
    full: [
      "Sunntig",
      "Määntig",
      "Ziischtig",
      "Mittwuch",
      "Dunschtig",
      "Friitig",
      "Samschtig",
    ],
    abbrMon: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  },
  months: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "Auguscht",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  orari: {
    Lunedì: "Määntig",
    Martedì: "Ziischtig",
    Mercoledì: "Mittwuch",
    Giovedì: "Dunschtig",
    Venerdì: "Friitig",
    Sabato: "Samschtig",
    Domenica: "Sunntig",
  },
  hero: {
    claim: "Luxuriöses Nagelatelier — Züri",
    title1: "D’Kunscht vo de Nägel,",
    titleAccent: "bis is Detail pflegt",
    subtitle:
      "Maniküre, Shellac, Modellage und Nailart mit eigener Handschrift. Kompromisslosi Hygiene, Premium-Produkt und en Stil, wo karibischi Wärmi mit europäischer Eleganz verbindet.",
  },
  about: {
    eyebrow: "D’Nageldesignerin",
    title: "Hoi, ich bi d’Kara",
    p1: "Uufgwachse bin ich i de Dominikanische Republik, mit de Liebi zu Farbe und Details. Mini Idee vo Schönheit han ich uf Züri broocht: Nägel, pflegt wie chlini Kunschtwärk, i eme Ambiente, wo du di deheim fühlsch.",
    p2: "Ich verbinde karibischi Wärmi und Läbesfröhd mit europäischer Raffinesse – nach ere Regle, wo ich nie brich: Präzision, Hygiene und Produkt vo höchschter Qualität.",
    badgeNumber: "10+",
    badgeLabel: "Jahr Leidenschaft",
  },
  featured: {
    eyebrow: "D’Prisliste",
    title: "Beliebti Behandlige",
    intro:
      "En Uswahl vo de beliebtischte Behandlige. Die ganzi Prisliste mit allne Kategorie und Pris findsch uf de eigene Site.",
  },
  galleryPreview: {
    eyebrow: "S’Portfolio",
    title: "Gmachti Arbete",
    intro:
      "En Vorgschmack uf d’Nägel, wo ich für mini Chundinne gstaltet han. Jedes Set verzellt en anderi Persönlichkeit.",
  },
  pillars: {
    eyebrow: "De Mehrwert",
    title: "Warum d’Kara wähle",
    intro: "Vier Verspreche, wo du bi jedem einzelne Termin wieder findsch.",
    items: [
      {
        titolo: "Kompromisslosi Hygiene",
        testo:
          "Im Autoklav sterilisierti Instrument und Einwegmaterial für jedi Chundin. Dini Sicherheit isch kei Detail: si isch d’Basis vo allem.",
      },
      {
        titolo: "Premium-Produkt",
        testo:
          "Nu uusgwählti Profimarke, hochwertigi Gel und Lack, wo de Naturnagel schone und lang halte.",
      },
      {
        titolo: "Persönlichi Berootig",
        testo:
          "Jede Termin foot mit ere Berootig zu Farb und Form aa – abgstimmt uf dini Hand, dini Stil und dini Alltag.",
      },
      {
        titolo: "Entspannendi Atmosphäre",
        testo:
          "Es intims, pflegts Atelier, wo du der Zit chasch nä. Warms Liecht, liisi Musig und s’Gfühl, würklich im Mittelpunkt z’sii.",
      },
    ],
  },
  testimonialsSection: {
    eyebrow: "D’Wort vo de Chundinne",
    title: "Wer mir vertraut",
  },
  testimonials: {
    t1: {
      testo:
        "So vill Liebi zum Detail han ich no nie erläbt. D’Kara ghört zue, berootet und setzt genau das um, wo mer sich vorstellt. Mini Nägel hend no nie so lang ghalte.",
      dettaglio: "Shellac & Nailart",
    },
    t2: {
      testo:
        "Elegants Ambiente, tadelloosi Suuberkeit und Künschtlerhänd. Jede Termin isch en Moment vo purer Erholig. Ich han mini Nageldesignerin vom Vertraue z’Züri gfunde.",
      dettaglio: "Gel-Modellage",
    },
    t3: {
      testo:
        "D’Berootig zu Farb und Form het de Underschied gmacht. D’Kara het en unverwächselbare Stil, warm und raffiniert zteich. Sehr z’empfähle.",
      dettaglio: "Maniküre Signature",
    },
  },
  location: {
    eyebrow: "Wo mir sind",
    title: "Im Härz vo Züri",
    intro:
      "Du findsch üs a de Bahnhofstrass, im elegante Härz vo Züri, mitten under de renommiertischte Boutique vo de Stadt. En edli Adrässe für en Moment nur für di.",
    indirizzo: "Adrässe",
    orari: "Öffnigsziite",
  },
  cta: {
    eyebrow: "Din Moment",
    title: "Buech din Termin",
    intro:
      "Gönn dir e Stund Pfleg, Präzision und Schönheit. Wähl d’Behandlig, de Tag und d’Ziit – um de Rescht kümmere mir üs.",
  },
  footer: {
    description:
      "Luxuriöses Nagelatelier im Härz vo Züri. Präzision, kompromisslosi Hygiene und en Stil, wo karibischi Wärmi mit europäischer Eleganz verbindet.",
    esplora: "Entdecke",
    contatti: "Kontakt",
    doveSiamo: "Wo mir sind",
    scriviWhatsapp: "Uf WhatsApp schriebe",
    prenotaOnline: "Online buche",
    serviziListino: "Behandlige & Pris",
    instagram: "Instagram",
    rights: "Alli Rächt vorbhalte.",
    piva: "MWST-Nr. no iizträge · Mit Sorgfalt z’Züri gmacht",
  },
  whatsapp: {
    label: "Schrieb üs uf WhatsApp",
  },
  chiSono: {
    header: {
      eyebrow: "D’Nageldesignerin",
      title: "D’Gschicht vo de Kara",
      intro:
        "Vo de Farbe vo de Karibik zur Eleganz vo Züri: Mini Idee vo Schönheit chunt us de Leidenschaft und de Sorgfalt für jedes Detail.",
    },
    origini: {
      eyebrow: "D’Ursprüng",
      title: "Vo de Dominikanische Republik uf Züri",
      p1: "Ich bin i de Dominikanische Republik uufgwachse, i ere Wält us läbendige Farbe, Liecht und Selbschtpfleg. Scho als Meitli sind d’Nägel für mich e chlini Sprooch gsi: e Art, Persönlichkeit und Eleganz uszdrücke.",
      p2: "Won ich uf Züri zoge bin, han ich e nöii Idee vo Raffinesse entdeckt, mee essenziell und zrugghaltend. Statt zwüsche de zwei Seele z’wähle, han ich si verbunde: karibischi Wärmi und europäischi Zrugghaltig läbe i jeder Arbet witer, wo ich gstalte.",
      p3: "Hüt mach ich d’Türe vo mim erschte Atelier uf: en intime Ruum, wo jedi Chundin Ziit, Zuelose und d’Pfleg überchunt, wo si verdient.",
    },
    filosofia: {
      eyebrow: "Mini Philosophie",
      quote:
        "«En pflegte Nagel isch nie es überflüssigs Detail: er isch di stillschti und elegantischti Art, für sich selber z’luege.»",
      testo:
        "Ich glaub a di richtigi Langsamkeit, die wo’s erlaubt, d’Sache guet z’mache. Kei hektischi Arbete, kei Kompromiss bi de Hygiene. Nur Ufmerksamkeit, Qualität und d’Freud, di glücklich go z’gseh.",
    },
    metodo: {
      eyebrow: "Wie ich schaffe",
      title: "D’Kara-Methode",
      intro:
        "Vier Schritt, wo ich bi jeder Chundin mach, für es makelloses Resultat vo de erschte bis zur letschte Fiile.",
      steps: [
        {
          titolo: "Berootig",
          testo:
            "Mir nämed üs en Moment, zum verstoo, was du der wünschsch: Läbesstil, Handform, Lieblingsfarbe. Zäme wähled mir di perfekti Form und de perfekti Ton für di.",
        },
        {
          titolo: "Vorbereitig",
          testo:
            "Ich bereite de Nagel sorgfältig vor, mit sterilisierte und Einweg-Instrument. E makelloosi Basis garantiert Haltbarkeit, Gsundheit und es suubers Resultat.",
        },
        {
          titolo: "Applikation",
          testo:
            "Ich schaffe mit Premium-Produkt und ruehiger Hand: Farb, Struktur oder Nailart entstöhnd präzis, ohni Hetz und ohni verlaufe.",
        },
        {
          titolo: "Finish & Pfleg deheim",
          testo:
            "Ich versigle d’Arbet, luege zu de letschte Details und gib der eifachi Tipps, damit dini Nägel so lang wie möglich perfekt bliibed.",
        },
      ],
    },
    atelierLabel: "S’Atelier · Züri",
  },
  servizi: {
    header: {
      eyebrow: "D’Prisliste",
      title: "Behandlige & Pris",
      intro:
        "Jedi Behandlig isch druf uusgleit, dini Händ mit Premium-Produkt und höchschter Sorgfalt zur Gältig z’bringe. D’Pris chönd je noch Längi und Uffwand variiere.",
    },
    nota: "Weisch nöd, weli Behandlig di richtig isch? Buech trotzdem: i de erschte Berootig finded mir zäme di passendi Lösig für dini Nägel und din Stil.",
    prenotaCta: "Buech din Termin",
  },
  serviceCategories: {
    manicure: {
      nome: "Klassischi Maniküre",
      sottotitolo: "Pflegti, natürlichi, makelloosi Händ",
    },
    semipermanente: {
      nome: "Shellac",
      sottotitolo: "Strahlendi Farb, wo bis zu drei Wuche haltet",
    },
    ricostruzione: {
      nome: "Gel / Modellage",
      sottotitolo: "Struktur, Widerstandschraft und Form noch Mass",
    },
    "nail-art": {
      nome: "Nailart",
      sottotitolo: "Chlini Kunschtwärk a de Fingerspitze",
    },
    pedicure: {
      nome: "Pediküre",
      sottotitolo: "Pflegti Füess, wieder gfundeni Liechtigkeit",
    },
    "trattamenti-mani": {
      nome: "Handbehandlige",
      sottotitolo: "Rituale für Schönheit und Wohlbefinde",
    },
  },
  serviceItems: {
    "manicure-signature": {
      nome: "Maniküre Signature",
      descrizione:
        "Massgschniiders Fiile, Nagelhutpfleg, nährendi Massage und glänzends Finish. S’Ritual, wo de Händ ihre natürliche Glanz zruggäh.",
    },
    "manicure-express": {
      nome: "Maniküre Express",
      descrizione:
        "En schnelli, aber raffinierti Uffrischig: Form, Nagelhut und eifarbige Lack für ali mit wenig Ziit und ohni Kompromiss.",
    },
    "semipermanente-mani": {
      nome: "Shellac Händ",
      descrizione:
        "Fachgrächti Applikation mit Nagelvorbereitig, satter Farb und glänzender Versieglig. Perfekte Halt, kei Verlaufe.",
    },
    "semipermanente-rimozione": {
      nome: "Entfernig & Neuuftrag",
      descrizione:
        "Sanfti Entfernig vom alte Shellac, uufbauendi Pfleg und nöii Farb. Di kompletti Pfleg i eim Schritt.",
    },
    "french-semipermanente": {
      nome: "French Shellac",
      descrizione:
        "Di zitlosi Eleganz vo de French, freihand gstaltet mit klare Linie und natürlichem Finish.",
    },
    "ricostruzione-gel": {
      nome: "Gel-Modellage",
      descrizione:
        "Uufbau vom Nagel mit hochwertigem Gel für e harmonischi, widerstandsfähigi Form, modelliert uf dini Hand.",
    },
    "refill-gel": {
      nome: "Gel-Refill",
      descrizione:
        "Uffülle vo de Modellage alli 3–4 Wuche für immer perfekti und gsundi Nägel.",
    },
    "copertura-gel": {
      nome: "Gel-Überzug uf Naturnagel",
      descrizione:
        "Verstärkig vom Naturnagel mit eme Gel-Schleier: Widerstandschraft und Glanz ohni Verlängerig.",
    },
    "nail-art-essenziale": {
      nome: "Nailart Essenziell",
      descrizione:
        "Handschriftlichi Details a eim oder mehrere Finger: Mikro-Dekor, goldigi Linie, strukturierti Effekt. Zu jeder Behandlig kombinierbar.",
    },
    "nail-art-signature": {
      nome: "Nailart Signature Karibik",
      descrizione:
        "Min signierte Stil: warmi Farbe, Geometrie und edli Finishes, inspiriert vo de Karibik und mit europäischem Gschmack neu interpretiert.",
    },
    "pedicure-spa": {
      nome: "Pediküre Spa",
      descrizione:
        "Aromatischs Fuessbad, Peeling, Nagelhutpfleg und entspannendi Massage. Es Wohlfühlritual vo Chopf bis Fuess.",
    },
    "pedicure-semipermanente": {
      nome: "Pediküre mit Shellac",
      descrizione:
        "Di ganzi Pfleg vo de Spa-Pediküre, ergänzt mit Shellac-Farb für lang makelloosi Füess.",
    },
    "trattamento-idratante": {
      nome: "Füechtigkeitsritual Händ",
      descrizione:
        "Peeling, nährendi Maske und Massage mit chostbare Öl für samtigi, strahlendi Händ. Di perfekti Ergänzig zu jeder Maniküre.",
    },
    "trattamento-rinforzante": {
      nome: "Nagelstärkendi Behandlig",
      descrizione:
        "Uufbauendi Kur für brüchigi oder splitterndi Nägel, mit professionelle Produkt und persönliche Tipps für d’Pfleg deheim.",
    },
  },
  galleria: {
    header: {
      eyebrow: "S’Portfolio",
      title: "Galerie",
      intro:
        "Jedes Nagel-Set isch es chlises Projekt noch Mass. Filter noch Kategorie und tipp uf es Bild, zum’s vo nöcher z’gseh.",
    },
    filterAll: "Alli",
    lightboxClose: "Zue",
    lightboxPrev: "Vorherigs Bild",
    lightboxNext: "Nächschts Bild",
    dialogLabel: "Vergrösserts Bild",
  },
  galleryCategories: {
    "Nail Art": "Nailart",
    Semipermanente: "Shellac",
    Ricostruzione: "Modellage",
    Pedicure: "Pediküre",
  },
  galleryItems: {
    g01: "Handgmachti Nailart mit champagnergoldige Details uf elfebeifarbiger Basis",
    g02: "Puderrosa Shellac mit glänzendem Finish",
    g03: "Gel-Modellage i Mandelform, langzoge und elegant",
    g04: "Geometrischi Nailart mit goldige Linie uf tüüfschwarzem Grund",
    g05: "Pediküre mit Shellac i Nude-Töön",
    g06: "Moderni French-Shellac mit klare Linie",
    g07: "Gel-Modellage mit champagnerfarbigem Glitzer-Überzug",
    g08: "Karibischi Nailart mit warme Farbe und strukturierte Finishes",
    g09: "Tüüfroti Shellac mit Spiegeleffekt",
    g10: "Spa-Pediküre mit strahlendem Nude-Lack",
    g11: "Ballerina-Modellage mit minimalischtischer Gold-Nailart",
    g12: "Floreali Nailart, vo Hand uf elfebeifarbiger Basis gmoolt",
  },
  prenota: {
    header: {
      eyebrow: "Termin",
      title: "Buech din Moment",
      intro:
        "I es paar Schritt wählsch Behandlig, Tag und Ziit. Mir mälded üs zur Bestätigung.",
    },
    steps: ["Behandlig", "Datum & Ziit", "Dini Date", "Bestätigung"],
    step0Title: "Weli Behandlig wünschsch der?",
    step1Title: "Wähl Datum und Ziit",
    step2Title: "Dini Date",
    step3Title: "Prüefe und bestätige",
    fieldNome: "Vor- und Nachname",
    fieldTelefono: "Telefon",
    fieldEmail: "E-Mail",
    fieldNote: "Aamerkige (optional)",
    notePlaceholder: "Ideä, Inspiratione, Allergie, bsunderi Wünsch…",
    selectDate: "Wähl zerscht es Datum",
    slotsAppear: "Di verfüegbare Ziite erschiined da.",
    loadingSlots: "Ziite werded glade…",
    noSlots: "Kei Ziit a dem Datum verfüegbar.",
    calendarNote: "Määntig und Sunntig isch s’Studio zue.",
    prevMonth: "Vorherige Monet",
    nextMonth: "Nächschte Monet",
    back: "Zrugg",
    continua: "Wiiter",
    conferma: "Buechig bestätige",
    inviando: "Wird gschickt…",
    riepilogoServizio: "Behandlig",
    riepilogoPrezzo: "Richtpris",
    riepilogoData: "Datum",
    riepilogoOrario: "Ziit",
    riepilogoNome: "Name",
    riepilogoTelefono: "Telefon",
    riepilogoEmail: "E-Mail",
    riepilogoNote: "Aamerkige",
    disclaimer:
      "Mit em Abschicke bisch iiverstande, zur Bestätigung vom Termin kontaktiert z’werde. D’Pris sind Richtwärt und chönd je noch Längi und Uffwand variiere.",
    grazie: "Merci, {nome}!",
    confermaTesto:
      "Dini Termiaafrog isch registriert. Mir mälded üs so schnell wie möglich, zum d’Ziit z’bestätige.",
    errServizio: "Wähl e Behandlig zum witerfahre.",
    errData: "Wähl es Datum.",
    errOra: "Wähl e Ziit.",
    errNome: "Bitte gib din Name aa.",
    errTelefono: "Bitte gib e gültigi Telefonnummere aa.",
    errEmail: "Bitte gib e gültigi E-Mail-Adrässe aa.",
    errGenerale: "Es isch en Fähler passiert.",
    errConnessione: "Verbindigsfähler. Bitte probier’s nomol.",
  },
  contatti: {
    header: {
      eyebrow: "Bliibe mer i Kontakt",
      title: "Kontakt",
      intro:
        "Mir antworted der gärn. Schrieb üs für Infos, Berootig oder zum din Termin z’buche.",
    },
    doveTrovarci: "So findsch üs",
    labelIndirizzo: "Adrässe",
    labelTelWhatsapp: "Telefon & WhatsApp",
    labelEmail: "E-Mail",
    labelInstagram: "Instagram",
    labelOrari: "Öffnigsziite",
    scriviWhatsapp: "Uf WhatsApp schriebe →",
    formHeading: "Schrieb üs es paar Zile",
    formIntro: "Füll s’Formular us: Mir antworted so schnell wie möglich.",
    formNome: "Name",
    formEmail: "E-Mail",
    formMessaggio: "Nochricht",
    formInvia: "Nochricht schicke",
    formInviando: "Wird gschickt…",
    successTitle: "Nochricht gschickt",
    successText:
      "Merci für dini Nochricht. Mir antworted so schnell wie möglich.",
    errNome: "Bitte gib din Name aa.",
    errEmail: "Bitte gib e gültigi E-Mail-Adrässe aa.",
    errMessaggio: "Schrieb dini Nochricht.",
    errConnessione: "Verbindigsfähler. Bitte probier’s nomol.",
  },
  notFound: {
    code: "Fähler 404",
    title: "Site nöd gfunde",
    text: "Di gsuechti Site git’s nöd oder si isch verschobe worde. Gömmer zäme zrugg zum Aafang.",
    home: "Zur Startsite",
    prenota: "En Termin buche",
  },
};
