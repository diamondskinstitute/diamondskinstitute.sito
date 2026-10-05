import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import TreatmentCard from "@/components/treatments/TreatmentCard";
import PriceList from "@/components/treatments/PriceList";
import { treatments, treatmentCategories } from "@/data/treatments";
import { getDict } from "@/lib/intl/server";
import { categoriaTrattamento } from "@/lib/intl/content";
import { ArrowRight } from "@/components/ui/Icons";

// Titolo e descrizione seguono la lingua scelta
export function generateMetadata(): Metadata {
  const m = getDict().meta.trattamenti;
  return { title: m.title, description: m.description };
}

export default function TrattamentiPage() {
  const site = getDict();
  return (
    <>
      <PageHeader
        eyebrow={site.trattamenti.eyebrow}
        title={site.trattamenti.titolo}
        intro={site.trattamenti.intro}
      />

      <div className="bg-ink py-16 sm:py-20">
        <div className="container-luxe space-y-16">
          {treatmentCategories.map((categoria) => {
            const gruppo = treatments.filter((t) => t.categoria === categoria);
            return (
              <section key={categoria}>
                <FadeIn className="mb-8 flex items-center gap-5">
                  <h2 className="heading-md whitespace-nowrap text-cream">
                    {categoriaTrattamento(site, categoria)}
                  </h2>
                  <span className="gold-rule w-full" />
                </FadeIn>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {gruppo.map((t, i) => (
                    <FadeIn key={t.slug} delay={i * 0.07} className="h-full">
                      <TreatmentCard treatment={t} />
                    </FadeIn>
                  ))}
                </div>
              </section>
            );
          })}

          <PriceList />

          <FadeIn className="rounded-card border border-gold/25 bg-ink-soft p-10 text-center">
            <h2 className="heading-md text-cream">
              {site.trattamenti.nonSaiQuale}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/65">
              {site.trattamenti.nonSaiQualeTesto}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/prenota" className="btn-primary">
                {site.trattamenti.prenotaAppuntamento}
              </Link>
              <Link href="/contatti" className="btn-outline">
                {site.trattamenti.contattaci}{" "}
                <ArrowRight size={16} className="rtl:rotate-180" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
