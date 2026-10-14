// =====================================================================
//  PRENOTAZIONE ONLINE
//  L'indirizzo vive in data/salon.ts (`salon.bookingUrl`), insieme agli
//  altri dati dell'attività: qui ci sono solo le scorciatoie usate dai
//  componenti. Per cambiare destinazione si modifica salon.ts.
// =====================================================================

import { salon } from "@/data/salon";

export const BOOKING_URL = salon.bookingUrl;

// Attributi da applicare a ogni link di prenotazione: si apre in una
// nuova scheda, senza dare alla pagina di destinazione accesso a questa.
export const BOOKING_LINK_PROPS = {
  href: BOOKING_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
