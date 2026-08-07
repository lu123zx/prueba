import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** CLP siempre con separador de miles y sin decimales: $189.000 */
const CLP = new Intl.NumberFormat("es-CL");

type Plan = {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Esencial",
    price: 189000,
    description: "Para empresas de hasta 15 equipos que recién ordenan su TI.",
    features: [
      "Hasta 15 equipos cubiertos",
      "Soporte remoto en horario hábil",
      "Respaldo diario de archivos",
      "Revisión de seguridad mensual",
    ],
  },
  {
    name: "Negocio",
    price: 349000,
    description: "El más elegido por pymes de 15 a 35 personas en Santiago.",
    highlighted: true,
    features: [
      "Hasta 35 equipos cubiertos",
      "Soporte remoto y presencial cuando se necesita",
      "Revisamos tus sistemas las 24 horas",
      "Respuesta garantizada en menos de 2 horas",
      "Un encargado fijo asignado a tu empresa",
    ],
  },
  {
    name: "Integral",
    price: 590000,
    description:
      "Para empresas que quieren TI, web y automatización en un solo lugar.",
    features: [
      "Equipos ilimitados",
      "Todo lo del plan Negocio",
      "Mantención de tu sitio o tienda web",
      "Una automatización de proceso incluida al año",
      "Reunión mensual de revisión con tu encargado",
    ],
  },
];

export function Pricing() {
  return (
    <section id="planes" aria-labelledby="planes-titulo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 lg:mb-20">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
            Planes
          </p>
          <h2
            id="planes-titulo"
            className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
          >
            Un precio fijo, mes a mes.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "flex flex-col p-8 lg:p-10",
                plan.highlighted
                  ? "bg-graphite text-bone"
                  : "bg-background text-foreground"
              )}
            >
              {plan.highlighted && (
                <p className="mb-6 w-fit border border-accent-tint px-3 py-1 text-[12px] font-medium uppercase tracking-wide text-accent-tint">
                  Más elegido
                </p>
              )}

              <h3 className="font-display text-2xl">{plan.name}</h3>
              <p
                className={cn(
                  "mt-3 text-sm",
                  plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                )}
              >
                {plan.description}
              </p>

              <p className="mt-8">
                <span className="font-display text-5xl">
                  ${CLP.format(plan.price)}
                </span>
                <span
                  className={cn(
                    "ml-2 text-sm",
                    plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                  )}
                >
                  /mes + IVA
                </span>
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed">
                    <CheckIcon
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.highlighted ? "text-accent-tint" : "text-accent"
                      )}
                      aria-hidden="true"
                    />
                    <span className={plan.highlighted ? "text-bone/80" : undefined}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="mt-10 w-full"
                variant={plan.highlighted ? "default-dark" : "default"}
              >
                <a href="#contacto">
                  Agendar diagnóstico
                  <span className="sr-only"> — plan {plan.name}</span>
                </a>
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          Sin contrato anual forzoso. Los accesos y licencias quedan a tu nombre.
        </p>
      </div>
    </section>
  );
}
