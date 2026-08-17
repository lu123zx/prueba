/**
 * Modelo de precios: cargo base + precio por equipo, en UF.
 *
 * Por qué en UF: el precio se reajusta solo con la inflación, así no hay que
 * mandar una carta de aumento cada enero.
 *
 * Por qué por equipo y no por tramos: el costo de atender a un cliente sube
 * con cada computador que se le agrega (tickets, monitoreo, parches, licencia
 * de la herramienta de gestión). Un precio plano "hasta 35 equipos" cobra lo
 * mismo por 16 que por 35, así que el margen se va a cero justo cuando el
 * cliente crece. El precio lineal hace que ingreso y costo suban juntos.
 *
 * El cargo base cubre lo que no depende del número de equipos: el encargado
 * asignado, la plataforma de monitoreo y la gestión de la cuenta.
 *
 * Acá vive SOLO el modelo numérico. El texto de cada plan (nombre visible,
 * descripción y prestaciones) está en los diccionarios de idioma, porque hay
 * que traducirlo; los números son los mismos en todos los idiomas.
 */

/**
 * Valores de respaldo. En condiciones normales no se usan: lib/rates.ts lee
 * la UF y el dólar del día desde mindicador.cl. Quedan acá para que la página
 * siga mostrando un precio si esa API no responde.
 */
export const UF_CLP_FALLBACK = 40844.79;
export const USD_CLP_FALLBACK = 955;
export const UF_DATE_FALLBACK = "7 de agosto de 2026";

/** Rango que cubre el simulador. Bajo 5 equipos conviene soporte por hora. */
export const EQUIPOS_MIN = 5;
export const EQUIPOS_MAX = 80;
export const EQUIPOS_DEFAULT = 20;

/** Identificador estable de cada plan. El texto se busca por este id. */
export type PlanId = "esencial" | "negocio" | "integral";

export type Plan = {
  id: PlanId;
  /** UF fijas al mes, independientes del número de equipos. */
  base: number;
  /** UF al mes por cada equipo cubierto. */
  perEquipo: number;
  highlighted?: boolean;
};

export const PLANS: Plan[] = [
  { id: "esencial", base: 2.5, perEquipo: 0.35 },
  { id: "negocio", base: 4, perEquipo: 0.45, highlighted: true },
  { id: "integral", base: 7, perEquipo: 0.55 },
];

/** Precio mensual en UF de un plan para una cantidad de equipos. */
export function planPriceUF(plan: Plan, equipos: number) {
  return plan.base + plan.perEquipo * equipos;
}

/** "4,5" en español, "4.5" en inglés: la coma decimal es local. */
export function formatUF(uf: number, locale = "es") {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "es-CL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(uf);
}

/** Equivalente en pesos, redondeado al mil más cercano. */
export function ufToCLP(uf: number, ufClp: number, locale = "es") {
  const clp = Math.round((uf * ufClp) / 1000) * 1000;
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "es-CL", {
    maximumFractionDigits: 0,
  }).format(clp);
}

/**
 * Equivalente en dólares, redondeado a la decena. El precio real se cobra en
 * pesos: este número es referencia, y darlo al peso exacto sugeriría una
 * precisión que el tipo de cambio del día no tiene.
 */
export function ufToUSD(uf: number, ufClp: number, usdClp: number, locale = "en") {
  const usd = Math.round((uf * ufClp) / usdClp / 10) * 10;
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "es-CL", {
    maximumFractionDigits: 0,
  }).format(usd);
}
