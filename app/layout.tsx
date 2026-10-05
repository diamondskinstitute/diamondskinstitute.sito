import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { salon } from "@/data/salon";
import { localBusinessJsonLd } from "@/lib/seo";
import { getDict, getLocale } from "@/lib/intl/server";
import { localeMeta } from "@/lib/intl/config";
import { I18nProvider } from "@/lib/intl/client";
import { CartProvider } from "@/lib/cart/context";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import CookieBanner from "@/components/layout/CookieBanner";
import SkipLink from "@/components/SkipLink";

// Serif elegante per i titoli, sans pulita per corpo e interfaccia.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Arabo: caricato solo quando la lingua attiva è l'arabo (preload: false),
// con metriche vicine al resto del sito per evitare salti di testo.
const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Titoli e descrizioni seguono la lingua scelta nel selettore.
export function generateMetadata(): Metadata {
  const t = getDict();
  const meta = localeMeta(getLocale());
  return {
    metadataBase: new URL(salon.seo.url),
    title: { default: t.meta.home.title, template: `%s — ${salon.brandName}` },
    description: t.meta.home.description,
    keywords: salon.seo.keywords,
    authors: [{ name: salon.brandName }],
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url: salon.seo.url,
      siteName: salon.brandName,
      title: t.meta.home.title,
      description: t.meta.home.description,
      images: [{ url: "/images/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.home.title,
      description: t.meta.home.description,
      images: ["/images/og-image.svg"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();
  const dict = getDict();
  const dir = localeMeta(locale).dir;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cormorant.variable} ${inter.variable} ${notoArabic.variable}`}
      // Fondo scuro applicato prima ancora che il CSS arrivi: il primo
      // pixel disegnato è già del colore del sito (niente lampo bianco).
      style={{ backgroundColor: "#0b0906", colorScheme: "dark" }}
    >
      <head>
        <meta name="theme-color" content="#0b0906" />
      </head>
      <body
        className="min-h-screen"
        style={{ backgroundColor: "#0b0906", color: "#f3ebdd" }}
      >
        {/* Dati strutturati dell'attività (sede, orari, social) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <I18nProvider locale={locale} dict={dict}>
          <CartProvider>
            <SkipLink />
            <TopBar />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
            <WhatsAppButton />
            <MobileBottomBar />
            <CookieBanner />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
