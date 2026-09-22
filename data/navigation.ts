// =====================================================================
//  NAVIGAZIONE DEL SITO
//  Voci del menu principale, mega-menu dello shop e colonne del footer.
//  Le categorie dello shop arrivano da data/shop-categories.ts.
// =====================================================================

import { shopCategories } from "./shop-categories";

export type NavLink = {
  href: string;
  label: string;
  // true = la voce apre il mega-menu delle categorie shop
  megaMenu?: boolean;
};

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop", megaMenu: true },
  { href: "/trattamenti", label: "Trattamenti" },
  { href: "/lavori", label: "Lavori" },
  { href: "/prenota", label: "Prenota" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

// Colonne del footer (le categorie shop vengono aggiunte a parte)
export const footerNav: { titolo: string; links: NavLink[] }[] = [
  {
    titolo: "L'istituto",
    links: [
      { href: "/trattamenti", label: "I trattamenti" },
      { href: "/prenota", label: "Prenota un appuntamento" },
      { href: "/lavori", label: "I nostri lavori" },
      { href: "/chi-siamo", label: "Chi siamo" },
      { href: "/contatti", label: "Dove trovarci" },
    ],
  },
  {
    titolo: "Lo shop",
    links: [
      { href: "/shop", label: "Tutti i prodotti" },
      ...shopCategories
        .slice(0, 5)
        .map((c) => ({ href: `/shop/${c.slug}`, label: c.nome })),
    ],
  },
];

export const legalNav: NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookie", label: "Cookie" },
  { href: "/termini-di-vendita", label: "Termini di vendita" },
  { href: "/spedizioni-e-resi", label: "Spedizioni e resi" },
];
