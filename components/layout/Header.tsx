"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { mainNav } from "@/data/navigation";
import { shopCategories } from "@/data/shop-categories";
import { salon } from "@/data/salon";
import { site } from "@/data/site";
import { useCart } from "@/lib/cart/context";
import BrandLogo from "../ui/BrandLogo";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import {
  CartIcon,
  ChevronDown,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "../ui/Icons";

export default function Header() {
  const pathname = usePathname();
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ogni cambio pagina chiude tutti i pannelli aperti
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ease-luxe ${
          scrolled
            ? "border-ink-line bg-ink/95 shadow-lift backdrop-blur-md"
            : "border-transparent bg-ink/80 backdrop-blur-sm"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="container-luxe flex items-center justify-between gap-6 py-4">
          <BrandLogo />

          {/* Menu desktop */}
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Menu principale"
          >
            {mainNav.map((link) =>
              link.megaMenu ? (
                <div
                  key={link.href}
                  className="flex items-center"
                  onMouseEnter={() => setMegaOpen(true)}
                >
                  <Link
                    href={link.href}
                    className={`whitespace-nowrap text-sm tracking-wide2 transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-gold-light"
                        : "text-cream/75 hover:text-gold-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                    aria-label="Mostra le categorie dello shop"
                    className="ml-1 p-1 text-cream/60 transition-colors hover:text-gold-light"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setMegaOpen(false)}
                  className={`whitespace-nowrap text-sm tracking-wide2 transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-gold-light"
                      : "text-cream/75 hover:text-gold-light"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Azioni: ricerca, area riservata, carrello */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-cream/75 transition-colors hover:text-gold-light"
              aria-label={site.ricerca.apri}
            >
              <SearchIcon />
            </button>

            <Link
              href="/admin"
              className="hidden p-2.5 text-cream/75 transition-colors hover:text-gold-light sm:block"
              aria-label="Area riservata"
              title="Area riservata"
            >
              <UserIcon />
            </Link>

            <button
              type="button"
              onClick={cart.openDrawer}
              className="relative p-2.5 text-cream/75 transition-colors hover:text-gold-light"
              aria-label={`${site.carrello.titolo}${
                cart.count > 0 ? ` — ${cart.count} articoli` : ""
              }`}
            >
              <CartIcon />
              {cart.hydrated && cart.count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-ink">
                  {cart.count}
                </span>
              )}
            </button>

            <Link href="/prenota" className="btn-primary ml-2 hidden !py-3 xl:inline-flex">
              Prenota
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-2.5 text-cream/75 transition-colors hover:text-gold-light lg:hidden"
              aria-label="Apri il menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}
        </AnimatePresence>
      </header>

      {/* Menu mobile a schermo intero */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink pattern-lux px-6 pb-28 pt-6 transition-all duration-500 ease-luxe lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <BrandLogo />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="p-2 text-cream/75 transition-colors hover:text-gold-light"
            aria-label="Chiudi il menu"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        <nav className="mt-10" aria-label="Menu principale mobile">
          <ul className="flex flex-col">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block border-b border-ink-line py-4 font-serif text-3xl text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-10">Categorie shop</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
            {shopCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="text-sm text-cream/70 transition-colors hover:text-gold-light"
                >
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 border-t border-ink-line pt-6 text-sm text-cream/55">
          <p>{salon.indirizzo.completo}</p>
          <p className="mt-1">{salon.telefono}</p>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
