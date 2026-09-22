"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import { treatments } from "@/data/treatments";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { CloseIcon, SearchIcon } from "../ui/Icons";

// Ricerca client-side su prodotti e trattamenti: il catalogo è locale,
// quindi non serve nessuna chiamata di rete.
export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      // Il focus va sul campo appena il pannello è montato
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (q.length < 2) return { prodotti: [], trattamenti: [] };
    const match = (text: string) => text.toLowerCase().includes(q);
    return {
      prodotti: products
        .filter((p) => match(p.nome) || match(p.descrizioneBreve) || match(p.categoria))
        .slice(0, 6),
      trattamenti: treatments
        .filter((t) => match(t.nome) || match(t.descrizioneBreve) || match(t.categoria))
        .slice(0, 4),
    };
  }, [q]);

  const vuoto =
    q.length >= 2 &&
    results.prodotti.length === 0 &&
    results.trattamenti.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={site.ricerca.apri}
        >
          <div className="container-luxe pt-8">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost"
                aria-label={site.ricerca.chiudi}
              >
                <CloseIcon /> {site.ricerca.chiudi}
              </button>
            </div>

            <div className="mx-auto mt-6 max-w-narrow">
              <div className="flex items-center gap-3 border-b border-gold/40 pb-4">
                <SearchIcon size={24} className="shrink-0 text-gold" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={site.ricerca.placeholder}
                  className="w-full bg-transparent font-serif text-2xl text-cream placeholder:text-cream/30 focus:outline-none sm:text-3xl"
                />
              </div>

              <div className="mt-8 max-h-[60vh] overflow-y-auto pb-16">
                {q.length < 2 && (
                  <p className="text-sm text-cream/50">
                    {site.ricerca.suggerimento}
                  </p>
                )}
                {vuoto && (
                  <p className="text-sm text-cream/50">
                    {site.ricerca.nessunRisultato}
                  </p>
                )}

                {results.prodotti.length > 0 && (
                  <section className="mb-10">
                    <h2 className="eyebrow">{site.ricerca.prodotti}</h2>
                    <ul className="mt-4 divide-y divide-ink-line">
                      {results.prodotti.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/shop/product/${p.slug}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 py-3"
                          >
                            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-luxe border border-ink-line">
                              <Image
                                src={p.immagini[0]}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-serif text-lg text-cream transition-colors group-hover:text-gold-light">
                                {p.nome}
                              </span>
                              <span className="block truncate text-xs text-cream/45">
                                {p.descrizioneBreve}
                              </span>
                            </span>
                            <span className="shrink-0 text-sm text-gold-light">
                              {formatPrice(p.prezzo)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {results.trattamenti.length > 0 && (
                  <section>
                    <h2 className="eyebrow">{site.ricerca.trattamenti}</h2>
                    <ul className="mt-4 divide-y divide-ink-line">
                      {results.trattamenti.map((t) => (
                        <li key={t.slug}>
                          <Link
                            href={`/trattamenti/${t.slug}`}
                            onClick={onClose}
                            className="group flex items-center justify-between gap-4 py-3"
                          >
                            <span className="min-w-0">
                              <span className="block truncate font-serif text-lg text-cream transition-colors group-hover:text-gold-light">
                                {t.nome}
                              </span>
                              <span className="block truncate text-xs text-cream/45">
                                {t.descrizioneBreve}
                              </span>
                            </span>
                            <span className="shrink-0 text-xs uppercase tracking-wide2 text-gold/80">
                              {t.durataLabel}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
