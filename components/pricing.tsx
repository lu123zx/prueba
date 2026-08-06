import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { plans } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="planes" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Planes"
            title="Un precio fijo, mes a mes."
            description="Sin costos por hora ni sorpresas en la factura. Lo que ves es lo que pagas."
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90}>
              <article
                className={cn(
                  "card-soft relative flex h-full flex-col rounded-2xl bg-card p-6 sm:p-8",
                  plan.featured
                    ? "ring-2 ring-primary lg:-mt-4 lg:pb-10"
                    : "",
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Sparkles aria-hidden className="size-3" />
                    Más elegido
                  </span>
                )}

                <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {plan.blurb}
                </p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/mes + IVA</span>
                </p>

                <ul className="mt-7 flex-1 space-y-3.5 border-t border-border pt-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-pretty text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={plan.featured ? "default" : "outline"}
                  size="lg"
                >
                  <Link href="#contacto">
                    Agendar diagnóstico
                    <span className="sr-only"> del plan {plan.name}</span>
                  </Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Sin contrato anual forzoso. Los accesos y licencias quedan a tu nombre.
        </p>
      </div>
    </section>
  );
}
