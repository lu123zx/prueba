import Link from "next/link";
import { navLinks, site, whatsappUrl } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="#inicio" className="text-lg font-semibold tracking-tight">
              TechFlow<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-pretty text-muted-foreground">
              Soporte TI, desarrollo y automatización para pymes de Santiago.
            </p>
          </div>

          <nav aria-label="Secciones">
            <h2 className="text-sm font-medium">Sitio</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium">Empresa</h2>
            <address className="mt-4 text-sm not-italic text-muted-foreground">
              {site.legalName}
              <br />
              RUT {site.rut}
              <br />
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city}
            </address>
          </div>

          <div>
            <h2 className="text-sm font-medium">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {site.phone} (WhatsApp)
                </a>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-de-servicio"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Términos de servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {year} {site.legalName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
