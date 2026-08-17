import type { Dictionary } from "@/lib/i18n";

export function Problem({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="problema"
      aria-labelledby="problema-titulo"
      className="bg-graphite py-24 text-bone lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2
          id="problema-titulo"
          className="mb-16 text-[13px] font-medium uppercase tracking-[0.18em] text-accent-tint lg:mb-20"
        >
          {dict.problem.title}
        </h2>

        <ul className="flex flex-col divide-y divide-bone/10 border-t border-bone/10">
          {dict.problem.pains.map((pain) => (
            <li key={pain} className="py-10 lg:py-14">
              <blockquote className="max-w-4xl font-display text-3xl leading-[1.15] text-bone/90 sm:text-4xl lg:text-5xl">
                &ldquo;{pain}&rdquo;
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
