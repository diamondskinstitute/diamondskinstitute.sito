import type { MetadataRoute } from "next";
import { salon } from "@/data/salon";
import { shopCategories } from "@/data/shop-categories";
import { products } from "@/data/products";
import { treatments } from "@/data/treatments";
import { legalSlugs } from "@/data/legal";

// Sitemap generata dai dati: aggiungendo un prodotto o un trattamento
// la voce compare da sola.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = salon.seo.url.replace(/\/$/, "");
  const now = new Date();

  const statiche = [
    { url: "/", priority: 1 },
    { url: "/shop", priority: 0.9 },
    { url: "/trattamenti", priority: 0.9 },
    { url: "/prenota", priority: 0.8 },
    { url: "/lavori", priority: 0.7 },
    { url: "/chi-siamo", priority: 0.6 },
    { url: "/contatti", priority: 0.6 },
  ];

  return [
    ...statiche.map((s) => ({
      url: `${base}${s.url}`,
      lastModified: now,
      priority: s.priority,
    })),
    ...shopCategories.map((c) => ({
      url: `${base}/shop/${c.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/shop/product/${p.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    ...treatments.map((t) => ({
      url: `${base}/trattamenti/${t.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    ...legalSlugs.map((s) => ({
      url: `${base}/${s}`,
      lastModified: now,
      priority: 0.2,
    })),
  ];
}
