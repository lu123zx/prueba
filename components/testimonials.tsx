type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

/**
 * Sin nombre de empresa: se identifica el cargo, el rubro y la comuna, que es
 * lo que le sirve al lector para reconocerse, sin exponer al cliente.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dejamos de perder medio día cada vez que se caía el sistema de boletas. Ahora nos llaman ellos antes de que nosotros nos demos cuenta.",
    name: "Marcela R.",
    role: "Gerenta general — Distribuidora de repuestos, Recoleta",
    initials: "MR",
  },
  {
    quote:
      "Nos armaron la tienda online en un mes y sigue siendo nuestra: el dominio, las licencias, todo a nuestro nombre. Si algún día nos cambiamos, no perdemos nada.",
    name: "Francisco A.",
    role: "Socio fundador — Fábrica de muebles, San Joaquín",
    initials: "FA",
  },
];

export function Testimonials() {
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
          Clientes
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
