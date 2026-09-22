import Link from "next/link";
import Ornament from "@/components/ui/Ornament";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ink pattern-lux px-6 py-24">
      <div className="text-center">
        <p className="font-serif text-7xl text-gold-gradient">404</p>
        <h1 className="heading-lg mt-4 text-cream">{site.errore404.titolo}</h1>
        <Ornament className="mt-6" width="w-16" />
        <p className="mx-auto mt-6 max-w-md text-cream/65">
          {site.errore404.testo}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={site.errore404.cta.href} className="btn-primary">
            {site.errore404.cta.label}
          </Link>
          <Link href={site.errore404.ctaSecondaria.href} className="btn-outline">
            {site.errore404.ctaSecondaria.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
