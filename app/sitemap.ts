import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { SERVICES } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/servicios/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/politica-de-privacidad"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: absoluteUrl("/terminos-de-servicio"), lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
  ];
}
