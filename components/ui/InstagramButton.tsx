"use client";

import { salon } from "@/data/salon";
import { useDict } from "@/lib/intl/client";
import { InstagramIcon } from "./Icons";

type Props = {
  // "button" = pulsante pieno (galleria, contatti)
  // "footer" = icona + handle, più discreto
  variant?: "button" | "footer";
  label?: string;
  className?: string;
};

// Unico punto in cui è definito il link a Instagram: l'indirizzo arriva
// sempre da data/salon.ts.
export default function InstagramButton({
  variant = "button",
  label,
  className = "",
}: Props) {
  const t = useDict();
  const aria = `${t.instagramCta.aria} (${salon.instagram.handle})`;

  if (variant === "footer") {
    return (
      <a
        href={salon.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={aria}
        className={`inline-flex items-center gap-2.5 rounded-pill border border-gold/40 bg-gold/[0.06] px-3.5 py-2 text-xs text-gold-light transition-all duration-300 hover:border-gold hover:bg-gold/20 hover:shadow-glow ${className}`}
      >
        <InstagramIcon size={18} />
        <span>{salon.instagram.handle}</span>
      </a>
    );
  }

  return (
    <a
      href={salon.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={`btn-instagram ${className}`}
    >
      <InstagramIcon size={17} />
      <span>{label ?? t.instagramCta.contatti}</span>
    </a>
  );
}
