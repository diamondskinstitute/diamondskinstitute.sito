// =====================================================================
//  Generates the brand assets (logo stand-in, mark, favicon, OG image)
//  derived from the client logo: a golden serif "K" with ornamental
//  swirls in front of a brilliant-cut diamond, on deep warm black.
//
//  Run with:  node scripts/generate-brand.mjs
//
//  NOTE: these are STAND-INS. As soon as the real artwork is dropped in
//  public/brand/logo.jpg, change `brand.logoSrc` in data/salon.ts to
//  "/brand/logo.jpg" — that single line is the only thing to edit.
// =====================================================================
import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const BRAND_DIR = path.join(ROOT, "public", "brand");
const APP_DIR = path.join(ROOT, "app");

const GOLD_STOPS = `
    <stop offset="0%" stop-color="#6E4E14"/>
    <stop offset="18%" stop-color="#A77B24"/>
    <stop offset="40%" stop-color="#D9AE45"/>
    <stop offset="54%" stop-color="#F6DE8D"/>
    <stop offset="70%" stop-color="#D9AE45"/>
    <stop offset="88%" stop-color="#A77B24"/>
    <stop offset="100%" stop-color="#F6DE8D"/>`;

// A brilliant-cut diamond: table, crown bezels, girdle, pavilion.
function diamond(cx, cy, halfWidth, opacity = 1) {
  const w = halfWidth;
  const girdleY = cy;
  const tableY = cy - w * 0.43;
  const tableHalf = w * 0.57;
  const tipY = cy + w * 1.07;
  const q = w * 0.3; // crown facet spacing

  return `
  <g opacity="${opacity}">
    <!-- pavilion -->
    <path d="M${cx - w} ${girdleY} L${cx + w} ${girdleY} L${cx} ${tipY} Z"
          fill="url(#facetA)" stroke="#E8EAEF" stroke-opacity="0.55" stroke-width="2"/>
    <path d="M${cx - w * 0.5} ${girdleY} L${cx} ${tipY}" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="1.6" fill="none"/>
    <path d="M${cx + w * 0.5} ${girdleY} L${cx} ${tipY}" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="1.6" fill="none"/>
    <path d="M${cx - w} ${girdleY} L${cx + w * 0.2} ${cy + w * 0.62}" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1.2" fill="none"/>
    <path d="M${cx + w} ${girdleY} L${cx - w * 0.2} ${cy + w * 0.62}" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1.2" fill="none"/>
    <!-- crown -->
    <path d="M${cx - w} ${girdleY} L${cx - tableHalf} ${tableY} L${cx + tableHalf} ${tableY} L${cx + w} ${girdleY} Z"
          fill="url(#facetB)" stroke="#E8EAEF" stroke-opacity="0.65" stroke-width="2"/>
    <!-- bezel facets -->
    <path d="M${cx - w} ${girdleY} L${cx - tableHalf} ${tableY}" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="1.4"/>
    <path d="M${cx - w + q} ${girdleY} L${cx - tableHalf} ${tableY}" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="1.4"/>
    <path d="M${cx - w + q * 2} ${girdleY} L${cx - tableHalf * 0.35} ${tableY}" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.4"/>
    <path d="M${cx + w - q} ${girdleY} L${cx + tableHalf} ${tableY}" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="1.4"/>
    <path d="M${cx + w - q * 2} ${girdleY} L${cx + tableHalf * 0.35} ${tableY}" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.4"/>
    <path d="M${cx + w} ${girdleY} L${cx + tableHalf} ${tableY}" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="1.4"/>
    <!-- girdle -->
    <path d="M${cx - w} ${girdleY} L${cx + w} ${girdleY}" stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="2.4"/>
  </g>`;
}

// Four-point star glint
function glint(cx, cy, r, opacity = 0.95) {
  return `
  <g opacity="${opacity}">
    <path d="M${cx} ${cy - r} Q${cx + r * 0.16} ${cy - r * 0.16} ${cx + r} ${cy}
             Q${cx + r * 0.16} ${cy + r * 0.16} ${cx} ${cy + r}
             Q${cx - r * 0.16} ${cy + r * 0.16} ${cx - r} ${cy}
             Q${cx - r * 0.16} ${cy - r * 0.16} ${cx} ${cy - r} Z" fill="url(#glintG)"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.13}" fill="#FFF6DA"/>
  </g>`;
}

// Ornamental swirl at the foot of the K (mirrored with `flip`)
function swirl(x, y, s, flip = false) {
  const t = flip ? `translate(${x} ${y}) scale(${-s} ${s})` : `translate(${x} ${y}) scale(${s} ${s})`;
  return `
  <g transform="${t}" fill="none" stroke="url(#goldH)" stroke-linecap="round">
    <path d="M0 0 C-30 -6 -62 -2 -84 16 C-104 32 -104 60 -84 70 C-68 78 -50 68 -52 50 C-54 36 -70 32 -78 42"
          stroke-width="9"/>
    <path d="M-16 22 C-40 24 -58 36 -64 54" stroke-width="5" stroke-opacity="0.75"/>
    <path d="M-6 -14 C-34 -26 -66 -26 -88 -12" stroke-width="5" stroke-opacity="0.6"/>
  </g>`;
}

function defs(vertical = false) {
  const coords = vertical
    ? 'x1="0" y1="0" x2="0" y2="1"'
    : 'x1="0" y1="0" x2="1" y2="1"';
  return `
  <defs>
    <linearGradient id="goldG" ${coords}>${GOLD_STOPS}</linearGradient>
    <linearGradient id="goldH" x1="0" y1="0" x2="1" y2="0">${GOLD_STOPS}</linearGradient>
    <linearGradient id="facetA" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.92"/>
      <stop offset="45%" stop-color="#C8CBD2" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#8E939C" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="facetB" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#C8CBD2" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#E4E6EB" stop-opacity="0.8"/>
    </linearGradient>
    <radialGradient id="glintG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF6DA"/>
      <stop offset="55%" stop-color="#F6DE8D" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#D9AE45" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="42%" r="58%">
      <stop offset="0%" stop-color="#D9AE45" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#D9AE45" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
}

const SERIF = "Cormorant Garamond, Georgia, 'Times New Roman', serif";

// --- Full logo: diamond + K + swirls + "Institute" -------------------
function fullLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="K Institute">
${defs()}
  <rect width="1024" height="1024" fill="#0B0906"/>
  <rect width="1024" height="1024" fill="url(#halo)"/>
${diamond(512, 372, 268)}
${swirl(360, 592, 1.25, false)}
${swirl(664, 592, 1.25, true)}
  <text x="512" y="470" text-anchor="middle" dominant-baseline="middle"
        font-family="${SERIF}" font-size="430" font-weight="600"
        fill="url(#goldG)" stroke="#6E4E14" stroke-width="3" stroke-opacity="0.5">K</text>
  <text x="512" y="742" text-anchor="middle"
        font-family="${SERIF}" font-size="118" letter-spacing="4"
        fill="url(#goldH)">Institute</text>
${glint(300, 262, 62)}
${glint(742, 286, 54)}
${glint(556, 208, 34, 0.7)}
</svg>`;
}

// --- Compact mark for the header (wide, no wordmark) ------------------
function markLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" role="img" aria-label="K Institute">
${defs()}
  <rect width="320" height="320" fill="#0B0906"/>
${diamond(160, 148, 122)}
  <text x="160" y="190" text-anchor="middle" dominant-baseline="middle"
        font-family="${SERIF}" font-size="215" font-weight="600" fill="url(#goldG)">K</text>
${glint(74, 96, 26)}
${glint(252, 108, 20)}
</svg>`;
}

// --- Favicon ----------------------------------------------------------
function icon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
${defs()}
  <rect width="64" height="64" rx="12" fill="#0B0906"/>
${diamond(32, 27, 20, 0.9)}
  <text x="32" y="36" text-anchor="middle" dominant-baseline="middle"
        font-family="${SERIF}" font-size="34" font-weight="600" fill="url(#goldG)">K</text>
</svg>`;
}

// --- Open Graph 1200x630 ---------------------------------------------
function ogImage(brand, claim) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${brand}">
${defs()}
  <rect width="1200" height="630" fill="#0B0906"/>
  <rect width="1200" height="630" fill="url(#halo)"/>
${diamond(250, 250, 132)}
  <text x="250" y="300" text-anchor="middle" dominant-baseline="middle"
        font-family="${SERIF}" font-size="212" font-weight="600" fill="url(#goldG)">K</text>
  <path d="M480 180 L480 450" stroke="#D9AE45" stroke-opacity="0.35" stroke-width="1"/>
  <text x="540" y="292" font-family="${SERIF}" font-size="96" fill="url(#goldH)">${brand}</text>
  <text x="542" y="356" font-family="Helvetica, Arial, sans-serif" font-size="26"
        letter-spacing="7" fill="#F3EBDD" fill-opacity="0.72">${claim.toUpperCase()}</text>
  <path d="M542 400 L1060 400" stroke="#D9AE45" stroke-opacity="0.45" stroke-width="1"/>
${glint(160, 150, 38)}
${glint(352, 176, 30)}
</svg>`;
}

async function main() {
  await fs.mkdir(BRAND_DIR, { recursive: true });
  await fs.writeFile(path.join(BRAND_DIR, "logo.svg"), fullLogo(), "utf-8");
  await fs.writeFile(path.join(BRAND_DIR, "logo-mark.svg"), markLogo(), "utf-8");
  await fs.writeFile(path.join(APP_DIR, "icon.svg"), icon(), "utf-8");
  await fs.writeFile(
    path.join(ROOT, "public", "images", "og-image.svg"),
    ogImage("K Institute", "Nail institute & shop"),
    "utf-8"
  );
  console.log("Brand assets generated in public/brand + app/icon.svg ✓");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
