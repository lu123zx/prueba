/** Datos de contacto en un solo lugar: el número no se repite por el código. */
export const SITE = {
  whatsappNumber: "56987654321",
  whatsappDisplay: "+56 9 8765 4321",
  email: "contacto@techflowsoluciones.cl",
} as const;

/** Mensaje precargado: el cliente no parte de una conversación en blanco. */
export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  "Hola, quiero agendar el diagnóstico gratuito para mi empresa."
)}`;
