import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Ornament from "@/components/ui/Ornament";
import { site } from "@/data/site";
import { salon } from "@/data/salon";
import { CheckIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Richiesta ricevuta",
  robots: { index: false, follow: false },
};

// Il numero d'ordine arriva dal querystring dopo l'invio della richiesta.
function OrderNumber({ numero }: { numero?: string }) {
  if (!numero) return null;
  return (
    <p className="mt-7 inline-block rounded-luxe border border-gold/30 bg-gold/5 px-5 py-3">
      <span className="block text-[0.65rem] uppercase tracking-luxe text-cream/50">
        {site.ordineConfermato.numeroOrdine}
      </span>
      <span className="mt-1 block font-serif text-2xl text-gold-light">
        {numero}
      </span>
    </p>
  );
}

export default function GraziePage({
  searchParams,
}: {
  searchParams: { ordine?: string };
}) {
  return (
    <div className="bg-ink py-20 sm:py-28">
      <div className="container-luxe max-w-narrow text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <CheckIcon size={30} />
        </span>
        <span className="eyebrow mt-8 block">{site.ordineConfermato.eyebrow}</span>
        <h1 className="heading-lg mt-4 text-cream">
          {site.ordineConfermato.titolo}
        </h1>
        <Ornament className="mt-6" width="w-16" />
        <p className="mx-auto mt-6 max-w-xl text-cream/70">
          {site.ordineConfermato.testo}
        </p>

        <Suspense fallback={null}>
          <OrderNumber numero={searchParams.ordine} />
        </Suspense>

        <p className="mt-8 text-sm text-cream/50">
          Per qualsiasi domanda scrivici a{" "}
          <a
            href={`mailto:${salon.emailOrdini}`}
            className="text-gold underline-offset-4 hover:underline"
          >
            {salon.emailOrdini}
          </a>
          .
        </p>

        <Link href={site.ordineConfermato.cta.href} className="btn-primary mt-9">
          {site.ordineConfermato.cta.label}
        </Link>
      </div>
    </div>
  );
}
