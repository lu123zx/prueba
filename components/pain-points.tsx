import { Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { painPoints } from "@/lib/site-config";

export function PainPoints() {
  return (
    <section aria-labelledby="problema-titulo" className="bg-secondary/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            El problema
          </span>
          <h2
            id="problema-titulo"
            className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl"
          >
            Lo que nos dicen las pymes la primera vez que llaman.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {painPoints.map((quote, i) => (
            <Reveal as="li" key={quote} delay={i * 100}>
              <figure className="card-soft h-full rounded-2xl bg-card p-6">
                <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Quote aria-hidden className="size-4" />
                </span>
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
