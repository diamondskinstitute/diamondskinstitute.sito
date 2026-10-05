import Image from "next/image";
import { BLUR_DARK } from "@/lib/blur";
import Link from "next/link";
import type { Treatment } from "@/data/treatments";
import { formatTreatmentPrice, treatmentImage } from "@/data/treatments";
import { getDict } from "@/lib/intl/server";
import {
  categoriaTrattamento,
  descrTrattamento,
  nomeTrattamento,
} from "@/lib/intl/content";
import { ArrowRight, ClockIcon } from "../ui/Icons";

export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  // Componente server: il dizionario si legge qui, così i dati dei
  // trattamenti (il file dati più pesante) non finiscono nel bundle
  // del browser.
  const t = getDict();
  return (
    <article className="card-luxe group flex flex-col overflow-hidden">
      <Link
        href={`/trattamenti/${treatment.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={treatmentImage(treatment)}
          alt={nomeTrattamento(t, treatment)}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.06]"
          placeholder="blur"
          blurDataURL={BLUR_DARK}
        />
        <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-soft to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.62rem] uppercase tracking-luxe text-gold/70">
          {categoriaTrattamento(t, treatment.categoria)}
        </span>
        <h3 className="mt-2 font-serif text-xl text-cream">
          <Link
            href={`/trattamenti/${treatment.slug}`}
            className="transition-colors hover:text-gold-light"
          >
            {nomeTrattamento(t, treatment)}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/55">
          {descrTrattamento(t, treatment)}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-cream/50">
            <ClockIcon size={14} className="text-gold/60" />
            {treatment.durataLabel}
          </span>
          <span className="text-base text-gold-light">
            {formatTreatmentPrice(treatment, {
              suRichiesta: t.trattamenti.suRichiesta,
              da: t.trattamenti.da,
            })}
          </span>
        </div>

        <Link
          href={`/trattamenti/${treatment.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wide2 text-cream/70 transition-colors hover:text-gold-light"
        >
          {t.common.scopriIlTrattamento}{" "}
          <ArrowRight size={14} className="rtl:rotate-180" />
        </Link>
      </div>
    </article>
  );
}
