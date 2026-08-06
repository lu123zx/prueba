import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { navLinks, site, whatsappUrl } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-2xl font-bold tracking-tight text-balance">
              ¿Listo para empezar?
            </p>
            <p className="mt-2 max-w-sm text-sm text-pretty text-muted-foreground">
              Diagnóstico gratuito de 30 minutos, sin compromiso.
            </p>
          </div>
          <Link
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Agendar
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="#inicio" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <LogoMark className="size-5" />
              TechFlow
            </Link>
            <p className="mt-3 max-w-xs text-sm text-pretty text-muted-foreground">
              Soporte TI, desarrollo y automatización para pymes de Santiago.
            </p>
          </div>

          <nav aria-label="Secciones">
            <h2 className="text-sm font-semibold">Sitio</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">Empresa</h2>
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
            <h2 className="text-sm font-semibold">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {site.phone} (WhatsApp)
                </a>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-de-servicio"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Términos de servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          © {year} {site.legalName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
