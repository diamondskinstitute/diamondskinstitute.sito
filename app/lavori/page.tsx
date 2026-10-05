import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { getDict } from "@/lib/intl/server";
import InstagramButton from "@/components/ui/InstagramButton";

// Titolo e descrizione seguono la lingua scelta
export function generateMetadata(): Metadata {
  const m = getDict().meta.lavori;
  return { title: m.title, description: m.description };
}

export default function LavoriPage() {
  const site = getDict();
  return (
    <>
      <PageHeader
        eyebrow={site.lavori.eyebrow}
        title={site.lavori.titolo}
        intro={site.lavori.intro}
      />
      <div className="bg-ink py-16 sm:py-20">
        <div className="container-luxe">
          <PortfolioGallery />

          {/* Invito a seguire il profilo, sotto alla galleria */}
          <div className="mt-14 text-center">
            <InstagramButton label={site.instagramCta.lavori} />
          </div>
        </div>
      </div>
    </>
  );
}
