import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="flex flex-col items-center gap-7 px-6 pb-20 pt-16 text-center sm:pt-24 lg:px-20 lg:pb-24 lg:pt-32"
    >
      <p className="inline-flex items-center rounded-full border border-border px-3.5 py-1.5 text-[13px] font-medium text-accent">
        SLA 99,9% · Monitoreo 24/7
      </p>

      <h1
        id="hero-titulo"
        className="max-w-4xl text-[clamp(2.6rem,7vw,4.75rem)] font-bold leading-[1.02] tracking-tight text-ink"
      >
        Infraestructura que
        <br />
        no falla.
      </h1>

      <p className="max-w-[38rem] text-balance text-lg leading-relaxed text-ink-soft">
        Servidores, redes, recuperación de datos y desarrollo web para
        empresas que no se pueden dar el lujo de que algo falle a mitad de
        la operación.
      </p>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="default">
          <a href="#contacto">Pedir diagnóstico</a>
        </Button>
        <Button asChild variant="outline" size="default">
          <a href="#servicios">Ver servicios</a>
        </Button>
      </div>
    </section>
  );
}
