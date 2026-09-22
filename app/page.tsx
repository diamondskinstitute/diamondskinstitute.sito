import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Ornament from "@/components/ui/Ornament";
import ProductCarousel from "@/components/shop/ProductCarousel";
import TreatmentCard from "@/components/treatments/TreatmentCard";
import { featuredProducts } from "@/data/products";
import { featuredTreatments } from "@/data/treatments";
import { portfolioPreview } from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { salon } from "@/data/salon";
import { ArrowRight, InstagramIcon, PinIcon } from "@/components/ui/Icons";

const s = site.sezioniHome;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />

      {/* --- Prodotti in evidenza --------------------------------------- */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={s.prodotti.eyebrow}
            title={s.prodotti.titolo}
            intro={s.prodotti.intro}
          />
          <FadeIn className="mt-14">
            <ProductCarousel products={featuredProducts} />
          </FadeIn>
          <div className="mt-10 text-center">
            <Link href={s.prodotti.cta.href} className="btn-outline">
              {s.prodotti.cta.label} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Trattamenti in evidenza (sezione chiara, per dare ritmo) ---- */}
      <section className="bg-cream-light py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={s.trattamenti.eyebrow}
            title={s.trattamenti.titolo}
            intro={s.trattamenti.intro}
            onLight
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTreatments.map((t, i) => (
              <FadeIn key={t.slug} delay={i * 0.08} className="h-full">
                <TreatmentCard treatment={t} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={s.trattamenti.cta.href} className="btn-outline-dark">
              {s.trattamenti.cta.label} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Anteprima portfolio ---------------------------------------- */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={s.portfolio.eyebrow}
            title={s.portfolio.titolo}
            intro={s.portfolio.intro}
          />
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {portfolioPreview.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.06}>
                <Link
                  href="/lavori"
                  className="group relative block aspect-square overflow-hidden rounded-card border border-ink-line"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, 45vw"
                    className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/40" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-xs uppercase tracking-wide2 text-gold-light opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.categoria}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={s.portfolio.cta.href} className="btn-outline">
              {s.portfolio.cta.label} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Chi siamo, teaser ------------------------------------------ */}
      <section className="border-y border-ink-line bg-ink-soft py-20 sm:py-24">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-ink-line">
              <Image
                src="/images/studio-ambiente.svg"
                alt="L'istituto K Institute"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="eyebrow">{s.chiSiamo.eyebrow}</span>
            <h2 className="heading-lg mt-4 text-cream">{s.chiSiamo.titolo}</h2>
            <Ornament className="mt-5 justify-start" width="w-16" />
            <p className="mt-6 text-base leading-relaxed text-cream/65 sm:text-lg">
              {s.chiSiamo.testo}
            </p>
            <Link href={s.chiSiamo.cta.href} className="btn-outline mt-8">
              {s.chiSiamo.cta.label} <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* --- Testimonianze ---------------------------------------------- */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={s.testimonianze.eyebrow}
            title={s.testimonianze.titolo}
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.08} as="li" className="h-full">
                <figure className="card-luxe flex h-full flex-col p-7">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    className="text-gold/50"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M9.5 5C6.5 6.6 5 9.2 5 12.8V19h6.2v-6.2H8.4c0-2 .7-3.4 2.4-4.4L9.5 5Zm9 0C15.5 6.6 14 9.2 14 12.8V19h6.2v-6.2h-2.8c0-2 .7-3.4 2.4-4.4L18.5 5Z" />
                  </svg>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream/70">
                    {t.testo}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-ink-line pt-4">
                    <span className="block font-serif text-lg text-cream">
                      {t.nome}
                    </span>
                    <span className="mt-0.5 block text-xs uppercase tracking-wide2 text-gold/70">
                      {t.dettaglio}
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Instagram --------------------------------------------------- */}
      <section className="border-y border-ink-line bg-ink-soft pattern-diamond py-20">
        <FadeIn className="container-luxe text-center">
          <span className="eyebrow">{s.instagram.eyebrow}</span>
          <h2 className="heading-lg mt-4 text-cream">{s.instagram.titolo}</h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/65">
            {s.instagram.testo}
          </p>
          <a
            href={s.instagram.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            <InstagramIcon size={16} /> {s.instagram.cta.label}
          </a>
        </FadeIn>
      </section>

      {/* --- Mappa / contatti -------------------------------------------- */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="eyebrow">{s.mappa.eyebrow}</span>
            <h2 className="heading-lg mt-4 text-cream">{s.mappa.titolo}</h2>
            <Ornament className="mt-5 justify-start" width="w-16" />
            <p className="mt-6 flex items-start gap-3 text-cream/70">
              <PinIcon className="mt-1 shrink-0 text-gold/70" />
              <span>
                {salon.indirizzo.completo}
                <br />
                <span className="text-sm text-cream/50">
                  {salon.telefono} · {salon.email}
                </span>
              </span>
            </p>
            <Link href={s.mappa.cta.href} className="btn-outline mt-8">
              {s.mappa.cta.label} <ArrowRight size={16} />
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-hidden rounded-card border border-ink-line">
              <iframe
                src={salon.mappaEmbedUrl}
                title={`Mappa — ${salon.brandName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[340px] w-full border-0 grayscale-[0.3]"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
