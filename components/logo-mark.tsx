import { cn } from "@/lib/utils";

/**
 * Marca gráfica de TechFlow: dos chevrones apilados que sugieren flujo y
 * avance — un guiño discreto al nombre sin depender de ninguna librería de
 * íconos.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 30"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d="M2 4 12 14 2 24 6 24 16 14 6 4Z" className="fill-primary/45" />
      <path d="M10 6 20 16 10 26 14 26 24 16 14 6Z" className="fill-primary" />
    </svg>
  );
}
