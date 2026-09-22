"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, getLocaleMeta, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./index";

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dir: "ltr" | "rtl";
  d: Dictionary;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "kara-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Ripristina la lingua salvata al primo caricamento
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved) setLocaleState(saved);
    } catch {
      /* ignora */
    }
  }, []);

  // Aggiorna lang e dir del documento a ogni cambio lingua
  useEffect(() => {
    const meta = getLocaleMeta(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignora */
    }
  };

  const value = useMemo<I18nValue>(() => {
    const meta = getLocaleMeta(locale);
    return {
      locale,
      setLocale,
      dir: meta.dir,
      d: getDictionary(locale),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n deve essere usato dentro <LanguageProvider>");
  }
  return ctx;
}
