import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatUF, ufToCLP, UF_DATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  uf: number;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Esencial",
    uf: 4.5,
    description: "Para empresas de hasta 15 equipos que recién ordenan su TI.",
    features: [
      "Hasta 15 equipos cubiertos",
      "Mesa de ayuda por teléfono, WhatsApp y remoto",
      "Respaldo diario de archivos",
      "Revisión de seguridad mensual",
    ],
  },
  {
    name: "Negocio",
    uf: 8.5,
    description: "El más elegido por pymes de 15 a 35 personas en Santiago.",
    highlighted: true,
    features: [
      "Hasta 35 equipos cubiertos",
      "Respuesta garantizada en menos de 2 horas",
      "Revisamos tus sistemas las 24 horas",
      "Un encargado fijo asignado a tu empresa",
      "Administramos tus licencias y renovaciones",
    ],
  },
  {
    name: "Integral",
    uf: 14.5,
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
          <p className="mt-6 max-w-xl text-muted-foreground">
            Cobramos en UF para no tener que subirte el precio cada año. Lo que
            ves es lo que pagas: acá abajo te decimos exactamente qué se
            factura aparte.
          </p>
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
                  {formatUF(plan.uf)} UF
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
              <p
                className={cn(
                  "mt-2 text-sm",
                  plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                )}
              >
                Hoy son unos ${ufToCLP(plan.uf)} al mes
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

        {/* Las licencias son la sorpresa clásica en la primera factura.
            Van explicadas acá, no en la letra chica de un contrato. */}
        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <h3 className="font-display text-2xl">
              Qué se paga aparte, dicho antes de firmar.
            </h3>
          </div>
          <div className="flex flex-col gap-4 text-muted-foreground">
            <p className="leading-relaxed">
              <strong className="font-medium text-foreground">
                Las licencias no están incluidas en el plan.
              </strong>{" "}
              Microsoft 365, antivirus, respaldo en la nube y cualquier programa
              que tu empresa use se cobran aparte,{" "}
              <strong className="font-medium text-foreground">
                al precio que nos cuestan a nosotros
              </strong>
              , sin recargo. Te llegan en la misma factura, en una línea
              separada, para que veas exactamente cuánto es cada cosa.
            </p>
            <p className="leading-relaxed">
              Para que te hagas una idea: una licencia de Microsoft 365 y
              antivirus por persona suele salir entre $8.000 y $14.000 al mes.
              En el diagnóstico te entregamos el número exacto de tu caso, antes
              de que decidas.
            </p>
            <p className="leading-relaxed">
              Quedan{" "}
              <strong className="font-medium text-foreground">
                a nombre de tu empresa
              </strong>
              , no del nuestro. Si algún día te vas, las licencias se van
              contigo. Sin contrato anual forzoso.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Valores en UF, sin IVA. El equivalente en pesos es referencial, con la
          UF del {UF_DATE}.
        </p>
      </div>
    </section>
  );
}
