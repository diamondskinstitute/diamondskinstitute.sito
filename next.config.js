/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Permette di fare una build di prova senza toccare la cartella .next
  // usata dal server di sviluppo:  NEXT_DIST_DIR=.next-build npm run build
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),

  images: {
    // AVIF prima di WebP: sulle foto del sito pesa circa il 30-40% in meno
    // a parità di resa, ed è il grosso del peso di ogni pagina.
    formats: ["image/avif", "image/webp"],

    // Larghezze realmente usate dal sito. Senza questa riga Next genera
    // anche le varianti da 2048 e 3840 px: nessun riquadro del sito è così
    // largo, e una card finiva per scaricare un'immagine enorme.
    deviceSizes: [360, 640, 828, 1080, 1280, 1600],
    imageSizes: [96, 128, 180, 256, 320, 384],

    // Le foto non cambiano mai: la versione ottimizzata resta in cache
    // un anno invece di essere rigenerata di continuo.
    minimumCacheTTL: 31536000,

    // I segnaposto del sito sono SVG generati da noi (scripts/*.mjs).
    // Next rifiuta gli SVG nell'ottimizzatore se non lo si autorizza.
    // La CSP qui sotto li rende inerti (niente script al loro interno).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline';",
  },

  // I vecchi indirizzi restano validi e rimandano alle nuove pagine
  async redirects() {
    return [
      { source: "/servizi", destination: "/trattamenti", permanent: true },
      { source: "/galleria", destination: "/lavori", permanent: true },
      { source: "/chi-sono", destination: "/chi-siamo", permanent: true },
    ];
  },
};

module.exports = nextConfig;
