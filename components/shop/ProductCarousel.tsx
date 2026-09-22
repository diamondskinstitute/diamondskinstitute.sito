"use client";

import { useRef } from "react";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { ArrowRight } from "../ui/Icons";

// Carosello orizzontale a scorrimento nativo (scroll-snap): nessuna
// libreria, funziona con swipe su mobile e con le frecce su desktop.
export default function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.clientWidth + 24 : 320;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
      >
        {products.map((p) => (
          <li
            key={p.slug}
            className="w-[75vw] shrink-0 snap-start sm:w-[45vw] lg:w-[calc((100%-72px)/4)]"
          >
            <ProductCard product={p} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="rounded-luxe border border-ink-line p-3 text-cream/70 transition-all duration-300 hover:border-gold/45 hover:text-gold-light"
          aria-label="Prodotti precedenti"
        >
          <ArrowRight className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="rounded-luxe border border-ink-line p-3 text-cream/70 transition-all duration-300 hover:border-gold/45 hover:text-gold-light"
          aria-label="Prodotti successivi"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
