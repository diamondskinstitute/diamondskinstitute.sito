"use client";

// =====================================================================
//  CARRELLO — stato client persistito in localStorage.
//  Nessun backend: il carrello vive nel browser finché non si completa
//  il checkout, che invia l'ordine a /api/orders.
// =====================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { shippingCost } from "@/lib/format";

export type CartItem = {
  // Chiave univoca: stesso prodotto con varianti diverse = righe diverse
  key: string;
  slug: string;
  nome: string;
  immagine: string;
  prezzoUnitario: number;
  quantita: number;
  varianteId?: string;
  varianteNome?: string;
};

type CartValue = {
  items: CartItem[];
  // Somma delle quantità, per il contatore nell'header
  count: number;
  subtotale: number;
  spedizione: number;
  totale: number;
  add: (item: Omit<CartItem, "key" | "quantita">, quantita?: number) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantita: number) => void;
  clear: () => void;
  // Cassetto laterale del carrello
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  // false finché non abbiamo letto localStorage (evita il mismatch SSR)
  hydrated: boolean;
};

const CartContext = createContext<CartValue | null>(null);

const STORAGE_KEY = "k-institute-cart";

function makeKey(slug: string, varianteId?: string): string {
  return varianteId ? `${slug}::${varianteId}` : slug;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Ripristino dal localStorage al primo mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed as CartItem[]);
      }
    } catch {
      /* localStorage non disponibile: si parte da carrello vuoto */
    }
    setHydrated(true);
  }, []);

  // Salvataggio a ogni modifica (solo dopo l'idratazione, per non
  // sovrascrivere il carrello salvato con l'array vuoto iniziale)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* quota piena o storage bloccato: si prosegue senza persistenza */
    }
  }, [items, hydrated]);

  const add = useCallback(
    (item: Omit<CartItem, "key" | "quantita">, quantita = 1) => {
      const key = makeKey(item.slug, item.varianteId);
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) =>
            i.key === key ? { ...i, quantita: i.quantita + quantita } : i
          );
        }
        return [...prev, { ...item, key, quantita }];
      });
      setDrawerOpen(true);
    },
    []
  );

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantita: number) => {
    setItems((prev) =>
      quantita <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantita } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartValue>(() => {
    const subtotale = items.reduce(
      (sum, i) => sum + i.prezzoUnitario * i.quantita,
      0
    );
    const spedizione = shippingCost(subtotale);
    return {
      items,
      count: items.reduce((sum, i) => sum + i.quantita, 0),
      subtotale,
      spedizione,
      totale: subtotale + spedizione,
      add,
      remove,
      setQuantity,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      hydrated,
    };
  }, [items, add, remove, setQuantity, clear, drawerOpen, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve essere usato dentro <CartProvider>");
  return ctx;
}
