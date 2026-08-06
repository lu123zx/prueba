import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL").format(value);
}

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
      "Monitoreo de sistemas las 24 horas",
      "Respuesta garantizada en menos de 2 horas",
      "Un encargado fijo asignado a tu empresa",
    ],
  },
  {
    name: "Integral",
    price: 590000,
    description: "Para empresas que quieren TI, web y automatización en un solo lugar.",
    features: [
      "Equipos ilimitados",
      "Todo lo incluido en el plan Negocio",
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
            className="max-w-xl font-display text-4xl leading-tight95 text-graphite sm:text-5xl"
          >
            Un precio fijo, mes a mes.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-graphite/12 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col p-8 lg:p-10",
                plan.highlighted ? "bg-graphite text-bone" : "bg-bone text-graphite"
              )}
            >
              {plan.highlighted && (
                <p className="mb-6 inline-block w-fit border border-accent-tint bg-accent-tint/10 px-3 py-1 text-[12px] font-medium uppercase tracking-wide text-accent-tint">
                  Más elegido
                </p>
              )}
              <h3 className="font-display text-2xl">{plan.name}</h3>
              <p
                className={cn(
                  "mt-3 text-sm",
                  plan.highlighted ? "text-bone/60" : "text-graphite/60"
                )}
              >
                {plan.description}
              </p>

              <p className="mt-8">
                <span className="font-display text-5xl">
                  ${formatCLP(plan.price)}
                </span>
                <span
                  className={cn(
                    "ml-2 text-sm",
                    plan.highlighted ? "text-bone/60" : "text-graphite/60"
                  )}
                >
                  /mes + IVA
                </span>
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.highlighted ? "text-accent-tint" : "text-accent"
                      )}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span
                      className={
                        plan.highlighted ? "text-bone/80" : "text-graphite/75"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="mt-10 w-full"
                variant={plan.highlighted ? "primary-dark" : "primary"}
              >
                <a href="#contacto">Agendar diagnóstico</a>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-graphite/60">
          Sin contrato anual forzoso. Los accesos y licencias quedan a tu
          nombre.
        </p>
      </div>
    </section>
  );
}
