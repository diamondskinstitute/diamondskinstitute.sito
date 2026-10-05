import Link from "next/link";
import { salon, emailUrl, telUrl } from "@/data/salon";
import { footerNav, footerShopCategories, legalNav } from "@/data/navigation";
import { getDict } from "@/lib/intl/server";
import { giorno, nomeCategoria, orarioChiuso } from "@/lib/intl/content";
import BrandLogo from "../ui/BrandLogo";
import InstagramButton from "../ui/InstagramButton";
import Newsletter from "./Newsletter";
import {
  TikTokIcon,
  ThreadsIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "../ui/Icons";

export default function Footer() {
  const site = getDict();
  const navLinks = site.nav.footerLinks as unknown as Record<string, string>;
  const navLegale = site.nav.legale as unknown as Record<string, string>;

  return (
    <footer className="border-t border-gold/10 bg-ink-soft/70 pattern-lux">
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
          <nav key={col.titoloKey} aria-label={site.nav[col.titoloKey]}>
            <h2 className="eyebrow">{site.nav[col.titoloKey]}</h2>
            <ul className="mt-5 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet text-sm">
                    {navLinks[l.key]}
                  </Link>
                </li>
              ))}
              {col.categorie &&
                footerShopCategories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop/${c.slug}`}
                      className="link-quiet text-sm"
                    >
                      {nomeCategoria(site, c)}
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
                <span className="text-cream/65">{giorno(site, o.giorno)}</span>
                <span
                  className={o.chiuso ? "text-cream/35" : "text-gold-light"}
                >
                  {orarioChiuso(site, o.orario)}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-8">{site.footer.seguici}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <InstagramButton variant="footer" />
            <a
              href={salon.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`TikTok ${salon.tiktok.handle}`}
              className="btn-icon h-10 w-10"
            >
              <TikTokIcon />
            </a>
            <a
              href={salon.threads.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Threads ${salon.threads.handle}`}
              className="btn-icon h-10 w-10"
            >
              <ThreadsIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-start">
          <p className="text-xs text-cream/40">
            {site.footer.copyright} · {site.footer.piva}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-cream/45 transition-colors hover:text-gold-light"
                >
                  {navLegale[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
