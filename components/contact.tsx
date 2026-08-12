import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { SITE, whatsappUrl } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Contact({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24 lg:px-12">
        <div>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
            {dict.contact.eyebrow}
          </p>
          <h2
            id="contacto-titulo"
            className="max-w-sm font-display text-4xl leading-[0.95] sm:text-5xl"
          >
            {dict.contact.title}
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">{dict.contact.lead}</p>
          <a
            href={whatsappUrl(dict.whatsapp.prefilled)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border-b border-accent pb-1 text-accent transition-colors duration-200 hover:border-foreground hover:text-foreground"
          >
            <WhatsAppIcon className="size-4" />
            {SITE.whatsappDisplay}
          </a>
        </div>

        <ContactForm dict={dict} locale={locale} />
      </div>
    </section>
  );
}
