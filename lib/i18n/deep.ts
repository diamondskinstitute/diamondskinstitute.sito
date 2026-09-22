import type { Dictionary } from "./it";

// Tipo "parziale in profondità": ogni lingua può fornire solo alcune chiavi,
// le mancanti ricadono automaticamente sull'italiano.
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<U>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export type LocaleDict = DeepPartial<Dictionary>;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v)
  );
}

// Unisce la lingua scelta sopra l'italiano (base). Gli array e i valori
// semplici vengono sostituiti per intero; gli oggetti uniti chiave per chiave.
// deepMerge viene invocato solo con oggetti (mai con array come base).
export function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  if (!override) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const oVal = (override as Record<string, unknown>)[key];
    const bVal = (base as Record<string, unknown>)[key];
    if (oVal === undefined) continue;
    if (isPlainObject(bVal) && isPlainObject(oVal)) {
      out[key] = deepMerge(bVal, oVal);
    } else {
      out[key] = oVal;
    }
  }
  return out as T;
}
