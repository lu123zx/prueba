import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { whatsappUrl } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

/**
 * Botón flotante, visible en todos los tamaños: para una empresa que trabaja
 * de forma remota, WhatsApp es la puerta de entrada principal.
 */
export function WhatsAppButton({ dict }: { dict: Dictionary }) {
  return (
    <a
      href={whatsappUrl(dict.whatsapp.prefilled)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.whatsapp.floatingAria}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-accent px-4 py-4 text-accent-foreground transition-colors duration-200 hover:bg-graphite sm:py-3.5"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="hidden text-sm font-medium sm:inline">
        {dict.whatsapp.floatingLabel}
      </span>
    </a>
  );
}
