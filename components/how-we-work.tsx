import type { Dictionary } from "@/lib/i18n";

export function HowWeWork({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="como-trabajamos"
      aria-labelledby="como-trabajamos-titulo"
      className="bg-graphite py-24 text-bone lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent-tint">
          {dict.howWeWork.eyebrow}
        </p>
        <h2
          id="como-trabajamos-titulo"
          className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
        >
          {dict.howWeWork.title}
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-12 border-t border-bone/10 pt-12 sm:grid-cols-3 sm:gap-8 lg:mt-20 lg:pt-16">
          {dict.howWeWork.steps.map((step) => (
            <li key={step.number}>
              <span
                aria-hidden="true"
                className="block font-display text-7xl leading-none text-accent-tint lg:text-8xl"
              >
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-bone/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
