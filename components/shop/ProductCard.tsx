import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/shop-categories";
import Price from "../ui/Price";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const categoria = getCategory(product.categoria);

  return (
    <article className="card-luxe group flex flex-col overflow-hidden">
      <Link
        href={`/shop/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden"
      >
        <Image
          src={product.immagini[0]}
          alt={product.nome}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.06]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-luxe bg-gold px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide2 text-ink">
            {product.badge}
          </span>
        )}
        {product.esaurito && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/70 text-xs uppercase tracking-luxe text-cream">
            Esaurito
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {categoria && (
          <Link
            href={`/shop/${categoria.slug}`}
            className="text-[0.62rem] uppercase tracking-luxe text-gold/70 transition-colors hover:text-gold-light"
          >
            {categoria.nome}
          </Link>
        )}
        <h3 className="mt-2 font-serif text-lg leading-snug text-cream">
          <Link
            href={`/shop/product/${product.slug}`}
            className="transition-colors hover:text-gold-light"
          >
            {product.nome}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-cream/50">
          {product.descrizioneBreve}
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
