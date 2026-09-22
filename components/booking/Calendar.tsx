"use client";

import { useMemo, useState } from "react";
import {
  formatDateISO,
  isOpenOnWeekday,
  MONTH_NAMES,
} from "@/lib/schedule";
import { ArrowRight } from "../ui/Icons";

const ABBR_MON = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

// Calendario mensile. Sono selezionabili solo i giorni futuri in cui
// l'istituto è aperto (orari in data/salon.ts).
export default function Calendar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (dateISO: string) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  // Indice della prima colonna (griglia con il lunedì come primo giorno)
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const canGoBack =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  const shift = (delta: number) =>
    setCursor(new Date(year, month + delta, 1));

  return (
    <div className="rounded-card border border-ink-line bg-ink-soft p-5">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canGoBack}
          className="rounded-luxe p-2 text-cream/60 transition-colors hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Mese precedente"
        >
          <ArrowRight className="rotate-180" size={16} />
        </button>
        <span className="font-serif text-lg text-cream">
          {MONTH_NAMES[month].charAt(0).toUpperCase() + MONTH_NAMES[month].slice(1)}{" "}
          {year}
        </span>
        <button
          type="button"
          onClick={() => shift(1)}
          className="rounded-luxe p-2 text-cream/60 transition-colors hover:text-gold-light"
          aria-label="Mese successivo"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {ABBR_MON.map((d) => (
          <span
            key={d}
            className="pb-2 text-[0.6rem] uppercase tracking-wide2 text-cream/35"
          >
            {d}
          </span>
        ))}

        {Array.from({ length: firstWeekday }).map((_, i) => (
          <span key={`empty-${i}`} aria-hidden="true" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const iso = formatDateISO(date);
          const passato = date < today;
          const chiuso = !isOpenOnWeekday(date.getDay());
          const disabled = passato || chiuso;
          const attivo = selected === iso;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              aria-pressed={attivo}
              aria-label={`${day} ${MONTH_NAMES[month]} ${year}${
                chiuso ? " — chiuso" : ""
              }`}
              className={`aspect-square rounded-luxe text-sm transition-all duration-300 ${
                attivo
                  ? "bg-gold font-semibold text-ink"
                  : disabled
                    ? "cursor-not-allowed text-cream/15"
                    : "text-cream/75 hover:bg-gold/15 hover:text-gold-light"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[0.68rem] text-cream/35">
        I giorni di chiusura non sono selezionabili.
      </p>
    </div>
  );
}
