import type { Dictionary } from "./dictionary";

// I contenuti (trattamenti, prodotti, categorie) restano in data/*.ts con i
// testi italiani; qui cerchiamo la versione tradotta per slug e, se manca,
// torniamo al testo italiano del file dati.

type Voce = { nome?: string; descrizioneBreve?: string; sottotitolo?: string };

function voce(blocco: unknown, chiave: string): Voce {
  return (blocco as Record<string, Voce | undefined>)[chiave] ?? {};
}

export function nomeTrattamento(
  d: Dictionary,
  t: { slug: string; nome: string }
): string {
  return voce(d.treatments, t.slug).nome ?? t.nome;
}

export function descrTrattamento(
  d: Dictionary,
  t: { slug: string; descrizioneBreve: string }
): string {
  return voce(d.treatments, t.slug).descrizioneBreve ?? t.descrizioneBreve;
}

export function nomeProdotto(
  d: Dictionary,
  p: { slug: string; nome: string }
): string {
  return voce(d.products, p.slug).nome ?? p.nome;
}

export function descrProdotto(
  d: Dictionary,
  p: { slug: string; descrizioneBreve: string }
): string {
  return voce(d.products, p.slug).descrizioneBreve ?? p.descrizioneBreve;
}

export function nomeCategoria(
  d: Dictionary,
  c: { slug: string; nome: string }
): string {
  return voce(d.shopCategories, c.slug).nome ?? c.nome;
}

export function sottotitoloCategoria(
  d: Dictionary,
  c: { slug: string; sottotitolo: string }
): string {
  return voce(d.shopCategories, c.slug).sottotitolo ?? c.sottotitolo;
}

function etichetta(blocco: unknown, chiave: string): string {
  return (blocco as Record<string, string | undefined>)[chiave] ?? chiave;
}

// Categoria di un trattamento (Mani, Colore, Estensioni, Piedi, Capelli)
export function categoriaTrattamento(d: Dictionary, nome: string): string {
  return etichetta(d.treatmentCategories, nome);
}

// Filtro della galleria (Nail Art, Semipermanente, …)
export function categoriaGalleria(d: Dictionary, nome: string): string {
  return etichetta(d.galleryCategories, nome);
}

// Giorno della settimana come appare in data/salon.ts
export function giorno(d: Dictionary, nome: string): string {
  return etichetta(d.giorni, nome);
}

// "Chiuso" negli orari
export function orarioChiuso(d: Dictionary, orario: string): string {
  return orario === "Chiuso" ? d.common.chiuso : orario;
}


// --- Testi lunghi -----------------------------------------------------
// Stessa regola: se la lingua non ha la chiave, si usa il testo italiano
// che sta nel file dati.

type Fase = { titolo: string; testo: string };
type Faq = { domanda: string; risposta: string };

type TrattamentoLungo = {
  descrizione: string;
  perChi: string;
  fasi: Fase[];
  aftercare: string[];
  faq: Faq[];
};

export function trattamentoLungo(
  d: Dictionary,
  t: TrattamentoLungo & { slug: string }
): TrattamentoLungo {
  const v = voce(d.treatments, t.slug) as Partial<TrattamentoLungo>;
  return {
    descrizione: v.descrizione ?? t.descrizione,
    perChi: v.perChi ?? t.perChi,
    fasi: v.fasi ?? t.fasi,
    aftercare: v.aftercare ?? t.aftercare,
    faq: v.faq ?? t.faq,
  };
}

type ProdottoLungo = { descrizione: string; caratteristiche: string[] };

export function prodottoLungo(
  d: Dictionary,
  p: ProdottoLungo & { slug: string }
): ProdottoLungo {
  const v = voce(d.products, p.slug) as Partial<ProdottoLungo>;
  return {
    descrizione: v.descrizione ?? p.descrizione,
    caratteristiche: v.caratteristiche ?? p.caratteristiche,
  };
}

// Didascalia di una foto della galleria (serve anche agli screen reader)
export function altGalleria(
  d: Dictionary,
  item: { id: string; alt: string }
): string {
  const alt = d.galleryAlt as unknown as Record<string, string | undefined>;
  return alt[item.id] ?? item.alt;
}

// Sezioni di una pagina legale
export function sezioniLegali(
  d: Dictionary,
  slug: string,
  fallback: { titolo: string; paragrafi: string[] }[]
): { titolo: string; paragrafi: string[] }[] {
  const pagina = (
    d.legale as unknown as Record<
      string,
      { sezioni?: { titolo: string; paragrafi: string[] }[] } | undefined
    >
  )[slug];
  return pagina?.sezioni ?? fallback;
}
