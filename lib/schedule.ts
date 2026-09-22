import { salon } from "@/data/salon";

// Granularità degli orari proposti (un appuntamento può iniziare ogni 30').
export const SLOT_MINUTES = 30;

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function toHHMM(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function isOpenOnWeekday(weekday: number): boolean {
  return Boolean(salon.orariMacchina[weekday]);
}

// Parsing sicuro di una data "YYYY-MM-DD" come data locale.
export function parseDate(dateStr: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Orario di apertura/chiusura di una data, in minuti. null se chiuso.
export function openingMinutes(
  dateStr: string
): { start: number; end: number } | null {
  const date = parseDate(dateStr);
  if (!date) return null;
  const orario = salon.orariMacchina[date.getDay()];
  if (!orario) return null;
  return { start: toMinutes(orario.apertura), end: toMinutes(orario.chiusura) };
}

// Tutti gli orari di inizio teorici di una data, indipendentemente dalle
// prenotazioni già presenti. Un trattamento deve finire entro la chiusura.
export function getSlotsForDate(dateStr: string, durataMin = SLOT_MINUTES): string[] {
  const opening = openingMinutes(dateStr);
  if (!opening) return [];
  const slots: string[] = [];
  for (let t = opening.start; t + durataMin <= opening.end; t += SLOT_MINUTES) {
    slots.push(toHHMM(t));
  }
  return slots;
}

// Intervallo occupato da un appuntamento, in minuti dalla mezzanotte.
export type BusyInterval = { start: number; end: number };

export function toBusyInterval(ora: string, durataMin: number): BusyInterval {
  const start = toMinutes(ora);
  return { start, end: start + durataMin };
}

// Un orario è libero se il trattamento ci sta per intero senza
// sovrapporsi a nessun appuntamento già confermato o in attesa.
export function isSlotFree(
  ora: string,
  durataMin: number,
  busy: BusyInterval[]
): boolean {
  const start = toMinutes(ora);
  const end = start + durataMin;
  return !busy.some((b) => start < b.end && end > b.start);
}

// Orari realmente prenotabili per una data e una durata.
export function getFreeSlots(
  dateStr: string,
  durataMin: number,
  busy: BusyInterval[]
): string[] {
  return getSlotsForDate(dateStr, durataMin).filter((ora) =>
    isSlotFree(ora, durataMin, busy)
  );
}

const GIORNI = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];
const MESI = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

// Formato leggibile in italiano: "Martedì 9 settembre 2026"
export function formatDateHuman(dateStr: string): string {
  const date = parseDate(dateStr);
  if (!date) return dateStr;
  return `${GIORNI[date.getDay()]} ${date.getDate()} ${
    MESI[date.getMonth()]
  } ${date.getFullYear()}`;
}

export { GIORNI as WEEKDAY_NAMES, MESI as MONTH_NAMES };
