import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  localeDir,
  type Locale,
} from "./config";
import { getDictionary, type Dictionary } from "./dictionary";

// Lingua corrente, letta dal cookie. Server components only.
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

// Dizionario della lingua corrente. Server components only.
export function getDict(): Dictionary {
  return getDictionary(getLocale());
}

export function getDir(): "ltr" | "rtl" {
  return localeDir(getLocale());
}
