// =====================================================================
//  TESTI DEL SITO
//
//  I testi NON stanno più qui: sono in /messages/<lingua>.json, un file
//  per lingua (it, fr, en, de, es, pt, ar). Modifica quelli.
//
//  `site` resta disponibile come scorciatoia all'italiano, per i punti in
//  cui serve un testo fuori dal contesto di una richiesta. Nelle pagine usa
//  `getDict()` (server) o `useDict()` (client): rispettano la lingua scelta.
// =====================================================================

import { getDictionary } from "@/lib/intl/dictionary";

export const site = getDictionary("it");
