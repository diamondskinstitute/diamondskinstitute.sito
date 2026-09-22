// =====================================================================
//  PAGAMENTI — STUB ISOLATO
//
//  Oggi il pagamento online NON è attivo: l'ordine viene registrato come
//  richiesta e il pagamento si concorda via email/telefono.
//
//  QUANDO SI ATTIVA STRIPE, si tocca SOLO questo file:
//   1. npm i stripe
//   2. Aggiungi STRIPE_SECRET_KEY in .env.local
//   3. Sostituisci il corpo di `createPayment` con la creazione di una
//      Checkout Session e restituisci { stato: "redirect", url }.
//  Il resto del sito (carrello, checkout, API ordini) non cambia.
// =====================================================================

import type { Order } from "./types";

export type PaymentResult =
  // Ordine registrato, pagamento da concordare fuori dal sito
  | { stato: "manuale"; messaggio: string }
  // Pagamento online: il checkout reindirizza a `url`
  | { stato: "redirect"; url: string }
  | { stato: "errore"; messaggio: string };

export const PAYMENTS_ENABLED = false;

export async function createPayment(
  order: Omit<Order, "pagamento">
): Promise<PaymentResult> {
  if (!PAYMENTS_ENABLED) {
    return {
      stato: "manuale",
      messaggio:
        "Richiesta d'ordine registrata. Il pagamento verrà concordato via email.",
    };
  }

  // --- Implementazione Stripe (da attivare) --------------------------
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   line_items: order.righe.map((r) => ({
  //     quantity: r.quantita,
  //     price_data: {
  //       currency: "eur",
  //       unit_amount: Math.round(r.prezzoUnitario * 100),
  //       product_data: { name: r.nome },
  //     },
  //   })),
  //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/grazie?ordine=${order.numero}`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/carrello`,
  // });
  // return { stato: "redirect", url: session.url! };

  return { stato: "errore", messaggio: "Metodo di pagamento non configurato." };
}
