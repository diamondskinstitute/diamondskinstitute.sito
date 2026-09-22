"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/context";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

type Campi = Record<string, string>;

export default function CheckoutForm() {
  const cart = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    cap: "",
    citta: "",
    paese: "Italia",
    note: "",
  });
  const [privacy, setPrivacy] = useState(false);
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState("");
  const [campi, setCampi] = useState<Campi>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!cart.hydrated) {
    return <p className="py-20 text-center text-cream/50">Carico il carrello…</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="rounded-card border border-ink-line bg-ink-soft py-20 text-center">
        <p className="text-cream/60">{site.carrello.vuoto}</p>
        <Link href="/shop" className="btn-primary mt-7">
          {site.carrello.vuotoCta.label}
        </Link>
      </div>
    );
  }

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvio(true);
    setErrore("");
    setCampi({});
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: form,
          privacy,
          righe: cart.items.map((i) => ({
            slug: i.slug,
            varianteId: i.varianteId,
            quantita: i.quantita,
          })),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrore(json.error ?? "Qualcosa è andato storto.");
        setCampi(json.campi ?? {});
        return;
      }
      // Quando i pagamenti online saranno attivi (lib/payments.ts), il
      // server risponde con un `redirect` verso la pagina di pagamento.
      if (json.redirect) {
        window.location.href = json.redirect;
        return;
      }
      cart.clear();
      router.push(`/checkout/grazie?ordine=${encodeURIComponent(json.numero)}`);
    } catch {
      setErrore("Connessione non riuscita. Riprova fra poco.");
    } finally {
      setInvio(false);
    }
  };

  return (
    <form onSubmit={invia} className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
      <div>
        <p className="rounded-luxe border border-gold/25 bg-gold/5 px-4 py-3 text-sm text-gold-light">
          {site.checkout.notaPagamento}
        </p>

        {errore && (
          <p
            role="alert"
            className="mt-6 rounded-luxe border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {errore}
          </p>
        )}

        <fieldset className="mt-8">
          <legend className="eyebrow">{site.checkout.sezioneDati}</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              id="c-nome"
              label="Nome e cognome *"
              value={form.nome}
              onChange={set("nome")}
              error={campi.nome}
              required
            />
            <Field
              id="c-tel"
              label="Telefono *"
              type="tel"
              value={form.telefono}
              onChange={set("telefono")}
              error={campi.telefono}
              required
            />
            <div className="sm:col-span-2">
              <Field
                id="c-email"
                label="Email *"
                type="email"
                value={form.email}
                onChange={set("email")}
                error={campi.email}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="eyebrow">{site.checkout.sezioneSpedizione}</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                id="c-indirizzo"
                label="Indirizzo e numero civico *"
                value={form.indirizzo}
                onChange={set("indirizzo")}
                error={campi.indirizzo}
                required
              />
            </div>
            <Field
              id="c-cap"
              label="CAP *"
              value={form.cap}
              onChange={set("cap")}
              error={campi.cap}
              required
            />
            <Field
              id="c-citta"
              label="Città *"
              value={form.citta}
              onChange={set("citta")}
              error={campi.citta}
              required
            />
            <div className="sm:col-span-2">
              <Field
                id="c-paese"
                label="Paese *"
                value={form.paese}
                onChange={set("paese")}
                error={campi.paese}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-note" className="label-luxe">
                Note per la consegna (facoltative)
              </label>
              <textarea
                id="c-note"
                rows={3}
                value={form.note}
                onChange={set("note")}
                className="field resize-none"
              />
            </div>
          </div>
        </fieldset>

        <label className="mt-8 flex items-start gap-3 text-sm text-cream/65">
          <input
            type="checkbox"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[#D9AE45]"
          />
          <span>
            {site.checkout.privacyPrefisso}{" "}
            <Link href="/privacy" className="text-gold underline-offset-4 hover:underline">
              privacy policy
            </Link>{" "}
            {site.checkout.privacyCongiunzione}{" "}
            <Link
              href="/termini-di-vendita"
              className="text-gold underline-offset-4 hover:underline"
            >
              termini di vendita
            </Link>
            . *
          </span>
        </label>
        {campi.privacy && (
          <p className="mt-1 text-xs text-red-300">{campi.privacy}</p>
        )}
      </div>

      {/* Riepilogo ordine */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-ink-line bg-ink-soft p-6">
          <h2 className="font-serif text-xl text-cream">
            {site.checkout.sezioneRiepilogo}
          </h2>

          <ul className="mt-6 divide-y divide-ink-line">
            {cart.items.map((i) => (
              <li key={i.key} className="flex items-center gap-3 py-3">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-luxe border border-ink-line">
                  <Image src={i.immagine} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-cream">
                    {i.nome}
                  </span>
                  <span className="block text-xs text-cream/45">
                    {i.varianteNome ? `${i.varianteNome} · ` : ""}× {i.quantita}
                  </span>
                </span>
                <span className="shrink-0 text-sm text-gold-light">
                  {formatPrice(i.prezzoUnitario * i.quantita)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2.5 border-t border-ink-line pt-5 text-sm">
            <div className="flex justify-between text-cream/70">
              <dt>{site.carrello.subtotale}</dt>
              <dd>{formatPrice(cart.subtotale)}</dd>
            </div>
            <div className="flex justify-between text-cream/70">
              <dt>{site.carrello.spedizione}</dt>
              <dd>
                {cart.spedizione === 0
                  ? site.carrello.spedizioneGratuita
                  : formatPrice(cart.spedizione)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-ink-line pt-3 text-lg">
              <dt className="font-serif text-cream">{site.carrello.totale}</dt>
              <dd className="text-gold-light">{formatPrice(cart.totale)}</dd>
            </div>
          </dl>

          <button type="submit" className="btn-primary mt-7 w-full" disabled={invio}>
            {invio ? site.checkout.inviando : site.checkout.invia}
          </button>
          <Link
            href="/carrello"
            className="mt-4 block text-center text-xs uppercase tracking-wide2 text-cream/55 transition-colors hover:text-gold-light"
          >
            Torna al carrello
          </Link>
        </div>
      </aside>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-luxe">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={Boolean(error)}
        className="field"
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
