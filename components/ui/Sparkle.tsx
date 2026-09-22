"use client";

import { motion, useReducedMotion } from "framer-motion";

// Glint dorato discreto: una piccola stella che pulsa lentamente.
// Con `prefers-reduced-motion` resta ferma e semitrasparente.
export default function Sparkle({
  size = 18,
  delay = 0,
  className = "",
}: {
  size?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
      initial={{ opacity: reduced ? 0.45 : 0, scale: reduced ? 1 : 0.6 }}
      animate={
        reduced
          ? { opacity: 0.45 }
          : { opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }
      }
      transition={
        reduced
          ? undefined
          : { duration: 3.6, delay, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <path
        d="M12 0c.6 7 4.4 10.8 12 12-7.6 1.2-11.4 5-12 12-.6-7-4.4-10.8-12-12C7.6 10.8 11.4 7 12 0Z"
        fill="url(#sparkleGold)"
      />
      <defs>
        <radialGradient id="sparkleGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF6DA" />
          <stop offset="60%" stopColor="#F6DE8D" />
          <stop offset="100%" stopColor="#D9AE45" stopOpacity="0.2" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
