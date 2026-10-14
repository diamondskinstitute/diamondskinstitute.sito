import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getDict } from "@/lib/intl/server";
import { salon } from "@/data/salon";
import { BOOKING_LINK_PROPS } from "@/lib/booking";
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
          <FadeIn className="card-luxe mx-auto max-w-narrow p-8 text-center sm:p-12">
            <h2 className="heading-md text-cream">{site.prenota.online}</h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              {site.prenota.onlineTesto}
            </p>
            <a
              {...BOOKING_LINK_PROPS}
              className="btn-primary btn-book mt-8 inline-flex"
            >
              {site.trattamenti.prenotaAppuntamento}
            </a>
          </FadeIn>

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
