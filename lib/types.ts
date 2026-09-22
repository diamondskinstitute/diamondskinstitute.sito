// =====================================================================
//  TIPI CONDIVISI — prenotazioni e ordini dello shop
// =====================================================================

export type BookingStatus = "in-attesa" | "confermata" | "cancellata";

export type Booking = {
  id: string;
  createdAt: string; // ISO
  servizioId: string; // slug del trattamento
  servizioNome: string;
  durataMin: number; // durata del trattamento, per bloccare gli slot
  data: string; // "YYYY-MM-DD"
  ora: string; // "HH:MM"
  nome: string;
  telefono: string;
  email: string;
  note?: string;
  stato: BookingStatus;
};

export type NewBookingInput = Omit<
  Booking,
  "id" | "createdAt" | "stato" | "servizioNome" | "durataMin"
>;

// --- Ordini dello shop -------------------------------------------------

export type OrderStatus = "in-attesa" | "confermato" | "annullato";

export type OrderLine = {
  slug: string;
  nome: string;
  variante?: string;
  prezzoUnitario: number;
  quantita: number;
};

export type Order = {
  id: string;
  numero: string; // codice leggibile mostrato alla cliente
  createdAt: string; // ISO
  righe: OrderLine[];
  subtotale: number;
  spedizione: number;
  totale: number;
  cliente: {
    nome: string;
    email: string;
    telefono: string;
    indirizzo: string;
    cap: string;
    citta: string;
    paese: string;
    note?: string;
  };
  stato: OrderStatus;
  // Esito del tentativo di pagamento (oggi sempre lo stub "manuale")
  pagamento: {
    metodo: string;
    stato: "in-attesa" | "pagato" | "fallito";
    riferimento?: string;
  };
};
