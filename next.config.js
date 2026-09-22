/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
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
