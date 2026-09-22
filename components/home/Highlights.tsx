import { site } from "@/data/site";
import FadeIn from "../FadeIn";

// Striscia dei punti di forza, subito sotto l'hero.
export default function Highlights() {
  return (
    <section className="border-y border-ink-line bg-ink-soft">
      <div className="container-luxe grid gap-px py-0 sm:grid-cols-2 lg:grid-cols-4">
        {site.highlights.map((h, i) => (
          <FadeIn
            key={h.titolo}
            delay={i * 0.08}
            as="article"
            className="relative px-6 py-9 text-center lg:text-left"
          >
            {/* Filetto oro verticale fra le colonne */}
            {i > 0 && (
              <span
                className="absolute inset-y-6 left-0 hidden w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent lg:block"
                aria-hidden="true"
              />
            )}
            <svg
              width="16"
              height="16"
              viewBox="0 0 10 10"
              className="mx-auto mb-4 text-gold lg:mx-0"
              aria-hidden="true"
            >
              <path
                d="M5 0 10 5 5 10 0 5Z"
                fill="currentColor"
                fillOpacity="0.85"
              />
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
