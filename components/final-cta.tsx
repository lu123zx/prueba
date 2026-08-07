import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-final-titulo"
      className="bg-graphite py-24 text-bone lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-12">
        <h2
          id="cta-final-titulo"
          className="mx-auto max-w-3xl font-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl"
        >
          Hablemos antes de que se caiga algo.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-bone/60">
          Agenda un diagnóstico gratuito de 30 minutos. Sin compromiso y sin
          letra chica.
        </p>
        <Button asChild variant="default-dark" size="lg" className="mt-10">
          <a href="#contacto">Agendar diagnóstico</a>
        </Button>
      </div>
    </section>
  );
}
