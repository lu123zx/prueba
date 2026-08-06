const LEGAL_LINKS = [
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/terminos-de-servicio", label: "Términos de servicio" },
];

export function Footer() {
  return (
    <footer className="bg-graphite py-16 text-bone">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-bone/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl">
              TechFlow<span className="text-accent-tint">.</span>
            </p>
            <p className="mt-4 max-w-[26ch] text-sm text-bone/55">
              Soporte TI, desarrollo y automatización para pymes de Santiago.
            </p>
          </div>

          <div>
            <p className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              Empresa
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone/70">
              TechFlow Soluciones SpA
              <br />
              RUT 76.543.210-9
              <br />
              Av. Apoquindo 4900, of. 602
              <br />
              Las Condes, Santiago
            </p>
          </div>

          <div>
            <p className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              Contacto
            </p>
            <p className="mt-4 flex flex-col gap-2 text-sm">
              <a
                href="mailto:contacto@techflowsoluciones.cl"
                className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
              >
                contacto@techflowsoluciones.cl
              </a>
              <a
                href="https://wa.me/56987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
              >
                +56 9 8765 4321 (WhatsApp)
              </a>
            </p>
          </div>

          <div>
            <p className="text-[13px] font-medium uppercase tracking-wide text-bone/60">
              Legal
            </p>
            <p className="mt-4 flex flex-col gap-2 text-sm">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-bone/70 transition-colors duration-200 hover:text-accent-tint"
                >
                  {link.label}
                </a>
              ))}
            </p>
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
