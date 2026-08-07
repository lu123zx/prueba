/**
 * Precios en UF.
 *
 * Cobrar en UF evita renegociar el contrato cada año por inflación: el precio
 * se reajusta solo. Como el cliente igual quiere saber "cuánto es en plata",
 * la UF se muestra como precio y el peso como referencia.
 *
 * TODO: leer la UF del día desde mindicador.cl o la CMF en un Server Component
 * con `next: { revalidate: 86400 }`, y dejar este valor solo como respaldo.
 */
export const UF_CLP = 40844.79;
export const UF_DATE = "7 de agosto de 2026";

const UF_FORMAT = new Intl.NumberFormat("es-CL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const CLP_FORMAT = new Intl.NumberFormat("es-CL", {
  maximumFractionDigits: 0,
});

/** "4,5" — la UF chilena se escribe con coma decimal. */
export function formatUF(uf: number) {
  return UF_FORMAT.format(uf);
}

/** Equivalente aproximado en pesos, redondeado al mil más cercano. */
export function ufToCLP(uf: number) {
  return CLP_FORMAT.format(Math.round((uf * UF_CLP) / 1000) * 1000);
}
