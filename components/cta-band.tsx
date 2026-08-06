import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { whatsappUrl } from "@/lib/site-config";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-titulo" className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-full size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
            />

            <div className="relative">
              <h2
                id="cta-titulo"
                className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
              >
                Hablemos antes de que se caiga algo.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
                Agenda un diagnóstico gratuito de 30 minutos. Sin compromiso y sin letra chica.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="group w-full sm:w-auto">
                  <Link href="#contacto">
                    Agendar diagnóstico
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Escribir por WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
