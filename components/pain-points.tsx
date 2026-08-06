import { Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { painPoints } from "@/lib/site-config";

export function PainPoints() {
  return (
    <section aria-labelledby="problema-titulo" className="border-y border-border bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            El problema
          </span>
          <h2
            id="problema-titulo"
            className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            Lo que nos dicen las pymes la primera vez que llaman.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {painPoints.map((quote, i) => (
            <Reveal as="li" key={quote} delay={i * 100}>
              <figure className="h-full rounded-xl border border-border bg-card p-6">
                <Quote aria-hidden className="size-5 text-primary/60" />
                <blockquote className="mt-4 text-base text-pretty text-foreground/90">
                  “{quote}”
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
