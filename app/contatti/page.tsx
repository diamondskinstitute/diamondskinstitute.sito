import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";
import { salon, whatsappUrl, telUrl, emailUrl } from "@/data/salon";
import {
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contatti",
  description: site.contatti.intro,
};

export default function ContattiPage() {
  return (
    <>
      <PageHeader
        eyebrow={site.contatti.eyebrow}
        title={site.contatti.titolo}
        intro={site.contatti.intro}
      />

      <div className="bg-ink py-14 sm:py-20">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* --- Informazioni -------------------------------------------- */}
          <FadeIn>
            <h2 className="eyebrow">{site.contatti.indirizzoTitolo}</h2>
            <address className="mt-5 space-y-4 not-italic">
              <p className="flex gap-3 text-cream/75">
                <PinIcon className="mt-0.5 shrink-0 text-gold/70" />
                <a
                  href={salon.mappaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  {salon.indirizzo.completo}
                </a>
              </p>
              <p className="flex gap-3 text-cream/75">
                <PhoneIcon className="mt-0.5 shrink-0 text-gold/70" />
                <a href={telUrl} className="link-quiet">
                  {salon.telefono}
                </a>
              </p>
              <p className="flex gap-3 text-cream/75">
                <MailIcon className="mt-0.5 shrink-0 text-gold/70" />
                <a href={emailUrl} className="link-quiet break-all">
                  {salon.email}
                </a>
              </p>
              <p className="flex gap-3 text-cream/75">
                <InstagramIcon className="mt-0.5 shrink-0 text-gold/70" />
                <a
                  href={salon.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  {salon.instagram.handle}
                </a>
              </p>
            </address>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              <WhatsAppIcon size={16} /> {site.contatti.scriviWhatsapp}
            </a>

            <h2 className="eyebrow mt-12">{site.contatti.orariTitolo}</h2>
            <ul className="mt-5 divide-y divide-ink-line border-y border-ink-line">
              {salon.orari.map((o) => (
                <li key={o.giorno} className="flex justify-between py-3 text-sm">
                  <span className="text-cream/70">{o.giorno}</span>
                  <span className={o.chiuso ? "text-cream/35" : "text-gold-light"}>
                    {o.orario}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-card border border-ink-line">
              <iframe
                src={salon.mappaEmbedUrl}
                title={`Mappa — ${salon.brandName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 grayscale-[0.3]"
              />
            </div>
          </FadeIn>

          {/* --- Modulo contatti ----------------------------------------- */}
          <FadeIn delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </>
  );
}
