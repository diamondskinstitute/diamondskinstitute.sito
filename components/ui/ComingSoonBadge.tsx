"use client";

import { useDict } from "@/lib/intl/client";

// Etichetta "Coming soon": filetto oro sottile, fondo trasparente.
// Non altera l'ingombro della card: è inline e non va a capo.
export default function ComingSoonBadge({
  className = "",
}: {
  className?: string;
}) {
  const t = useDict();
  return <span className={`badge-soon ${className}`}>{t.shop.comingSoon}</span>;
}
