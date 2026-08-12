import Link from "next/link";
import {
  ArrowRightIcon,
  Code2Icon,
  HeadsetIcon,
  NetworkIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

import { getServices, type ServiceId } from "@/lib/services-data";
import { routePath, type Dictionary, type Locale } from "@/lib/i18n";

/** Los textos viven en lib/services-data.ts, junto con los de cada página
 *  de servicio. Acá solo se elige el icono que le toca a cada servicio.
 *  Va por id y no por slug porque el slug cambia con el idioma. */
const ICONS: Record<ServiceId, LucideIcon> = {
  "it-support": HeadsetIcon,
  "web-development": Code2Icon,
  automation: WorkflowIcon,
  "networks-security": NetworkIcon,
};

export function Services({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const services = getServices(locale);

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
              {dict.services.eyebrow}
            </p>
            <h2
              id="servicios-titulo"
              className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
            >
              {dict.services.title}
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">{dict.services.lead}</p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2">
          {services.map((service) => {
            const Icon = ICONS[service.id];
            return (
              <article
                key={service.id}
                className="group border-b border-r border-border transition-colors duration-200 hover:bg-graphite"
              >
                {/* Toda la tarjeta es el enlace: más área de clic y un solo
                    destino por tarjeta, que es lo que espera un lector de
                    pantalla y lo que Google lee como enlace interno. */}
                <Link
                  href={routePath(locale, "services", service.slug)}
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
                    {dict.services.linkPrefix} {service.name.toLowerCase()}
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
