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
  formatUF,
  planPriceUF,
  ufToCLP,
  ufToUSD,
} from "@/lib/pricing";
import type { Rates } from "@/lib/rates";
import { useShowUSD } from "@/lib/use-country";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

function fill(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template
  );
}

export function Pricing({
  dict,
  locale,
  rates,
}: {
  dict: Dictionary;
  locale: Locale;
  rates: Rates;
}) {
  const [equipos, setEquipos] = useState(EQUIPOS_DEFAULT);

  // La moneda la decide el país, no el idioma: alguien en Madrid leyendo en
  // español tampoco sabe cuánto es una UF.
  const showUSD = useShowUSD();

  return (
    <section id="planes" aria-labelledby="planes-titulo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 lg:mb-16">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
            {dict.pricing.eyebrow}
          </p>
          <h2
            id="planes-titulo"
            className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
          >
            {dict.pricing.title}
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">{dict.pricing.lead}</p>
        </div>

        {/* Control de tamaño: el precio de las tres tarjetas se recalcula
            en vivo, así el gerente no tiene que adivinar en qué tramo cae. */}
        <div className="mb-12 border border-border p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Label htmlFor="equipos-slider" className="text-foreground">
                {dict.pricing.sliderLabel}
              </Label>
              <p className="mt-2 text-sm text-muted-foreground">
                {dict.pricing.sliderHelp}
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
            aria-label={dict.pricing.sliderAria}
            aria-valuetext={`${equipos} ${dict.pricing.unitsSuffix}`}
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>{EQUIPOS_MIN}</span>
            <span>
              {EQUIPOS_MAX} {dict.pricing.maxSuffix}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
          {PLANS.map((plan) => {
            const precioUF = planPriceUF(plan, equipos);
            const copy = dict.pricing.plans[plan.id];

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
                    {dict.pricing.recommended}
                  </p>
                )}

                <h3 className="font-display text-2xl">{copy.name}</h3>
                <p
                  className={cn(
                    "mt-3 text-sm",
                    plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                  )}
                >
                  {copy.description}
                </p>

                {/* El precio en UF es el precio real y no depende del país:
                    se pinta igual en el primer render, así que el visitante
                    nunca ve un número cambiar bajo el cursor. */}
                <p className="mt-8">
                  <span className="font-display text-5xl tabular-nums">
                    {formatUF(precioUF, locale)} UF
                  </span>
                  <span
                    className={cn(
                      "ml-2 text-sm",
                      plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                    )}
                  >
                    {dict.pricing.perMonth}
                  </span>
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm tabular-nums",
                    plan.highlighted ? "text-bone/60" : "text-muted-foreground"
                  )}
                >
                  {showUSD
                    ? fill(dict.pricing.usdEquivalent, {
                        amount: ufToUSD(precioUF, rates.ufClp, rates.usdClp, locale),
                        units: equipos,
                      })
                    : fill(dict.pricing.clpEquivalent, {
                        amount: ufToCLP(precioUF, rates.ufClp, locale),
                        units: equipos,
                      })}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    plan.highlighted ? "text-bone/50" : "text-muted-foreground"
                  )}
                >
                  {fill(dict.pricing.breakdown, {
                    base: formatUF(plan.base, locale),
                    perUnit: formatUF(plan.perEquipo, locale),
                  })}
                </p>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {copy.features.map((feature) => (
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
                    {dict.pricing.planCta}
                    <span className="sr-only">
                      {" "}
                      — {dict.pricing.planCtaSr} {copy.name}
                    </span>
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
            <h3 className="font-display text-2xl">{dict.pricing.extrasTitle}</h3>
          </div>
          <div className="flex flex-col gap-4 text-muted-foreground">
            <p className="leading-relaxed">
              <strong className="font-medium text-foreground">
                {dict.pricing.extras.licensesStrong}
              </strong>{" "}
              {dict.pricing.extras.licensesBody1}{" "}
              <strong className="font-medium text-foreground">
                {dict.pricing.extras.licensesStrong2}
              </strong>
              {dict.pricing.extras.licensesBody2}
            </p>
            <p className="leading-relaxed">
              <strong className="font-medium text-foreground">
                {dict.pricing.extras.projectsStrong}
              </strong>{" "}
              {dict.pricing.extras.projectsBody}
            </p>
            <p className="leading-relaxed">
              {dict.pricing.extras.ownershipBody1}{" "}
              <strong className="font-medium text-foreground">
                {dict.pricing.extras.ownershipStrong}
              </strong>
              {dict.pricing.extras.ownershipBody2}
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {fill(showUSD ? dict.pricing.disclaimerUsd : dict.pricing.disclaimer, {
            date: rates.date,
            min: EQUIPOS_MIN,
          })}
        </p>
      </div>
    </section>
  );
}
