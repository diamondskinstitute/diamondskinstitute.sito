import type { Metadata } from "next";
import Image from "next/image";
import { BLUR_DARK } from "@/lib/blur";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import Ornament from "@/components/ui/Ornament";
import TreatmentCard from "@/components/treatments/TreatmentCard";
import {
  treatments,
  getTreatment,
  isHiddenTreatment,
  formatTreatmentPrice,
  treatmentImage,
  treatmentGalleryPhotos,
} from "@/data/treatments";
import { getDict } from "@/lib/intl/server";
import {
  categoriaTrattamento,
  descrTrattamento,
  nomeTrattamento,
  trattamentoLungo,
} from "@/lib/intl/content";
import { salon, whatsappUrlFor } from "@/data/salon";
import { formatPrice } from "@/lib/format";
import {
  ArrowRight,
  CheckIcon,
  ClockIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

type Props = { params: { slug: string } };

// Tutte le pagine di dettaglio sono statiche: gli slug sono noti a build time.
export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const t = getTreatment(params.slug);
  // I servizi disattivati non devono essere indicizzati
  if (!t) return { title: "Trattamento non trovato", robots: { index: false } };
  const d = getDict();
  return {
    title: nomeTrattamento(d, t),
    description: descrTrattamento(d, t),
  };
}

export default function TreatmentPage({ params }: Props) {
  const site = getDict();
  const t = getTreatment(params.slug);
  // Servizio disattivato (active: false): la vecchia URL porta al listino
  if (!t && isHiddenTreatment(params.slug)) redirect("/trattamenti");
  if (!t) notFound();

  const altri = treatments.filter((x) => x.slug !== t.slug).slice(0, 3);
  // Testi lunghi nella lingua scelta (con riserva all'italiano)
  const testi = trattamentoLungo(site, t);
  const galleryPhotos = treatmentGalleryPhotos(t);
  // Il link di prenotazione arriva già con il trattamento selezionato
  const prenotaHref = `/prenota?trattamento=${t.slug}`;

  return (
    <>
      {/* --- Intestazione ------------------------------------------------ */}
      <header className="border-b border-ink-line bg-ink-soft">
        <div className="container-luxe grid gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <FadeIn className="order-2 lg:order-1">
            <Link
              href="/trattamenti"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wide2 text-cream/50 transition-colors hover:text-gold-light"
            >
              <ArrowRight size={14} className="rotate-180 rtl:rotate-0" />{" "}
              {site.common.tuttiITrattamenti}
            </Link>
            <span className="eyebrow mt-6 block">
              {categoriaTrattamento(site, t.categoria)}
            </span>
            <h1 className="heading-xl mt-3 text-cream">
              {nomeTrattamento(site, t)}
            </h1>
            <Ornament className="mt-6 justify-start" width="w-16" />
            <p className="mt-6 text-base leading-relaxed text-cream/70 sm:text-lg">
              {testi.descrizione}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-luxe text-cream/45">
                  {site.trattamenti.durata}
                </dt>
                <dd className="mt-1 inline-flex items-center gap-2 font-serif text-xl text-cream">
                  <ClockIcon size={16} className="text-gold/70" />
                  {t.durataLabel}
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-luxe text-cream/45">
                  {site.trattamenti.prezzoDa}
                </dt>
                <dd className="mt-1 font-serif text-xl text-gold-light">
                  {formatTreatmentPrice(t)}
                </dd>
              </div>
            </dl>

            {/* Listino per misura (ricostruzione e refill) */}
            {t.misure && (
              <div className="mt-8">
                <p className="text-[0.65rem] uppercase tracking-luxe text-cream/45">
                  {site.trattamenti.misureTitolo}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.misure.map((m) => (
                    <li
                      key={m.label}
                      className="glass-flat rounded-luxe px-4 py-2 text-center"
                    >
                      <span className="block text-[0.62rem] uppercase tracking-wide2 text-cream/50">
                        {m.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-gold-light">
                        {formatPrice(m.prezzo)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={prenotaHref} className="btn-primary">
                {site.trattamenti.prenotaQuesto}
              </Link>
              <a
                href={whatsappUrlFor(
                  `${salon.whatsappMessaggio} — ${nomeTrattamento(site, t)}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <WhatsAppIcon size={16} /> {site.common.chiediInformazioni}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-ink-line lg:aspect-[4/5]">
              <Image
                src={treatmentImage(t)}
                alt={nomeTrattamento(site, t)}
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL={BLUR_DARK}
              />
            </div>

            {/* Altre foto dalla galleria lavori */}
            {galleryPhotos.length > 0 && (
              <ul className="mt-4 grid grid-cols-3 gap-4">
                {galleryPhotos.map((src) => (
                  <li
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-card border border-ink-line"
                  >
                    <Image
                      src={src}
                      alt={nomeTrattamento(site, t)}
                      fill
                      sizes="(min-width: 1024px) 180px, 30vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DARK}
                    />
                  </li>
                ))}
              </ul>
            )}
          </FadeIn>
        </div>
      </header>

      {/* --- A chi è consigliato ----------------------------------------- */}
      <section className="bg-cream-light py-16">
        <FadeIn className="container-luxe max-w-narrow text-center">
          <span className="eyebrow-dark">{site.trattamenti.aCosaServe}</span>
          <p className="mt-5 font-serif text-2xl leading-relaxed text-ink sm:text-3xl">
            {testi.perChi}
          </p>
        </FadeIn>
      </section>

      {/* --- Le fasi (solo se compilate) ---------------------------------- */}
      {testi.fasi.length > 0 && (
        <section className="bg-ink py-18 sm:py-24">
          <div className="container-luxe">
            <FadeIn className="mb-12 flex items-center gap-5">
              <h2 className="heading-md whitespace-nowrap text-cream">
                {site.trattamenti.comeSiSvolge}
              </h2>
              <span className="gold-rule w-full" />
            </FadeIn>

            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testi.fasi.map((f, i) => (
                <FadeIn
                  key={f.titolo}
                  delay={i * 0.08}
                  as="li"
                  className="h-full"
                >
                  <div className="card-luxe h-full p-6">
                    <span className="font-serif text-3xl text-gold/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-serif text-lg text-cream">
                      {f.titolo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/55">
                      {f.testo}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* --- Aftercare + FAQ --------------------------------------------- */}
      {(testi.aftercare.length > 0 || testi.faq.length > 0) && (
        <section className="border-t border-ink-line bg-ink-soft py-18 sm:py-24">
          <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:gap-20">
            {testi.aftercare.length > 0 && (
              <FadeIn>
                <h2 className="heading-md text-cream">
                  {site.trattamenti.mantenimento}
                </h2>
                <Ornament className="mt-5 justify-start" width="w-14" />
                <ul className="mt-7 space-y-4">
                  {testi.aftercare.map((a) => (
                    <li key={a} className="flex gap-3 text-cream/70">
                      <CheckIcon
                        size={18}
                        className="mt-0.5 shrink-0 text-gold"
                      />
                      <span className="text-sm leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}

            {testi.faq.length > 0 && (
              <FadeIn delay={0.1}>
                <h2 className="heading-md text-cream">
                  {site.trattamenti.domande}
                </h2>
                <Ornament className="mt-5 justify-start" width="w-14" />
                <dl className="mt-7 divide-y divide-ink-line">
                  {testi.faq.map((f) => (
                    <div key={f.domanda} className="py-5">
                      <dt className="font-serif text-lg text-cream">
                        {f.domanda}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-cream/60">
                        {f.risposta}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {/* --- Altri trattamenti ------------------------------------------- */}
      <section className="bg-ink py-18 sm:py-24">
        <div className="container-luxe">
          <FadeIn className="mb-10 flex items-center gap-5">
            <h2 className="heading-md whitespace-nowrap text-cream">
              {site.trattamenti.altriTrattamenti}
            </h2>
            <span className="gold-rule w-full" />
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {altri.map((x, i) => (
              <FadeIn key={x.slug} delay={i * 0.07} className="h-full">
                <TreatmentCard treatment={x} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
