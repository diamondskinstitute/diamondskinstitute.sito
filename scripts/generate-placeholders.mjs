// =====================================================================
//  Generates every placeholder image of the site, in brand palette
//  (ink + gold + diamond). Run with:
//      node scripts/generate-placeholders.mjs
//
//  Output:
//    public/images/portfolio/*.svg   — portfolio / gallery shots
//    public/images/products/*.svg    — shop product shots
//    public/images/*.svg             — scene images (hero, about, studio)
//
//  Replace any of these with real photos of the same name (or point the
//  data files at the new filenames) — nothing else needs to change.
// =====================================================================
import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, "public", "images");
const PORTFOLIO_DIR = path.join(IMG_DIR, "portfolio");
const PRODUCTS_DIR = path.join(IMG_DIR, "products");

// Brand palette — keep in sync with tailwind.config.ts
const INK = "#0B0906";
const INK_SOFT = "#15110C";
const INK_RAISED = "#1E1810";
const GOLD = "#D9AE45";
const GOLD_LIGHT = "#F6DE8D";
const GOLD_DARK = "#6E4E14";
const CREAM = "#F3EBDD";
const SILVER = "#C8CBD2";

// Ground variations so a grid never looks like the same tile repeated
const GROUNDS = [
  [INK, INK_RAISED],
  [INK_SOFT, "#241C12"],
  [INK, "#2A1F12"],
  [INK_RAISED, INK],
  ["#120E09", "#1F1912"],
];

const SERIF = "Cormorant Garamond, Georgia, 'Times New Roman', serif";
const SANS = "Helvetica, Arial, sans-serif";

function defs(id, groundIndex) {
  const [c1, c2] = GROUNDS[groundIndex % GROUNDS.length];
  return `
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="60%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c1}"/>
    </linearGradient>
    <radialGradient id="halo${id}" cx="50%" cy="38%" r="62%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GOLD_DARK}"/>
      <stop offset="45%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="100%" stop-color="${GOLD_DARK}"/>
    </linearGradient>
    <pattern id="lozenge${id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M20 0 40 20 20 40 0 20Z" fill="none" stroke="${GOLD}" stroke-opacity="0.07" stroke-width="0.8"/>
    </pattern>
  </defs>`;
}

function frame(id, w, h) {
  const m = Math.round(Math.min(w, h) * 0.045);
  return `
  <rect width="${w}" height="${h}" fill="url(#bg${id})"/>
  <rect width="${w}" height="${h}" fill="url(#lozenge${id})"/>
  <rect width="${w}" height="${h}" fill="url(#halo${id})"/>
  <rect x="${m}" y="${m}" width="${w - m * 2}" height="${h - m * 2}"
        fill="none" stroke="${GOLD}" stroke-opacity="0.3" stroke-width="1"/>`;
}

function caption(w, h, label, sub) {
  const big = Math.round(Math.min(w, h) * 0.075);
  const small = Math.round(Math.min(w, h) * 0.026);
  return `
  <text x="50%" y="${h * 0.54}" text-anchor="middle" font-family="${SERIF}"
        font-size="${big}" fill="${CREAM}" fill-opacity="0.9">${label}</text>
  <path d="M${w * 0.38} ${h * 0.58} L${w * 0.62} ${h * 0.58}" stroke="${GOLD}" stroke-opacity="0.65" stroke-width="1"/>
  <text x="50%" y="${h * 0.63}" text-anchor="middle" font-family="${SANS}"
        font-size="${small}" letter-spacing="${small * 0.28}" fill="${GOLD}"
        fill-opacity="0.85">${sub}</text>`;
}

// Stylised nail / hand motif for portfolio tiles
function nailMotif(w, h, id) {
  const cx = w * 0.5;
  const cy = h * 0.34;
  const r = Math.min(w, h) * 0.13;
  return `
  <g opacity="0.95">
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.62}" ry="${r}" fill="url(#gold${id})" fill-opacity="0.85"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.62}" ry="${r}" fill="none" stroke="${GOLD_LIGHT}" stroke-opacity="0.7" stroke-width="1.5"/>
    <path d="M${cx - r * 0.62} ${cy + r * 0.2} Q${cx} ${cy + r * 0.62} ${cx + r * 0.62} ${cy + r * 0.2}"
          fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="2"/>
    <circle cx="${cx - r * 0.22}" cy="${cy - r * 0.42}" r="${r * 0.1}" fill="#FFF6DA" fill-opacity="0.9"/>
    <ellipse cx="${cx - r * 1.9}" cy="${cy + r * 0.5}" rx="${r * 0.45}" ry="${r * 0.72}" fill="${SILVER}" fill-opacity="0.2"/>
    <ellipse cx="${cx + r * 1.9}" cy="${cy + r * 0.5}" rx="${r * 0.45}" ry="${r * 0.72}" fill="${SILVER}" fill-opacity="0.2"/>
  </g>`;
}

// Stylised bottle / jar motif for product tiles
function productMotif(w, h, id, shape) {
  const cx = w * 0.5;
  const top = h * 0.16;
  const s = Math.min(w, h);

  if (shape === "jar") {
    return `
  <g>
    <rect x="${cx - s * 0.16}" y="${top + s * 0.1}" width="${s * 0.32}" height="${s * 0.26}" rx="6"
          fill="url(#gold${id})" fill-opacity="0.22" stroke="${GOLD}" stroke-opacity="0.8" stroke-width="2"/>
    <rect x="${cx - s * 0.19}" y="${top}" width="${s * 0.38}" height="${s * 0.11}" rx="4"
          fill="url(#gold${id})" stroke="${GOLD_LIGHT}" stroke-opacity="0.6" stroke-width="1.5"/>
    <path d="M${cx - s * 0.1} ${top + s * 0.18} L${cx + s * 0.06} ${top + s * 0.18}" stroke="#FFF6DA" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>
  </g>`;
  }
  if (shape === "box") {
    return `
  <g>
    <rect x="${cx - s * 0.23}" y="${top}" width="${s * 0.46}" height="${s * 0.34}" rx="6"
          fill="url(#gold${id})" fill-opacity="0.16" stroke="${GOLD}" stroke-opacity="0.8" stroke-width="2"/>
    <path d="M${cx - s * 0.23} ${top + s * 0.11} L${cx + s * 0.23} ${top + s * 0.11}" stroke="${GOLD}" stroke-opacity="0.65" stroke-width="1.5"/>
    <path d="M${cx} ${top} L${cx} ${top + s * 0.11}" stroke="${GOLD}" stroke-opacity="0.65" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${top + s * 0.22}" r="${s * 0.05}" fill="none" stroke="${GOLD_LIGHT}" stroke-opacity="0.7" stroke-width="1.5"/>
  </g>`;
  }
  if (shape === "tool") {
    return `
  <g stroke="url(#gold${id})" fill="none" stroke-linecap="round">
    <path d="M${cx - s * 0.14} ${top} L${cx - s * 0.02} ${top + s * 0.3}" stroke-width="7"/>
    <path d="M${cx + s * 0.14} ${top} L${cx + s * 0.02} ${top + s * 0.3}" stroke-width="7"/>
    <circle cx="${cx}" cy="${top + s * 0.17}" r="${s * 0.028}" fill="${GOLD_LIGHT}" stroke="none"/>
  </g>`;
  }
  // "bottle" (default)
  return `
  <g>
    <rect x="${cx - s * 0.115}" y="${top + s * 0.12}" width="${s * 0.23}" height="${s * 0.26}" rx="8"
          fill="url(#gold${id})" fill-opacity="0.2" stroke="${GOLD}" stroke-opacity="0.85" stroke-width="2"/>
    <rect x="${cx - s * 0.045}" y="${top + s * 0.06}" width="${s * 0.09}" height="${s * 0.07}"
          fill="none" stroke="${GOLD}" stroke-opacity="0.7" stroke-width="2"/>
    <rect x="${cx - s * 0.075}" y="${top}" width="${s * 0.15}" height="${s * 0.07}" rx="3"
          fill="url(#gold${id})"/>
    <path d="M${cx - s * 0.06} ${top + s * 0.19} L${cx - s * 0.06} ${top + s * 0.31}" stroke="#FFF6DA" stroke-opacity="0.4" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}

function portfolioSvg(w, h, i, label) {
  const id = `p${i}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
${defs(id, i)}
${frame(id, w, h)}
${nailMotif(w, h, id)}
${caption(w, h, label, "K INSTITUTE")}
</svg>`;
}

function productSvg(w, h, i, label, shape) {
  const id = `q${i}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
${defs(id, i)}
${frame(id, w, h)}
${productMotif(w, h, id, shape)}
${caption(w, h, label, "K INSTITUTE")}
</svg>`;
}

function sceneSvg(w, h, i, label, sub) {
  const id = `s${i}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
${defs(id, i)}
${frame(id, w, h)}
${nailMotif(w, h, id)}
${caption(w, h, label, sub)}
</svg>`;
}

// ---------------------------------------------------------------------
//  Product list — KEEP IN SYNC with the `immagini` paths in
//  data/products.ts. Each entry: [filename, label, motif shape]
// ---------------------------------------------------------------------
const PRODUCT_IMAGES = [
  ["gel-costruttore-diamond-clear", "Gel Costruttore", "bottle"],
  ["gel-costruttore-diamond-clear-2", "Diamond Clear", "jar"],
  ["base-rubber-gold-touch", "Base Rubber", "bottle"],
  ["top-coat-no-wipe-brillante", "Top Coat", "bottle"],
  ["set-glitter-diamond", "Set Glitter", "box"],
  ["set-glitter-diamond-2", "12 tonalità", "jar"],
  ["gel-paint-linea-oro", "Gel Paint", "jar"],
  ["pennello-gel-oval", "Pennello Oval", "tool"],
  ["set-pennelli-nail-art", "Set Pennelli", "tool"],
  ["set-pennelli-nail-art-2", "5 pezzi", "box"],
  ["lampada-uv-led-72w-pro", "Lampada 72W", "box"],
  ["lampada-uv-led-72w-pro-2", "UV / LED", "box"],
  ["fresa-professionale-35000", "Fresa Pro", "tool"],
  ["soft-gel-tips-almond", "Soft Gel Tips", "box"],
  ["soft-gel-tips-almond-2", "504 capsule", "box"],
  ["dual-form-popit-12-forme", "Dual Form", "box"],
  ["lime-zebra-100-180", "Lime Zebra", "tool"],
  ["pinza-tronchesina-pro", "Tronchesina", "tool"],
  ["olio-cuticole-argan-oro", "Olio Cuticole", "bottle"],
  ["kit-pedicure-curativo", "Kit Pedicure", "box"],
  ["gift-card-k-institute", "Gift Card", "box"],
];

// Portfolio labels — KEEP IN SYNC with data/portfolio.ts
const PORTFOLIO_LABELS = [
  ["Nail Art", true],
  ["Semipermanente", false],
  ["Ricostruzione", false],
  ["Nail Art", false],
  ["Pedicure", true],
  ["French", false],
  ["Ricostruzione", true],
  ["Nail Art", false],
  ["Effetto specchio", false],
  ["Pedicure Spa", false],
  ["Ballerina", true],
  ["Floreale", false],
];

async function main() {
  await fs.mkdir(PORTFOLIO_DIR, { recursive: true });
  await fs.mkdir(PRODUCTS_DIR, { recursive: true });

  for (let i = 0; i < PORTFOLIO_LABELS.length; i++) {
    const [label, tall] = PORTFOLIO_LABELS[i];
    const n = String(i + 1).padStart(2, "0");
    await fs.writeFile(
      path.join(PORTFOLIO_DIR, `placeholder-${n}.svg`),
      portfolioSvg(900, tall ? 1200 : 900, i, label),
      "utf-8"
    );
  }

  for (let i = 0; i < PRODUCT_IMAGES.length; i++) {
    const [name, label, shape] = PRODUCT_IMAGES[i];
    await fs.writeFile(
      path.join(PRODUCTS_DIR, `${name}.svg`),
      productSvg(900, 900, i, label, shape),
      "utf-8"
    );
  }

  const scenes = [
    ["hero-mani.svg", 1600, 1000, 0, "L’arte delle unghie", "K INSTITUTE"],
    ["chi-siamo.svg", 1200, 1400, 1, "La nostra storia", "DAL 2015"],
    ["studio-ambiente.svg", 1400, 900, 2, "L’istituto", "K INSTITUTE"],
    ["kara-ritratto.svg", 1000, 1250, 3, "Kara", "FOUNDER"],
    ["kara-ritratto-grande.svg", 1400, 1000, 4, "Kara · Atelier", "K INSTITUTE"],
    ["shop-hero.svg", 1600, 900, 2, "Lo Shop", "PRODOTTI PROFESSIONALI"],
    ["trattamenti-hero.svg", 1600, 900, 1, "I Trattamenti", "SU MISURA"],
  ];
  for (const [name, w, h, i, label, sub] of scenes) {
    await fs.writeFile(
      path.join(IMG_DIR, name),
      sceneSvg(w, h, i, label, sub),
      "utf-8"
    );
  }

  console.log(
    `Segnaposto generati: ${PORTFOLIO_LABELS.length} portfolio, ${PRODUCT_IMAGES.length} prodotti, ${scenes.length} scene ✓`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
