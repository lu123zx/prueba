import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Escribe tu nombre."),
  company: z.string().min(2, "Escribe el nombre de tu empresa."),
  devices: z.enum(["1-10", "11-25", "26-50", "50+"], {
    message: "Selecciona un rango.",
  }),
  phone: z
    .string()
    .min(8, "Escribe un teléfono válido.")
    .regex(/^[0-9+\s()-]+$/, "Solo números y símbolos de teléfono."),
  email: z.string().email("Revisa el correo."),
  message: z.string().min(10, "Cuéntanos brevemente qué está fallando."),
});

export type ContactInput = z.infer<typeof contactSchema>;
