/**
 * Configuración SEO central.
 *
 * SITE_URL se lee del entorno para que las previsualizaciones de Vercel no
 * publiquen canonicals apuntando a producción. En local cae al dominio real,
 * que es lo que se usa al generar el sitemap y las URLs absolutas de Open Graph.
 */
/** Dominio de producción. Única fuente de verdad: canonical, Open Graph,
 *  sitemap y JSON-LD se construyen a partir de acá. */
export const PRODUCTION_URL = "https://techflowsoluciones.com";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL
).replace(/\/$/, "");

export const SITE_NAME = "TechFlow Soluciones";

/** Comunas donde se concentran los clientes. Sirven para el SEO local. */
export const COMUNAS = [
  "Las Condes",
  "Providencia",
  "Vitacura",
  "Ñuñoa",
  "Santiago Centro",
  "Huechuraba",
  "Recoleta",
  "San Joaquín",
  "Quilicura",
  "Maipú",
] as const;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
