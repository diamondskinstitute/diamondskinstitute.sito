"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, priceRange, type Product } from "@/data/products";
import { shopCategories } from "@/data/shop-categories";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import ProductCard from "./ProductCard";

// Griglia con filtri (categoria, prezzo massimo) e ordinamento.
// Il catalogo è locale: tutto avviene client-side, senza chiamate.
export default function ShopBrowser({
  categoriaFissa,
}: {
  // Se valorizzata, la pagina è quella di una categoria: il filtro
  // categoria sparisce e resta bloccato su questo slug.
  categoriaFissa?: string;
}) {
  const [categoria, setCategoria] = useState(categoriaFissa ?? "tutte");
  const [prezzoMax, setPrezzoMax] = useState(priceRange.max);
  const [ordine, setOrdine] = useState("rilevanza");

  const visibili = useMemo(() => {
    const base = products.filter((p) => {
      const okCategoria =
        categoriaFissa != null
          ? p.categoria === categoriaFissa
          : categoria === "tutte" || p.categoria === categoria;
      return okCategoria && p.prezzo <= prezzoMax;
    });

    const sorted = [...base];
    if (ordine === "prezzo-asc") sorted.sort((a, b) => a.prezzo - b.prezzo);
    if (ordine === "prezzo-desc") sorted.sort((a, b) => b.prezzo - a.prezzo);
    if (ordine === "nome") sorted.sort((a, b) => a.nome.localeCompare(b.nome));
    if (ordine === "rilevanza")
      sorted.sort(
        (a, b) => Number(Boolean(b.inEvidenza)) - Number(Boolean(a.inEvidenza))
      );
    return sorted;
  }, [categoria, categoriaFissa, prezzoMax, ordine]);

  const filtriAttivi =
    prezzoMax < priceRange.max ||
    ordine !== "rilevanza" ||
    (!categoriaFissa && categoria !== "tutte");

  const azzera = () => {
    if (!categoriaFissa) setCategoria("tutte");
    setPrezzoMax(priceRange.max);
    setOrdine("rilevanza");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
      {/* --- Filtri ------------------------------------------------------ */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-ink-line bg-ink-soft p-6">
          {!categoriaFissa && (
            <div className="mb-7">
              <h2 className="eyebrow">{site.shop.filtri.categoria}</h2>
              <ul className="mt-4 space-y-1.5">
                <li>
                  <FilterButton
                    active={categoria === "tutte"}
                    onClick={() => setCategoria("tutte")}
                    label={site.shop.filtri.tutte}
                    count={products.length}
                  />
                </li>
                {shopCategories.map((c) => (
                  <li key={c.slug}>
                    <FilterButton
                      active={categoria === c.slug}
                      onClick={() => setCategoria(c.slug)}
                      label={c.nome}
                      count={
                        products.filter((p) => p.categoria === c.slug).length
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-7">
            <label htmlFor="prezzo-max" className="eyebrow">
              {site.shop.filtri.prezzo}
            </label>
            <input
              id="prezzo-max"
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={1}
              value={prezzoMax}
              onChange={(e) => setPrezzoMax(Number(e.target.value))}
              className="mt-4 w-full accent-[#D9AE45]"
            />
            <p className="mt-2 text-sm text-gold-light">
              fino a {formatPrice(prezzoMax)}
            </p>
          </div>

          <div>
            <label htmlFor="ordine" className="eyebrow">
              {site.shop.filtri.ordina}
            </label>
            <select
              id="ordine"
              value={ordine}
              onChange={(e) => setOrdine(e.target.value)}
              className="field mt-4"
            >
              {site.shop.ordinamenti.map((o) => (
                <option key={o.id} value={o.id} className="bg-ink">
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {filtriAttivi && (
            <button
              type="button"
              onClick={azzera}
              className="mt-6 w-full text-xs uppercase tracking-wide2 text-cream/50 transition-colors hover:text-gold-light"
            >
              {site.shop.filtri.azzera}
            </button>
          )}
        </div>

        {!categoriaFissa && (
          <nav className="mt-6 rounded-card border border-ink-line bg-ink-soft p-6">
            <h2 className="eyebrow">Sfoglia per categoria</h2>
            <ul className="mt-4 space-y-2">
              {shopCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop/${c.slug}`}
                    className="link-quiet text-sm"
                  >
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>

      {/* --- Griglia ----------------------------------------------------- */}
      <div>
        <p className="mb-6 text-xs uppercase tracking-wide2 text-cream/45">
          {visibili.length} {visibili.length === 1 ? "prodotto" : "prodotti"}
        </p>

        {visibili.length === 0 ? (
          <p className="rounded-card border border-ink-line bg-ink-soft p-10 text-center text-cream/55">
            {site.shop.filtri.nessunRisultato}
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibili.map((p: Product, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                className="h-full"
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between rounded-luxe px-3 py-2 text-sm transition-colors duration-300 ${
        active
          ? "bg-gold/12 text-gold-light"
          : "text-cream/65 hover:bg-white/5 hover:text-gold-light"
      }`}
    >
      <span>{label}</span>
      <span className="text-xs text-cream/35">{count}</span>
    </button>
  );
}
