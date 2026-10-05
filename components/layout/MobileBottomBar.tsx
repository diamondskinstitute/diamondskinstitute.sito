"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarIcon } from "../ui/Icons";
import { useDict } from "@/lib/intl/client";

// Barra fissa in basso su mobile con l'azione principale: prenotare.
// Nascosta sulle pagine dove sarebbe ridondante o d'intralcio.
const HIDDEN_ON = ["/prenota", "/checkout", "/carrello", "/admin"];

export default function MobileBottomBar() {
  const site = useDict();
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="glass fixed inset-x-0 bottom-0 z-40 p-3 lg:hidden">
      <Link href="/prenota" className="btn-primary w-full">
        <CalendarIcon size={16} /> {site.hero.ctaPrimaria.label}
      </Link>
    </div>
  );
}
