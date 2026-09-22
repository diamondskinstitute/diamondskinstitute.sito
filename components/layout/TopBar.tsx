import Link from "next/link";
import { site } from "@/data/site";

// Striscia promozionale in cima al sito (soglia spedizione gratuita).
export default function TopBar() {
  return (
    <div className="border-b border-gold/15 bg-ink-soft">
      <div className="container-luxe flex items-center justify-center gap-3 py-2 text-center">
        <p className="text-[0.68rem] uppercase tracking-wide2 text-cream/70">
          {site.topBar.testo}
        </p>
        <Link
          href={site.topBar.linkHref}
          className="hidden text-[0.68rem] uppercase tracking-wide2 text-gold underline-offset-4 hover:underline sm:inline"
        >
          {site.topBar.linkLabel}
        </Link>
      </div>
    </div>
  );
}
