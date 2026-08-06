import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/counter";
import { NetworkCanvas } from "@/components/network-canvas";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden
        className="bg-brand-halo absolute inset-x-0 top-0 -z-10 h-[42rem]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Columna de texto */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Soporte TI para pymes en Santiago
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-[3.4rem] md:leading-[1.05]">
              Tu empresa no se detiene porque{" "}
              <span className="text-primary">se cayó un computador.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
              Soporte técnico, desarrollo web y redes para pymes de Santiago. Un solo número al
              que llamar cuando algo falla, y gente que ya conoce tu empresa cuando contesta.
            </p>

            <div className="mt-9 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild size="lg" className="group w-full sm:w-auto">
                <Link href="#contacto">
                  Agendar diagnóstico gratuito
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="link"
                size="lg"
                className="group px-0 text-foreground sm:w-auto"
              >
                <Link href="#planes">
                  Ver planes
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-4 sm:max-w-md">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold tracking-tight sm:text-3xl">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-1 block text-xs text-pretty text-muted-foreground sm:text-sm">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Panel visual: red de nodos en vivo (p5.js) */}
          <Reveal delay={150} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-secondary to-background sm:aspect-square lg:aspect-[4/5]">
              <div
                aria-hidden
                className="bg-brand-halo absolute inset-0 opacity-80"
              />
              <NetworkCanvas />
            </div>

            <div className="card-soft absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 sm:-left-8">
              <span className="relative flex size-2.5 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              <span className="max-w-40 text-xs font-medium text-pretty text-foreground">
                Monitoreo en tiempo real de tus equipos
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
