"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { equivalentPath } from "@/lib/i18n/paths";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

export function Header({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const home = localePath(locale, "/");

  // Fuera de la home esas secciones no existen: un "#planes" pelado no
  // llevaría a ninguna parte, así que se antepone la home del idioma.
  const isHome = pathname === home;
  const to = (anchor: string) => (isHome ? anchor : `${home === "/" ? "" : home}/${anchor}`);

  const navLinks = [
    { anchor: "#servicios", label: dict.nav.services },
    { anchor: "#como-trabajamos", label: dict.nav.howWeWork },
    { anchor: "#planes", label: dict.nav.plans },
    { anchor: "#preguntas-frecuentes", label: dict.nav.faq },
  ].map((s) => ({ href: to(s.anchor), label: s.label }));

  // La misma página en el otro idioma. Si no existe equivalente se cae a la
  // home de ese idioma, que siempre existe: mejor eso que un enlace muerto.
  const other: Locale = locale === "es" ? "en" : "es";
  const switchHref = equivalentPath(pathname, other) ?? localePath(other, "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <a href={to("#inicio")} className="font-display text-2xl tracking-tight">
          TechFlow<span className="text-accent">.</span>
        </a>

        <nav
          aria-label={dict.nav.mainNav}
          className="hidden items-center gap-10 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          {/* hrefLang le dice al navegador y al rastreador en qué idioma está
              lo que hay al otro lado, sin depender del texto del enlace. */}
          <Link
            href={switchHref}
            hrefLang={other}
            aria-label={dict.nav.languageLabel}
            className="text-[15px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {dict.nav.switchTo}
          </Link>
          <Button asChild size="sm">
            <a href={to("#contacto")}>{dict.nav.cta}</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <XIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </Button>
      </div>

      {menuOpen && (
        <nav
          id="menu-movil"
          aria-label={dict.nav.mobileNav}
          className="border-t border-border bg-background px-6 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-lg text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={switchHref}
                hrefLang={other}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-lg text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {dict.nav.switchTo}
              </Link>
            </li>
          </ul>
          <Button asChild className="mt-4 w-full">
            <a href={to("#contacto")} onClick={() => setMenuOpen(false)}>
              {dict.nav.cta}
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
