import { SITE, WHATSAPP_URL } from "@/lib/site";

const LEGAL_LINKS = [
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/terminos-de-servicio", label: "Términos de servicio" },
];

export function Footer() {
  return (
    // pb generoso: deja libre la franja que ocupa el botón flotante de
    // WhatsApp, para que nunca tape la línea de copyright.
    <footer className="bg-graphite pt-16 pb-28 text-bone">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-bone/10 pb-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-display text-2xl">
              TechFlow<span className="text-accent-tint">.</span>
            </p>
            <p className="mt-4 max-w-[28ch] text-sm text-bone/60">
              Soporte TI remoto, desarrollo y automatización para pymes de
              Santiago.
            </p>
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              Contacto
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
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
                >
                  {SITE.whatsappDisplay} (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              Legal
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="pt-8 text-xs text-bone/60">
          © {new Date().getFullYear()} TechFlow Soluciones SpA. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}
