import type { Metadata } from "next";
import Image from "next/image";
import { BLUR_DARK } from "@/lib/blur";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { shopCategories } from "@/data/shop-categories";
import { getDict } from "@/lib/intl/server";

// Titolo e descrizione seguono la lingua scelta
export function generateMetadata(): Metadata {
  const m = getDict().meta.shop;
  return { title: m.title, description: m.description };
}

export default function ShopPage() {
  const site = getDict();
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
          {shopCategories.map((c, i) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/shop/${c.slug}`}
                className="group block w-40 text-center"
              >
                <span className="card-luxe relative block aspect-square overflow-hidden rounded-card">
                  <Image
                    src={c.cover}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DARK}
                  />
                  {/* Dissolvenza verso il fondo + numero decorativo */}
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,9,6,0.92)] via-[rgba(11,9,6,0.25)] to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-2 start-3 font-serif text-xl leading-none text-gold/45"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
