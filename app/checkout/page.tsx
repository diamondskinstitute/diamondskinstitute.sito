import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CheckoutForm from "@/components/shop/CheckoutForm";
import { getDict } from "@/lib/intl/server";

// Titolo e descrizione seguono la lingua scelta
export function generateMetadata(): Metadata {
  const m = getDict().meta.checkout;
  return { title: m.title, description: m.description };
}

export default function CheckoutPage() {
  const site = getDict();
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={site.checkout.titolo}
        intro={site.checkout.intro}
      />
      <div className="bg-ink py-14 sm:py-16">
        <div className="container-luxe">
          <CheckoutForm />
        </div>
      </div>
    </>
  );
}
