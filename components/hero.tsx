import { Button } from "@/components/ui/button";
import { NetworkCanvas } from "@/components/network-canvas";
import type { Dictionary } from "@/lib/i18n";

/**
 * PENDIENTE DE CONFIRMAR ANTES DE PUBLICAR.
 *
 * Las tres cifras del pie son afirmaciones objetivas y comprobables: si no
 * son ciertas, son publicidad engañosa (art. 28 Ley 19.496). Se reemplazaron
 * "120+ equipos gestionados" y "9 años" porque no hay operación previa que
 * los respalde. Las actuales describen cómo funciona el servicio, no un
 * historial, así que se sostienen desde el primer cliente.
 *
 * El texto vive en los diccionarios de idioma; cuando existan cifras reales
 * de clientes y trayectoria, se cambian allí en los dos idiomas.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="inicio"
      aria-label={dict.hero.sectionLabel}
      className="relative overflow-hidden pt-40 pb-24 lg:pt-56 lg:pb-32"
    >
      <NetworkCanvas />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
          {dict.hero.eyebrow}
        </p>

        <h1 className="max-w-5xl text-balance font-display text-hero font-normal tracking-tight">
          {dict.hero.h1}
        </h1>

        <p className="mt-8 max-w-xl text-lg text-muted-foreground lg:text-xl">
          {dict.hero.lead}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="#contacto">{dict.hero.ctaPrimary}</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#planes">{dict.hero.ctaSecondary}</a>
          </Button>
        </div>
      </div>

      <div className="relative mt-24 border-y border-border bg-background lg:mt-32">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-border px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-12">
          {dict.hero.stats.map((stat) => (
            <div key={stat.label} className="py-8 sm:px-8 sm:first:pl-0 lg:py-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl lg:text-5xl">
                  {stat.value}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-2 block max-w-[22ch] text-sm text-muted-foreground"
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
