import type { MetadataRoute } from "next";

import { absoluteUrl, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // En previsualizaciones no queremos que se indexe nada: solo el dominio
  // real abre el sitio a los buscadores.
  const isProduction = SITE_URL === "https://techflowsoluciones.cl";

  return {
    rules: isProduction
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
