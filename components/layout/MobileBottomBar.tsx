"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarIcon } from "../ui/Icons";

// Barra fissa in basso su mobile con l'azione principale: prenotare.
// Nascosta sulle pagine dove sarebbe ridondante o d'intralcio.
const HIDDEN_ON = ["/prenota", "/checkout", "/carrello", "/admin"];

export default function MobileBottomBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-ink/95 p-3 backdrop-blur-md lg:hidden">
      <Link href="/prenota" className="btn-primary w-full">
        <CalendarIcon size={16} /> Prenota un trattamento
      </Link>
    </div>
  );
}
