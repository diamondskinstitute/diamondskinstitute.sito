import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "I nostri lavori",
  description: site.lavori.intro,
};

export default function LavoriPage() {
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
        </div>
      </div>
    </>
  );
}
