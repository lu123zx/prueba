import { z } from "zod";

import type { Locale } from "@/lib/i18n/config";

/** Rangos de parque de equipos que ofrece el formulario. */
export const EQUIPOS_OPTIONS = [
  { value: "1-5", es: "1 a 5 equipos", en: "1 to 5 machines" },
  { value: "6-15", es: "6 a 15 equipos", en: "6 to 15 machines" },
  { value: "16-35", es: "16 a 35 equipos", en: "16 to 35 machines" },
  { value: "36+", es: "Más de 36 equipos", en: "More than 36 machines" },
] as const;

export function equiposOptions(locale: Locale) {
  return EQUIPOS_OPTIONS.map((o) => ({ value: o.value, label: o[locale] }));
}

const EQUIPOS_VALUES = EQUIPOS_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

/**
 * Celular chileno: +56 9 XXXX XXXX. Se normalizan espacios, guiones y puntos
 * antes de validar, para no castigar al usuario por cómo escribe su número.
 */
const CHILEAN_MOBILE = /^(\+?56)?9\d{8}$/;

/**
 * Número internacional en formato E.164: "+" y entre 8 y 15 dígitos.
 *
 * Se acepta desde que el sitio se publica también en inglés: exigir un
 * celular chileno a quien escribe desde fuera de Chile le impide enviar el
 * formulario, y ese es justamente el visitante nuevo que se quiere captar.
 * El número chileno sigue aceptándose sin el "+56", como se escribe acá.
 */
const INTERNATIONAL = /^\+\d{8,15}$/;

const MESSAGES = {
  es: {
    nameMin: "Escribe tu nombre completo.",
    nameMax: "El nombre es demasiado largo.",
    companyMin: "Escribe el nombre de tu empresa.",
    companyMax: "El nombre de la empresa es demasiado largo.",
    units: "Elige cuántos equipos tiene tu empresa.",
    phoneMin: "Escribe un teléfono de contacto.",
    phoneFormat:
      "Escribe un celular chileno (+56 9 1234 5678) o un número internacional con el código del país.",
    emailMin: "Escribe tu correo.",
    emailAt: "El correo necesita un @.",
    emailFormat: "Revisa el correo, debería verse así: nombre@empresa.cl",
    messageMin: "Cuéntanos en una línea qué necesitas.",
    messageMax: "El mensaje es demasiado largo.",
  },
  en: {
    nameMin: "Enter your full name.",
    nameMax: "That name is too long.",
    companyMin: "Enter your company's name.",
    companyMax: "That company name is too long.",
    units: "Choose how many machines your company has.",
    phoneMin: "Enter a contact phone number.",
    phoneFormat:
      "Enter a Chilean mobile (+56 9 1234 5678) or an international number with its country code.",
    emailMin: "Enter your email.",
    emailAt: "The email needs an @.",
    emailFormat: "Check the email, it should look like this: name@company.com",
    messageMin: "Tell us in one line what you need.",
    messageMax: "That message is too long.",
  },
} as const;

/**
 * El esquema se construye por idioma porque los mensajes de error los lee
 * una persona: dejarlos siempre en español le rompe la página a quien está
 * leyendo el sitio en inglés, justo en el momento de convertir.
 */
export function createContactSchema(locale: Locale) {
  const m = MESSAGES[locale];

  return z.object({
    nombre: z.string().trim().min(2, m.nameMin).max(80, m.nameMax),
    empresa: z.string().trim().min(2, m.companyMin).max(80, m.companyMax),
    equipos: z.enum(EQUIPOS_VALUES, { message: m.units }),
    telefono: z
      .string()
      .trim()
      .min(1, m.phoneMin)
      .refine(
        (v) => {
          const clean = v.replace(/[\s.()-]/g, "");
          return CHILEAN_MOBILE.test(clean) || INTERNATIONAL.test(clean);
        },
        { message: m.phoneFormat }
      ),
    correo: z
      .string()
      .trim()
      .min(1, m.emailMin)
      .refine((v) => v.includes("@"), { message: m.emailAt })
      .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
        message: m.emailFormat,
      }),
    mensaje: z.string().trim().min(10, m.messageMin).max(1000, m.messageMax),
  });
}

/** Esquema en español. Es el que usa la Server Action para revalidar. */
export const contactSchema = createContactSchema("es");

export type ContactValues = z.infer<typeof contactSchema>;
