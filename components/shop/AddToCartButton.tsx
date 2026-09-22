"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/context";
import { priceWithVariant, type Product } from "@/data/products";
import { site } from "@/data/site";
import { CartIcon, CheckIcon } from "../ui/Icons";

// Aggiunge al carrello. Se il prodotto ha varianti e non ne viene passata
// una (es. dalla card nella griglia), usa la prima opzione come default.
export default function AddToCartButton({
  product,
  varianteId,
  quantita = 1,
  className = "btn-primary w-full",
  label,
}: {
  product: Product;
  varianteId?: string;
  quantita?: number;
  className?: string;
  label?: string;
}) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  if (product.esaurito) {
    return (
      <button type="button" className={className} disabled>
        {site.shop.esaurito}
      </button>
    );
  }

  const selected = varianteId ?? product.varianti?.opzioni[0]?.id;
  const variante = product.varianti?.opzioni.find((o) => o.id === selected);

  const handleClick = () => {
    cart.add(
      {
        slug: product.slug,
        nome: product.nome,
        immagine: product.immagini[0],
        prezzoUnitario: priceWithVariant(product, selected),
        varianteId: selected,
        varianteNome: variante?.nome,
      },
      quantita
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {added ? <CheckIcon size={16} /> : <CartIcon size={16} />}
      {added ? "Aggiunto" : label ?? site.shop.aggiungiAlCarrello}
    </button>
  );
}
