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
 * TODO: leer la UF del día desde mindicador.cl o la CMF en un Server Component
 * con `next: { revalidate: 86400 }`, y dejar este valor solo como respaldo.
 */
export const UF_CLP = 40844.79;
export const UF_DATE = "7 de agosto de 2026";

/** Rango que cubre el simulador. Bajo 5 equipos conviene soporte por hora. */
export const EQUIPOS_MIN = 5;
export const EQUIPOS_MAX = 80;
export const EQUIPOS_DEFAULT = 20;

export type Plan = {
  id: string;
  name: string;
  description: string;
  /** UF fijas al mes, independientes del número de equipos. */
  base: number;
  /** UF al mes por cada equipo cubierto. */
  perEquipo: number;
  features: string[];
  highlighted?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "esencial",
    name: "Esencial",
    description: "Para empezar a ordenar la informática, con lo indispensable cubierto.",
    base: 2.5,
    perEquipo: 0.35,
    features: [
      "Mesa de ayuda en horario hábil, por teléfono y WhatsApp",
      "Respuesta en menos de 4 horas hábiles",
      "Respaldo diario de tus archivos",
      "Revisión de seguridad una vez al mes",
    ],
  },
  {
    id: "negocio",
    name: "Negocio",
    description: "El que recomendamos para pymes de 15 a 40 personas en Santiago.",
    base: 4,
    perEquipo: 0.45,
    highlighted: true,
    features: [
      "Todo lo del plan Esencial",
      "Respuesta en menos de 2 horas hábiles",
      "Monitoreo automático de tus sistemas, con aviso ante fallas",
      "Un encargado fijo que conoce tu empresa",
      "Administramos tus licencias y sus renovaciones",
    ],
  },
  {
    id: "integral",
    name: "Integral",
    description: "Cuando la informática ya es parte del negocio y no puede fallar.",
    base: 7,
    perEquipo: 0.55,
    features: [
      "Todo lo del plan Negocio",
      "Atención de emergencias fuera de horario, coordinada por WhatsApp",
      "Mantención de tu sitio o tienda web incluida",
      "Revisión de ciberseguridad y prueba de respaldos cada trimestre",
      "Reunión mensual de revisión con tu encargado",
    ],
  },
];

/** Precio mensual en UF de un plan para una cantidad de equipos. */
export function planPriceUF(plan: Plan, equipos: number) {
  return plan.base + plan.perEquipo * equipos;
}

const UF_FORMAT = new Intl.NumberFormat("es-CL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

const CLP_FORMAT = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });

/** "4,5" — la UF chilena se escribe con coma decimal. */
export function formatUF(uf: number) {
  return UF_FORMAT.format(uf);
}

/** Equivalente aproximado en pesos, redondeado al mil más cercano. */
export function ufToCLP(uf: number) {
  return CLP_FORMAT.format(Math.round((uf * UF_CLP) / 1000) * 1000);
}
