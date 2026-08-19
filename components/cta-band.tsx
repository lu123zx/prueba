import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section
      id="contacto"
      aria-labelledby="cta-titulo"
      className="flex flex-col items-center gap-7 bg-ink px-6 py-20 text-center lg:px-20 lg:py-28"
    >
      <h2
        id="cta-titulo"
        className="max-w-2xl text-balance text-[clamp(1.8rem,4.5vw,2.6rem)] font-bold tracking-tight text-white"
      >
        Antes de que se caiga otra vez.
      </h2>
      <Button asChild variant="inverse" size="default">
        <a href="mailto:contacto@nube9.cl?subject=Diagn%C3%B3stico%20gratis">
          Pedir diagnóstico gratis
        </a>
      </Button>
    </section>
  );
}
