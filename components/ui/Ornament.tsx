// Filetto oro ornamentale con losanga centrale — richiama le sfaccettature
// del diamante del logo. Usato per separare le sezioni.
export default function Ornament({
  className = "",
  width = "w-24",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className={`gold-rule ${width}`} />
      <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0">
        <path
          d="M5 0 10 5 5 10 0 5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold"
        />
      </svg>
      <span className={`gold-rule ${width}`} />
    </div>
  );
}
