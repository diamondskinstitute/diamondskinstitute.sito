"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart/context";
import { site } from "@/data/site";
import { salon } from "@/data/salon";
import { formatPrice } from "@/lib/format";
import { MinusIcon, PlusIcon, TrashIcon } from "../ui/Icons";

export default function CartContents() {
  const cart = useCart();

  // Prima dell'idratazione il carrello è vuoto per definizione: evitiamo
  // di mostrare "carrello vuoto" per una frazione di secondo.
  if (!cart.hydrated) {
    return <p className="py-20 text-center text-cream/50">Carico il carrello…</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="rounded-card border border-ink-line bg-ink-soft py-20 text-center">
        <p className="text-cream/60">{site.carrello.vuoto}</p>
        <Link href={site.carrello.vuotoCta.href} className="btn-primary mt-7">
          {site.carrello.vuotoCta.label}
        </Link>
      </div>
    );
  }

  const mancante = salon.shop.spedizioneGratuitaDa - cart.subtotale;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
      <ul className="divide-y divide-ink-line border-y border-ink-line">
        {cart.items.map((item) => (
          <li key={item.key} className="flex gap-5 py-6">
            <Link
              href={`/shop/product/${item.slug}`}
              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-card border border-ink-line"
            >
              <Image
                src={item.immagine}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <Link
                href={`/shop/product/${item.slug}`}
                className="font-serif text-lg text-cream transition-colors hover:text-gold-light"
              >
                {item.nome}
              </Link>
              {item.varianteNome && (
                <p className="mt-0.5 text-xs text-cream/45">
                  {item.varianteNome}
                </p>
              )}
              <p className="mt-1 text-sm text-cream/55">
                {formatPrice(item.prezzoUnitario)} cad.
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center rounded-luxe border border-ink-line">
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.key, item.quantita - 1)}
                    className="px-3 py-2 text-cream/70 transition-colors hover:text-gold-light"
                    aria-label="Diminuisci quantità"
                  >
                    <MinusIcon />
                  </button>
                  <span className="min-w-[2.5ch] text-center text-sm text-cream">
                    {item.quantita}
                  </span>
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.key, item.quantita + 1)}
                    className="px-3 py-2 text-cream/70 transition-colors hover:text-gold-light"
                    aria-label="Aumenta quantità"
                  >
                    <PlusIcon />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => cart.remove(item.key)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wide2 text-cream/45 transition-colors hover:text-gold-light"
                >
                  <TrashIcon size={14} /> {site.carrello.rimuovi}
                </button>
              </div>
            </div>

            <span className="shrink-0 text-base text-gold-light">
              {formatPrice(item.prezzoUnitario * item.quantita)}
            </span>
          </li>
        ))}
      </ul>

      {/* Riepilogo */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-ink-line bg-ink-soft p-6">
          <h2 className="font-serif text-xl text-cream">
            {site.checkout.sezioneRiepilogo}
          </h2>

          {mancante > 0 && (
            <p className="mt-5 rounded-luxe border border-gold/25 bg-gold/5 px-3 py-2.5 text-center text-xs text-gold-light">
              {site.carrello.mancanoPerSpedizioneGratuita(formatPrice(mancante))}
            </p>
          )}

          <dl className="mt-6 space-y-2.5 text-sm">
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
            <div className="flex justify-between border-t border-ink-line pt-3 text-lg">
              <dt className="font-serif text-cream">{site.carrello.totale}</dt>
              <dd className="text-gold-light">{formatPrice(cart.totale)}</dd>
            </div>
          </dl>

          <Link href="/checkout" className="btn-primary mt-7 w-full">
            {site.carrello.vaiAlCheckout}
          </Link>
          <Link
            href="/shop"
            className="mt-4 block text-center text-xs uppercase tracking-wide2 text-cream/55 transition-colors hover:text-gold-light"
          >
            {site.carrello.continuaAcquisti}
          </Link>
        </div>
      </aside>
    </div>
  );
}
