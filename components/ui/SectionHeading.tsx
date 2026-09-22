import FadeIn from "../FadeIn";
import Ornament from "./Ornament";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  // true quando la sezione è su fondo crema invece che su fondo scuro
  onLight?: boolean;
  ornament?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  onLight = false,
  ornament = true,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <FadeIn
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className={onLight ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</span>
      )}
      <h2
        className={`heading-lg mt-4 ${onLight ? "text-ink" : "text-cream"}`}
      >
        {title}
      </h2>
      {ornament && (
        <Ornament className={`mt-5 ${isCenter ? "" : "justify-start"}`} width="w-16" />
      )}
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            onLight ? "text-ink/70" : "text-cream/70"
          }`}
        >
          {intro}
        </p>
      )}
    </FadeIn>
  );
}
