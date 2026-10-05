import Image from "next/image";
import Link from "next/link";
import { getDict } from "@/lib/intl/server";
import { BLUR_DARK } from "@/lib/blur";
import BrandLogo from "../ui/BrandLogo";
import Ornament from "../ui/Ornament";
import Sparkle from "../ui/Sparkle";
import { ArrowRight } from "../ui/Icons";

// L'hero è la prima cosa che si vede: niente animazioni in JavaScript.
// La comparsa è una animazione CSS (.fade-in-up) con ritardi scalati, così
// il testo è già nell'HTML ed è leggibile anche prima che lo script parta.
const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

// Foto dell'hero, scelta dalla titolare fra quelle della galleria:
// unghie blu elettrico con cuori di perle e strass su fondo scuro.
// Sfuma nel nero sopra e sotto, così risaltano solo le unghie.
// TODO: per cambiarla basta questa riga (ed eventualmente l'object-position).
const HERO_PHOTO = "/images/portfolio/nails-02.jpg";

export default function Hero() {
  const site = getDict();

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Alone dorato caldo dietro al contenuto */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(ellipse at 62% 10%, rgba(217,174,69,0.18), transparent 64%)",
        }}
        aria-hidden="true"
      />

      {/* Arco dorato decorativo (solo decorazione) */}
      <div
        className="arc-gold pointer-events-none absolute -right-40 top-[-22%] hidden h-[42rem] w-[42rem] opacity-50 lg:block"
        style={{ background: "transparent" }}
        aria-hidden="true"
      />

      <Sparkle className="start-[14%] top-[22%]" size={22} delay={0.2} />
      <Sparkle className="start-[26%] top-[62%]" size={14} delay={2.6} />

      <div className="container-luxe relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-28">
        {/* --- Colonna testo ------------------------------------------- */}
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-start">
          <div className="fade-in-up" {...rise(0)}>
            <BrandLogo variant="hero" static />
          </div>

          <span className="eyebrow fade-in-up mt-8" {...rise(0.06)}>
            {site.hero.eyebrow}
          </span>

          <h1
            className="heading-xl fade-in-up mt-4 max-w-xl text-cream"
            {...rise(0.12)}
          >
            {site.hero.titolo}{" "}
            <span className="accent-gold block sm:inline">
              {site.hero.titoloAccento}
            </span>
          </h1>

          <div className="fade-in-up" {...rise(0.18)}>
            <Ornament
              className="mt-7 justify-center lg:justify-start"
              width="w-16"
            />
          </div>

          <p
            className="fade-in-up mt-7 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg"
            {...rise(0.24)}
          >
            {site.hero.sottotitolo}
          </p>

          <div
            className="fade-in-up mt-10 flex flex-col items-center gap-3 sm:flex-row"
            {...rise(0.3)}
          >
            <Link href={site.hero.ctaPrimaria.href} className="btn-primary">
              {site.hero.ctaPrimaria.label}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
            <Link href={site.hero.ctaSecondaria.href} className="btn-outline">
              {site.hero.ctaSecondaria.label}{" "}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* --- Colonna foto --------------------------------------------
            Su telefono la foto sta dietro al testo, molto scurita;
            da lg in su diventa la colonna di destra. */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 lg:relative lg:inset-auto lg:z-auto"
          aria-hidden="true"
        >
          <div
            className="relative h-full w-full lg:aspect-[5/6] lg:h-auto"
            style={{
              // Tutto il blocco (foto + velature) si dissolve nel nero:
              // sopra, sotto e ai lati non resta nessun bordo netto.
              WebkitMaskImage: "radial-gradient(48% 50% at 54% 48%, #000 34%, rgba(0,0,0,0.5) 72%, transparent 100%)",
              maskImage: "radial-gradient(48% 50% at 54% 48%, #000 34%, rgba(0,0,0,0.5) 72%, transparent 100%)",
            }}
          >
            <Image
              src={HERO_PHOTO}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              placeholder="blur"
              blurDataURL={BLUR_DARK}
              className="object-cover object-[62%_32%] lg:object-[55%_42%]"
            />

            {/* Vignettatura: scurisce i bordi, le mani restano il centro */}
            <span
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(48% 46% at 54% 47%, transparent 24%, rgba(11,9,6,0.3) 62%, rgba(11,9,6,0.9) 100%)",
              }}
            />

            {/* Sfumatura da sinistra: tiene leggibile il titolo */}
            <span
              className="absolute inset-0 bg-ink/[0.72] lg:bg-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(11,9,6,0.92) 0%, rgba(11,9,6,0.42) 26%, rgba(11,9,6,0.04) 58%, transparent 100%)",
              }}
            />

            {/* Sfumatura in alto: la foto nasce dal nero */}
            <span
              className="absolute inset-x-0 top-0 h-[38%]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, var(--ink) 0%, rgba(11,9,6,0.72) 34%, rgba(11,9,6,0.18) 72%, transparent 100%)",
              }}
            />

            {/* Sfumatura in basso: la foto si spegne nel nero */}
            <span
              className="absolute inset-x-0 bottom-0 h-[42%]"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, var(--ink) 0%, rgba(11,9,6,0.78) 32%, rgba(11,9,6,0.22) 70%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
