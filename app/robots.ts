import type { MetadataRoute } from "next";

import { absoluteUrl, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Solo el despliegue de producción se abre a los buscadores. Antes esto se
  // decidía comparando SITE_URL contra un dominio escrito a mano, así que al
  // cambiar de dominio el sitio entero quedaba en "disallow". VERCEL_ENV lo
  // resuelve Vercel en el build y vale "production" solo en producción.
  const isProduction = process.env.VERCEL_ENV === "production";

  return {
    rules: isProduction
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
