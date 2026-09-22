import type { MetadataRoute } from "next";
import { salon } from "@/data/salon";

export default function robots(): MetadataRoute.Robots {
  const base = salon.seo.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Area riservata e pagine di acquisto non vanno indicizzate
      disallow: ["/admin", "/checkout", "/carrello", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
