"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart/context";
import { site } from "@/data/site";
import { salon } from "@/data/salon";
import { formatPrice } from "@/lib/format";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "../ui/Icons";

// Cassetto laterale del carrello: si apre aggiungendo un prodotto o dal
// pulsante nell'header.
export default function CartDrawer() {
  const cart = useCart();
  const { drawerOpen, closeDrawer } = cart;

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  const mancante = salon.shop.spedizioneGratuitaDa - cart.subtotale;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-md flex-col border-l border-ink-line bg-ink-soft"
            role="dialog"
            aria-modal="true"
            aria-label={site.carrello.titolo}
          >
            <header className="flex items-center justify-between border-b border-ink-line px-6 py-5">
              <h2 className="font-serif text-xl text-cream">
                {site.carrello.titolo}
                {cart.count > 0 && (
                  <span className="ml-2 text-sm text-gold">({cart.count})</span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 text-cream/70 transition-colors hover:text-gold-light"
                aria-label="Chiudi il carrello"
              >
                <CloseIcon />
              </button>
            </header>

            {cart.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <p className="text-cream/60">{site.carrello.vuoto}</p>
                <Link
                  href={site.carrello.vuotoCta.href}
                  onClick={closeDrawer}
                  className="btn-outline"
                >
                  {site.carrello.vuotoCta.label}
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink-line overflow-y-auto px-6">
                  {cart.items.map((item) => (
                    <li key={item.key} className="flex gap-4 py-5">
                      <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-luxe border border-ink-line">
                        <Image
                          src={item.immagine}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/shop/product/${item.slug}`}
                          onClick={closeDrawer}
                          className="block font-serif text-base leading-tight text-cream transition-colors hover:text-gold-light"
                        >
                          {item.nome}
                        </Link>
                        {item.varianteNome && (
                          <p className="mt-0.5 text-xs text-cream/45">
                            {item.varianteNome}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center rounded-luxe border border-ink-line">
                            <button
                              type="button"
                              onClick={() =>
                                cart.setQuantity(item.key, item.quantita - 1)
                              }
                              className="px-2.5 py-1.5 text-cream/70 transition-colors hover:text-gold-light"
                              aria-label="Diminuisci quantità"
                            >
                              <MinusIcon />
                            </button>
                            <span className="min-w-[2ch] text-center text-sm text-cream">
                              {item.quantita}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                cart.setQuantity(item.key, item.quantita + 1)
                              }
                              className="px-2.5 py-1.5 text-cream/70 transition-colors hover:text-gold-light"
                              aria-label="Aumenta quantità"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                          <span className="text-sm text-gold-light">
                            {formatPrice(item.prezzoUnitario * item.quantita)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.key)}
                        className="self-start p-1 text-cream/40 transition-colors hover:text-gold-light"
                        aria-label={`${site.carrello.rimuovi} ${item.nome}`}
                      >
                        <TrashIcon />
                      </button>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-ink-line px-6 py-5">
                  {mancante > 0 && (
                    <p className="mb-4 rounded-luxe border border-gold/25 bg-gold/5 px-3 py-2 text-center text-xs text-gold-light">
                      {site.carrello.mancanoPerSpedizioneGratuita(
                        formatPrice(mancante)
                      )}
                    </p>
                  )}
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-cream/70">
                      <dt>{site.carrello.subtotale}</dt>
                      <dd>{formatPrice(cart.subtotale)}</dd>
                    </div>
                    <div className="flex justify-between text-cream/70">
                      <dt>{site.carrello.spedizione}</dt>
                      <dd>
                        {cart.spedizione === 0
                          ? site.carrello.spedizioneGratuita
                          : formatPrice(cart.spedizione)}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-ink-line pt-2 text-base text-cream">
                      <dt className="font-serif">{site.carrello.totale}</dt>
                      <dd className="text-gold-light">
                        {formatPrice(cart.totale)}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="btn-primary mt-5 w-full"
                  >
                    {site.carrello.vaiAlCheckout}
                  </Link>
                  <Link
                    href="/carrello"
                    onClick={closeDrawer}
                    className="mt-3 block text-center text-xs uppercase tracking-wide2 text-cream/60 transition-colors hover:text-gold-light"
                  >
                    {site.carrello.titolo}
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
