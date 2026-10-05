"use client";

import Image from "next/image";
import { BLUR_DARK } from "@/lib/blur";
import Link from "next/link";
import { motion } from "framer-motion";
import { shopCategories } from "@/data/shop-categories";
import { featuredProducts } from "@/data/products";
import Price from "../ui/Price";
import ComingSoonBadge from "../ui/ComingSoonBadge";
import { useDict } from "@/lib/intl/client";
import { nomeCategoria, nomeProdotto } from "@/lib/intl/content";
import { ArrowRight } from "../ui/Icons";

// Pannello a tutta larghezza con tutte le categorie dello shop.
// Si apre sotto la voce "Shop" del menu principale.
export default function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const t = useDict();
  const inEvidenza = featuredProducts[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full px-3 sm:px-5"
    >
      <div className="glass mx-auto grid w-full max-w-content gap-8 rounded-glass px-6 py-8 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-6 flex items-baseline justify-between">
            <span className="eyebrow">{t.common.categorie}</span>
            <Link
              href="/shop"
              onClick={onNavigate}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wide2 text-cream/70 transition-colors hover:text-gold-light"
            >
              {t.common.tuttoLoShop}{" "}
              <ArrowRight size={14} className="rtl:rotate-180" />
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
                    {nomeCategoria(t, c)}
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
                alt={nomeProdotto(t, inEvidenza)}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_DARK}
              />
            </span>
            <span className="block p-4">
              <span className="eyebrow">{t.common.inEvidenza}</span>
              <span className="mt-2 block font-serif text-lg text-cream">
                {nomeProdotto(t, inEvidenza)} <ComingSoonBadge />
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
