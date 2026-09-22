"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import BrandLogo from "../ui/BrandLogo";
import Ornament from "../ui/Ornament";
import Sparkle from "../ui/Sparkle";
import { ArrowRight } from "../ui/Icons";

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden bg-ink pattern-lux">
      {/* Alone dorato dietro al logo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, rgba(217,174,69,0.20), transparent 62%)",
        }}
        aria-hidden="true"
      />

      <Sparkle className="left-[18%] top-[18%]" size={26} delay={0.2} />
      <Sparkle className="right-[20%] top-[26%]" size={20} delay={1.4} />
      <Sparkle className="left-[30%] top-[46%]" size={14} delay={2.6} />

      <div className="container-luxe relative flex flex-col items-center py-20 text-center sm:py-24 lg:py-32">
        <motion.div {...rise(0)}>
          <BrandLogo variant="hero" static />
        </motion.div>

        <motion.span className="eyebrow mt-10" {...rise(0.12)}>
          {site.hero.eyebrow}
        </motion.span>

        <motion.h1 className="heading-xl mt-4 max-w-3xl text-cream" {...rise(0.2)}>
          {site.hero.titolo}{" "}
          <span className="text-gold-anim block sm:inline">
            {site.hero.titoloAccento}
          </span>
        </motion.h1>

        <motion.div {...rise(0.3)}>
          <Ornament className="mt-7" width="w-20" />
        </motion.div>

        <motion.p
          className="mt-7 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg"
          {...rise(0.38)}
        >
          {site.hero.sottotitolo}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          {...rise(0.46)}
        >
          <Link href={site.hero.ctaPrimaria.href} className="btn-primary">
            {site.hero.ctaPrimaria.label}
          </Link>
          <Link href={site.hero.ctaSecondaria.href} className="btn-outline">
            {site.hero.ctaSecondaria.label} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
