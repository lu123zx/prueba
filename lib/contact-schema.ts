import { z } from "zod";

/** Rangos de parque de equipos que ofrece el formulario. */
export const EQUIPOS_OPTIONS = [
  { value: "1-5", label: "1 a 5 equipos" },
  { value: "6-15", label: "6 a 15 equipos" },
  { value: "16-35", label: "16 a 35 equipos" },
  { value: "36+", label: "Más de 36 equipos" },
] as const;

const EQUIPOS_VALUES = EQUIPOS_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

/**
 * Celular chileno: +56 9 XXXX XXXX. Se normalizan espacios, guiones y puntos
 * antes de validar, para no castigar al usuario por cómo escribe su número.
 */
const CHILEAN_MOBILE = /^(\+?56)?9\d{8}$/;

export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre completo.")
    .max(80, "El nombre es demasiado largo."),
  empresa: z
    .string()
    .trim()
    .min(2, "Escribe el nombre de tu empresa.")
    .max(80, "El nombre de la empresa es demasiado largo."),
  equipos: z.enum(EQUIPOS_VALUES, {
    message: "Elige cuántos equipos tiene tu empresa.",
  }),
  telefono: z
    .string()
    .trim()
    .min(1, "Escribe un teléfono de contacto.")
    .refine((v) => CHILEAN_MOBILE.test(v.replace(/[\s.-]/g, "")), {
      message: "Escribe un celular chileno, por ejemplo +56 9 1234 5678.",
    }),
  correo: z
    .string()
    .trim()
    .min(1, "Escribe tu correo.")
    .refine((v) => v.includes("@"), { message: "El correo necesita un @." })
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Revisa el correo, debería verse así: nombre@empresa.cl",
    }),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos en una línea qué necesitas.")
    .max(1000, "El mensaje es demasiado largo."),
});

export type ContactValues = z.infer<typeof contactSchema>;
