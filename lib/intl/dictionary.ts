import { salon } from "@/data/salon";
import it from "@/messages/it.json";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import es from "@/messages/es.json";
import pt from "@/messages/pt.json";
import ar from "@/messages/ar.json";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { fill } from "./fill";

// Riesportata per compatibilità: la funzione vive in ./fill (nessun import,
// così i componenti client non caricano i dizionari di tutte le lingue).
export { fill };

// L'italiano è la lingua di riferimento: definisce la forma del dizionario
// e fa da riserva per ogni chiave mancante nelle altre lingue.
export type Dictionary = typeof it;

const RAW: Record<Locale, unknown> = { it, fr, en, de, es, pt, ar };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// Unisce la lingua scelta sopra l'italiano: le chiavi mancanti restano
// in italiano invece di sparire.
function merge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (!isObject(base) || !isObject(override)) return override as T;
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(override)) {
    out[k] = k in base ? merge((base as Record<string, unknown>)[k], v) : v;
  }
  return out as T;
}

// Valori dinamici usabili dentro i testi come {segnaposto}.
// `tempiConsegna` arriva dal dizionario della lingua scelta, così non resta
// in italiano dentro le frasi tradotte.
function variables(tempiConsegna: string): Record<string, string> {
  return {
    anno: String(new Date().getFullYear()),
    brand: salon.brandName,
    legalName: salon.legalName,
    piva: salon.legale.partitaIva,
    citta: salon.indirizzo.citta,
    indirizzo: salon.indirizzo.completo,
    sede: salon.legale.sede,
    email: salon.email,
    emailOrdini: salon.emailOrdini,
    resiEntroGiorni: String(salon.shop.resiEntroGiorni),
    spedizioneGratuitaDa: String(salon.shop.spedizioneGratuitaDa),
    tempiConsegna,
    instagramHandle: salon.instagram.handle,
    instagramUrl: salon.instagram.url,
  };
}

function interpolate<T>(value: T, vars: Record<string, string>): T {
  if (typeof value === "string") {
    return value.replace(/\{(\w+)\}/g, (m, k) =>
      k in vars ? vars[k] : m
    ) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => interpolate(v, vars)) as unknown as T;
  }
  if (isObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = interpolate(v, vars);
    return out as unknown as T;
  }
  return value;
}

const cache = new Map<string, Dictionary>();

// Dizionario completo di una lingua, con fallback all'italiano e
// segnaposto già sostituiti. La cache si azzera a ogni cambio d'anno.
export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  const merged = locale === "it" ? it : merge(it, RAW[locale]);
  const vars = variables(
    merged.common.tempiConsegna || salon.shop.tempiConsegna
  );
  const key = `${locale}:${vars.anno}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const final = interpolate(merged as Dictionary, vars);
  cache.set(key, final);
  return final;
}

// Sostituisce i segnaposto di una singola stringa già tradotta,
// es. t("booking.tiAspettiamo", { trattamento, data, ora })

