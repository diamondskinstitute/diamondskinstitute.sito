// Link "salta al contenuto": invisibile finché non riceve il focus
// da tastiera. Primo elemento focusabile della pagina.
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-luxe focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
    >
      Vai al contenuto
    </a>
  );
}
