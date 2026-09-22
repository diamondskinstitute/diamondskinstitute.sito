import Image from "next/image";
import Link from "next/link";
import { salon } from "@/data/salon";

type BrandLogoProps = {
  // "mark" = solo il simbolo; "full" = simbolo + nome; "hero" = grande
  variant?: "mark" | "full" | "hero";
  className?: string;
  // Se true non avvolge il logo in un link (es. dentro l'hero)
  static?: boolean;
};

const SIZES: Record<string, number> = { mark: 44, full: 46, hero: 260 };

// Il file del logo ha lo sfondo nero: va sempre su fondo scuro, con
// `logo-blend` (mix-blend-mode: lighten) per fonderlo con lo sfondo.
export default function BrandLogo({
  variant = "full",
  className = "",
  static: isStatic = false,
}: BrandLogoProps) {
  const size = SIZES[variant];
  const isHero = variant === "hero";

  const mark = (
    // Il file ha lo sfondo nero pieno: invece di provare a fonderlo con il
    // fondo (impossibile sopra l'alone dorato dell'hero) lo incorniciamo
    // con un filetto oro, così il bordo del riquadro diventa voluto.
    <span
      className={`relative block shrink-0 overflow-hidden rounded-luxe ring-1 ${
        isHero ? "shadow-gold ring-gold/35" : "ring-gold/25"
      }`}
      style={{ width: size, height: size }}
    >
      <Image
        src={isHero ? salon.logoSrc : salon.logoMarkSrc}
        alt=""
        fill
        sizes={`${size}px`}
        className="logo-blend object-cover"
        priority={isHero}
      />
    </span>
  );

  const content = isHero ? (
    mark
  ) : (
    <span className="flex items-center gap-3">
      {mark}
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className="text-gold-gradient font-serif text-xl tracking-wide">
            {salon.brandName}
          </span>
          {/* Il claim occuperebbe tre righe sotto i 640px: lo nascondiamo */}
          <span className="mt-1 hidden text-[0.55rem] uppercase tracking-luxe text-cream/45 sm:block">
            {salon.claim}
          </span>
        </span>
      )}
    </span>
  );

  if (isStatic) return <span className={className}>{content}</span>;

  return (
    <Link href="/" aria-label={salon.brandName} className={`group ${className}`}>
      {content}
    </Link>
  );
}
