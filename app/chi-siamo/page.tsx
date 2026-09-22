import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import Ornament from "@/components/ui/Ornament";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { salon } from "@/data/salon";
import { ArrowRight, CheckIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: site.chiSiamo.sottotitolo,
};

const c = site.chiSiamo;

export default function ChiSiamoPage() {
  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        title={c.titolo}
        intro={c.sottotitolo}
      />

      {/* --- La storia --------------------------------------------------- */}
      <section className="bg-ink py-16 sm:py-20">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-ink-line">
              <Image
                src="/images/chi-siamo.svg"
                alt={`L'istituto ${salon.brandName}`}
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col justify-center">
            <span className="eyebrow">La storia</span>
            <Ornament className="mt-5 justify-start" width="w-14" />
            <div className="mt-6 space-y-5">
              {c.paragrafi.map((p) => (
                <p key={p.slice(0, 24)} className="text-base leading-relaxed text-cream/70 sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- I valori ---------------------------------------------------- */}
      <section className="border-y border-ink-line bg-ink-soft py-18 sm:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow="I nostri principi" title="Come lavoriamo" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {c.valori.map((v, i) => (
              <FadeIn key={v.titolo} delay={i * 0.08} as="li" className="h-full">
                <div className="card-luxe h-full p-7">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 10 10"
                    className="text-gold"
                    aria-hidden="true"
                  >
                    <path d="M5 0 10 5 5 10 0 5Z" fill="currentColor" />
                  </svg>
                  <h3 className="mt-4 font-serif text-xl text-cream">
                    {v.titolo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">
                    {v.testo}
                  </p>
                </div>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Lo spazio --------------------------------------------------- */}
      <section className="bg-cream-light py-18 sm:py-24">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="eyebrow-dark">Lo spazio</span>
            <h2 className="heading-lg mt-4 text-ink">{c.spazio.titolo}</h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70 sm:text-lg">
              {c.spazio.testo}
            </p>
            <Link href="/contatti" className="btn-outline-dark mt-8">
              Dove trovarci <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-ink/10">
              <Image
                src="/images/studio-ambiente.svg"
                alt="L'ambiente dell'istituto"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Il team ----------------------------------------------------- */}
      <section className="bg-ink py-18 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Il team"
            title={c.team.titolo}
            intro={c.team.testo}
          />
          <ul className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {c.team.membri.map((m, i) => (
              <FadeIn key={m.nome + i} delay={i * 0.08} as="li" className="h-full">
                <article className="card-luxe h-full overflow-hidden">
                  <span className="relative block aspect-[4/5]">
                    <Image
                      src={m.foto}
                      alt={m.nome}
                      fill
                      sizes="(min-width: 640px) 340px, 90vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="block p-6">
                    <h3 className="font-serif text-xl text-cream">{m.nome}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide2 text-gold/75">
                      {m.ruolo}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-cream/55">
                      {m.bio}
                    </p>
                  </span>
                </article>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Certificazioni ---------------------------------------------- */}
      <section className="border-t border-ink-line bg-ink-soft py-18 sm:py-24">
        <div className="container-luxe max-w-narrow">
          <SectionHeading
            eyebrow="Formazione"
            title={c.certificazioni.titolo}
            intro={c.certificazioni.testo}
          />
          <ul className="mt-12 space-y-4">
            {c.certificazioni.elenco.map((e, i) => (
              <FadeIn key={e} delay={i * 0.06} as="li">
                <span className="flex items-start gap-3 rounded-card border border-ink-line bg-ink p-5 text-cream/70">
                  <CheckIcon size={18} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-sm">{e}</span>
                </span>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
