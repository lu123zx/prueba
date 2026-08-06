import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section
      aria-labelledby="clientes-titulo"
      className="border-y border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Clientes"
            title={<span id="clientes-titulo">Lo dicen ellos, no nosotros.</span>}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-7">
                <div aria-label="5 de 5 estrellas" className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      aria-hidden
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1 text-lg text-pretty text-foreground/90">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  >
                    {t.initials}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium text-foreground">{t.name}</span>
                    <span className="block text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
