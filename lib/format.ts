import { salon } from "@/data/salon";

// Prezzo in formato italiano: 28.9 → "€ 28,90"
export function formatPrice(value: number): string {
  return `${salon.shop.valuta} ${value.toFixed(2).replace(".", ",")}`;
}

// Somma dei prezzi già formattata
export function formatPriceShort(value: number): string {
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(2).replace(".", ",");
  return `${salon.shop.valuta} ${rounded}`;
}

// Costo di spedizione per un dato subtotale (0 = gratuita)
export function shippingCost(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= salon.shop.spedizioneGratuitaDa ? 0 : salon.shop.costoSpedizione;
}
