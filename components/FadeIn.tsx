"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Wrapper riutilizzabile: fade + leggero movimento verso l'alto allo scroll.
// Animazioni sobrie, coerenti in tutto il sito.

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  once?: boolean;
};

export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
  once = true,
}: FadeInProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
