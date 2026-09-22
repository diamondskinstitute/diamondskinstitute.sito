import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST /api/contact — riceve il form contatti.
// Per ora registra il messaggio nei log del server. In produzione si può
// collegare a un servizio email (es. Resend, Nodemailer).
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const nome = String(body.nome ?? "").trim();
  const email = String(body.email ?? "").trim();
  const messaggio = String(body.messaggio ?? "").trim();

  const errori: Record<string, string> = {};
  if (nome.length < 2) errori.nome = "Inserisci il tuo nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errori.email = "Inserisci un indirizzo email valido.";
  if (messaggio.length < 5) errori.messaggio = "Scrivi il tuo messaggio.";

  if (Object.keys(errori).length > 0) {
    return NextResponse.json(
      { error: "Alcuni campi non sono validi.", campi: errori },
      { status: 400 }
    );
  }

  console.log("[Contatti] Nuovo messaggio:", { nome, email, messaggio });

  return NextResponse.json({ ok: true });
}
