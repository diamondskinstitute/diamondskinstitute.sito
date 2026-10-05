import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CartContents from "@/components/shop/CartContents";
import { getDict } from "@/lib/intl/server";

// Titolo e descrizione seguono la lingua scelta
export function generateMetadata(): Metadata {
  const m = getDict().meta.carrello;
  return { title: m.title, description: m.description };
}

export default function CarrelloPage() {
  const site = getDict();
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
