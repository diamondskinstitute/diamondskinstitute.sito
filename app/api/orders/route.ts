import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addOrder, buildOrderNumber, readOrders } from "@/lib/orders";
import { createPayment } from "@/lib/payments";
import { getProduct, priceWithVariant } from "@/data/products";
import { shippingCost } from "@/lib/format";
import type { Order, OrderLine } from "@/lib/types";

export const dynamic = "force-dynamic";

type IncomingLine = {
  slug?: unknown;
  varianteId?: unknown;
  quantita?: unknown;
};

// POST /api/orders — registra una richiesta d'ordine.
// I prezzi vengono SEMPRE ricalcolati dal catalogo lato server: quelli
// inviati dal browser non sono considerati.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const cliente = (body.cliente ?? {}) as Record<string, unknown>;
  const nome = String(cliente.nome ?? "").trim();
  const email = String(cliente.email ?? "").trim();
  const telefono = String(cliente.telefono ?? "").trim();
  const indirizzo = String(cliente.indirizzo ?? "").trim();
  const cap = String(cliente.cap ?? "").trim();
  const citta = String(cliente.citta ?? "").trim();
  const paese = String(cliente.paese ?? "").trim();
  const note = String(cliente.note ?? "").trim();
  const privacy = Boolean(body.privacy);

  const errori: Record<string, string> = {};
  if (nome.length < 2) errori.nome = "Inserisci nome e cognome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errori.email = "Inserisci un indirizzo email valido.";
  if (!/^[+()\d\s.-]{6,}$/.test(telefono))
    errori.telefono = "Inserisci un numero di telefono valido.";
  if (indirizzo.length < 4) errori.indirizzo = "Inserisci l'indirizzo.";
  if (cap.length < 4) errori.cap = "Inserisci il CAP.";
  if (citta.length < 2) errori.citta = "Inserisci la città.";
  if (paese.length < 2) errori.paese = "Inserisci il paese.";
  if (!privacy) errori.privacy = "È necessario accettare i termini di vendita.";

  const incoming = Array.isArray(body.righe) ? (body.righe as IncomingLine[]) : [];
  if (incoming.length === 0) errori.righe = "Il carrello è vuoto.";

  // Ricostruzione delle righe dal catalogo
  const righe: OrderLine[] = [];
  for (const raw of incoming) {
    const product = getProduct(String(raw.slug ?? ""));
    if (!product) {
      errori.righe = "Uno dei prodotti non è più disponibile.";
      break;
    }
    const quantita = Math.max(1, Math.min(99, Number(raw.quantita) || 1));
    const varianteId = raw.varianteId ? String(raw.varianteId) : undefined;
    const variante = product.varianti?.opzioni.find((o) => o.id === varianteId);
    righe.push({
      slug: product.slug,
      nome: product.nome,
      variante: variante?.nome,
      prezzoUnitario: priceWithVariant(product, varianteId),
      quantita,
    });
  }

  if (Object.keys(errori).length > 0) {
    return NextResponse.json(
      { error: "Alcuni campi non sono validi.", campi: errori },
      { status: 400 }
    );
  }

  const subtotale = righe.reduce(
    (sum, r) => sum + r.prezzoUnitario * r.quantita,
    0
  );
  const spedizione = shippingCost(subtotale);

  const existing = await readOrders();
  const base = {
    id: randomUUID(),
    numero: buildOrderNumber(existing.length),
    createdAt: new Date().toISOString(),
    righe,
    subtotale,
    spedizione,
    totale: subtotale + spedizione,
    cliente: {
      nome,
      email,
      telefono,
      indirizzo,
      cap,
      citta,
      paese,
      note: note || undefined,
    },
    stato: "in-attesa" as const,
  };

  // Stub isolato: oggi restituisce sempre "manuale" (vedi lib/payments.ts)
  const payment = await createPayment(base);
  if (payment.stato === "errore") {
    return NextResponse.json({ error: payment.messaggio }, { status: 502 });
  }

  const order: Order = {
    ...base,
    pagamento: {
      metodo: payment.stato === "redirect" ? "online" : "da concordare",
      stato: "in-attesa",
    },
  };

  await addOrder(order);

  if (payment.stato === "redirect") {
    return NextResponse.json({
      ok: true,
      redirect: payment.url,
      numero: order.numero,
    });
  }

  return NextResponse.json(
    { ok: true, numero: order.numero, messaggio: payment.messaggio },
    { status: 201 }
  );
}
