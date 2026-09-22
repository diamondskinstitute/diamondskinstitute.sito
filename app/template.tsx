"use client";

import { motion } from "framer-motion";

// Transizione applicata al contenuto di ogni pagina (non alla navbar, che
// resta fissa): un fade con leggero movimento verso l'alto a ogni
// caricamento/navigazione, per un'apertura fluida alla vista.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
