"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/context";
import { priceWithVariant, type Product } from "@/data/products";
import { useDict } from "@/lib/intl/client";
import { CartIcon, CheckIcon } from "../ui/Icons";
import { SHOP_ATTIVO } from "@/lib/shop-status";

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
  const site = useDict();
  const cart = useCart();
  const [added, setAdded] = useState(false);

  // Lo shop online non è ancora attivo: il pulsante resta visibile ma
  // non cliccabile, con l'etichetta "Coming soon".
  if (!SHOP_ATTIVO) {
    return (
      <button
        type="button"
        className={className}
        disabled
        aria-disabled="true"
        title={site.shop.comingSoonAria}
      >
        <CartIcon size={16} />
        {label ?? site.shop.aggiungiAlCarrello} · {site.shop.comingSoon}
      </button>
    );
  }

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
      quantita,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {added ? <CheckIcon size={16} /> : <CartIcon size={16} />}
      {added ? "Aggiunto" : (label ?? site.shop.aggiungiAlCarrello)}
    </button>
  );
}
