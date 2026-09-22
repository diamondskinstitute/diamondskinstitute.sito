"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { shopCategories } from "@/data/shop-categories";
import { featuredProducts } from "@/data/products";
import Price from "../ui/Price";
import { ArrowRight } from "../ui/Icons";

// Pannello a tutta larghezza con tutte le categorie dello shop.
// Si apre sotto la voce "Shop" del menu principale.
export default function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const inEvidenza = featuredProducts[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full border-y border-ink-line bg-ink-soft shadow-lift"
    >
      <div className="container-luxe grid gap-8 py-9 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-6 flex items-baseline justify-between">
            <span className="eyebrow">Categorie</span>
            <Link
              href="/shop"
              onClick={onNavigate}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wide2 text-cream/70 transition-colors hover:text-gold-light"
            >
              Tutto lo shop <ArrowRight size={14} />
            </Link>
          </div>

          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
            {shopCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  onClick={onNavigate}
                  className="group block"
                >
                  <span className="font-serif text-lg text-cream transition-colors group-hover:text-gold-light">
                    {c.nome}
                  </span>
                  <span className="mt-0.5 block text-xs text-cream/45">
                    {c.esempi.slice(0, 3).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Prodotto in evidenza, come sul sito di riferimento */}
        {inEvidenza && (
          <Link
            href={`/shop/product/${inEvidenza.slug}`}
            onClick={onNavigate}
            className="card-luxe group hidden overflow-hidden lg:block"
          >
            <span className="relative block aspect-square overflow-hidden">
              <Image
                src={inEvidenza.immagini[0]}
                alt={inEvidenza.nome}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
            </span>
            <span className="block p-4">
              <span className="eyebrow">In evidenza</span>
              <span className="mt-2 block font-serif text-lg text-cream">
                {inEvidenza.nome}
              </span>
              <Price
                value={inEvidenza.prezzo}
                previous={inEvidenza.prezzoPrecedente}
                className="mt-1"
              />
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
