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
          Soporte TI para pymes en Santiago
        </p>

        <h1 className="max-w-5xl font-display text-hero font-normal leading-tight95 tracking-tight text-graphite text-balance">
          Tu empresa no se detiene porque se cayó un computador.
        </h1>

        <p className="mt-8 max-w-xl text-lg text-graphite/70 lg:text-xl">
          Soporte técnico, desarrollo web y redes para pymes de Santiago. Un
          solo número al que llamar cuando algo falla, y gente que ya conoce
          tu empresa cuando contesta.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="#contacto">Agendar diagnóstico gratuito</a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#planes">Ver planes</a>
          </Button>
        </div>
      </div>

      <div className="relative mt-24 border-y border-graphite/10 bg-bone lg:mt-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-graphite/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="py-8 sm:px-8 sm:first:pl-0 lg:py-10">
              <p className="font-display text-4xl text-graphite lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 max-w-[22ch] text-sm text-graphite/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
