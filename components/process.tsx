import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { steps } from "@/lib/site-config";

export function Process() {
  return (
    <section
      id="como-trabajamos"
      className="bg-secondary/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Tres pasos, sin sorpresas en el camino."
          />
        </Reveal>

        <ol className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Línea conectora solo en escritorio */}
          <div
            aria-hidden
            className="absolute top-6 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />

          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 120} className="relative">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm shadow-primary/30">
                {step.n}
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm text-pretty text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
