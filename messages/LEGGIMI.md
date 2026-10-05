# Testi del sito — un file per lingua

In questa cartella c'è un file per ogni lingua:

| File | Lingua | Direzione |
|---|---|---|
| `it.json` | Italiano (predefinita) | da sinistra a destra |
| `fr.json` | Français | da sinistra a destra |
| `en.json` | English | da sinistra a destra |
| `de.json` | Deutsch | da sinistra a destra |
| `es.json` | Español | da sinistra a destra |
| `pt.json` | Português | da sinistra a destra |
| `ar.json` | العربية | **da destra a sinistra** |

## Come correggere un testo

1. Apri il file della lingua.
2. Cerca la frase e cambia **solo il testo fra virgolette**, a destra dei due punti.
3. Salva. Non serve toccare il codice.

```json
"prenotaQuesto": "Prenota questo trattamento"
                  ^^^^^^^^^^^^^^^^^^^^^^^^^ solo questa parte
```

## Regole

- **Non cambiare le chiavi** (la parte a sinistra dei due punti): sono gli
  agganci usati dal sito.
- **Non togliere i segnaposto fra graffe** — `{anno}`, `{brand}`,
  `{tempiConsegna}`, `{trattamento}`, `{data}`, `{ora}`, `{instagramHandle}`,
  `{piva}`, `{legalName}` — vengono sostituiti automaticamente. Possono essere
  spostati nella frase, ma devono restare.
- **Virgolette e virgole**: ogni riga finisce con una virgola, tranne l'ultima
  del blocco. Se il sito smette di funzionare dopo una modifica, è quasi sempre
  una virgola o una virgoletta mancante.
- Per scrivere una virgoletta dentro un testo usa `\"`.
- **Prezzi e numeri non si traducono**: restano in CHF e in cifre occidentali
  (0-9) in tutte le lingue, arabo compreso.
- Se una chiave manca in una lingua, il sito mostra l'italiano al suo posto:
  si può tradurre un po' alla volta senza rompere nulla.

## Cosa contiene ogni file

Tutto il testo visibile del sito, in 517 voci:

- menu, intestazione, barra in alto, piè di pagina, pulsanti;
- home (titoli, sezioni, punti di forza);
- trattamenti: nome, descrizione breve, descrizione estesa, «a chi è
  consigliato», fasi, mantenimento a casa e domande frequenti;
- listino prezzi (titoli dei gruppi e nomi delle voci);
- prodotti: nome, descrizione breve, descrizione estesa e caratteristiche;
- categorie dello shop, filtri della galleria e didascalie delle 30 foto;
- modulo di prenotazione, modulo contatti, carrello e checkout;
- pagine legali (titoli, sottotitoli e paragrafi);
- «Chi siamo», messaggi di errore e pagine vuote, titoli e descrizioni per i
  motori di ricerca.

**Non tradotto di proposito:** l'area riservata (`/admin`), che usa solo la
titolare.

## Lingua predefinita e memoria

Il sito parte in italiano. Quando si sceglie una lingua dal selettore in alto,
la scelta viene salvata in un cookie (`kara-locale`, un anno) e ricordata su
tutte le pagine e ai caricamenti successivi.
