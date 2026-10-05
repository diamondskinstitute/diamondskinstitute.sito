import type { Locale } from "./config";

// Per l'arabo forziamo le cifre occidentali (0-9): i numeri e i prezzi del
// sito restano uguali in tutte le lingue, cambia solo il testo.
export function intlLocale(locale: Locale): string {
  return locale === "ar" ? "ar-u-nu-latn" : locale;
}

function parseISO(dateStr: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

// "Martedì 9 settembre 2026" / "Tuesday, 9 September 2026" / …
export function formatDateLong(dateStr: string, locale: Locale): string {
  const date = parseISO(dateStr);
  if (!date) return dateStr;
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// "settembre 2026" nell'intestazione del calendario
export function formatMonthYear(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    month: "long",
    year: "numeric",
  }).format(date);
}

// Abbreviazioni dei giorni, con il lunedì per primo (griglia calendario)
export function weekdayAbbr(locale: Locale): string[] {
  const fmt = new Intl.DateTimeFormat(intlLocale(locale), { weekday: "short" });
  // 2024-01-01 è un lunedì
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(2024, 0, 1 + i))
  );
}
