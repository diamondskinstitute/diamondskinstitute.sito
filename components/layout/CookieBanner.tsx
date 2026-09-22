"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";

const STORAGE_KEY = "k-institute-cookie";

// Banner cookie. Il sito usa SOLO cookie tecnici (carrello e preferenze),
// quindi non c'è nulla da rifiutare: basta la presa visione.
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage non disponibile: non mostriamo il banner */
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignora */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-36 z-[65] mx-auto max-w-2xl rounded-card border border-gold/25 bg-ink-soft p-5 shadow-lift lg:bottom-6 lg:inset-x-6"
          role="region"
          aria-label="Informativa cookie"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm leading-relaxed text-cream/70">
              {site.cookie.testo}{" "}
              <Link
                href={site.cookie.dettagliHref}
                className="text-gold underline-offset-4 hover:underline"
              >
                {site.cookie.dettagli}
              </Link>
            </p>
            <button type="button" onClick={accept} className="btn-primary shrink-0">
              {site.cookie.accetta}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
