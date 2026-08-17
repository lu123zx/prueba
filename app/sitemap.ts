import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { getServices } from "@/lib/services-data";
import { LOCALES, routePath } from "@/lib/i18n";

/**
 * Sitemap con los dos idiomas.
 *
 * Cada URL declara sus equivalentes con `alternates.languages`, que Next
 * traduce a las etiquetas xhtml:link del sitemap. Es la segunda vía por la
 * que Google empareja las versiones: la primera es el hreflang del <head>, y
 * conviene que estén las dos y digan lo mismo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const languagesFor = (build: (locale: (typeof LOCALES)[number]) => string) => ({
    languages: {
      "es-CL": absoluteUrl(build("es")),
      en: absoluteUrl(build("en")),
    },
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: absoluteUrl(routePath(locale, "home")),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: languagesFor((l) => routePath(l, "home")),
    });

    for (const service of getServices(locale)) {
      entries.push({
        url: absoluteUrl(routePath(locale, "services", service.slug)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        // El equivalente se busca por id, porque el slug cambia de idioma.
        alternates: languagesFor((l) => {
          const twin = getServices(l).find((s) => s.id === service.id);
          return routePath(l, "services", twin?.slug ?? service.slug);
        }),
      });
    }

    for (const key of ["privacy", "terms"] as const) {
      entries.push({
        url: absoluteUrl(routePath(locale, key)),
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.2,
        alternates: languagesFor((l) => routePath(l, key)),
      });
    }
  }

  return entries;
}
