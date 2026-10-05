import { getDict } from "@/lib/intl/server";
import FadeIn from "../FadeIn";

// Striscia dei punti di forza, subito sotto l'hero.
export default function Highlights() {
  const site = getDict();
  return (
    <section className="border-y border-gold/10 bg-ink-soft/60">
      <div className="container-luxe grid gap-px py-0 sm:grid-cols-2 lg:grid-cols-4">
        {site.highlights.map((h, i) => (
          <FadeIn
            key={h.titolo}
            delay={i * 0.08}
            as="article"
            className="relative px-6 py-9 text-center lg:text-start"
          >
            {/* Filetto oro verticale fra le colonne */}
            {i > 0 && (
              <span
                className="absolute inset-y-6 start-0 hidden w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent lg:block"
                aria-hidden="true"
              />
            )}
            {/* Icona a filo sottile, in linea con lo stile del logo */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              className="mx-auto mb-4 text-gold/80 lg:mx-0"
              aria-hidden="true"
            >
              <path d="M12 2.5 21.5 12 12 21.5 2.5 12Z" />
              <path d="M12 7.5 16.5 12 12 16.5 7.5 12Z" opacity="0.55" />
            </svg>
            <h3 className="font-serif text-lg text-cream">{h.titolo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/55">
              {h.testo}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
