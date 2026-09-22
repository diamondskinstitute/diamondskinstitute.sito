// Icone SVG inline: nessuna libreria di icone, come da vincoli di progetto.
// Tutte ereditano il colore dal testo (`currentColor`) e la dimensione da
// `size`, così restano coerenti ovunque.

type IconProps = { size?: number; className?: string };

const base = (size: number, className: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export function SearchIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

export function CartIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 8H6" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

export function UserIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function CloseIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  );
}

export function MenuIcon({ size = 22, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function ChevronDown({ size = 16, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowRight({ size = 18, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function TrashIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
    </svg>
  );
}

export function CalendarIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function PhoneIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MailIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PinIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CheckIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m5 12 5 5L19 7" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 22, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.5 3.68 1.4 5.22L2 22l5.06-1.56a9.8 9.8 0 0 0 4.98 1.34h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm5.77 13.93c-.24.68-1.4 1.3-1.93 1.34-.5.05-.96.24-3.24-.67-2.73-1.08-4.45-3.86-4.58-4.04-.13-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.23.24-.27.53-.34.7-.34l.5.01c.16 0 .38-.06.59.45.24.57.8 1.98.87 2.13.07.14.11.3.02.49-.09.18-.13.3-.26.46l-.39.45c-.13.13-.26.28-.11.54.14.27.64 1.06 1.38 1.71.95.85 1.75 1.11 2 1.24.24.14.39.11.53-.07.14-.18.61-.71.78-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.5-1.46H16.6V4.44A21 21 0 0 0 14.3 4.3c-2.3 0-3.87 1.4-3.87 3.98V10.5H7.8v3h2.63V21Z" />
    </svg>
  );
}
