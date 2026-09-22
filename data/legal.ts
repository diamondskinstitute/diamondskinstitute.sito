// =====================================================================
//  PAGINE LEGALI — TESTI SEGNAPOSTO
//
//  ⚠️  Questi testi NON sono documenti legali validi: sono tracce da far
//  rivedere a un consulente prima della pubblicazione. Sostituisci il
//  contenuto delle sezioni mantenendo la struttura.
// =====================================================================

import { salon } from "./salon";

export type LegalSection = { titolo: string; paragrafi: string[] };

export type LegalPage = {
  slug: string;
  titolo: string;
  sottotitolo: string;
  aggiornamento: string;
  sezioni: LegalSection[];
};

export const legalPages: Record<string, LegalPage> = {
  privacy: {
    slug: "privacy",
    titolo: "Privacy policy",
    sottotitolo: "Come trattiamo i dati personali di chi usa questo sito.",
    aggiornamento: "Ultimo aggiornamento: segnaposto",
    sezioni: [
      {
        titolo: "Titolare del trattamento",
        paragrafi: [
          `Il titolare del trattamento è ${salon.legalName} (${salon.brandName}), con sede in ${salon.legale.sede}. Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a ${salon.email}.`,
        ],
      },
      {
        titolo: "Quali dati raccogliamo",
        paragrafi: [
          "Raccogliamo soltanto i dati che ci fornisci volontariamente: nome, telefono, email e note quando prenoti un appuntamento o compili il modulo contatti; in più l'indirizzo di spedizione quando invii una richiesta d'ordine.",
          "Non usiamo strumenti di profilazione, non tracciamo la navigazione e non acquistiamo liste di contatti.",
        ],
      },
      {
        titolo: "Perché li trattiamo",
        paragrafi: [
          "Per gestire la prenotazione o la richiesta d'ordine, per ricontattarti in caso di necessità e per adempiere agli obblighi fiscali e amministrativi previsti dalla legge.",
        ],
      },
      {
        titolo: "Per quanto tempo li conserviamo",
        paragrafi: [
          "Per il tempo necessario a gestire il servizio richiesto e, nei casi previsti, per i termini di legge. Puoi chiederne la cancellazione in qualsiasi momento.",
        ],
      },
      {
        titolo: "I tuoi diritti",
        paragrafi: [
          `Puoi chiedere accesso, rettifica, cancellazione, limitazione o portabilità dei tuoi dati, e opporti al trattamento, scrivendo a ${salon.email}. Hai inoltre diritto di proporre reclamo all'autorità di controllo competente.`,
        ],
      },
    ],
  },

  cookie: {
    slug: "cookie",
    titolo: "Cookie policy",
    sottotitolo: "Quali cookie usa questo sito e a cosa servono.",
    aggiornamento: "Ultimo aggiornamento: segnaposto",
    sezioni: [
      {
        titolo: "Solo cookie tecnici",
        paragrafi: [
          "Questo sito usa esclusivamente cookie e archiviazione locale di tipo tecnico, necessari al funzionamento: il contenuto del carrello e la presa visione del banner cookie.",
          "Non sono presenti cookie di profilazione, né strumenti di tracciamento pubblicitario o di analisi di terze parti.",
        ],
      },
      {
        titolo: "Archiviazione locale",
        paragrafi: [
          "Il carrello è salvato nel browser (localStorage) con la chiave `k-institute-cart` e resta sul tuo dispositivo: non viene inviato a nessun server finché non completi volontariamente una richiesta d'ordine.",
        ],
      },
      {
        titolo: "Servizi di terze parti",
        paragrafi: [
          "La mappa della pagina contatti è un contenuto incorporato di Google Maps: caricandola, Google può impostare propri cookie secondo la propria informativa.",
        ],
      },
      {
        titolo: "Come disattivarli",
        paragrafi: [
          "Puoi cancellare i dati salvati dal sito in qualsiasi momento dalle impostazioni del tuo browser. Disattivando l'archiviazione locale il carrello non verrà più mantenuto fra una visita e l'altra.",
        ],
      },
    ],
  },

  "termini-di-vendita": {
    slug: "termini-di-vendita",
    titolo: "Termini di vendita",
    sottotitolo: "Condizioni applicate agli ordini effettuati su questo sito.",
    aggiornamento: "Ultimo aggiornamento: segnaposto",
    sezioni: [
      {
        titolo: "Richiesta d'ordine",
        paragrafi: [
          "Al momento l'invio del modulo di checkout costituisce una richiesta d'ordine e non un acquisto concluso. Riceverai una conferma con la disponibilità dei prodotti e le modalità di pagamento entro 24 ore lavorative.",
        ],
      },
      {
        titolo: "Prezzi",
        paragrafi: [
          "Tutti i prezzi sono espressi in euro e si intendono IVA inclusa. Le spese di spedizione sono indicate nel riepilogo prima dell'invio della richiesta.",
        ],
      },
      {
        titolo: "Pagamenti",
        paragrafi: [
          "Il pagamento online non è ancora attivo. Le modalità di pagamento accettate vengono comunicate nell'email di conferma.",
        ],
      },
      {
        titolo: "Disponibilità",
        paragrafi: [
          "I prodotti sono soggetti a disponibilità. In caso di indisponibilità ti proponiamo un'alternativa o annulliamo la richiesta senza alcun addebito.",
        ],
      },
    ],
  },

  "spedizioni-e-resi": {
    slug: "spedizioni-e-resi",
    titolo: "Spedizioni e resi",
    sottotitolo: "Tempi, costi e come restituire un prodotto.",
    aggiornamento: "Ultimo aggiornamento: segnaposto",
    sezioni: [
      {
        titolo: "Tempi di consegna",
        paragrafi: [
          `Gli ordini confermati entro le 14:00 dei giorni di apertura vengono preparati in giornata. La consegna avviene di norma in ${salon.shop.tempiConsegna}.`,
        ],
      },
      {
        titolo: "Costi di spedizione",
        paragrafi: [
          `La spedizione costa € ${salon.shop.costoSpedizione
            .toFixed(2)
            .replace(".", ",")} ed è gratuita per ordini pari o superiori a € ${
            salon.shop.spedizioneGratuitaDa
          }.`,
        ],
      },
      {
        titolo: "Diritto di recesso",
        paragrafi: [
          `Puoi restituire i prodotti integri e non aperti entro ${salon.shop.resiEntroGiorni} giorni dalla consegna. Le spese di restituzione sono a carico dell'acquirente salvo prodotto difettoso o errato.`,
        ],
      },
      {
        titolo: "Prodotti non restituibili",
        paragrafi: [
          "Per ragioni igieniche non sono restituibili i prodotti sigillati una volta aperti (gel, smalti, liquidi) e gli strumenti già utilizzati.",
        ],
      },
      {
        titolo: "Come richiedere un reso",
        paragrafi: [
          `Scrivi a ${salon.emailOrdini} indicando il numero della richiesta d'ordine e il motivo del reso: ti risponderemo con le istruzioni.`,
        ],
      },
    ],
  },
};

export const legalSlugs = Object.keys(legalPages);
