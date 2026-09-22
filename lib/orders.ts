import { promises as fs } from "fs";
import path from "path";
import type { Order, OrderStatus } from "./types";

// File JSON che fa da archivio locale delle richieste d'ordine.
// Stessa logica già usata per le prenotazioni (lib/bookings.ts).
const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(ORDERS_FILE, "[]", "utf-8");
  }
}

export async function readOrders(): Promise<Order[]> {
  await ensureFile();
  const raw = await fs.readFile(ORDERS_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export async function addOrder(order: Order): Promise<void> {
  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);
}

export async function updateOrderStatus(
  id: string,
  stato: OrderStatus
): Promise<Order | null> {
  const orders = await readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx].stato = stato;
  await writeOrders(orders);
  return orders[idx];
}

export async function deleteOrder(id: string): Promise<boolean> {
  const orders = await readOrders();
  const filtered = orders.filter((o) => o.id !== id);
  if (filtered.length === orders.length) return false;
  await writeOrders(filtered);
  return true;
}

// Numero d'ordine leggibile: KI-<anno><mese>-<progressivo>
export function buildOrderNumber(count: number): string {
  const now = new Date();
  const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  return `KI-${ym}-${String(count + 1).padStart(4, "0")}`;
}
