"use client";

import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/data/salon";
import { WhatsAppIcon } from "../ui/Icons";
import { useDict } from "@/lib/intl/client";

// Pulsante flottante WhatsApp. Su mobile sale sopra la barra inferiore.
export default function WhatsAppButton() {
  const site = useDict();
  const pathname = usePathname();
  const hidden = pathname.startsWith("/admin");
  if (hidden) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site.common.scriviWhatsapp}
      className="glass fixed bottom-20 end-4 z-40 flex h-14 w-14 items-center justify-center rounded-pill text-gold transition-all duration-500 ease-luxe hover:scale-105 hover:text-gold-light hover:shadow-glow-lg lg:bottom-6 lg:end-6"
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}
