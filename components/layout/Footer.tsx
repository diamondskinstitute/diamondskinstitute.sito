import Link from "next/link";
import { salon, emailUrl, telUrl } from "@/data/salon";
import { footerNav, legalNav } from "@/data/navigation";
import { site } from "@/data/site";
import BrandLogo from "../ui/BrandLogo";
import Newsletter from "./Newsletter";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "../ui/Icons";

export default function Footer() {
  const anno = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-line bg-ink-soft pattern-lux">
      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-4 lg:gap-10">
        {/* Colonna 1 — marchio + newsletter */}
        <div className="lg:col-span-1">
          <BrandLogo />
          <p className="mt-5 text-sm leading-relaxed text-cream/55">
            {site.footer.claim}
          </p>
          <div className="mt-8">
            <Newsletter />
          </div>
        </div>

        {/* Colonne 2 e 3 — navigazione */}
        {footerNav.map((col) => (
          <nav key={col.titolo} aria-label={col.titolo}>
            <h2 className="eyebrow">{col.titolo}</h2>
            <ul className="mt-5 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Colonna 4 — contatti e orari */}
        <div>
          <h2 className="eyebrow">{site.footer.contattiTitolo}</h2>
          <ul className="mt-5 space-y-3 text-sm text-cream/65">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-gold/70" />
              <a
                href={salon.mappaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet"
              >
                {salon.indirizzo.completo}
              </a>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 shrink-0 text-gold/70" />
              <a href={telUrl} className="link-quiet">
                {salon.telefono}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 shrink-0 text-gold/70" />
              <a href={emailUrl} className="link-quiet break-all">
                {salon.email}
              </a>
            </li>
          </ul>

          <h2 className="eyebrow mt-8">{site.footer.orariTitolo}</h2>
          <ul className="mt-5 space-y-1.5 text-sm">
            {salon.orari.map((o) => (
              <li key={o.giorno} className="flex justify-between gap-4">
                <span className="text-cream/65">{o.giorno}</span>
                <span className={o.chiuso ? "text-cream/35" : "text-gold-light"}>
                  {o.orario}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-8">{site.footer.seguici}</h2>
          <div className="mt-4 flex gap-3">
            <a
              href={salon.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${salon.instagram.handle}`}
              className="rounded-luxe border border-ink-line p-2.5 text-cream/70 transition-all duration-300 hover:border-gold/45 hover:text-gold-light"
            >
              <InstagramIcon />
            </a>
            <a
              href={salon.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Facebook ${salon.facebook.handle}`}
              className="rounded-luxe border border-ink-line p-2.5 text-cream/70 transition-all duration-300 hover:border-gold/45 hover:text-gold-light"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream/40">
            {site.footer.copyright(anno)} · {site.footer.piva}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-cream/45 transition-colors hover:text-gold-light"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
