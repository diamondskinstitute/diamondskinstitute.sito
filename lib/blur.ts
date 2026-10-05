// Segnaposto scuro usato da next/image (`placeholder="blur"`): mentre la
// foto carica si vede un rettangolo nei colori del sito, non un riquadro
// bianco, e lo spazio è già riservato (nessuno spostamento del layout).
export const BLUR_DARK =
  "data:image/svg+xml;base64," +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#15110c"/></svg>'
  ).toString("base64");
