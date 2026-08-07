import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { WHATSAPP_URL } from "@/lib/site";

/**
 * Botón flotante, visible en todos los tamaños: para una empresa que trabaja
 * de forma remota, WhatsApp es la puerta de entrada principal.
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribirnos por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-accent px-4 py-4 text-accent-foreground transition-colors duration-200 hover:bg-graphite sm:py-3.5"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="hidden text-sm font-medium sm:inline">
        Escríbenos por WhatsApp
      </span>
    </a>
  );
}
