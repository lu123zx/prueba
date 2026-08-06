import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Fondo: rejilla técnica desvanecida + halo del acento */}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-10rem] -z-10 size-[38rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Soporte TI para pymes en Santiago
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Tu empresa no se detiene porque{" "}
            <span className="text-primary">se cayó un computador.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
            Soporte técnico, desarrollo web y redes para pymes de Santiago. Un solo número al
            que llamar cuando algo falla, y gente que ya conoce tu empresa cuando contesta.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="#contacto">
                Agendar diagnóstico gratuito
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#planes">Ver planes</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-16 sm:mt-20">
          <dl className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-7 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tracking-tight sm:text-4xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
