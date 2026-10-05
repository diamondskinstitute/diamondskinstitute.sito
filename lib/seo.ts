import { salon } from "@/data/salon";

// Nomi dei giorni come li vuole schema.org (0 = Domenica, come in JS)
const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Dati strutturati dell'attività: Google li usa per scheda locale, orari e
// mappa. Tutti i valori arrivano da data/salon.ts, nessun dato duplicato.
export function localBusinessJsonLd() {
  const orari = Object.entries(salon.orariMacchina)
    .filter(([, v]) => v !== null)
    .map(([giorno, v]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[Number(giorno)]}`,
      opens: v!.apertura,
      closes: v!.chiusura,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: salon.brandName,
    alternateName: salon.nomeUfficiale,
    legalName: salon.legalName,
    description: salon.seo.description,
    url: salon.seo.url,
    image: `${salon.seo.url}${salon.logoSrc}`,
    telephone: salon.telefono,
    email: salon.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: salon.indirizzo.via,
      addressLocality: salon.indirizzo.citta,
      postalCode: salon.indirizzo.cap,
      addressRegion: salon.indirizzo.provincia,
      addressCountry: salon.indirizzo.paeseCodice,
    },
    areaServed: salon.indirizzo.citta,
    hasMap: salon.mappaLink,
    currenciesAccepted: "CHF",
    priceRange: "CHF 25–100",
    openingHoursSpecification: orari,
    sameAs: [salon.instagram.url, salon.tiktok.url, salon.threads.url],
  };
}
