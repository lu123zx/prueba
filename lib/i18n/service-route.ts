import type { Metadata } from "next";

import { alternateLanguages } from "@/lib/i18n/paths";
import { getService, getServiceById, getServices } from "@/lib/services-data";
import { OG_LOCALE, routePath, type Locale } from "@/lib/i18n";

/**
 * Piezas compartidas por las dos rutas de servicio (/servicios/[slug] en
 * español y /en/services/[slug] en inglés).
 *
 * Existen dos carpetas de ruta y no una porque el segmento tiene que estar
 * en el idioma del contenido, pero la lógica es la misma y vive acá para no
 * escribirla dos veces.
 */

/** Solo genera los slugs del idioma que le corresponde a esa carpeta. */
export function serviceParams(locale: Locale) {
  return getServices(locale).map((service) => ({
    lang: locale,
    slug: service.slug,
  }));
}

export function serviceMetadata(locale: Locale, slug: string): Metadata {
  const service = getService(locale, slug);
  if (!service) return {};

  const path = routePath(locale, "services", service.slug);

  return {
    // absolute: este título ya incluye la marca donde corresponde y no debe
    // heredar la plantilla "%s | TechFlow Soluciones".
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: {
      canonical: path,
      // El par de URLs equivalentes sale de lib/i18n/paths.ts, que es la
      // misma función que usa el selector de idioma: así el hreflang nunca
      // promete una URL a la que el sitio no lleva.
      //
      // x-default apunta al español, que es el mercado principal. Se busca
      // por id y no por slug, porque el slug del servicio es distinto en
      // cada idioma y buscar el español con el slug inglés no encuentra nada.
      languages: {
        ...alternateLanguages(path),
        "x-default": routePath(
          "es",
          "services",
          getServiceById("es", service.id)?.slug ?? service.slug
        ),
      },
    },
    openGraph: {
      type: "article",
      locale: OG_LOCALE[locale],
      url: path,
      title: service.metaTitle,
      description: service.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}
