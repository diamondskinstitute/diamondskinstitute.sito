import { salon } from "@/data/salon";

// Importo nel formato svizzero: 40 → "40", 28.9 → "28.90"
// (gli interi senza decimali, i centesimi con il punto)
function formatAmount(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

// Prezzo completo, valuta prima del numero: 28.9 → "CHF 28.90", 40 → "CHF 40"
export function formatPrice(value: number): string {
  return `${salon.shop.valuta} ${formatAmount(value)}`;
}

// Alias storico: il formato è ormai identico a formatPrice.
export function formatPriceShort(value: number): string {
  return formatPrice(value);
}

// Costo di spedizione. Lo shop non è ancora attivo e le tariffe non sono
// definite: finché è così la spedizione non viene addebitata né mostrata
// (nel riepilogo compare "Coming soon").
export function shippingCost(_subtotal: number): number {
  return 0;
}
