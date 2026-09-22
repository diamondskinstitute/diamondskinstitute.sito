import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addBooking, canBook, getBusyIntervals } from "@/lib/bookings";
import type { Booking } from "@/lib/types";
import { treatments, getTreatment } from "@/data/treatments";
import { getSlotsForDate, isSlotFree, parseDate } from "@/lib/schedule";

export const dynamic = "force-dynamic";

// GET /api/bookings?data=YYYY-MM-DD&trattamento=<slug>
// Restituisce gli orari prenotabili per quella data e quel trattamento,
// tenendo conto della durata e degli appuntamenti già presenti.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");
  const slug = searchParams.get("trattamento") ?? "";

  if (!data || !parseDate(data)) {
    return NextResponse.json(
      { error: "Parametro 'data' mancante o non valido." },
      { status: 400 }
    );
  }

  const trattamento = getTreatment(slug);
  const durataMin = trattamento?.durataMin ?? 30;

  const tutti = getSlotsForDate(data, durataMin);
  const busy = await getBusyIntervals(data);
  const disponibili = tutti.filter((ora) => isSlotFree(ora, durataMin, busy));
  const occupati = tutti.filter((ora) => !disponibili.includes(ora));

  return NextResponse.json({ data, durataMin, slots: tutti, occupati, disponibili });
}

// POST /api/bookings — crea una nuova prenotazione
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const servizioId = String(body.servizioId ?? "").trim();
  const data = String(body.data ?? "").trim();
  const ora = String(body.ora ?? "").trim();
  const nome = String(body.nome ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();
  const email = String(body.email ?? "").trim();
  const note = String(body.note ?? "").trim();
  const privacy = Boolean(body.privacy);

  const errori: Record<string, string> = {};

  const trattamento = treatments.find((t) => t.slug === servizioId);
  if (!trattamento) errori.servizioId = "Seleziona un trattamento valido.";

  const durataMin = trattamento?.durataMin ?? 30;

  if (!parseDate(data)) {
    errori.data = "Seleziona una data valida.";
  } else if (trattamento && !getSlotsForDate(data, durataMin).includes(ora)) {
    errori.ora = "L'orario scelto non è disponibile per questa data.";
  }

  if (nome.length < 2) errori.nome = "Inserisci il tuo nome.";
  if (!/^[+()\d\s.-]{6,}$/.test(telefono))
    errori.telefono = "Inserisci un numero di telefono valido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errori.email = "Inserisci un indirizzo email valido.";
  if (!privacy) errori.privacy = "È necessario accettare la privacy policy.";

  if (Object.keys(errori).length > 0) {
    return NextResponse.json(
      { error: "Alcuni campi non sono validi.", campi: errori },
      { status: 400 }
    );
  }

  // Evita le doppie prenotazioni, considerando l'intera durata
  if (!(await canBook(data, ora, durataMin))) {
    return NextResponse.json(
      {
        error:
          "Questo orario è appena stato prenotato. Scegli un altro slot, per favore.",
        campi: { ora: "Slot non più disponibile." },
      },
      { status: 409 }
    );
  }

  const booking: Booking = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    servizioId,
    servizioNome: trattamento!.nome,
    durataMin,
    data,
    ora,
    nome,
    telefono,
    email,
    note: note || undefined,
    stato: "in-attesa",
  };

  await addBooking(booking);

  return NextResponse.json({ ok: true, booking }, { status: 201 });
}
