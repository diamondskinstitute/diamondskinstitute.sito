// Transizione d'ingresso di ogni pagina. È una animazione CSS (classe
// .page-enter in globals.css) e non framer-motion: il contenuto non dipende
// più dal JavaScript per diventare visibile, quindi niente schermata vuota
// finché gli script non sono pronti.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
