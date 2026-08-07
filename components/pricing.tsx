"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  EQUIPOS_DEFAULT,
  EQUIPOS_MAX,
  EQUIPOS_MIN,
  PLANS,
  UF_DATE,
  formatUF,
  planPriceUF,
  ufToCLP,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [equipos, setEquipos] = useState(EQUIPOS_DEFAULT);

  return (
    <section id="planes" aria-labelledby="planes-titulo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 lg:mb-16">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
            Planes
          </p>
          <h2
            id="planes-titulo"
            className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
          >
            Pagas por los computadores que cuidamos.
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Un cargo fijo al mes más un valor por cada equipo. Mueve la barra
            hasta el tamaño de tu empresa y verás el precio exacto: sin tramos
            donde terminas pagando por equipos que no tienes.
          </p>
        </div>

        {/* Control de tamaño: el precio de las tres tarjetas se recalcula
            en vivo, así el gerente no tiene que adivinar en qué tramo cae. */}
        <div className="mb-12 border border-border p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Label htmlFor="equipos-slider" className="text-foreground">
                ¿Cuántos computadores tiene tu empresa?
              </Label>
              <p className="mt-2 text-sm text-muted-foreground">
                Cuenta notebooks, computadores de escritorio y servidores.
              </p>
            </div>
            <output
              htmlFor="equipos-slider"
              className="font-display text-5xl tabular-nums"
              aria-live="polite"
            >
              {equipos}
              {equipos === EQUIPOS_MAX && "+"}
            </output>
          </div>

          <Slider
            id="equipos-slider"
            className="mt-8"
            min={EQUIPOS_MIN}
            max={EQUIPOS_MAX}
            step={1}
            value={[equipos]}
            onValueChange={([v]) => setEquipos(v)}
            aria-label="Cantidad de computadores"
            aria-valuetext={`${equipos} computadores`}
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>{EQUIPOS_MIN}</span>
            <span>{EQUIPOS_MAX} o más</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
          {PLANS.map((plan) => {
            const precioUF = planPriceUF(plan, equipos);
            return (
              <article
                key={plan.id}
                className={cn(
                  "flex flex-col p-8 lg:p-10",
                  plan.highlighted
                    ? "bg-graphite text-bone"
                    : "bg-background text-foreground"
                )}
              >
                {plan.highlighted && (
                  <p className="mb-6 w-fit border border-accent-tint px-3 py-1 text-[12px] font-medium uppercase tracking-wide text-accent-tint">
                    Recomendado
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
                  <span className="font-display text-5xl tabular-nums">
                    {formatUF(precioUF)} UF
                  </span>
                  <span
                    className={cn(
                      "ml-2 text-sm",
                      plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                    )}
                  >
                    /mes
                  </span>
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm tabular-nums",
                    plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                  )}
                >
                  Hoy son unos ${ufToCLP(precioUF)} al mes por {equipos} equipos
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    plan.highlighted ? "text-bone/50" : "text-muted-foreground"
                  )}
                >
                  {formatUF(plan.base)} UF fijas + {formatUF(plan.perEquipo)} UF
                  por equipo
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
            );
          })}
        </div>

        {/* Las licencias y los proyectos son las dos sorpresas clásicas en la
            primera factura. Van explicadas acá, no en la letra chica. */}
        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <h3 className="font-display text-2xl">
              Qué se paga aparte, dicho antes de firmar.
            </h3>
          </div>
          <div className="flex flex-col gap-4 text-muted-foreground">
            <p className="leading-relaxed">
              <strong className="font-medium text-foreground">
                Las licencias no están incluidas en el plan y no pasan por
                nosotros.
              </strong>{" "}
              Microsoft 365, antivirus, respaldo en la nube y cualquier programa
              que uses se contratan{" "}
              <strong className="font-medium text-foreground">
                directamente a nombre de tu empresa
              </strong>
              , con tu medio de pago. Nosotros te decimos qué necesitas, te
              ayudamos a contratarlo y lo administramos, pero el proveedor te
              cobra a ti: así no te recargamos nada y el día que te vayas la
              licencia ya es tuya. Suelen salir entre $8.000 y $14.000 por
              persona al mes.
            </p>
            <p className="leading-relaxed">
              <strong className="font-medium text-foreground">
                Los proyectos se cotizan por separado.
              </strong>{" "}
              Hacer tu página web, montar una tienda online o automatizar un
              proceso son trabajos con principio y fin: se cotizan una vez, con
              precio cerrado. No los metemos dentro de la mensualidad porque
              eso te obligaría a firmar un contrato largo, y no trabajamos así.
            </p>
            <p className="leading-relaxed">
              Todo queda{" "}
              <strong className="font-medium text-foreground">
                a nombre de tu empresa
              </strong>
              , no del nuestro. Si algún día te vas, se va contigo. Sin contrato
              anual forzoso.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Valores en UF. El equivalente en pesos es referencial, con la UF del{" "}
          {UF_DATE}. El servicio lo presta una persona natural y se documenta
          con boleta de honorarios electrónica, que está exenta de IVA: no se
          agrega ese 19% al valor publicado. Si tu empresa tributa en primera
          categoría, debe practicar la retención de segunda categoría que
          corresponda al emitirse la boleta. Bajo {EQUIPOS_MIN} equipos conviene
          más el soporte por hora: te lo decimos en el diagnóstico.
        </p>
      </div>
    </section>
  );
}
