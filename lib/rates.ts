import { UF_CLP_FALLBACK, UF_DATE_FALLBACK, USD_CLP_FALLBACK } from "@/lib/pricing";

/**
 * Valores del día para convertir precios.
 *
 * Los precios se fijan en UF, así que para mostrarlos en pesos hace falta el
 * valor de la UF, y para mostrarlos en dólares hace falta además el tipo de
 * cambio. Antes la UF estaba escrita a mano en el código y envejecía sola;
 * ahora se lee de mindicador.cl (Banco Central) una vez al día.
 *
 * La API es pública, sin llave, y devuelve el valor de hoy. Si falla —cae el
 * servicio, cambia el formato, se corta la red— se usan los valores de
 * respaldo. Nunca se rompe la página por no poder convertir una moneda.
 */

export type Rates = {
  /** Pesos chilenos por UF. */
  ufClp: number;
  /** Pesos chilenos por dólar (dólar observado). */
  usdClp: number;
  /** Fecha del valor, ya formateada para mostrar. */
  date: string;
  /** false cuando se usaron los valores de respaldo. */
  live: boolean;
};

const FALLBACK: Rates = {
  ufClp: UF_CLP_FALLBACK,
  usdClp: USD_CLP_FALLBACK,
  date: UF_DATE_FALLBACK,
  live: false,
};

type Indicador = { valor?: unknown; fecha?: unknown };

function readValue(indicator: Indicador | undefined): number | null {
  const value = indicator?.valor;
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : null;
}

function formatDate(raw: unknown, locale: string): string | null {
  if (typeof raw !== "string") return null;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  }).format(parsed);
}

/**
 * Lee UF y dólar del día. Se cachea 24 horas: estos valores cambian una vez
 * al día, así que pedirlos en cada visita solo agrega latencia y depende de
 * que un tercero esté arriba en el momento exacto en que alguien entra.
 */
export async function getRates(locale = "es"): Promise<Rates> {
  try {
    const response = await fetch("https://mindicador.cl/api", {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) return FALLBACK;

    const data = (await response.json()) as Record<string, Indicador>;
    const ufClp = readValue(data.uf);
    const usdClp = readValue(data.dolar);

    // Si falta cualquiera de los dos, se usan ambos de respaldo: mezclar una
    // UF de hoy con un dólar viejo daría una conversión peor que no tocarlos.
    if (ufClp === null || usdClp === null) return FALLBACK;

    return {
      ufClp,
      usdClp,
      date: formatDate(data.uf?.fecha, locale) ?? FALLBACK.date,
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}
