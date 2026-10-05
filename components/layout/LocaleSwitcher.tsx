"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_MAX_AGE,
  LOCALE_STORAGE,
  localeMeta,
  type Locale,
} from "@/lib/intl/config";
import { useI18n } from "@/lib/intl/client";
import { ChevronDown } from "../ui/Icons";

// Selettore lingua compatto: sigla + tendina, nello stile del menu Shop.
// `variant="inline"` mostra invece l'elenco completo (menu mobile).
export default function LocaleSwitcher({
  variant = "dropdown",
  className = "",
}: {
  variant?: "dropdown" | "inline";
  className?: string;
}) {
  const router = useRouter();
  const { locale, dict } = useI18n();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const scegli = (l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=${LOCALE_MAX_AGE}; samesite=lax`;
    try {
      window.localStorage.setItem(LOCALE_STORAGE, l);
    } catch {
      /* archiviazione non disponibile: resta il cookie */
    }
    setOpen(false);
    router.refresh();
  };

  // Chiusura su click fuori e su Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className={className}>
        <p className="eyebrow">{dict.nav.lingua}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                onClick={() => scegli(l.code)}
                aria-current={l.code === locale}
                className={`rounded-pill border px-3.5 py-2 text-xs uppercase tracking-wide2 transition-colors duration-300 ${
                  l.code === locale
                    ? "border-gold bg-gold/15 text-gold-light"
                    : "border-ink-line text-cream/65 hover:border-gold/45 hover:text-gold-light"
                }`}
              >
                {l.short}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${dict.nav.cambiaLingua} — ${localeMeta(locale).label}`}
        className="flex items-center gap-1 rounded-pill px-2 py-2 text-xs uppercase tracking-wide2 text-cream/75 transition-colors duration-300 hover:text-gold-light"
      >
        {localeMeta(locale).short}
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={dict.nav.lingua}
          className="glass absolute end-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-card py-1"
        >
          {LOCALES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === locale}>
              <button
                type="button"
                lang={l.code}
                onClick={() => scegli(l.code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-start text-sm transition-colors duration-200 ${
                  l.code === locale
                    ? "text-gold-light"
                    : "text-cream/70 hover:bg-white/5 hover:text-gold-light"
                }`}
              >
                <span className="w-7 shrink-0 text-[0.68rem] uppercase tracking-wide2 text-gold/70">
                  {l.short}
                </span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
