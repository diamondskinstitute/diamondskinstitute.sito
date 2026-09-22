import { NextResponse } from "next/server";
import {
  readBookings,
  updateBookingStatus,
  deleteBooking,
} from "@/lib/bookings";
import { readOrders, updateOrderStatus, deleteOrder } from "@/lib/orders";
import type { BookingStatus, OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

function checkAuth(body: Record<string, unknown>): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return String(body.password ?? "") === expected;
}

// POST /api/admin — endpoint unico protetto da password.
// action:
//   "list"                       → prenotazioni + richieste d'ordine
//   "confirm" | "cancel" | "delete"        → su una prenotazione (id)
//   "order-confirm" | "order-cancel" | "order-delete" → su un ordine (id)
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  if (!checkAuth(body)) {
    return NextResponse.json({ error: "Password non corretta." }, { status: 401 });
  }

  const action = String(body.action ?? "list");
  const id = body.id ? String(body.id) : "";

  if (action === "list") {
    const bookings = await readBookings();
    bookings.sort((a, b) =>
      `${a.data} ${a.ora}`.localeCompare(`${b.data} ${b.ora}`)
    );
    const orders = await readOrders();
    orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return NextResponse.json({ ok: true, bookings, orders });
  }

  if (!id) {
    return NextResponse.json({ error: "ID mancante." }, { status: 400 });
  }

  // --- Prenotazioni ---------------------------------------------------
  if (action === "confirm" || action === "cancel") {
    const stato: BookingStatus =
      action === "confirm" ? "confermata" : "cancellata";
    const updated = await updateBookingStatus(id, stato);
    if (!updated)
      return NextResponse.json(
        { error: "Prenotazione non trovata." },
        { status: 404 }
      );
    return NextResponse.json({ ok: true, booking: updated });
  }

  if (action === "delete") {
    const ok = await deleteBooking(id);
    if (!ok)
      return NextResponse.json(
        { error: "Prenotazione non trovata." },
        { status: 404 }
      );
    return NextResponse.json({ ok: true });
  }

  // --- Richieste d'ordine ---------------------------------------------
  if (action === "order-confirm" || action === "order-cancel") {
    const stato: OrderStatus =
      action === "order-confirm" ? "confermato" : "annullato";
    const updated = await updateOrderStatus(id, stato);
    if (!updated)
      return NextResponse.json({ error: "Ordine non trovato." }, { status: 404 });
    return NextResponse.json({ ok: true, order: updated });
  }

  if (action === "order-delete") {
    const ok = await deleteOrder(id);
    if (!ok)
      return NextResponse.json({ error: "Ordine non trovato." }, { status: 404 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Azione non valida." }, { status: 400 });
}
