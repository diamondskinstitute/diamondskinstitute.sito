import { promises as fs } from "fs";
import path from "path";
import type { Booking, BookingStatus } from "./types";
import { isSlotFree, toBusyInterval, type BusyInterval } from "./schedule";

// Percorso del file che fa da "database" locale delle prenotazioni.
const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(BOOKINGS_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(BOOKINGS_FILE, "[]", "utf-8");
  }
}

export async function readBookings(): Promise<Booking[]> {
  await ensureFile();
  const raw = await fs.readFile(BOOKINGS_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

async function writeBookings(bookings: Booking[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

// Intervalli già occupati in una data (prenotazioni non cancellate).
// La durata di ogni appuntamento viene tenuta in conto, così un
// trattamento di due ore blocca davvero due ore e non un solo slot.
export async function getBusyIntervals(data: string): Promise<BusyInterval[]> {
  const bookings = await readBookings();
  return bookings
    .filter((b) => b.data === data && b.stato !== "cancellata")
    .map((b) => toBusyInterval(b.ora, b.durataMin || 30));
}

// Verifica che un trattamento di `durataMin` possa iniziare a `ora`.
export async function canBook(
  data: string,
  ora: string,
  durataMin: number
): Promise<boolean> {
  const busy = await getBusyIntervals(data);
  return isSlotFree(ora, durataMin, busy);
}

export async function addBooking(booking: Booking): Promise<void> {
  const bookings = await readBookings();
  bookings.push(booking);
  await writeBookings(bookings);
}

export async function updateBookingStatus(
  id: string,
  stato: BookingStatus
): Promise<Booking | null> {
  const bookings = await readBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx].stato = stato;
  await writeBookings(bookings);
  return bookings[idx];
}

export async function deleteBooking(id: string): Promise<boolean> {
  const bookings = await readBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  if (filtered.length === bookings.length) return false;
  await writeBookings(filtered);
  return true;
}
