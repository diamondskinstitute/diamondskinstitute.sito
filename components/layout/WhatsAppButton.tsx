"use client";

import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/data/salon";
import { WhatsAppIcon } from "../ui/Icons";

// Pulsante flottante WhatsApp. Su mobile sale sopra la barra inferiore.
export default function WhatsAppButton() {
  const pathname = usePathname();
  const hidden = pathname.startsWith("/admin");
  if (hidden) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ink-soft text-gold shadow-gold transition-all duration-500 ease-luxe hover:scale-105 hover:bg-gold hover:text-ink lg:bottom-6 lg:right-6"
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}
