import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import BookingForm from "@/components/booking/BookingForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Prenota",
  description: site.prenota.intro,
};

export default function PrenotaPage() {
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
              <p className="text-center text-cream/50">Carico il modulo…</p>
            }
          >
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
