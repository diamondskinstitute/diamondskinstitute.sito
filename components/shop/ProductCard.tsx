"use client";

import Image from "next/image";
import { BLUR_DARK } from "@/lib/blur";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/shop-categories";
import Price from "../ui/Price";
import ComingSoonBadge from "../ui/ComingSoonBadge";
import { useDict } from "@/lib/intl/client";
import { descrProdotto, nomeCategoria, nomeProdotto } from "@/lib/intl/content";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const t = useDict();
  const categoria = getCategory(product.categoria);

  return (
    <article className="card-luxe group flex flex-col overflow-hidden">
      <Link
        href={`/shop/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden"
      >
        <Image
          src={product.immagini[0]}
          alt={nomeProdotto(t, product)}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.06]"
          placeholder="blur"
          blurDataURL={BLUR_DARK}
        />
        {product.badge && (
          <span className="absolute start-3 top-3 rounded-pill px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide2 text-ink" style={{ backgroundImage: "var(--grad-gold)" }}>
            {product.badge}
          </span>
        )}
        {/* Dissolvenza dell'immagine verso il corpo della card */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(26,21,14,0.95)] via-[rgba(26,21,14,0.35)] to-transparent"
          aria-hidden="true"
        />
        {product.esaurito && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/70 text-xs uppercase tracking-luxe text-cream">
            {t.shop.esaurito}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {categoria && (
          <Link
            href={`/shop/${categoria.slug}`}
            className="text-[0.62rem] uppercase tracking-luxe text-gold/70 transition-colors hover:text-gold-light"
          >
            {nomeCategoria(t, categoria)}
          </Link>
        )}
        <h3 className="mt-2 font-serif text-lg leading-snug text-cream">
          <Link
            href={`/shop/product/${product.slug}`}
            className="transition-colors hover:text-gold-light"
          >
            {nomeProdotto(t, product)}
          </Link>{" "}
          <ComingSoonBadge />
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-cream/50">
          {descrProdotto(t, product)}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <Price value={product.prezzo} previous={product.prezzoPrecedente} />
        </div>

        <AddToCartButton
          product={product}
          className="btn-outline mt-4 w-full !px-4 !py-3 !text-[0.7rem]"
        />
      </div>
    </article>
  );
}
