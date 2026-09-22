import type { Config } from "tailwindcss";

// =====================================================================
//  DESIGN TOKENS — derived from the brand logo (public/brand/).
//  Golden serif "K" + ornamental swirls over a brilliant-cut diamond,
//  on a deep warm black. Mood: jewelry, luxury, glamour.
//
//  Never hardcode a hex value inside a component: use these tokens
//  (or the CSS variables declared in app/globals.css).
// =====================================================================

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep warm black — the logo background, our primary ground
        ink: {
          DEFAULT: "#0B0906",
          soft: "#15110C", // elevated surfaces (cards, header)
          raised: "#1E1810", // hover / nested surfaces
          line: "#2C241A", // hairline borders on dark
        },
        // The gold gradient of the "K", split into stops
        gold: {
          light: "#F6DE8D", // highlight
          DEFAULT: "#D9AE45", // mid gold — the accent colour
          deep: "#A77B24", // shadow gold
          dark: "#6E4E14", // darkest stop, borders
        },
        // The diamond: bright white and cool silver
        diamond: {
          DEFAULT: "#F5F5F7",
          silver: "#C8CBD2", // secondary text on dark
        },
        // Warm off-white for body copy on dark, and for light sections
        cream: {
          DEFAULT: "#F3EBDD",
          light: "#F8F3EA", // light section background
          deep: "#E7DCC8", // borders on light
        },
      },
      backgroundImage: {
        // Metallic gold sheen — headings, buttons, dividers
        "gold-sheen":
          "linear-gradient(105deg, #6E4E14 0%, #A77B24 18%, #D9AE45 38%, #F6DE8D 52%, #D9AE45 68%, #A77B24 86%, #F6DE8D 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, #D9AE45 50%, transparent)",
      },
      boxShadow: {
        gold: "0 12px 44px -14px rgba(217,174,69,0.45)",
        "gold-sm": "0 6px 22px -10px rgba(217,174,69,0.5)",
        lift: "0 24px 60px -30px rgba(0,0,0,0.85)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.22em",
        wide2: "0.12em",
      },
      spacing: {
        13: "3.25rem",
        18: "4.5rem",
      },
      maxWidth: {
        content: "1280px",
        narrow: "820px",
      },
      borderRadius: {
        // Rounded, never bubbly
        luxe: "4px",
        card: "6px",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        glint: {
          "0%,100%": { opacity: "0", transform: "scale(0.6) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(45deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
