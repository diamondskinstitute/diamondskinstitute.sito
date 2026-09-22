"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
} from "@/data/portfolio";
import { site } from "@/data/site";
import { ArrowRight, CloseIcon } from "../ui/Icons";

type Filtro = PortfolioCategory | "tutte";

// Galleria masonry con filtri per categoria e lightbox navigabile
// da tastiera (Esc chiude, frecce scorrono).
export default function PortfolioGallery() {
  const [filtro, setFiltro] = useState<Filtro>("tutte");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibili = useMemo(
    () =>
      filtro === "tutte"
        ? portfolioItems
        : portfolioItems.filter((i) => i.categoria === filtro),
    [filtro]
  );

  const chiudi = useCallback(() => setOpenIndex(null), []);
  const vaiA = useCallback(
    (delta: number) =>
      setOpenIndex((current) => {
        if (current === null) return null;
        const next = (current + delta + visibili.length) % visibili.length;
        return next;
      }),
    [visibili.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") chiudi();
      if (e.key === "ArrowRight") vaiA(1);
      if (e.key === "ArrowLeft") vaiA(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, chiudi, vaiA]);

  const corrente = openIndex !== null ? visibili[openIndex] : null;

  return (
    <>
      {/* Filtri */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(["tutte", ...portfolioCategories] as Filtro[]).map((c) => {
          const attivo = filtro === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                setFiltro(c);
                setOpenIndex(null);
              }}
              aria-pressed={attivo}
              className={`rounded-luxe border px-5 py-2.5 text-[0.7rem] uppercase tracking-wide2 transition-all duration-300 ${
                attivo
                  ? "border-gold bg-gold/10 text-gold-light"
                  : "border-ink-line text-cream/60 hover:border-gold/40 hover:text-gold-light"
              }`}
            >
              {c === "tutte" ? site.lavori.tutte : c}
            </button>
          );
        })}
      </div>

      {/* Griglia masonry (colonne CSS: semplice e senza librerie) */}
      <div className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
        {visibili.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
            onClick={() => setOpenIndex(i)}
            className="group relative block w-full overflow-hidden rounded-card border border-ink-line"
            aria-label={`Ingrandisci: ${item.alt}`}
          >
            <span
              className={`relative block w-full ${
                item.formato === "tall" ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 400px, 45vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
            </span>
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/45" />
            <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-[0.65rem] uppercase tracking-luxe text-gold-light opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {item.categoria}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {corrente && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/97 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={corrente.alt}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-xs uppercase tracking-luxe text-gold">
                {corrente.categoria}
              </span>
              <button
                type="button"
                onClick={chiudi}
                className="btn-ghost"
                aria-label={site.lavori.chiudi}
              >
                <CloseIcon /> {site.lavori.chiudi}
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
              <button
                type="button"
                onClick={() => vaiA(-1)}
                className="absolute left-2 z-10 rounded-luxe border border-ink-line bg-ink-soft/80 p-3 text-cream/70 transition-all hover:border-gold/45 hover:text-gold-light sm:left-6"
                aria-label={site.lavori.precedente}
              >
                <ArrowRight className="rotate-180" />
              </button>

              <motion.div
                key={corrente.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full max-h-[75vh] w-full max-w-3xl"
              >
                <Image
                  src={corrente.src}
                  alt={corrente.alt}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="rounded-card object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={() => vaiA(1)}
                className="absolute right-2 z-10 rounded-luxe border border-ink-line bg-ink-soft/80 p-3 text-cream/70 transition-all hover:border-gold/45 hover:text-gold-light sm:right-6"
                aria-label={site.lavori.successiva}
              >
                <ArrowRight />
              </button>
            </div>

            <p className="px-6 pb-8 text-center text-sm text-cream/60">
              {corrente.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
