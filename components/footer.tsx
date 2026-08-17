import Link from "next/link";

import { LEGAL, SITE, WHATSAPP_ENABLED, whatsappUrl } from "@/lib/site";
import { getServices } from "@/lib/services-data";
import { routePath, type Dictionary, type Locale } from "@/lib/i18n";

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const services = getServices(locale);

  const legalLinks = [
    { href: routePath(locale, "privacy"), label: dict.footer.privacy },
    { href: routePath(locale, "terms"), label: dict.footer.terms },
  ];

  return (
    // El pb extra solo hace falta cuando está el botón flotante de WhatsApp:
    // es la franja que ocupa, para que no tape la línea de copyright.
    <footer
      className={`bg-graphite pt-16 text-bone ${
        WHATSAPP_ENABLED ? "pb-28" : "pb-16"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-bone/10 pb-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-display text-2xl">
              TechFlow<span className="text-accent-tint">.</span>
            </p>
            <p className="mt-4 max-w-[28ch] text-sm text-bone/60">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              {dict.footer.services}
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={routePath(locale, "services", service.slug)}
                    className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              {dict.footer.contact}
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
                >
                  {SITE.email}
                </a>
              </li>
              {WHATSAPP_ENABLED && (
                <li>
                  <a
                    href={whatsappUrl(dict.whatsapp.prefilled)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
                  >
                    {SITE.whatsappDisplay} (WhatsApp)
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              {dict.footer.legal}
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-8 text-xs text-bone/60">
          <p>
            © {new Date().getFullYear()} {LEGAL.tradeName}. {dict.footer.rights}
          </p>
          {/* Identificación del prestador: es una persona natural, no una
              sociedad. Publicar una razón social que no existe sería una
              afirmación falsa frente al cliente. El régimen tributario se
              explica en el idioma del visitante, porque "boleta de
              honorarios" no significa nada fuera de Chile. */}
          <p>
            {dict.footer.legalLine
              .replace("{trade}", LEGAL.tradeName)
              .replace("{full}", LEGAL.fullName)
              .replace("{rut}", LEGAL.rut)}{" "}
            {LEGAL.taxNote[locale]}
          </p>
        </div>
      </div>
    </footer>
  );
}
