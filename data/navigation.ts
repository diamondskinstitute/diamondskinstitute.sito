// =====================================================================
//  NAVIGAZIONE DEL SITO
//  Qui stanno solo gli indirizzi e la CHIAVE dell'etichetta: i testi
//  tradotti sono in /messages/<lingua>.json → "nav".
// =====================================================================

import { shopCategories } from "./shop-categories";

export type NavLink = {
  href: string;
  // chiave dentro dict.nav (o dict.nav.footerLinks / dict.nav.legale)
  key: string;
  // true = la voce apre il mega-menu delle categorie shop
  megaMenu?: boolean;
};

export const mainNav: NavLink[] = [
  { href: "/", key: "home" },
  { href: "/shop", key: "shop", megaMenu: true },
  { href: "/trattamenti", key: "trattamenti" },
  { href: "/lavori", key: "lavori" },
  { href: "/prenota", key: "prenota" },
  { href: "/chi-siamo", key: "chiSiamo" },
  { href: "/contatti", key: "contatti" },
];

// Colonne del footer. `categorie: true` = la colonna aggiunge in coda le
// prime categorie dello shop (tradotte a parte).
export const footerNav: {
  titoloKey: "colonnaIstituto" | "colonnaShop";
  links: NavLink[];
  categorie?: boolean;
}[] = [
  {
    titoloKey: "colonnaIstituto",
    links: [
      { href: "/trattamenti", key: "iTrattamenti" },
      { href: "/prenota", key: "prenotaAppuntamento" },
      { href: "/lavori", key: "iNostriLavori" },
      { href: "/chi-siamo", key: "chiSiamo" },
      { href: "/contatti", key: "doveTrovarci" },
    ],
  },
  {
    titoloKey: "colonnaShop",
    links: [{ href: "/shop", key: "tuttiIProdotti" }],
    categorie: true,
  },
];

// Categorie mostrate nella colonna shop del footer
export const footerShopCategories = shopCategories.slice(0, 5);

export const legalNav: NavLink[] = [
  { href: "/privacy", key: "privacy" },
  { href: "/cookie", key: "cookie" },
  { href: "/termini-di-vendita", key: "termini" },
  { href: "/spedizioni-e-resi", key: "spedizioni" },
];
