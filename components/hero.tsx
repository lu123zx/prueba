import { Button } from "@/components/ui/button";
import { NetworkCanvas } from "@/components/network-canvas";

const STATS = [
  { value: "2 horas", label: "Tiempo de respuesta en horario hábil" },
  { value: "120+", label: "Equipos gestionados hoy en Santiago" },
  { value: "9 años", label: "Trabajando solo con pymes chilenas" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Presentación"
      className="relative overflow-hidden pt-40 pb-24 lg:pt-56 lg:pb-32"
    >
      <NetworkCanvas />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
          Soporte TI remoto para pymes en Santiago
        </p>

        <h1 className="max-w-5xl text-balance font-display text-hero font-normal tracking-tight">
          Tu empresa no se detiene porque se cayó un computador.
        </h1>

        <p className="mt-8 max-w-xl text-lg text-muted-foreground lg:text-xl">
          Nos conectamos y lo arreglamos, sin esperar que llegue un técnico. Un
          solo número al que escribir cuando algo falla, y gente que ya conoce
          tu empresa cuando contesta.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="#contacto">Agendar diagnóstico gratuito</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#planes">Ver planes</a>
          </Button>
        </div>
      </div>

      <div className="relative mt-24 border-y border-border bg-background lg:mt-32">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-border px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="py-8 sm:px-8 sm:first:pl-0 lg:py-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl lg:text-5xl">
                  {stat.value}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-2 block max-w-[22ch] text-sm text-muted-foreground"
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
