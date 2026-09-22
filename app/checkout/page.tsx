import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CheckoutForm from "@/components/shop/CheckoutForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
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
