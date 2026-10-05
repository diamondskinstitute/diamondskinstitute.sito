import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { shopCategories, getCategory } from "@/data/shop-categories";
import { ArrowRight } from "@/components/ui/Icons";
import { getDict } from "@/lib/intl/server";
import { nomeCategoria, sottotitoloCategoria } from "@/lib/intl/content";

type Props = { params: { category: string } };

export function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCategory(params.category);
  const d = getDict();
  if (!c) return { title: d.errore404.titolo, robots: { index: false } };
  return {
    title: nomeCategoria(d, c),
    description: sottotitoloCategoria(d, c),
  };
}

export default function CategoryPage({ params }: Props) {
  const categoria = getCategory(params.category);
  if (!categoria) notFound();
  const site = getDict();

  return (
    <>
      <PageHeader
        eyebrow={site.shop.eyebrow}
        title={nomeCategoria(site, categoria)}
        intro={sottotitoloCategoria(site, categoria)}
      />

      <div className="border-b border-ink-line bg-ink-soft py-4">
        <nav className="container-luxe" aria-label={site.nav.percorso}>
          <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/45">
            <li>
              <Link
                href="/shop"
                className="transition-colors hover:text-gold-light"
              >
                {site.nav.shop}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-cream/70">{nomeCategoria(site, categoria)}</li>
          </ol>
        </nav>
      </div>

      <div className="bg-ink py-14 sm:py-16">
        <FadeIn className="container-luxe">
          <ShopBrowser categoriaFissa={categoria.slug} />
          <p className="mt-14 text-center">
            <Link href="/shop" className="btn-outline">
              {site.shop.filtri.tutte}{" "}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </p>
        </FadeIn>
      </div>
    </>
  );
}
