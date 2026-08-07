"use server";

import { contactSchema } from "@/lib/contact-schema";

export type ContactResult = { ok: true } | { ok: false; error: string };

/**
 * Recibe la solicitud de diagnóstico. El mismo esquema Zod que valida en el
 * navegador vuelve a validar acá: validar solo en el cliente no es validar.
 *
 * TODO: enviar a la casilla interna o al CRM (Resend / webhook). Hoy solo
 * registra en el servidor para que el flujo completo sea probable de punta a
 * punta sin backend.
 */
export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Revisa los datos del formulario." };
  }

  try {
    console.info("[contacto] nueva solicitud de diagnóstico", {
      empresa: parsed.data.empresa,
      equipos: parsed.data.equipos,
    });

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "No pudimos enviar tu solicitud. Intenta de nuevo.",
    };
  }
}
