"use client";

import { useEffect, useState } from "react";

/** Debe coincidir con la que escribe middleware.ts. */
const COUNTRY_COOKIE = "tf_country";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * País del visitante, para elegir moneda.
 *
 * Se lee de la cookie que deja el middleware y no de una cabecera en el
 * servidor, y eso es a propósito: leer cabeceras en un Server Component
 * obligaría a renderizar la página en cada visita, y este es un sitio
 * estático cuyo SEO depende de servirse rápido y cacheado.
 *
 * El precio en UF —que es el precio real— se pinta igual en el primer
 * render. Lo único que espera a saber el país es la línea de equivalencia
 * en pesos o dólares.
 */
export function useCountry(): string | null {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    setCountry(readCookie(COUNTRY_COOKIE)?.toUpperCase() ?? "CL");
  }, []);

  return country;
}

/** Chile paga en pesos; el resto del mundo lee el precio en dólares. */
export function useShowUSD(): boolean {
  const country = useCountry();
  // Mientras no se sabe el país se asume Chile: es el mercado principal y
  // evita que el visitante chileno vea dólares por un instante.
  return country !== null && country !== "CL";
}
