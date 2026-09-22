import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { shopCategories } from "@/data/shop-categories";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Shop",
  description: site.shop.intro,
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow={site.shop.eyebrow}
        title={site.shop.titolo}
        intro={site.shop.intro}
      />

      {/* Riga delle categorie, come sul sito di riferimento */}
      <section className="border-b border-ink-line bg-ink-soft py-8">
        <ul className="no-scrollbar container-luxe flex gap-4 overflow-x-auto">
          {shopCategories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/shop/${c.slug}`}
                className="group block w-40 text-center"
              >
                <span className="relative block aspect-square overflow-hidden rounded-card border border-ink-line transition-colors duration-500 group-hover:border-gold/45">
                  <Image
                    src={c.cover}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                  />
                </span>
                <span className="mt-3 block text-xs uppercase tracking-wide2 text-cream/70 transition-colors group-hover:text-gold-light">
                  {c.nome}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-ink py-14 sm:py-16">
        <FadeIn className="container-luxe">
          <ShopBrowser />
        </FadeIn>
      </div>
    </>
  );
}
