// =====================================================================
//  TRATTAMENTI DELL'ISTITUTO  (dati segnaposto)
//
//  Ogni trattamento genera automaticamente:
//   • una card in /trattamenti
//   • una pagina di dettaglio /trattamenti/[slug]
//   • una voce nel menu della prenotazione (/prenota)
//
//  `durataMin` è usato dal motore di prenotazione per calcolare quanti
//  slot consecutivi occupare: tienilo aggiornato con la durata reale.
// =====================================================================

import { formatPrice } from "@/lib/format";
import { getPortfolioSrc } from "./portfolio";
import { site } from "./site";

export type TreatmentFaq = {
  domanda: string;
  risposta: string;
};

// Prezzo per misura (ricostruzione e refill: S / M / L / XL / XXL)
export type TreatmentSize = {
  label: string;
  prezzo: number;
};

export type Treatment = {
  slug: string;
  nome: string;
  categoria: string; // raggruppamento mostrato sulla card
  descrizioneBreve: string;
  descrizione: string;
  // A cosa serve / a chi è consigliato
  perChi: string;
  durataMin: number; // durata reale in minuti
  durataLabel: string; // come viene mostrata
  // Prezzo di listino. Se `prezzoSuRichiesta` è true il numero NON viene
  // mostrato (il servizio non è nel listino ufficiale): resta qui solo come
  // riferimento storico, in attesa di conferma dalla titolare.
  prezzo: number;
  prezzoDa?: boolean; // mostra "da CHF .."
  prezzoSuRichiesta?: boolean; // mostra "Su richiesta" invece del prezzo
  // Listino per misura, mostrato sulla scheda del trattamento
  misure?: TreatmentSize[];
  // Le fasi del trattamento, nell'ordine
  fasi: { titolo: string; testo: string }[];
  // Consigli per il mantenimento a casa
  aftercare: string[];
  faq: TreatmentFaq[];
  // Gold placeholder used only when no gallery photo is referenced below.
  immagine: string;
  // Cover photo taken from the works gallery (`data/portfolio.ts`), given as
  // the gallery item id (e.g. "p23"). The path itself lives only in the
  // gallery, so photos are reused and never duplicated. When set, it wins
  // over `immagine` on the cards and on the treatment page.
  galleryPhotoId?: string;
  // Extra gallery photos shown on the treatment page, referenced the same way.
  galleryPhotoIds?: string[];
  // Altre foto mostrate sulla scheda (es. dalla galleria lavori)
  fotoGalleria?: string[];
  inEvidenza?: boolean;
  // false = servizio disattivato: sparisce da card, dettaglio, prenotazione,
  // ricerca e sitemap. Vedi SERVIZI-NASCOSTI.md nella root del progetto.
  active?: boolean;
};

// Elenco COMPLETO, compresi i servizi disattivati (`active: false`).
// Il sito usa `treatments`, che contiene solo quelli attivi.
export const allTreatments: Treatment[] = [
  {
    slug: "manicure-classica",
    nome: "Manicure Classica",
    categoria: "Mani",
    descrizioneBreve:
      "Il rituale che riporta le mani al loro splendore naturale.",
    descrizione:
      "La manicure classica è la base di ogni mano curata: forma su misura, cuticole ordinate e una finitura che valorizza l'unghia naturale senza coprirla. È il trattamento che consigliamo a chi vuole mani impeccabili senza colore, o come preparazione a qualunque altro servizio.",
    perChi:
      "Ideale per chi desidera mani ordinate e naturali, per chi sta facendo crescere le unghie dopo una ricostruzione, e come preparazione prima di un colore.",
    durataMin: 45,
    durataLabel: "45 min",
    prezzo: 30,
    prezzoSuRichiesta: true,
    // Non presente nel listino ufficiale: servizio disattivato.
    // Per riattivarlo: active: true (vedi SERVIZI-NASCOSTI.md)
    active: false,
    fasi: [
      {
        titolo: "Analisi e forma",
        testo:
          "Valutiamo insieme la lamina e scegliamo la forma più armoniosa per la tua mano.",
      },
      {
        titolo: "Cura delle cuticole",
        testo:
          "Ammorbidimento, spinta delicata e rimozione solo di ciò che serve: mai una cuticola tagliata a vivo.",
      },
      {
        titolo: "Massaggio nutriente",
        testo:
          "Scrub leggero e massaggio con oli preziosi per mani morbide e circolazione riattivata.",
      },
      {
        titolo: "Finitura",
        testo:
          "Lucidatura naturale oppure smalto in tinta unita, a tua scelta.",
      },
    ],
    aftercare: [
      "Applica l'olio per cuticole ogni sera prima di dormire",
      "Usa i guanti per i lavori domestici e con i detergenti aggressivi",
      "Ritocca la forma con una lima a grana fine, mai con il tronchesino",
    ],
    faq: [
      {
        domanda: "Quanto dura una manicure classica?",
        risposta:
          "L'effetto curato dura circa due settimane. Con lo smalto in tinta unita, il colore resta perfetto per 4–6 giorni.",
      },
      {
        domanda: "Posso farla se ho le unghie molto corte?",
        risposta:
          "Sì, anzi: è il trattamento che consigliamo per riportare in salute unghie corte o rovinate dal mangiarsi le unghie.",
      },
    ],
    immagine: "/images/portfolio/placeholder-02.svg",
    inEvidenza: true,
  },
  {
    slug: "semipermanente",
    nome: "Semipermanente",
    categoria: "Colore",
    descrizioneBreve:
      "Colore brillante e impeccabile che dura fino a tre settimane.",
    descrizione:
      "Il semipermanente unisce la praticità dello smalto alla tenuta del gel: colore pieno, brillantezza da primo giorno e nessuna sbavatura per almeno tre settimane. L'applicazione è millimetrica, con la cuticola sempre libera e il bordo sigillato per evitare sollevamenti.",
    perChi:
      "Perfetto per chi ha poco tempo da dedicare alle unghie ma non rinuncia a un colore sempre in ordine, e per chi lavora molto con le mani.",
    durataMin: 60,
    durataLabel: "60 min",
    prezzo: 40,
    fasi: [
      {
        titolo: "Preparazione della lamina",
        testo:
          "Opacizzazione delicata e disidratazione: la base di ogni tenuta lunga.",
      },
      {
        titolo: "Base e struttura",
        testo:
          "Base rubber applicata sottile, livellata per compensare le irregolarità.",
      },
      {
        titolo: "Colore",
        testo:
          "Due passate sottili e catalizzate singolarmente, per un colore pieno senza spessore.",
      },
      {
        titolo: "Sigillatura",
        testo:
          "Top coat lucido e sigillatura del bordo libero contro i sollevamenti.",
      },
    ],
    aftercare: [
      "Aspetta almeno 12 ore prima di immergere a lungo le mani in acqua calda",
      "Non usare le unghie come attrezzo: è la prima causa di sollevamento",
      "Non rimuovere mai il semipermanente a strappo",
    ],
    faq: [
      {
        domanda: "Il semipermanente rovina l'unghia?",
        risposta:
          "No, se applicato e rimosso correttamente. I danni derivano quasi sempre dalla limatura eccessiva in preparazione o dalla rimozione a strappo.",
      },
      {
        domanda: "Ogni quanto va rifatto?",
        risposta:
          "Ogni 3 settimane circa. Oltre le 4 settimane la ricrescita fa leva sul bordo e aumenta il rischio di sollevamenti.",
      },
    ],
    immagine: "/images/portfolio/placeholder-06.svg",
    // p23 — French bordeaux su forma squadrata (gallery category "Semipermanente")
    galleryPhotoId: "p23",
    inEvidenza: true,
  },
  {
    slug: "ricostruzione-gel",
    nome: "Ricostruzione Gel",
    categoria: "Estensioni",
    descrizioneBreve:
      "Struttura, resistenza e forma su misura, costruite a mano.",
    descrizione:
      "La ricostruzione costruisce l'unghia dove non c'è: allungamento, apex e curvatura vengono modellati a mano per ottenere una forma armoniosa e, soprattutto, una struttura che regge. Il risultato è resistente ma sottile, naturale al tatto e al peso.",
    perChi:
      "Per chi ha unghie fragili che si spezzano prima di crescere, per chi desidera un allungamento, e per chi vuole una forma che la propria lamina non permetterebbe.",
    durataMin: 120,
    durataLabel: "120 min",
    prezzo: 65,
    prezzoDa: true,
    misure: [
      { label: "S", prezzo: 65 },
      { label: "M", prezzo: 73 },
      { label: "L", prezzo: 85 },
      { label: "XL", prezzo: 93 },
      { label: "XXL", prezzo: 100 },
    ],
    fasi: [
      {
        titolo: "Preparazione",
        testo:
          "Analisi della lamina, forma di base e preparazione della superficie.",
      },
      {
        titolo: "Costruzione",
        testo:
          "Applicazione del gel su cartina o dual form, con apex costruito nel punto di massima sollecitazione.",
      },
      {
        titolo: "Limatura strutturale",
        testo:
          "Rifinitura di profilo, curvatura e spessori: è qui che si decide quanto durerà.",
      },
      {
        titolo: "Colore e finitura",
        testo:
          "Colore, nail art se desiderata, sigillatura e olio per cuticole.",
      },
    ],
    aftercare: [
      "Torna per il refill entro 3–4 settimane: non aspettare che si sollevi",
      "Se una unghia si rompe, non tirarla: fissa un appuntamento",
      "Olio cuticole ogni giorno, anche sulla ricostruzione",
    ],
    faq: [
      {
        domanda: "Quanto dura una ricostruzione?",
        risposta:
          "La struttura regge mesi; quello che cambia è la ricrescita. Per questo si fa il refill ogni 3–4 settimane invece di rifarla da capo.",
      },
      {
        domanda: "Posso tornare alle unghie naturali quando voglio?",
        risposta:
          "Sì. La rimozione va fatta in istituto, limando lo spessore e lasciando un velo protettivo che si assottiglia con la ricrescita.",
      },
    ],
    immagine: "/images/portfolio/placeholder-03.svg",
    // p20 — Stiletto extra lunghe nude lucide (gallery category "Ricostruzione")
    galleryPhotoId: "p20",
    inEvidenza: true,
  },
  {
    slug: "refill",
    nome: "Refill",
    categoria: "Estensioni",
    descrizioneBreve:
      "Il mantenimento che tiene la ricostruzione perfetta nel tempo.",
    descrizione:
      "Il refill riempie la zona di ricrescita e ribilancia la struttura, spostando l'apex nel punto giusto man mano che l'unghia cresce. Fatto con regolarità, è ciò che permette di non rifare mai da zero la ricostruzione.",
    perChi:
      "Per chi ha già una ricostruzione o una copertura in gel e vuole mantenerla in ordine, in salute e con la struttura corretta.",
    durataMin: 90,
    durataLabel: "90 min",
    prezzo: 60,
    prezzoDa: true,
    misure: [
      { label: "S", prezzo: 60 },
      { label: "M", prezzo: 65 },
      { label: "L", prezzo: 73 },
      { label: "XL", prezzo: 85 },
      { label: "XXL", prezzo: 93 },
    ],
    fasi: [
      {
        titolo: "Controllo",
        testo:
          "Verifica di eventuali sollevamenti e dello stato della lamina sotto il gel.",
      },
      {
        titolo: "Limatura della ricrescita",
        testo:
          "Assottigliamento del vecchio gel e preparazione della zona nuova.",
      },
      {
        titolo: "Ribilanciamento",
        testo:
          "Nuovo gel nella zona di ricrescita e apex riportato nella posizione corretta.",
      },
      {
        titolo: "Rifinitura",
        testo: "Limatura di profilo, colore e sigillatura finale.",
      },
    ],
    aftercare: [
      "Mantieni la cadenza di 3–4 settimane: è la chiave di tutto",
      "Segnala subito eventuali fastidi o sollevamenti",
      "Continua con l'olio cuticole quotidiano",
    ],
    faq: [
      {
        domanda: "Posso fare il refill su un lavoro fatto altrove?",
        risposta:
          "Sì, dopo una valutazione. Se la struttura precedente non è recuperabile ti proponiamo la rimozione e una nuova ricostruzione.",
      },
      {
        domanda: "Quante volte si può ripetere?",
        risposta:
          "Indefinitamente, finché l'unghia naturale sottostante resta sana. La controlliamo a ogni appuntamento.",
      },
    ],
    immagine: "/images/portfolio/placeholder-07.svg",
    // p25 — Squadrate con french colorata rosso e arancio (gallery category "Ricostruzione")
    galleryPhotoId: "p25",
    inEvidenza: true,
  },
  {
    slug: "nail-art",
    nome: "Nail Art",
    categoria: "Colore",
    descrizioneBreve:
      "Piccole opere d'arte sulla punta delle dita, disegnate a mano.",
    descrizione:
      "Dal micro-dettaglio dorato su un dito solo al set interamente decorato: la nail art si progetta insieme, partendo da ciò che ti piace e da quanto vuoi farti notare. Tutto è realizzato a mano libera, senza stampini.",
    perChi:
      "Per un'occasione speciale, per un matrimonio, o semplicemente per chi vuole qualcosa che nessun'altra ha. Si abbina a qualunque altro trattamento.",
    durataMin: 45,
    durataLabel: "+45 min",
    prezzo: 10,
    prezzoSuRichiesta: true,
    // Non presente nel listino ufficiale: servizio disattivato.
    // Per riattivarlo: active: true (vedi SERVIZI-NASCOSTI.md)
    active: false,
    fasi: [
      {
        titolo: "Progetto",
        testo:
          "Guardiamo insieme riferimenti e colori, e decidiamo su quante dita intervenire.",
      },
      {
        titolo: "Base",
        testo: "Preparazione del fondo su cui il decoro verrà costruito.",
      },
      {
        titolo: "Decoro a mano libera",
        testo:
          "Linee, sfumature, foil, glitter o micro-pittura, a seconda del progetto.",
      },
      {
        titolo: "Protezione",
        testo:
          "Top coat in più strati, per proteggere il decoro senza appiattirlo.",
      },
    ],
    aftercare: [
      "Evita i solventi non specifici: opacizzano il decoro",
      "Se il decoro è in rilievo, presta attenzione ai tessuti a maglia larga",
      "Fotografala il primo giorno: è quando è più bella",
    ],
    faq: [
      {
        domanda: "Quanto costa la nail art?",
        risposta:
          "Dipende dalla complessità e da quante dita: il preventivo è su richiesta e viene definito insieme prima di iniziare.",
      },
      {
        domanda: "Posso portare una foto?",
        risposta:
          "Assolutamente sì, ed è anzi il modo migliore per partire. La reinterpretiamo sulla forma delle tue unghie.",
      },
    ],
    immagine: "/images/portfolio/placeholder-01.svg",
    inEvidenza: true,
  },
  {
    slug: "pedicure-estetica",
    nome: "Pedicure Estetica",
    categoria: "Piedi",
    descrizioneBreve:
      "Un rituale di benessere che restituisce leggerezza ai piedi.",
    descrizione:
      "Pediluvio aromatico, esfoliazione, cura delle cuticole e massaggio: la pedicure estetica è il trattamento del piacere, pensato per far tornare i piedi belli da guardare e leggeri da portare.",
    perChi:
      "Per chi vuole piedi curati e rilassati, in preparazione all'estate o semplicemente come momento di benessere.",
    durataMin: 60,
    durataLabel: "60 min",
    prezzo: 42,
    prezzoSuRichiesta: true,
    // Non presente nel listino ufficiale: servizio disattivato.
    // Per riattivarlo: active: true (vedi SERVIZI-NASCOSTI.md)
    active: false,
    fasi: [
      {
        titolo: "Pediluvio",
        testo:
          "Ammollo aromatico tiepido per ammorbidire pelle e cuticole.",
      },
      {
        titolo: "Esfoliazione",
        testo: "Scrub e rimozione delle callosità superficiali.",
      },
      {
        titolo: "Forma e cuticole",
        testo: "Taglio, forma e cura delle cuticole con strumenti sterili.",
      },
      {
        titolo: "Massaggio e finitura",
        testo:
          "Massaggio rilassante con crema nutriente, smalto o semipermanente a scelta.",
      },
    ],
    aftercare: [
      "Applica la crema per i piedi ogni sera, insistendo sul tallone",
      "Alterna le scarpe: la pelle si ispessisce dove la pressione è sempre la stessa",
      "Usa il pediluvio tiepido una volta a settimana",
    ],
    faq: [
      {
        domanda: "Include lo smalto?",
        risposta:
          "Lo smalto in tinta unita è incluso. Il semipermanente sui piedi è un'aggiunta che puoi selezionare in fase di prenotazione.",
      },
      {
        domanda: "Ogni quanto conviene farla?",
        risposta: "Ogni 4–6 settimane mantiene il risultato costante.",
      },
    ],
    immagine: "/images/portfolio/placeholder-10.svg",
  },
  {
    slug: "pedicure-curativa",
    nome: "Pedicure Curativa",
    categoria: "Piedi",
    descrizioneBreve:
      "Trattamento tecnico per callosità, ipercheratosi e unghie problematiche.",
    descrizione:
      "La pedicure curativa non è un trattamento estetico: si lavora con la fresa e prodotti cheratolitici su callosità, duroni e unghie ispessite, per riportare il piede a una condizione di comfort. Il risultato si vede al primo appuntamento e si consolida con qualche seduta.",
    perChi:
      "Per chi soffre di callosità, duroni, talloni screpolati o unghie ispessite. Per chi cammina o sta molto in piedi per lavoro.",
    durataMin: 75,
    durataLabel: "75 min",
    prezzo: 58,
    prezzoSuRichiesta: true,
    // Non presente nel listino ufficiale: servizio disattivato.
    // Per riattivarlo: active: true (vedi SERVIZI-NASCOSTI.md)
    active: false,
    fasi: [
      {
        titolo: "Valutazione",
        testo:
          "Osserviamo l'appoggio e individuiamo le zone di ipercheratosi.",
      },
      {
        titolo: "Ammorbidimento",
        testo: "Applicazione del prodotto cheratolitico sulle aree trattate.",
      },
      {
        titolo: "Lavoro tecnico",
        testo:
          "Rimozione progressiva con fresa delle callosità e assottigliamento delle unghie ispessite.",
      },
      {
        titolo: "Trattamento finale",
        testo: "Crema specifica e consigli per il mantenimento a casa.",
      },
    ],
    aftercare: [
      "Usa la crema all'urea indicata ogni giorno per le prime due settimane",
      "Evita di tagliare i calli da sola con lame o raspe aggressive",
      "Se noti dolore o alterazioni della pelle, rivolgiti al medico",
    ],
    faq: [
      {
        domanda: "È un trattamento medico?",
        risposta:
          "No. È un trattamento estetico avanzato: non trattiamo patologie, e in presenza di diabete, micosi o lesioni ti indirizziamo al podologo.",
      },
      {
        domanda: "Fa male?",
        risposta:
          "No, al contrario: la rimozione della callosità dà sollievo immediato. Il lavoro con la fresa non tocca la pelle sana.",
      },
    ],
    immagine: "/images/portfolio/placeholder-05.svg",
  },
  {
    slug: "trattamento-rinforzante",
    nome: "Trattamento Rinforzante",
    categoria: "Mani",
    descrizioneBreve:
      "Un percorso per unghie fragili, sfaldate o indebolite.",
    descrizione:
      "Non un singolo appuntamento ma un percorso: valutiamo la causa della fragilità, applichiamo un rinforzante professionale e costruiamo insieme una routine casalinga. Nella maggior parte dei casi il miglioramento è visibile già dalla seconda seduta.",
    perChi:
      "Per unghie che si sfaldano a strati, si piegano o si spezzano, dopo una rimozione aggressiva o dopo periodi di stress e carenze.",
    durataMin: 40,
    durataLabel: "40 min",
    prezzo: 30,
    prezzoSuRichiesta: true,
    // Non presente nel listino ufficiale: servizio disattivato.
    // Per riattivarlo: active: true (vedi SERVIZI-NASCOSTI.md)
    active: false,
    fasi: [
      {
        titolo: "Analisi",
        testo:
          "Capiamo se la fragilità è da trauma, da prodotto o da abitudini quotidiane.",
      },
      {
        titolo: "Preparazione delicata",
        testo: "Forma corta e arrotondata, nessuna limatura della superficie.",
      },
      {
        titolo: "Rinforzante",
        testo:
          "Applicazione del trattamento professionale, con o senza velatura protettiva.",
      },
      {
        titolo: "Routine su misura",
        testo:
          "Ti diamo un piano preciso da seguire a casa fino al controllo successivo.",
      },
    ],
    aftercare: [
      "Segui la routine indicata senza saltare giorni: è il fattore decisivo",
      "Tieni le unghie corte per tutto il percorso",
      "Guanti per ogni contatto prolungato con acqua e detergenti",
    ],
    faq: [
      {
        domanda: "Quante sedute servono?",
        risposta:
          "In genere 3–4 sedute a distanza di due settimane. La fragilità cronica richiede un mantenimento più lungo.",
      },
      {
        domanda: "Posso mettere il colore durante il percorso?",
        risposta:
          "Sì, con prodotti compatibili. Evitiamo il semipermanente nelle prime due sedute per non stressare ulteriormente la lamina.",
      },
    ],
    immagine: "/images/portfolio/placeholder-12.svg",
  },
  {
    // TESTI DA CONFERMARE CON LA TITOLARE: descrizione, perChi e durata sono
    // una stesura neutra di servizio. Prezzo: su richiesta (nessun importo
    // nel listino ufficiale). Le foto arrivano dalla galleria lavori.
    slug: "treccine",
    nome: "Treccine",
    categoria: "Capelli",
    descrizioneBreve:
      "Treccine realizzate in istituto, su appuntamento.",
    descrizione:
      "Realizziamo treccine su appuntamento. Dimensione, numero e lunghezza si concordano insieme prima di iniziare, insieme al tempo necessario: il preventivo viene definito in consulenza, prima che il lavoro cominci.",
    perChi:
      "Per chi desidera delle treccine curate e vuole definire insieme stile e misura prima di iniziare.",
    durataMin: 90,
    durataLabel: "90 min",
    prezzo: 90,
    fasi: [
      // TODO: bozza da far confermare alla titolare
      {
        titolo: "Consulenza",
        testo:
          "Decidiamo insieme dimensione, numero e lunghezza delle treccine, e quanto tempo richiede il lavoro.",
      },
      {
        titolo: "Preparazione",
        testo:
          "Detersione e districatura, poi la divisione in sezioni ordinate su cui lavorare.",
      },
      {
        titolo: "Realizzazione",
        testo:
          "Le treccine vengono realizzate una a una, con tensione controllata per non sollecitare la radice.",
      },
      {
        titolo: "Finitura",
        testo:
          "Chiusura delle punte, rifinitura del contorno e consigli per i primi giorni.",
      },
    ],
    aftercare: [
      // TODO: bozza da far confermare alla titolare
      "Proteggi le treccine di notte con una cuffia o una federa in raso",
      "Idrata la cute con un olio leggero, senza appesantire",
      "Evita di tenerle oltre il tempo consigliato in consulenza",
    ],
    faq: [
      // TODO: bozza da far confermare alla titolare
      {
        domanda: "Quanto durano le treccine?",
        risposta:
          "Dipende dal tipo di lavoro e dalla crescita dei capelli. La durata consigliata viene indicata in consulenza, insieme al momento giusto per rifarle.",
      },
      {
        domanda: "Posso lavare i capelli con le treccine?",
        risposta:
          "Sì, con delicatezza e con prodotti adatti. In consulenza ti spieghiamo come farlo senza rovinare il lavoro.",
      },
      {
        domanda: "Il prezzo cambia in base alla lunghezza?",
        risposta:
          "Il prezzo di listino è CHF 90. Per lavorazioni particolari definiamo insieme un preventivo prima di iniziare.",
      },
    ],
    immagine: "/images/portfolio/placeholder-04.svg",
    // Same photos as before, now referenced by gallery id (category "Treccine")
    galleryPhotoId: "p03",
    galleryPhotoIds: ["p08", "p13", "p18"],
    inEvidenza: true,
  },
];

// --- Helper ------------------------------------------------------------

// Solo i trattamenti attivi: è questo l'elenco usato da tutto il sito
// (card, prenotazione, ricerca, sitemap, pagine di dettaglio).
export const treatments: Treatment[] = allTreatments.filter(
  (t) => t.active !== false
);

// Cover photo of a treatment: the referenced gallery photo when there is one,
// otherwise the gold placeholder kept in `immagine`.
export function treatmentImage(t: Treatment): string {
  return (t.galleryPhotoId && getPortfolioSrc(t.galleryPhotoId)) || t.immagine;
}

// Extra photos shown under the cover on the treatment page.
export function treatmentGalleryPhotos(t: Treatment): string[] {
  const fromGallery = (t.galleryPhotoIds ?? [])
    .map(getPortfolioSrc)
    .filter((src): src is string => Boolean(src));
  return fromGallery.length > 0 ? fromGallery : (t.fotoGalleria ?? []);
}

export function getTreatment(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

// true se lo slug esiste ma il servizio è disattivato: la vecchia URL
// viene reindirizzata a /trattamenti invece di dare 404.
export function isHiddenTreatment(slug: string): boolean {
  return allTreatments.some((t) => t.slug === slug && t.active === false);
}

export const featuredTreatments: Treatment[] = treatments.filter(
  (t) => t.inEvidenza
);

export function formatTreatmentPrice(
  t: Treatment,
  labels: { suRichiesta: string; da: string } = {
    suRichiesta: site.trattamenti.suRichiesta,
    da: site.trattamenti.da,
  }
): string {
  if (t.prezzoSuRichiesta) return labels.suRichiesta;
  return `${t.prezzoDa ? labels.da + " " : ""}${formatPrice(t.prezzo)}`;
}

// Categorie presenti, nell'ordine in cui compaiono
export const treatmentCategories: string[] = Array.from(
  new Set(treatments.map((t) => t.categoria))
);
