import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { SITE, WHATSAPP_URL } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24 lg:px-12">
        <div>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
            Contacto
          </p>
          <h2
            id="contacto-titulo"
            className="max-w-sm font-display text-4xl leading-[0.95] sm:text-5xl"
          >
            Cuéntanos qué está fallando.
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Completa el formulario y te contactamos dentro de un día hábil para
            coordinar tu diagnóstico gratuito por videollamada. Si prefieres ir
            directo al grano, escríbenos por WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border-b border-accent pb-1 text-accent transition-colors duration-200 hover:border-foreground hover:text-foreground"
          >
            <WhatsAppIcon className="size-4" />
            {SITE.whatsappDisplay}
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
