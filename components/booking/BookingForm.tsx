"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "./Calendar";
import Ornament from "../ui/Ornament";
import { treatments, formatTreatmentPrice } from "@/data/treatments";
import { useDict, useI18n } from "@/lib/intl/client";
import { fill } from "@/lib/intl/fill";
import { formatDateLong } from "@/lib/intl/dates";
import { nomeTrattamento } from "@/lib/intl/content";
import { formatDateHuman } from "@/lib/schedule";
import { CheckIcon, ClockIcon } from "../ui/Icons";

type Step = 1 | 2 | 3 | 4;

type Campi = Record<string, string>;

export default function BookingForm() {
  const t = useDict();
  const { locale } = useI18n();
  const passi = t.booking.passi as unknown as Record<string, string>;
  const dataLeggibile = (iso: string) => formatDateLong(iso, locale);
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  // Trattamento preselezionato dal link /prenota?trattamento=<slug>
  const [trattamento, setTrattamento] = useState("");
  const [data, setData] = useState("");
  const [ora, setOra] = useState("");
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const [slots, setSlots] = useState<string[]>([]);
  const [occupati, setOccupati] = useState<string[]>([]);
  const [caricaSlot, setCaricaSlot] = useState(false);
  const [errore, setErrore] = useState("");
  const [campi, setCampi] = useState<Campi>({});
  const [invio, setInvio] = useState(false);
  const [fatto, setFatto] = useState(false);

  // Preselezione dal querystring (link "Prenota questo trattamento")
  useEffect(() => {
    const slug = searchParams.get("trattamento");
    if (slug && treatments.some((t) => t.slug === slug)) {
      setTrattamento(slug);
      setStep(2);
    }
  }, [searchParams]);

  const selezionato = treatments.find((t) => t.slug === trattamento);

  // Gli orari disponibili dipendono dalla data E dalla durata del
  // trattamento: li chiediamo al server a ogni cambio.
  const caricaOrari = useCallback(
    async (dataISO: string, slug: string) => {
      setCaricaSlot(true);
      setErrore("");
      try {
        const res = await fetch(
          `/api/bookings?data=${dataISO}&trattamento=${slug}`,
        );
        if (!res.ok) throw new Error("Richiesta non riuscita");
        const json = await res.json();
        setSlots(json.disponibili ?? []);
        setOccupati(json.occupati ?? []);
      } catch {
        setErrore(t.booking.erroreOrari);
        setSlots([]);
        setOccupati([]);
      } finally {
        setCaricaSlot(false);
      }
    },
    [t.booking.erroreOrari],
  );

  useEffect(() => {
    if (data && trattamento) {
      setOra("");
      void caricaOrari(data, trattamento);
    }
  }, [data, trattamento, caricaOrari]);

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvio(true);
    setErrore("");
    setCampi({});
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servizioId: trattamento,
          data,
          ora,
          nome,
          telefono,
          email,
          note,
          privacy,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrore(json.error ?? t.common.qualcosaStorto);
        setCampi(json.campi ?? {});
        // Slot occupato nel frattempo: si torna alla scelta dell'orario
        if (res.status === 409) {
          setStep(2);
          void caricaOrari(data, trattamento);
        }
        return;
      }
      setFatto(true);
      setStep(4);
    } catch {
      setErrore(t.common.connessioneFallita);
    } finally {
      setInvio(false);
    }
  };

  // --- Conferma finale -------------------------------------------------
  if (fatto && selezionato) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl glass-flat rounded-card border border-gold/30 p-10 text-center"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
          <CheckIcon size={26} />
        </span>
        <h2 className="heading-md mt-6 text-cream">
          {t.booking.richiestaRicevuta}
        </h2>
        <Ornament className="mt-5" width="w-14" />
        <p className="mt-5 text-cream/70">
          {fill(t.booking.tiAspettiamo, {
            trattamento: nomeTrattamento(t, selezionato),
            data: dataLeggibile(data),
            ora,
          })}
        </p>
        <p className="mt-3 text-sm text-cream/55">{t.booking.confermaEmail}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-outline">
            {t.booking.tornaHome}
          </Link>
          <Link href="/shop" className="btn-primary">
            {t.booking.scopriShop}
          </Link>
        </div>
      </motion.div>
    );
  }

  const canNext =
    (step === 1 && trattamento) || (step === 2 && data && ora) || step === 3;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Indicatore di avanzamento */}
      <ol className="mb-10 flex items-center justify-between gap-2">
        {([1, 2, 3, 4] as Step[]).map((n) => (
          <li key={n} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs transition-colors duration-300 ${
                step >= n
                  ? "border-gold bg-gold/15 text-gold-light"
                  : "border-ink-line text-cream/35"
              }`}
            >
              {n}
            </span>
            <span
              className={`hidden text-[0.65rem] uppercase tracking-wide2 sm:block ${
                step >= n ? "text-cream/75" : "text-cream/30"
              }`}
            >
              {passi[String(n)]}
            </span>
            {n < 4 && (
              <span
                className={`h-px flex-1 ${
                  step > n ? "bg-gold/40" : "bg-ink-line"
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      {errore && (
        <p
          role="alert"
          className="mb-6 rounded-luxe border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {errore}
        </p>
      )}

      <AnimatePresence mode="wait">
        {/* --- 1. Trattamento ------------------------------------------- */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="heading-md text-cream">
              {t.booking.scegliTrattamento}
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {treatments.map((tr) => {
                const attivo = trattamento === tr.slug;
                return (
                  <li key={tr.slug}>
                    <button
                      type="button"
                      onClick={() => setTrattamento(tr.slug)}
                      aria-pressed={attivo}
                      className={`w-full rounded-card border p-4 text-left transition-all duration-300 ${
                        attivo
                          ? "border-gold bg-gold/10"
                          : "border-ink-line bg-ink-soft hover:border-gold/40"
                      }`}
                    >
                      <span className="block font-serif text-lg text-cream">
                        {nomeTrattamento(t, tr)}
                      </span>
                      <span className="mt-1 flex items-center gap-3 text-xs text-cream/50">
                        <span className="inline-flex items-center gap-1">
                          <ClockIcon size={13} className="text-gold/60" />
                          {tr.durataLabel}
                        </span>
                        <span className="text-gold-light">
                          {formatTreatmentPrice(tr, {
                            suRichiesta: t.trattamenti.suRichiesta,
                            da: t.trattamenti.da,
                          })}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}

        {/* --- 2. Data e ora -------------------------------------------- */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="heading-md text-cream">{t.booking.scegliData}</h2>
            {selezionato && (
              <p className="mt-2 text-sm text-cream/55">
                {nomeTrattamento(t, selezionato)} · {selezionato.durataLabel}
              </p>
            )}

            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              <Calendar selected={data} onSelect={setData} />

              <div className="glass-flat rounded-card p-5">
                <h3 className="text-[0.7rem] uppercase tracking-wide2 text-cream/55">
                  {data ? dataLeggibile(data) : t.booking.selezionaData}
                </h3>

                {caricaSlot && (
                  <p className="mt-6 text-sm text-cream/50">
                    {t.booking.caricoOrari}
                  </p>
                )}

                {!caricaSlot && data && slots.length === 0 && (
                  <p className="mt-6 text-sm text-cream/50">
                    {occupati.length > 0
                      ? t.booking.nessunOrarioPrenotato
                      : t.booking.nessunOrario}
                  </p>
                )}

                {!caricaSlot && slots.length > 0 && (
                  <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setOra(s)}
                        aria-pressed={ora === s}
                        className={`rounded-pill border py-2.5 text-sm transition-all duration-300 ${
                          ora === s
                            ? "border-gold bg-gold text-ink"
                            : "border-ink-line text-cream/75 hover:border-gold/45 hover:text-gold-light"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* --- 3. Dati cliente ------------------------------------------ */}
        {step === 3 && (
          <motion.form
            key="step3"
            onSubmit={invia}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="heading-md text-cream">{t.booking.iTuoiDati}</h2>

            {selezionato && (
              <p className="mt-3 rounded-luxe border border-gold/25 bg-gold/5 px-4 py-3 text-sm text-gold-light">
                {nomeTrattamento(t, selezionato)} · {dataLeggibile(data)} ·{" "}
                {ora}
              </p>
            )}

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="b-nome" className="label-luxe">
                  {t.booking.campoNome}
                </label>
                <input
                  id="b-nome"
                  className="field"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  aria-invalid={Boolean(campi.nome)}
                />
                {campi.nome && (
                  <p className="mt-1 text-xs text-red-300">{campi.nome}</p>
                )}
              </div>
              <div>
                <label htmlFor="b-tel" className="label-luxe">
                  {t.booking.campoTelefono}
                </label>
                <input
                  id="b-tel"
                  type="tel"
                  className="field"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  aria-invalid={Boolean(campi.telefono)}
                />
                {campi.telefono && (
                  <p className="mt-1 text-xs text-red-300">{campi.telefono}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="b-email" className="label-luxe">
                  {t.booking.campoEmail}
                </label>
                <input
                  id="b-email"
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
              <div className="sm:col-span-2">
                <label htmlFor="b-note" className="label-luxe">
                  {t.booking.campoNote}
                </label>
                <textarea
                  id="b-note"
                  rows={4}
                  className="field resize-none"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.booking.notePlaceholder}
                />
              </div>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-cream/65">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                required
                className="mt-1 h-4 w-4 shrink-0 accent-[#D9AE45]"
              />
              <span>
                {t.booking.privacyPrefisso}{" "}
                <Link
                  href="/privacy"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  {t.booking.privacyLink}
                </Link>
                . *
              </span>
            </label>
            {campi.privacy && (
              <p className="mt-1 text-xs text-red-300">{campi.privacy}</p>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row-reverse">
              <button type="submit" className="btn-primary" disabled={invio}>
                {invio ? t.booking.inviando : t.booking.conferma}
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep(2)}
              >
                {t.booking.indietro}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Navigazione fra i passi 1 e 2 */}
      {step < 3 && (
        <div className="mt-9 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="button"
            className="btn-primary"
            disabled={!canNext}
            onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
          >
            {t.booking.continua}
          </button>
          {step === 2 && (
            <button
              type="button"
              className="btn-outline"
              onClick={() => setStep(1)}
            >
              {t.booking.indietro}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
