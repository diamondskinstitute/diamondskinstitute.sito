import { it, type Dictionary } from "./it";
import { de } from "./de";
import { gsw } from "./gsw";
import { fr } from "./fr";
import { es } from "./es";
import { ar } from "./ar";
import { deepMerge, type LocaleDict } from "./deep";
import type { Locale } from "./config";

const RAW: Record<Locale, LocaleDict> = { it, de, gsw, fr, es, ar };

// Restituisce il dizionario completo per una lingua, con fallback
// automatico all'italiano per le eventuali chiavi mancanti.
export function getDictionary(locale: Locale): Dictionary {
  if (locale === "it") return it;
  return deepMerge(it, RAW[locale] ?? {});
}

// Formatta una data "YYYY-MM-DD" in modo leggibile nella lingua scelta.
// Es. it → "Martedì 8 settembre 2026"; ar/de/fr ecc. secondo il dizionario.
export function formatDateLong(dateStr: string, dict: Dictionary): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return dateStr;
  const [, y, mo, d] = m;
  const date = new Date(Number(y), Number(mo) - 1, Number(d));
  if (Number.isNaN(date.getTime())) return dateStr;
  const dayName = dict.days.full[date.getDay()];
  const monthName = dict.months[date.getMonth()].toLowerCase();
  return `${dayName} ${date.getDate()} ${monthName} ${date.getFullYear()}`;
}

// Prezzo localizzato: usa il prefisso "da/desde/ab…" della lingua.
export function formatPrice(
  prezzo: number,
  prezzoDa: boolean | undefined,
  dict: Dictionary
): string {
  return `${prezzoDa ? dict.common.da + " " : ""}€${prezzo}`;
}

export type { Dictionary };
