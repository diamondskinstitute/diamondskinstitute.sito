import type { CSSProperties, ReactNode } from "react";

// Dissolvenza verso l'alto, in CSS puro (classe .fade-in-up).
// Prima era animata da framer-motion con opacity 0 iniziale: su connessioni
// lente la pagina restava vuota finché non si caricava il JavaScript.
// Ora il testo è nell'HTML e l'animazione parte da sola; con
// prefers-reduced-motion l'animazione viene neutralizzata.

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  // Accettati per compatibilità con le chiamate esistenti
  y?: number;
  once?: boolean;
};

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: FadeInProps) {
  // Il ritardo a cascata è limitato: con molte card in griglia una
  // sequenza lunga fa sembrare la pagina lenta ad aprirsi.
  const ritardo = Math.min(delay, 0.24);
  const style: CSSProperties | undefined = ritardo
    ? { animationDelay: `${ritardo}s` }
    : undefined;

  return (
    <Tag className={`fade-in-up ${className}`} style={style}>
      {children}
    </Tag>
  );
}
