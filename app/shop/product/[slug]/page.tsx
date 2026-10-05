import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import ProductDetail from "@/components/shop/ProductDetail";
import ProductCard from "@/components/shop/ProductCard";
import { products, getProduct, relatedProducts } from "@/data/products";
import { getCategory } from "@/data/shop-categories";
import { getDict } from "@/lib/intl/server";
import { descrProdotto, nomeCategoria, nomeProdotto } from "@/lib/intl/content";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getProduct(params.slug);
  const d = getDict();
  if (!p) return { title: d.errore404.titolo, robots: { index: false } };
  return {
    title: nomeProdotto(d, p),
    description: descrProdotto(d, p),
    openGraph: { images: [{ url: p.immagini[0] }] },
  };
}

export default function ProductPage({ params }: Props) {
  const site = getDict();
  const product = getProduct(params.slug);
  if (!product) notFound();

  const categoria = getCategory(product.categoria);
  const correlati = relatedProducts(product);

  return (
    <>
      {/* Percorso di navigazione */}
      <div className="border-b border-ink-line bg-ink-soft py-4">
        <nav className="container-luxe" aria-label={site.nav.percorso}>
          <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/45">
            <li>
              <Link
                href="/shop"
                className="transition-colors hover:text-gold-light"
              >
                Shop
              </Link>
            </li>
            {categoria && (
              <>
                <li aria-hidden="true">·</li>
                <li>
                  <Link
                    href={`/shop/${categoria.slug}`}
                    className="transition-colors hover:text-gold-light"
                  >
                    {nomeCategoria(site, categoria)}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">·</li>
            <li className="text-cream/70">{nomeProdotto(site, product)}</li>
          </ol>
        </nav>
      </div>

      <div className="bg-ink py-14 sm:py-20">
        <FadeIn className="container-luxe">
          <ProductDetail product={product} />
        </FadeIn>
      </div>

      {correlati.length > 0 && (
        <section className="border-t border-ink-line bg-ink-soft py-16 sm:py-20">
          <div className="container-luxe">
            <FadeIn className="mb-10 flex items-center gap-5">
              <h2 className="heading-md whitespace-nowrap text-cream">
                {site.shop.correlati}
              </h2>
              <span className="gold-rule w-full" />
            </FadeIn>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {correlati.map((p, i) => (
                <FadeIn
                  key={p.slug}
                  delay={i * 0.07}
                  as="li"
                  className="h-full"
                >
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
