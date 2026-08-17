import { es } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/es";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

/**
 * Diccionario de un idioma. Síncrono a propósito: el copy es estático y cabe
 * de sobra en el bundle, así que no vale la pena el import dinámico ni la
 * cascada de `await` que arrastra por todos los componentes.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** Valida un parámetro de ruta que debería ser un idioma. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type { Dictionary };
export * from "./config";
