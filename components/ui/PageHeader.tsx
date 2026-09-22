import FadeIn from "../FadeIn";
import Ornament from "./Ornament";

// Intestazione standard delle pagine interne: fondo scuro, eyebrow oro,
// titolo serif e introduzione.
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-ink-line bg-ink-soft pattern-lux">
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(217,174,69,0.16), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="container-luxe relative py-16 text-center sm:py-20 lg:py-24">
        <FadeIn>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="heading-xl mt-4 text-cream">{title}</h1>
          <Ornament className="mt-6" width="w-20" />
          {intro && (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
              {intro}
            </p>
          )}
        </FadeIn>
      </div>
    </header>
  );
}
