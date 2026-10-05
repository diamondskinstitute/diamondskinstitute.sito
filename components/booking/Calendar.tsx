"use client";

import { useMemo, useState } from "react";
import { formatDateISO, isOpenOnWeekday } from "@/lib/schedule";
import { useI18n, useDict } from "@/lib/intl/client";
import { formatMonthYear, weekdayAbbr } from "@/lib/intl/dates";
import { ArrowRight } from "../ui/Icons";

// Calendario mensile. Sono selezionabili solo i giorni futuri in cui
// l'istituto è aperto (orari in data/salon.ts).
export default function Calendar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (dateISO: string) => void;
}) {
  const { locale } = useI18n();
  const t = useDict();
  const ABBR_MON = useMemo(() => weekdayAbbr(locale), [locale]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  // Indice della prima colonna (griglia con il lunedì come primo giorno)
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const canGoBack =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  const shift = (delta: number) => setCursor(new Date(year, month + delta, 1));

  return (
    <div className="glass-flat rounded-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canGoBack}
          className="rounded-pill p-2 text-cream/60 transition-colors hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
          aria-label={t.booking.mesePrecedente}
        >
          <ArrowRight className="rotate-180 rtl:rotate-0" size={16} />
        </button>
        <span className="font-serif text-lg capitalize text-cream">
          {formatMonthYear(cursor, locale)}
        </span>
        <button
          type="button"
          onClick={() => shift(1)}
          className="rounded-pill p-2 text-cream/60 transition-colors hover:text-gold-light"
          aria-label={t.booking.meseSuccessivo}
        >
          <ArrowRight size={16} className="rtl:rotate-180" />
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
              aria-label={`${day} ${formatMonthYear(cursor, locale)}${
                chiuso ? ` — ${t.common.chiuso}` : ""
              }`}
              className={`aspect-square rounded-pill text-sm transition-all duration-300 ${
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
