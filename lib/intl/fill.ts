// Sostituisce i segnaposto {nome} dentro un testo del dizionario.
//
// Vive in un file suo, senza nessun import: i componenti client che la usano
// non devono tirarsi dietro `dictionary.ts`, che carica i file di TUTTE e
// sette le lingue (circa 340 kB di JSON finivano nel bundle del browser).
export function fill(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    k in vars ? String(vars[k]) : m
  );
}
