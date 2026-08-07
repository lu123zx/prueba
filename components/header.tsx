"use client";

import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#planes", label: "Planes" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a href="#inicio" className="font-display text-2xl tracking-tight">
          TechFlow<span className="text-accent">.</span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-10 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" className="hidden lg:inline-flex">
          <a href="#contacto">Agendar diagnóstico</a>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
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
          aria-label="Navegación móvil"
          className="border-t border-border bg-background px-6 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
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
          </ul>
          <Button asChild className="mt-4 w-full">
            <a href="#contacto" onClick={() => setMenuOpen(false)}>
              Agendar diagnóstico
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
