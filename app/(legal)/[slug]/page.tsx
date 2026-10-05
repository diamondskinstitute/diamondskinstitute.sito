import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import { legalPages, legalSlugs } from "@/data/legal";
import { getDict } from "@/lib/intl/server";
import { sezioniLegali } from "@/lib/intl/content";

type Props = { params: { slug: string } };

// Le quattro pagine legali condividono lo stesso impaginato: i testi
// stanno in data/legal.ts.
export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = legalPages[params.slug];
  const d = getDict();
  if (!page) return { title: d.errore404.titolo, robots: { index: false } };
  const tr = (
    d.legale as unknown as Record<
      string,
      { titolo: string; sottotitolo: string }
    >
  )[params.slug];
  return {
    title: tr?.titolo ?? page.titolo,
    description: tr?.sottotitolo ?? page.sottotitolo,
  };
}

export default function LegalPage({ params }: Props) {
  const page = legalPages[params.slug];
  if (!page) notFound();
  const site = getDict();
  const tr = (
    site.legale as unknown as Record<
      string,
      { titolo: string; sottotitolo: string }
    >
  )[params.slug];

  return (
    <>
      <PageHeader
        eyebrow={site.legale.eyebrow}
        title={tr?.titolo ?? page.titolo}
        intro={tr?.sottotitolo ?? page.sottotitolo}
      />
      <div className="bg-ink py-14 sm:py-20">
        <div className="container-luxe max-w-narrow">
          <p className="text-xs uppercase tracking-wide2 text-cream/35">
            {page.aggiornamento}
          </p>

          <div className="mt-10 space-y-10">
            {sezioniLegali(site, params.slug, page.sezioni).map((s, i) => (
              <FadeIn key={s.titolo} delay={i * 0.05} as="section">
                <h2 className="font-serif text-2xl text-cream">{s.titolo}</h2>
                <span className="gold-rule mt-4 block w-16" />
                <div className="mt-4 space-y-4">
                  {s.paragrafi.map((p) => (
                    <p
                      key={p.slice(0, 30)}
                      className="text-sm leading-relaxed text-cream/65 sm:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
