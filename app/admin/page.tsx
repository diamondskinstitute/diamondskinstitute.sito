"use client";

import { useState } from "react";
import type { Booking, Order } from "@/lib/types";
import { formatDateHuman } from "@/lib/schedule";
import { formatPrice } from "@/lib/format";
import Ornament from "@/components/ui/Ornament";

// Pannello riservato, protetto dalla password in .env.local
// (ADMIN_PASSWORD). La password non viene salvata: resta in memoria
// finché la scheda è aperta e viaggia con ogni richiesta.

type Tab = "prenotazioni" | "ordini";

const STATO_BOOKING: Record<string, string> = {
  "in-attesa": "border-gold/40 text-gold-light",
  confermata: "border-emerald-500/40 text-emerald-300",
  cancellata: "border-red-500/40 text-red-300",
};

const STATO_ORDER: Record<string, string> = {
  "in-attesa": "border-gold/40 text-gold-light",
  confermato: "border-emerald-500/40 text-emerald-300",
  annullato: "border-red-500/40 text-red-300",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [autenticato, setAutenticato] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<Tab>("prenotazioni");
  const [errore, setErrore] = useState("");
  const [caricamento, setCaricamento] = useState(false);

  const chiama = async (action: string, id?: string) => {
    setCaricamento(true);
    setErrore("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action, id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrore(json.error ?? "Errore.");
        return false;
      }
      if (action === "list") {
        setBookings(json.bookings ?? []);
        setOrders(json.orders ?? []);
        setAutenticato(true);
      }
      return true;
    } catch {
      setErrore("Connessione non riuscita.");
      return false;
    } finally {
      setCaricamento(false);
    }
  };

  const azione = async (action: string, id: string) => {
    const ok = await chiama(action, id);
    if (ok) await chiama("list");
  };

  if (!autenticato) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-ink px-6 py-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void chiama("list");
          }}
          className="w-full max-w-sm rounded-card border border-ink-line bg-ink-soft p-8 text-center"
        >
          <h1 className="heading-md text-cream">Area riservata</h1>
          <Ornament className="mt-5" width="w-14" />
          <p className="mt-5 text-sm text-cream/55">
            Inserisci la password per vedere prenotazioni e richieste d&apos;ordine.
          </p>

          <label htmlFor="admin-pw" className="sr-only">
            Password
          </label>
          <input
            id="admin-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field mt-6 text-center"
            placeholder="Password"
            required
          />

          {errore && (
            <p role="alert" className="mt-4 text-sm text-red-300">
              {errore}
            </p>
          )}

          <button type="submit" className="btn-primary mt-6 w-full" disabled={caricamento}>
            {caricamento ? "Verifico…" : "Entra"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-ink py-14">
      <div className="container-luxe">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="heading-md text-cream">Area riservata</h1>
          <button
            type="button"
            onClick={() => void chiama("list")}
            className="btn-outline !py-2.5"
            disabled={caricamento}
          >
            {caricamento ? "Aggiorno…" : "Aggiorna"}
          </button>
        </div>

        {errore && (
          <p role="alert" className="mt-5 text-sm text-red-300">
            {errore}
          </p>
        )}

        {/* Schede */}
        <div className="mt-8 flex gap-2 border-b border-ink-line">
          {(
            [
              ["prenotazioni", `Prenotazioni (${bookings.length})`],
              ["ordini", `Richieste d'ordine (${orders.length})`],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={`-mb-px border-b-2 px-4 py-3 text-xs uppercase tracking-wide2 transition-colors ${
                tab === id
                  ? "border-gold text-gold-light"
                  : "border-transparent text-cream/50 hover:text-cream"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* --- Prenotazioni --------------------------------------------- */}
        {tab === "prenotazioni" && (
          <div className="mt-8">
            {bookings.length === 0 ? (
              <p className="text-cream/50">Nessuna prenotazione registrata.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map((b) => (
                  <li
                    key={b.id}
                    className="rounded-card border border-ink-line bg-ink-soft p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-serif text-lg text-cream">
                          {b.servizioNome}
                          <span className="ml-3 text-sm text-gold-light">
                            {formatDateHuman(b.data)} · {b.ora}
                          </span>
                        </p>
                        <p className="mt-1.5 text-sm text-cream/60">
                          {b.nome} · {b.telefono} · {b.email}
                        </p>
                        {b.note && (
                          <p className="mt-2 text-sm italic text-cream/45">
                            “{b.note}”
                          </p>
                        )}
                      </div>
                      <span
                        className={`rounded-luxe border px-3 py-1 text-[0.65rem] uppercase tracking-wide2 ${
                          STATO_BOOKING[b.stato]
                        }`}
                      >
                        {b.stato}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <AdminAction
                        label="Conferma"
                        onClick={() => void azione("confirm", b.id)}
                        disabled={b.stato === "confermata"}
                      />
                      <AdminAction
                        label="Annulla"
                        onClick={() => void azione("cancel", b.id)}
                        disabled={b.stato === "cancellata"}
                      />
                      <AdminAction
                        label="Elimina"
                        danger
                        onClick={() => void azione("delete", b.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* --- Ordini ---------------------------------------------------- */}
        {tab === "ordini" && (
          <div className="mt-8">
            {orders.length === 0 ? (
              <p className="text-cream/50">Nessuna richiesta d&apos;ordine.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((o) => (
                  <li
                    key={o.id}
                    className="rounded-card border border-ink-line bg-ink-soft p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-serif text-lg text-cream">
                          {o.numero}
                          <span className="ml-3 text-sm text-gold-light">
                            {formatPrice(o.totale)}
                          </span>
                        </p>
                        <p className="mt-1.5 text-sm text-cream/60">
                          {o.cliente.nome} · {o.cliente.telefono} ·{" "}
                          {o.cliente.email}
                        </p>
                        <p className="text-sm text-cream/45">
                          {o.cliente.indirizzo}, {o.cliente.cap}{" "}
                          {o.cliente.citta} ({o.cliente.paese})
                        </p>
                      </div>
                      <span
                        className={`rounded-luxe border px-3 py-1 text-[0.65rem] uppercase tracking-wide2 ${
                          STATO_ORDER[o.stato]
                        }`}
                      >
                        {o.stato}
                      </span>
                    </div>

                    <ul className="mt-4 divide-y divide-ink-line border-y border-ink-line text-sm">
                      {o.righe.map((r, i) => (
                        <li key={i} className="flex justify-between gap-4 py-2">
                          <span className="text-cream/70">
                            {r.nome}
                            {r.variante ? ` — ${r.variante}` : ""} × {r.quantita}
                          </span>
                          <span className="text-cream/55">
                            {formatPrice(r.prezzoUnitario * r.quantita)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-cream/40">
                      Spedizione:{" "}
                      {o.spedizione === 0 ? "gratuita" : formatPrice(o.spedizione)}{" "}
                      · Pagamento: {o.pagamento.metodo} ({o.pagamento.stato})
                    </p>
                    {o.cliente.note && (
                      <p className="mt-2 text-sm italic text-cream/45">
                        “{o.cliente.note}”
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <AdminAction
                        label="Conferma"
                        onClick={() => void azione("order-confirm", o.id)}
                        disabled={o.stato === "confermato"}
                      />
                      <AdminAction
                        label="Annulla"
                        onClick={() => void azione("order-cancel", o.id)}
                        disabled={o.stato === "annullato"}
                      />
                      <AdminAction
                        label="Elimina"
                        danger
                        onClick={() => void azione("order-delete", o.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminAction({
  label,
  onClick,
  disabled,
  danger,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-luxe border px-4 py-2 text-[0.68rem] uppercase tracking-wide2 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${
        danger
          ? "border-red-500/35 text-red-300 hover:bg-red-500/10"
          : "border-ink-line text-cream/70 hover:border-gold/45 hover:text-gold-light"
      }`}
    >
      {label}
    </button>
  );
}
