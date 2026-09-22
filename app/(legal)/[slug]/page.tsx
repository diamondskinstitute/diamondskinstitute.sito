import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import { legalPages, legalSlugs } from "@/data/legal";

type Props = { params: { slug: string } };

// Le quattro pagine legali condividono lo stesso impaginato: i testi
// stanno in data/legal.ts.
export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = legalPages[params.slug];
  if (!page) return { title: "Pagina non trovata" };
  return { title: page.titolo, description: page.sottotitolo };
}

export default function LegalPage({ params }: Props) {
  const page = legalPages[params.slug];
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Informazioni legali"
        title={page.titolo}
        intro={page.sottotitolo}
      />
      <div className="bg-ink py-14 sm:py-20">
        <div className="container-luxe max-w-narrow">
          <p className="text-xs uppercase tracking-wide2 text-cream/35">
            {page.aggiornamento}
          </p>

          <div className="mt-10 space-y-10">
            {page.sezioni.map((s, i) => (
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
