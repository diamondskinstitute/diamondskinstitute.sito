import { formatPrice } from "@/lib/format";

// Prezzo con eventuale prezzo precedente barrato.
export default function Price({
  value,
  previous,
  className = "",
  size = "md",
}: {
  value: number;
  previous?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  } as const;

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={`font-medium text-gold-light ${sizes[size]}`}>
        {formatPrice(value)}
      </span>
      {previous !== undefined && previous > value && (
        <span className="text-xs text-cream/40 line-through">
          {formatPrice(previous)}
        </span>
      )}
    </span>
  );
}
