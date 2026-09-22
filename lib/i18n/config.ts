// Lingue disponibili nel selettore (in alto a destra).
// dir "rtl" attiva il layout da destra a sinistra (arabo).
export type Locale = "it" | "es" | "gsw" | "de" | "fr" | "ar";

export type LocaleMeta = {
  code: Locale;
  label: string; // nome nella propria lingua
  short: string; // sigla mostrata nel pulsante
  flag: string; // emoji bandiera
  dir: "ltr" | "rtl";
};

export const LOCALES: LocaleMeta[] = [
  { code: "it", label: "Italiano", short: "IT", flag: "🇮🇹", dir: "ltr" },
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪", dir: "ltr" },
  { code: "gsw", label: "Schwiizerdütsch", short: "CH", flag: "🇨🇭", dir: "ltr" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷", dir: "ltr" },
  { code: "es", label: "Español", short: "ES", flag: "🇪🇸", dir: "ltr" },
  { code: "ar", label: "العربية", short: "ع", flag: "🇸🇦", dir: "rtl" },
];

export const DEFAULT_LOCALE: Locale = "it";

export function getLocaleMeta(code: Locale): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}
