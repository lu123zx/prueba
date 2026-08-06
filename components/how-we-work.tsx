const STEPS = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    description:
      "Visitamos tu oficina o revisamos tu sistema por videollamada. Te decimos qué está fallando y qué riesgos corres, sin compromiso ni letra chica.",
  },
  {
    number: "02",
    title: "Plan a medida",
    description:
      "Te armamos una propuesta con precio fijo mensual, hecha para tu empresa y no para una plantilla. Solo pagas por lo que vas a usar.",
  },
  {
    number: "03",
    title: "Soporte continuo",
    description:
      "Un equipo fijo de personas conoce tu empresa, tus sistemas y tu forma de trabajar. Nada de explicarle tu problema a alguien nuevo cada vez.",
  },
];

export function HowWeWork() {
  return (
    <section
      id="como-trabajamos"
      aria-labelledby="como-trabajamos-titulo"
      className="bg-graphite py-24 text-bone lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent-tint">
          Cómo trabajamos
        </p>
        <h2
          id="como-trabajamos-titulo"
          className="max-w-xl font-display text-4xl leading-tight95 sm:text-5xl"
        >
          Tres pasos, sin sorpresas en el camino.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-bone/10 pt-12 sm:grid-cols-3 sm:gap-8 lg:mt-20 lg:pt-16">
          {STEPS.map((step) => (
            <div key={step.number}>
              <p className="font-display text-7xl leading-none text-accent-tint lg:text-8xl">
                {step.number}
              </p>
              <h3 className="mt-6 text-xl font-medium text-bone">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-bone/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
