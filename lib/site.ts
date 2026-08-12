/** Datos de contacto en un solo lugar: el número no se repite por el código. */
export const SITE = {
  whatsappNumber: "56987654321",
  whatsappDisplay: "+56 9 8765 4321",
  email: "contacto@techflowsoluciones.com",
} as const;

/**
 * Identidad legal del prestador.
 *
 * IMPORTANTE: el servicio lo presta una PERSONA NATURAL que emite boletas de
 * honorarios, no una sociedad. Por eso acá no hay razón social ni RUT de
 * empresa: publicar "SpA" o un RUT societario sin serlo es una afirmación
 * falsa frente al cliente y frente al SII.
 *
 * "TechFlow Soluciones" se usa como nombre de fantasía, lo que sí puede hacer
 * una persona natural, siempre que la identidad real esté disponible.
 *
 * PENDIENTE: reemplazar nombre y RUT por los reales antes de publicar.
 */
export const LEGAL = {
  /** Nombre comercial que ve el cliente. */
  tradeName: "TechFlow Soluciones",
  /** Nombre civil de quien presta el servicio y emite la boleta. */
  fullName: "[COMPLETAR: nombre y apellidos]",
  /** RUT de la persona natural, no de una sociedad. */
  rut: "[COMPLETAR: RUT persona natural]",
  /** Régimen tributario, para que el cliente sepa qué documento va a recibir. */
  taxNote:
    "Servicios prestados por persona natural. Se emite boleta de honorarios electrónica, exenta de IVA.",
} as const;

/** Mensaje precargado: el cliente no parte de una conversación en blanco. */
export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  "Hola, quiero agendar el diagnóstico gratuito para mi empresa."
)}`;
