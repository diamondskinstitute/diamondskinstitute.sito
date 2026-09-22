import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { shopCategories, getCategory } from "@/data/shop-categories";
import { ArrowRight } from "@/components/ui/Icons";

type Props = { params: { category: string } };

export function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCategory(params.category);
  if (!c) return { title: "Categoria non trovata" };
  return { title: c.nome, description: c.sottotitolo };
}

export default function CategoryPage({ params }: Props) {
  const categoria = getCategory(params.category);
  if (!categoria) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={categoria.nome}
        intro={categoria.sottotitolo}
      />

      <div className="border-b border-ink-line bg-ink-soft py-4">
        <nav className="container-luxe" aria-label="Percorso di navigazione">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/45">
            <li>
              <Link href="/shop" className="transition-colors hover:text-gold-light">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-cream/70">{categoria.nome}</li>
          </ol>
        </nav>
      </div>

      <div className="bg-ink py-14 sm:py-16">
        <FadeIn className="container-luxe">
          <ShopBrowser categoriaFissa={categoria.slug} />
          <p className="mt-14 text-center">
            <Link href="/shop" className="btn-outline">
              Tutte le categorie <ArrowRight size={16} />
            </Link>
          </p>
        </FadeIn>
      </div>
    </>
  );
}
