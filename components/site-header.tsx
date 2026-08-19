"use client";

import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil si la ventana crece a desktop.
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 lg:px-20">
        <a href="#" className="text-xl font-bold tracking-tight text-ink">
          nube9
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contacto">Diagnóstico gratis</a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
          >
            {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        aria-label="Navegación móvil"
        className={cn(
          "grid overflow-hidden border-t border-border bg-background transition-[grid-template-rows] duration-200 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col px-6 py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <Button asChild className="w-full">
                <a href="#contacto" onClick={() => setOpen(false)}>
                  Diagnóstico gratis
                </a>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
