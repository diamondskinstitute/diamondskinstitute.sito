import Link from "next/link";
import { getDict } from "@/lib/intl/server";
import ComingSoonBadge from "../ui/ComingSoonBadge";

// Striscia promozionale in cima al sito (soglia spedizione gratuita).
export default function TopBar() {
  const site = getDict();
  return (
    <div className="border-b border-gold/10 bg-ink-soft/70">
      <div className="container-luxe flex items-center justify-center gap-3 py-2 text-center">
        <p className="text-[0.68rem] uppercase tracking-wide2 text-cream/70">
          {site.topBar.testo}
        </p>
        <ComingSoonBadge />
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
