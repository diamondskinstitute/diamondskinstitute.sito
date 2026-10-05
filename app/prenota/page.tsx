import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import BookingForm from "@/components/booking/BookingForm";
import { getDict } from "@/lib/intl/server";
import { salon } from "@/data/salon";
import { PinIcon } from "@/components/ui/Icons";

// Titolo e descrizione seguono la lingua scelta
export function generateMetadata(): Metadata {
  const m = getDict().meta.prenota;
  return { title: m.title, description: m.description };
}

export default function PrenotaPage() {
  const site = getDict();
  return (
    <>
      <PageHeader
        eyebrow={site.prenota.eyebrow}
        title={site.prenota.titolo}
        intro={site.prenota.intro}
      />
      <div className="bg-ink py-16 sm:py-20">
        <div className="container-luxe">
          {/* useSearchParams richiede un confine Suspense */}
          <Suspense
            fallback={
              <p className="text-center text-cream/50">
                {site.common.caricoIlModulo}
              </p>
            }
          >
            <BookingForm />
          </Suspense>

          {/* Dove si svolge l'appuntamento */}
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-cream/55">
            <PinIcon size={16} className="shrink-0 text-gold/70" />
            <span>
              {site.common.appuntamentoIn}{" "}
              <a
                href={salon.mappaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet underline-offset-4 hover:underline"
              >
                {`${salon.indirizzo.completo}, ${site.common.paese}`}
              </a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
