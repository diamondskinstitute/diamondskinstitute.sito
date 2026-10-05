// =====================================================================
//  LINGUE DEL SITO
//  I testi stanno in /messages/<codice>.json — un file per lingua.
//  Per aggiungere una lingua: crea il file, importalo in dictionary.ts
//  e aggiungi una voce qui sotto.
// =====================================================================

export type Locale = "it" | "fr" | "en" | "de" | "es" | "pt" | "ar";

export type LocaleMeta = {
  code: Locale;
  // Sigla mostrata nel selettore
  short: string;
  // Nome della lingua nella lingua stessa
  label: string;
  dir: "ltr" | "rtl";
  // Codice usato nei metadata Open Graph
  ogLocale: string;
};

export const LOCALES: LocaleMeta[] = [
  { code: "it", short: "IT", label: "Italiano", dir: "ltr", ogLocale: "it_IT" },
  { code: "fr", short: "FR", label: "Français", dir: "ltr", ogLocale: "fr_CH" },
  { code: "en", short: "EN", label: "English", dir: "ltr", ogLocale: "en_GB" },
  { code: "de", short: "DE", label: "Deutsch", dir: "ltr", ogLocale: "de_CH" },
  { code: "es", short: "ES", label: "Español", dir: "ltr", ogLocale: "es_ES" },
  { code: "pt", short: "PT", label: "Português", dir: "ltr", ogLocale: "pt_PT" },
  { code: "ar", short: "AR", label: "العربية", dir: "rtl", ogLocale: "ar_AR" },
];

// Lingua mostrata a chi arriva sul sito senza aver ancora scelto.
// L'italiano resta la lingua di riferimento del dizionario (vedi
// dictionary.ts): fa da riserva per le chiavi che mancano altrove.
export const DEFAULT_LOCALE: Locale = "fr";

// Nome del cookie che ricorda la lingua scelta (un anno).
export const LOCALE_COOKIE = "kara-locale";
export const LOCALE_STORAGE = "kara-locale";
export const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && LOCALES.some((l) => l.code === value);
}

export function localeMeta(code: Locale): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function localeDir(code: Locale): "ltr" | "rtl" {
  return localeMeta(code).dir;
}
