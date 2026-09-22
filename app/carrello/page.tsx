import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CartContents from "@/components/shop/CartContents";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Carrello",
  robots: { index: false, follow: false },
};

export default function CarrelloPage() {
  return (
    <>
      <PageHeader eyebrow="Shop" title={site.carrello.titolo} />
      <div className="bg-ink py-14 sm:py-16">
        <div className="container-luxe">
          <CartContents />
        </div>
      </div>
    </>
  );
}
