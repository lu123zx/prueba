/**
 * WhatsApp apagado temporalmente.
 *
 * El número que hay más abajo es de relleno: 56987654321 / +56 9 8765 4321.
 * Mientras no haya uno real, publicarlo manda al visitante a una
 * conversación con un desconocido y, en el JSON-LD, le declara a Google un
 * teléfono falso, que es peor que no declarar ninguno.
 *
 * Para volver a encenderlo: reemplazar el número por el real y poner esto
 * en true. No hay nada más que tocar; los componentes ya consultan la
 * bandera.
 */
export const WHATSAPP_ENABLED = false;

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
  /**
   * Régimen tributario, para que el cliente sepa qué documento va a recibir.
   * Va por idioma porque "boleta de honorarios" no tiene equivalente fuera de
   * Chile: al lector en inglés hay que explicarle qué es, no traducirle el
   * nombre.
   */
  taxNote: {
    es: "Servicios prestados por persona natural. Se emite boleta de honorarios electrónica, exenta de IVA.",
    en: "Services provided by a sole trader. Documented with a Chilean electronic fee receipt (boleta de honorarios), which is exempt from VAT.",
  },
} as const;

/**
 * Aviso en el build si la identidad sigue sin completar.
 *
 * Desde que la identificación salió del footer, vive únicamente en los
 * Términos de servicio y en la Política de privacidad. Si esos campos
 * quedan con el texto de relleno, el sitio se publica sin que el cliente
 * pueda saber a quién le está contratando ni quién responde por sus datos
 * personales: eso es exactamente lo que no se quiere.
 *
 * Es un aviso, no un error, para no bloquear un despliegue sin avisar. Si
 * se prefiere que directamente no compile, cambiar el console.warn por un
 * throw.
 */
export const LEGAL_IDENTITY_PENDING =
  LEGAL.fullName.includes("[COMPLETAR") || LEGAL.rut.includes("[COMPLETAR");

if (LEGAL_IDENTITY_PENDING && process.env.NODE_ENV === "production") {
  console.warn(
    "\n⚠️  IDENTIDAD LEGAL SIN COMPLETAR en lib/site.ts.\n" +
      "   Los Términos de servicio y la Política de privacidad se van a\n" +
      "   publicar con [COMPLETAR: ...] en lugar del nombre y el RUT.\n" +
      "   Completa LEGAL.fullName y LEGAL.rut antes de publicar.\n"
  );
}

/**
 * Mensaje precargado: el cliente no parte de una conversación en blanco.
 * El texto va en el idioma en que está leyendo, para que quien escribe no
 * tenga que borrar una frase en un idioma que no habla.
 */
export function whatsappUrl(prefilled: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(prefilled)}`;
}
