import { getServiceById, getServices } from "@/lib/services-data";
import {
  LOCALES,
  ROUTES,
  UNPREFIXED_LOCALE,
  localePath,
  type Locale,
} from "./config";

/**
 * Equivalencias de URL entre idiomas.
 *
 * Es la única fuente de verdad de "esta página, en el otro idioma, ¿qué URL
 * tiene?". La usan tres cosas que tienen que coincidir sí o sí:
 *
 *   1. el hreflang, que le promete a Google que ese par existe,
 *   2. el selector de idioma, que lleva al visitante ahí,
 *   3. el middleware, cuando redirige por idioma del navegador.
 *
 * Si estas tres dieran respuestas distintas, el hreflang apuntaría a una URL
 * que devuelve 404 y Google dejaría de emparejar las dos versiones.
 */

/** Quita el prefijo de idioma de una ruta y devuelve idioma + resto. */
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if ((LOCALES as readonly string[]).includes(first)) {
    return {
      locale: first as Locale,
      rest: `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/",
    };
  }

  return { locale: UNPREFIXED_LOCALE, rest: pathname.replace(/\/$/, "") || "/" };
}

/**
 * La misma página en otro idioma. Devuelve null cuando no existe equivalente,
 * que es la señal para NO emitir hreflang: prometer un par que no existe es
 * peor que no declarar nada.
 */
export function equivalentPath(
  pathname: string,
  target: Locale
): string | null {
  const { locale: source, rest } = splitLocale(pathname);

  if (source === target) return localePath(target, rest);

  // Home.
  if (rest === "/" || rest === "") return localePath(target, "/");

  const sourceServicesBase = ROUTES.services[source];
  if (rest.startsWith(`${sourceServicesBase}/`)) {
    const slug = rest.slice(sourceServicesBase.length + 1);
    const current = getServices(source).find((s) => s.slug === slug);
    if (!current) return null;
    const twin = getServiceById(target, current.id);
    if (!twin) return null;
    return localePath(target, `${ROUTES.services[target]}/${twin.slug}`);
  }

  // Índice de servicios, si algún día existe como página propia.
  if (rest === sourceServicesBase) {
    return localePath(target, ROUTES.services[target]);
  }

  for (const key of ["privacy", "terms"] as const) {
    if (rest === ROUTES[key][source]) {
      return localePath(target, ROUTES[key][target]);
    }
  }

  return null;
}

/** Todas las versiones de una página, para el bloque de alternates. */
export function alternateLanguages(pathname: string) {
  const entries: Partial<Record<string, string>> = {};

  for (const locale of LOCALES) {
    const path = equivalentPath(pathname, locale);
    if (path) entries[locale === "es" ? "es-CL" : locale] = path;
  }

  return entries;
}
