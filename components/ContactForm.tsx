"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { CheckIcon } from "./ui/Icons";

type Campi = Record<string, string>;

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [invio, setInvio] = useState(false);
  const [fatto, setFatto] = useState(false);
  const [errore, setErrore] = useState("");
  const [campi, setCampi] = useState<Campi>({});

  const f = site.contatti.form;

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvio(true);
    setErrore("");
    setCampi({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, messaggio }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrore(json.error ?? "Qualcosa è andato storto.");
        setCampi(json.campi ?? {});
        return;
      }
      setFatto(true);
      setNome("");
      setEmail("");
      setMessaggio("");
    } catch {
      setErrore("Connessione non riuscita. Riprova fra poco.");
    } finally {
      setInvio(false);
    }
  };

  if (fatto) {
    return (
      <div className="rounded-card border border-gold/30 bg-gold/5 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
          <CheckIcon size={22} />
        </span>
        <p className="mt-5 text-cream/75">{f.successo}</p>
      </div>
    );
  }

  return (
    <form onSubmit={invia} className="rounded-card border border-ink-line bg-ink-soft p-7">
      <h2 className="font-serif text-2xl text-cream">{f.titolo}</h2>

      {errore && (
        <p
          role="alert"
          className="mt-5 rounded-luxe border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {errore}
        </p>
      )}

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="ct-nome" className="label-luxe">
            {f.nome} *
          </label>
          <input
            id="ct-nome"
            className="field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            aria-invalid={Boolean(campi.nome)}
          />
          {campi.nome && <p className="mt-1 text-xs text-red-300">{campi.nome}</p>}
        </div>
        <div>
          <label htmlFor="ct-email" className="label-luxe">
            {f.email} *
          </label>
          <input
            id="ct-email"
            type="email"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={Boolean(campi.email)}
          />
          {campi.email && (
            <p className="mt-1 text-xs text-red-300">{campi.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="ct-msg" className="label-luxe">
            {f.messaggio} *
          </label>
          <textarea
            id="ct-msg"
            rows={5}
            className="field resize-none"
            value={messaggio}
            onChange={(e) => setMessaggio(e.target.value)}
            required
            aria-invalid={Boolean(campi.messaggio)}
          />
          {campi.messaggio && (
            <p className="mt-1 text-xs text-red-300">{campi.messaggio}</p>
          )}
        </div>
      </div>

      <button type="submit" className="btn-primary mt-7 w-full" disabled={invio}>
        {invio ? f.inviando : f.invia}
      </button>
    </form>
  );
}
