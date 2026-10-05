"use client";

import { createContext, useContext, type ReactNode } from "react";
import { localeDir, type Locale } from "./config";
import type { Dictionary } from "./dictionary";

type Value = { locale: Locale; dict: Dictionary; dir: "ltr" | "rtl" };

const I18nCtx = createContext<Value | null>(null);

// Il dizionario viene calcolato una volta sola nel layout (server) e passato
// qui: i componenti client non caricano i file delle altre lingue.
export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <I18nCtx.Provider value={{ locale, dict, dir: localeDir(locale) }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n(): Value {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n richiede <I18nProvider> nel layout");
  return ctx;
}

export function useDict(): Dictionary {
  return useI18n().dict;
}
