const PAINS = [
  "Se me cayó el sistema el viernes a las seis y el proveedor contestó el lunes.",
  "Nadie sabe qué contraseña tiene qué, ni dónde quedaron guardadas las licencias.",
  "Pago mantención todos los meses y el que llama al técnico sigo siendo yo.",
];

export function Problem() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-titulo"
      className="bg-graphite py-24 text-bone lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p
          id="problema-titulo"
          className="mb-16 text-[13px] font-medium uppercase tracking-[0.18em] text-accent-tint lg:mb-20"
        >
          El problema
        </p>

        <ul className="flex flex-col divide-y divide-bone/10 border-t border-bone/10">
          {PAINS.map((pain) => (
            <li key={pain} className="py-10 lg:py-14">
              <blockquote className="max-w-4xl font-display text-3xl font-normal leading-[1.15] text-bone/90 sm:text-4xl lg:text-5xl">
                &ldquo;{pain}&rdquo;
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
