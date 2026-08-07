import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { WHATSAPP_URL } from "@/lib/site";

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
          Agenda un diagnóstico gratuito de 30 minutos por videollamada. Sin
          compromiso y sin letra chica.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="default-dark" size="lg">
            <a href="#contacto">Agendar diagnóstico</a>
          </Button>
          <Button asChild variant="outline-dark" size="lg">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" />
              Escríbenos por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
