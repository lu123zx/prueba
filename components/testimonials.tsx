import { CheckIcon } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

/**
 * VACÍO A PROPÓSITO.
 *
 * Publicar testimonios inventados es publicidad engañosa (art. 28 de la Ley
 * 19.496, que alcanza a este negocio por el art. 9 de la Ley 20.416 al ser los
 * clientes micro y pequeñas empresas). Acá solo van clientes reales, con su
 * autorización por escrito para usar nombre, cargo y rubro.
 *
 * Mientras no haya ninguno, la sección muestra los compromisos del servicio,
 * que son afirmaciones propias y verificables, no opiniones de terceros.
 *
 * Si algún día se llena, los testimonios van en el idioma en que los dijo el
 * cliente: traducir una cita textual y seguir presentándola entre comillas
 * es ponerle en la boca palabras que no dijo.
 */
const TESTIMONIALS: Testimonial[] = [];

export function Testimonials({ dict }: { dict: Dictionary }) {
  if (TESTIMONIALS.length > 0) {
    return (
      <section
        aria-labelledby="testimonios-titulo"
        className="border-y border-border py-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <h2
            id="testimonios-titulo"
            className="mb-16 text-[13px] font-medium uppercase tracking-[0.18em] text-accent lg:mb-20"
          >
            {dict.commitments.clientsTitle}
          </h2>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
            {TESTIMONIALS.map((testimonial) => (
              <figure key={testimonial.name} className="flex flex-col">
                <blockquote className="font-display text-2xl leading-snug sm:text-3xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full border border-accent text-sm font-medium text-accent"
                  >
                    {testimonial.initials}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">{testimonial.name}</span>
                    <span className="block text-muted-foreground">
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="compromisos-titulo"
      className="border-y border-border py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
          {dict.commitments.eyebrow}
        </p>
        <h2
          id="compromisos-titulo"
          className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
        >
          {dict.commitments.title}
        </h2>

        <ul className="mt-16 grid grid-cols-1 gap-12 border-t border-border pt-12 sm:grid-cols-3 sm:gap-8">
          {dict.commitments.items.map((c) => (
            <li key={c.title}>
              <CheckIcon className="size-6 text-accent" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-medium">{c.title}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
