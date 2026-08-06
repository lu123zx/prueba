import { Check, Code2, Headset, Network, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services, type Service } from "@/lib/site-config";

// Mapa explícito: nunca construyas nombres de clase o componentes por concatenación.
const icons: Record<Service["icon"], LucideIcon> = {
  headset: Headset,
  code: Code2,
  workflow: Workflow,
  network: Network,
};

export function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Servicios"
            title="Cuatro formas de dejar de apagar incendios."
            description="Puedes contratar uno o todos. El plan se arma según lo que tu empresa realmente necesita."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.title} delay={i * 80}>
                <article className="glow-border h-full rounded-xl bg-card p-6 sm:p-7">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon aria-hidden className="size-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                        <Check
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-primary"
                        />
                        <span className="text-pretty">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
