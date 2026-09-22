"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { priceWithVariant, type Product } from "@/data/products";
import { site } from "@/data/site";
import { salon } from "@/data/salon";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";
import Ornament from "../ui/Ornament";
import { CheckIcon, MinusIcon, PlusIcon } from "../ui/Icons";

// Galleria + varianti + quantità: tutta la parte interattiva della
// scheda prodotto. I testi statici restano nel componente pagina.
export default function ProductDetail({ product }: { product: Product }) {
  const [immagine, setImmagine] = useState(0);
  const [varianteId, setVarianteId] = useState(
    product.varianti?.opzioni[0]?.id
  );
  const [quantita, setQuantita] = useState(1);

  const prezzo = priceWithVariant(product, varianteId);
  const sconto =
    product.prezzoPrecedente && product.prezzoPrecedente > product.prezzo
      ? product.prezzoPrecedente - product.prezzo + (prezzo - product.prezzo)
      : undefined;

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* --- Galleria ---------------------------------------------------- */}
      <div>
        <motion.div
          key={immagine}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative aspect-square overflow-hidden rounded-card border border-ink-line"
        >
          <Image
            src={product.immagini[immagine]}
            alt={product.nome}
            fill
            sizes="(min-width: 1024px) 560px, 90vw"
            className="object-cover"
            priority
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-luxe bg-gold px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-wide2 text-ink">
              {product.badge}
            </span>
          )}
        </motion.div>

        {product.immagini.length > 1 && (
          <ul className="mt-4 flex gap-3">
            {product.immagini.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setImmagine(i)}
                  aria-label={`Immagine ${i + 1}`}
                  aria-pressed={i === immagine}
                  className={`relative block h-20 w-20 overflow-hidden rounded-luxe border transition-colors duration-300 ${
                    i === immagine
                      ? "border-gold"
                      : "border-ink-line hover:border-gold/45"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Informazioni e acquisto ------------------------------------- */}
      <div>
        <h1 className="heading-lg text-cream">{product.nome}</h1>
        <Ornament className="mt-5 justify-start" width="w-14" />

        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-serif text-3xl text-gold-light">
            {formatPrice(prezzo)}
          </span>
          {product.prezzoPrecedente && (
            <span className="text-sm text-cream/40 line-through">
              {formatPrice(product.prezzoPrecedente)}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-cream/40">IVA inclusa</p>

        <p className="mt-6 text-base leading-relaxed text-cream/70">
          {product.descrizione}
        </p>

        {/* Varianti */}
        {product.varianti && (
          <div className="mt-8">
            <h2 className="label-luxe">{product.varianti.nome}</h2>
            <ul className="flex flex-wrap gap-2">
              {product.varianti.opzioni.map((o) => {
                const attivo = varianteId === o.id;
                return (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => setVarianteId(o.id)}
                      aria-pressed={attivo}
                      className={`rounded-luxe border px-4 py-2.5 text-sm transition-all duration-300 ${
                        attivo
                          ? "border-gold bg-gold/12 text-gold-light"
                          : "border-ink-line text-cream/70 hover:border-gold/45 hover:text-gold-light"
                      }`}
                    >
                      {o.nome}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Quantità + acquisto */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div>
            <span className="label-luxe">{site.shop.quantita}</span>
            <div className="flex items-center rounded-luxe border border-ink-line">
              <button
                type="button"
                onClick={() => setQuantita((q) => Math.max(1, q - 1))}
                className="px-3.5 py-3 text-cream/70 transition-colors hover:text-gold-light"
                aria-label="Diminuisci quantità"
              >
                <MinusIcon />
              </button>
              <span className="min-w-[2.5ch] text-center text-sm text-cream">
                {quantita}
              </span>
              <button
                type="button"
                onClick={() => setQuantita((q) => Math.min(99, q + 1))}
                className="px-3.5 py-3 text-cream/70 transition-colors hover:text-gold-light"
                aria-label="Aumenta quantità"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          <div className="flex-1 self-end">
            <AddToCartButton
              product={product}
              varianteId={varianteId}
              quantita={quantita}
              className="btn-primary w-full"
            />
          </div>
        </div>

        <p className="mt-5 text-xs text-cream/45">
          Spedizione gratuita da {formatPrice(salon.shop.spedizioneGratuitaDa)} ·
          Consegna in {salon.shop.tempiConsegna} · Reso entro{" "}
          {salon.shop.resiEntroGiorni} giorni
          {sconto !== undefined && " · Prezzo promozionale"}
        </p>

        {/* Caratteristiche */}
        <div className="mt-9 border-t border-ink-line pt-8">
          <h2 className="eyebrow">{site.shop.caratteristiche}</h2>
          <ul className="mt-5 space-y-3">
            {product.caratteristiche.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-cream/70">
                <CheckIcon size={17} className="mt-0.5 shrink-0 text-gold" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
