import Link from "next/link";
import {
  ArrowRightIcon,
  Code2Icon,
  HeadsetIcon,
  NetworkIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

import { SERVICES } from "@/lib/services-data";

/** Los textos viven en lib/services-data.ts, junto con los de cada página
 *  de servicio. Acá solo se elige el icono que le toca a cada slug. */
const ICONS: Record<string, LucideIcon> = {
  "soporte-informatico": HeadsetIcon,
  "desarrollo-web": Code2Icon,
  "automatizacion-de-procesos": WorkflowIcon,
  "redes-y-ciberseguridad": NetworkIcon,
};

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
              Servicios
            </p>
            <h2
              id="servicios-titulo"
              className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
            >
              Cuatro formas de dejar de apagar incendios.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Trabajamos de forma remota, así que no esperas la visita de nadie.
            Puedes contratar uno o todos: el plan se arma según lo que tu
            empresa de verdad necesita.
          </p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.slug];
            return (
              <article
                key={service.slug}
                className="group border-b border-r border-border transition-colors duration-200 hover:bg-graphite"
              >
                {/* Toda la tarjeta es el enlace: más área de clic y un solo
                    destino por tarjeta, que es lo que espera un lector de
                    pantalla y lo que Google lee como enlace interno. */}
                <Link
                  href={`/servicios/${service.slug}`}
                  className="flex h-full flex-col p-8 lg:p-10"
                >
                  <Icon
                    className="size-8 text-accent transition-colors duration-200 group-hover:text-accent-tint"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <h3 className="mt-8 font-display text-2xl transition-colors duration-200 group-hover:text-bone lg:text-[1.75rem]">
                    {service.name}
                  </h3>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-bone/75"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent transition-colors duration-200 group-hover:bg-accent-tint"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-200 group-hover:text-accent-tint">
                    Ver {service.name.toLowerCase()}
                    <ArrowRightIcon
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
