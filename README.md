# K Institute — nail institute & shop

Sito dell'istituto **K Institute** (ragione sociale: Kara Nails Studio):
vetrina dei trattamenti, prenotazione online, portfolio dei lavori e shop
di prodotti professionali per unghie.

- **Stack**: Next.js 14 (App Router) · TypeScript strict · Tailwind CSS ·
  Framer Motion. Nessun database: prenotazioni e richieste d'ordine sono
  salvate in file JSON dentro `data/`.
- **Porta di sviluppo**: `3018`

```bash
npm install
cp .env.example .env.local    # imposta ADMIN_PASSWORD
npm run dev                   # http://localhost:3018
```

---

## Dove si modificano i contenuti

Nessun testo è scritto dentro i componenti: si cambia tutto dai file in
`data/`.

| File | Cosa contiene |
| --- | --- |
| `data/salon.ts` | Nome, logo, indirizzo, telefono, email, social, orari, soglie di spedizione, dati legali, SEO |
| `data/site.ts` | Tutti i testi visibili del sito (home, shop, checkout, cookie, footer…) |
| `data/products.ts` | Catalogo dello shop (16 prodotti segnaposto) |
| `data/shop-categories.ts` | Le 10 categorie dello shop e l'ordine del mega-menu |
| `data/treatments.ts` | Gli 8 trattamenti, con fasi, durata, prezzo, aftercare e FAQ |
| `data/portfolio.ts` | Le foto della galleria "Lavori" |
| `data/testimonials.ts` | Le recensioni mostrate in home |
| `data/navigation.ts` | Voci del menu e del footer |
| `data/legal.ts` | Testi di privacy, cookie, termini di vendita, spedizioni e resi |

## Dove si caricano le foto

| Cartella | Uso |
| --- | --- |
| `public/brand/` | Logo. Appena `logo.jpg` è qui, cambia `logoSrc` in `data/salon.ts` |
| `public/images/portfolio/` | Foto dei lavori — poi aggiungi una riga in `data/portfolio.ts` |
| `public/images/products/` | Foto prodotti — poi indica il percorso in `immagini` in `data/products.ts` |
| `public/images/` | Immagini di scena (hero, istituto, ritratti) |

I segnaposto attuali sono SVG generati da noi:

```bash
node scripts/generate-brand.mjs         # logo, favicon, immagine Open Graph
node scripts/generate-placeholders.mjs  # portfolio, prodotti, scene
```

## Pagine

`/` · `/shop` · `/shop/[categoria]` · `/shop/product/[slug]` · `/carrello` ·
`/checkout` · `/checkout/grazie` · `/trattamenti` · `/trattamenti/[slug]` ·
`/prenota` · `/lavori` · `/chi-siamo` · `/contatti` · `/admin` ·
`/privacy` · `/cookie` · `/termini-di-vendita` · `/spedizioni-e-resi`

I vecchi indirizzi `/servizi`, `/galleria` e `/chi-sono` reindirizzano
permanentemente alle nuove pagine (`next.config.js`).

## Prenotazioni e ordini

- **Prenotazioni**: `/prenota` → `POST /api/bookings` → `data/bookings.json`.
  Gli orari proposti tengono conto della **durata del trattamento**
  (`durataMin`) e degli appuntamenti già presenti, così un trattamento da
  due ore blocca davvero due ore. Le doppie prenotazioni rispondono `409`.
- **Ordini**: il checkout invia una **richiesta d'ordine** a
  `POST /api/orders` → `data/orders.json`. I prezzi sono sempre
  ricalcolati dal catalogo lato server.
- **Pagamenti**: non ancora attivi. Tutto l'aggancio è isolato in
  `lib/payments.ts`: per passare a Stripe si modifica solo quel file.
- **Area riservata**: `/admin`, protetta da `ADMIN_PASSWORD`. Da lì si
  confermano, annullano ed eliminano prenotazioni e richieste d'ordine.

## Carrello

Stato client in `lib/cart/context.tsx`, persistito in `localStorage`
(`k-institute-cart`). Nessun dato lascia il browser finché non si invia
volontariamente una richiesta d'ordine.

## Identità visiva

Derivata dal logo (K dorata su diamante, fondo nero). I token stanno in
`tailwind.config.ts` e in `app/globals.css`: `ink`, `gold`, `diamond`,
`cream`. **Nessun colore va scritto a mano nei componenti.**

## Multilingua

Il sito è in italiano. Il vecchio motore multilingua resta in `lib/i18n/`
(6 lingue) ma **non è collegato**: la struttura del sito è cambiata molto.
Per riattivarlo servono nuove chiavi di traduzione per shop e checkout.
