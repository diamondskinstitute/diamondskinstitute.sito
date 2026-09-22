import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { salon } from "@/data/salon";
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(salon.seo.url),
  title: {
    default: salon.seo.title,
    template: `%s — ${salon.brandName}`,
  },
  description: salon.seo.description,
  keywords: salon.seo.keywords,
  authors: [{ name: salon.brandName }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: salon.seo.url,
    siteName: salon.brandName,
    title: salon.seo.title,
    description: salon.seo.description,
    images: [{ url: "/images/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: salon.seo.title,
    description: salon.seo.description,
    images: ["/images/og-image.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen">
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
      </body>
    </html>
  );
}
