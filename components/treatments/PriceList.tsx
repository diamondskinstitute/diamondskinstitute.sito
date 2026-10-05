import { priceList, type PriceListItem } from "@/data/price-list";
import { getDict } from "@/lib/intl/server";
import { formatPrice } from "@/lib/format";
import FadeIn from "../FadeIn";

type Listino = ReturnType<typeof getDict>["listino"];

// Valore mostrato a destra di ogni voce del listino.
function itemValue(item: PriceListItem, listino: Listino): string {
  if (item.gratis) return listino.gratis;
  if (item.suRichiesta || item.prezzo === undefined) return listino.suRichiesta;
  return formatPrice(item.prezzo);
}

// Nome della voce tradotto ("<gruppo>.<key>"), con ritorno all'italiano.
function itemName(
  gruppo: string,
  item: PriceListItem,
  listino: Listino,
): string {
  const voci = listino.voci as Record<string, string>;
  return voci[`${gruppo}.${item.key}`] ?? item.nome;
}

// Listino ufficiale, in coda alla pagina /trattamenti.
export default function PriceList() {
  const site = getDict();
  const gruppi = site.listino.gruppi as Record<
    string,
    { titolo: string; sottotitolo?: string }
  >;
  return (
    <section id="listino">
      <FadeIn className="mb-8 flex items-center gap-5">
        <h2 className="heading-md whitespace-nowrap text-cream">
          {site.listino.titolo}
        </h2>
        <span className="gold-rule w-full" />
      </FadeIn>

      <FadeIn>
        <p className="max-w-2xl text-sm leading-relaxed text-cream/60">
          {site.listino.intro}
        </p>
      </FadeIn>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {priceList.map((gruppo, i) => (
          <FadeIn key={gruppo.id} delay={i * 0.07} className="h-full">
            <div className="card-luxe h-full p-6">
              <h3 className="font-serif text-lg leading-snug text-cream">
                {gruppi[gruppo.id]?.titolo ?? gruppo.titolo}
              </h3>
              {gruppo.sottotitolo && (
                <p className="mt-1 text-[0.68rem] uppercase tracking-wide2 text-gold/70">
                  {gruppi[gruppo.id]?.sottotitolo ?? gruppo.sottotitolo}
                </p>
              )}
              <dl className="mt-4 divide-y divide-ink-line border-t border-ink-line">
                {gruppo.items.map((item) => (
                  <div
                    key={itemName(gruppo.id, item, site.listino)}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <dt className="text-sm text-cream/70">
                      {itemName(gruppo.id, item, site.listino)}
                    </dt>
                    <dd className="shrink-0 text-sm text-gold-light">
                      {itemValue(item, site.listino)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
