# Servizi e prodotti nascosti dal sito

Nulla è stato cancellato: ogni voce qui sotto è ancora nel codice, solo
disattivata con un flag. Per rimetterla online basta cambiare quel flag in
`true` (o cancellare la riga): card, pagina di dettaglio, prenotazione,
ricerca, menu e sitemap tornano a mostrarla da sole.

Data della modifica: 4 ottobre 2026.

---

## 1. Servizi disattivati — `data/treatments.ts`

Motivo: **non presenti nel listino ufficiale** fornito dalla titolare.
In attesa di conferma su prezzo ed effettiva esistenza del servizio.

Flag da cambiare: `active: false` → `active: true`

| Servizio | Slug | Riga del flag | Riga della voce | Vecchio prezzo |
|---|---|---|---|---|
| Manicure Classica | `manicure-classica` | 78 | 63 | € 30 |
| Nail Art | `nail-art` | 317 | 302 | da € 10 |
| Pedicure Estetica | `pedicure-estetica` | 375 | 360 | € 42 |
| Pedicure Curativa | `pedicure-curativa` | 430 | 415 | € 58 |
| Trattamento Rinforzante | `trattamento-rinforzante` | 486 | 471 | € 30 |

I numeri di riga valgono per il file di oggi: se il file viene modificato,
cerca `active: false`.

Il vecchio prezzo in € è rimasto nel campo `prezzo` di ogni voce, insieme a
`prezzoSuRichiesta: true`. Quando la titolare conferma i prezzi definitivi in
CHF: aggiorna `prezzo`, togli `prezzoSuRichiesta` e metti `active: true`.

### Cosa succede ora a queste voci

- non compaiono più in `/trattamenti`, in home, nella prenotazione, nella
  ricerca interna e nella sitemap;
- le vecchie URL (es. `/trattamenti/nail-art`) **non danno 404**: fanno
  redirect a `/trattamenti`;
- le loro pagine non sono indicizzabili (`robots: noindex`).

---

## 2. Gift card rimosse — `data/products.ts` e `data/shop-categories.ts`

Motivo: rimozione richiesta dalla titolare.

| Voce | File | Riga del flag | Flag |
|---|---|---|---|
| Prodotto “Gift Card K Institute” | `data/products.ts` | 435 | `attivo: false` |
| Categoria shop “Gift Card” | `data/shop-categories.ts` | 95 | `attivo: false` |

Spariscono da: griglia `/shop`, pagina di categoria, mega-menu dello Shop,
menu mobile, colonne del footer, ricerca interna, prodotti correlati,
prodotti in evidenza e sitemap. Gli importi delle varianti (50 / 80 / 120 /
200) sono stati riscritti in CHF senza convertire le cifre.

L'immagine `public/images/products/gift-card-k-institute.svg` è rimasta al suo
posto, inutilizzata.

---

## 3. Spedizioni — prezzi tolti dal sito

Non è un servizio nascosto, ma è parte della stessa modifica.

- barra superiore: tolta la soglia di spedizione gratuita;
- riepilogo carrello, drawer e checkout: la riga “Spedizione” mostra
  **“Coming soon”** al posto dell'importo;
- scheda prodotto: “Spedizione: Coming soon”;
- pagina legale *Spedizioni e resi* → sezione “Costi di spedizione”:
  testo “Coming soon”;
- `lib/format.ts` → `shippingCost()` restituisce `0` finché lo shop non è
  attivo, quindi **Totale = Subtotale**.

I valori `spedizioneGratuitaDa: 99` e `costoSpedizione: 7.9` sono rimasti in
`data/salon.ts`: non vengono più mostrati da nessuna parte. Quando lo shop
apre, ripristina il calcolo dentro `shippingCost()`.
