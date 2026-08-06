"use server";

import { contactSchema, type ContactInput } from "@/lib/contact-schema";

export type ContactResult = {
  ok: boolean;
  message: string;
};

export async function submitContact(data: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { ok: false, message: "Revisa los datos del formulario." };
  }

  try {
    // TODO: reemplazar por envío real (Resend / inserción en Supabase).
    // await resend.emails.send({ ... })
    // await supabase.from("leads").insert(parsed.data)
    console.log("[lead]", parsed.data);

    return {
      ok: true,
      message: "Recibimos tu solicitud. Te contactamos dentro de un día hábil.",
    };
  } catch (error) {
    console.error("[contact] error al enviar", error);
    return {
      ok: false,
      message: "No pudimos enviar el formulario. Escríbenos por WhatsApp mientras tanto.",
    };
  }
}
