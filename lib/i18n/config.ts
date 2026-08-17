/**
 * Configuración de idiomas.
 *
 * El español vive en la raíz ("/") y el inglés bajo "/en". Esa asimetría es
 * deliberada: las URLs en español ya están indexadas por Google y moverlas
 * obligaría a redirecciones 301 y a perder autoridad. El idioma nuevo es el
 * que paga el costo del prefijo, no el que ya está posicionado.
 *
 * Cada idioma tiene además sus propias rutas ("/servicios" vs "/services"),
 * porque una URL en el idioma del contenido posiciona mejor que una mezcla.
 */

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Idioma que no lleva prefijo en la URL. */
export const UNPREFIXED_LOCALE: Locale = "es";

/** Código completo para el atributo lang y para Open Graph. */
export const HTML_LANG: Record<Locale, string> = {
  es: "es-CL",
  en: "en",
};

export const OG_LOCALE: Record<Locale, string> = {
  es: "es_CL",
  en: "en_US",
};

/**
 * Rutas equivalentes entre idiomas. La clave es un identificador interno y
 * el valor es el trozo de URL que ve el visitante en cada idioma.
 *
 * Sirve para dos cosas: construir los enlaces de cada idioma y, sobre todo,
 * emitir el hreflang que le dice a Google que estas dos URLs son la misma
 * página en distinto idioma.
 */
export const ROUTES = {
  home: { es: "/", en: "/" },
  services: { es: "/servicios", en: "/services" },
  privacy: { es: "/politica-de-privacidad", en: "/privacy-policy" },
  terms: { es: "/terminos-de-servicio", en: "/terms-of-service" },
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * URL pública de una ruta en un idioma. El español no lleva prefijo; el
 * inglés sí. Devuelve siempre una ruta absoluta del sitio, sin dominio.
 */
export function localePath(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (locale === UNPREFIXED_LOCALE) return clean === "" ? "/" : clean;
  return `/${locale}${clean}`;
}

/** Ruta de una sección con nombre propio en cada idioma. */
export function routePath(locale: Locale, key: RouteKey, slug?: string) {
  const base = ROUTES[key][locale];
  const withSlug = slug ? `${base === "/" ? "" : base}/${slug}` : base;
  return localePath(locale, withSlug);
}

/**
 * Aviso de idioma disponible.
 *
 * Va indexado por el idioma AL QUE se ofrece cambiar, y escrito en ese
 * idioma: a quien tiene el navegador en inglés y cayó en la página en
 * español hay que hablarle en inglés, o el aviso no cumple su función.
 */
export const BANNER: Record<Locale, { text: string; action: string; dismiss: string }> = {
  es: {
    text: "Esta página también está disponible en español.",
    action: "Ver en español",
    dismiss: "Cerrar",
  },
  en: {
    text: "This page is also available in English.",
    action: "View in English",
    dismiss: "Dismiss",
  },
};

/** true si el primer segmento de la ruta es un idioma con prefijo. */
export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(first)
    ? (first as Locale)
    : DEFAULT_LOCALE;
}
