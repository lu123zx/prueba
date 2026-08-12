import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { whatsappUrl } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

export function FinalCta({ dict }: { dict: Dictionary }) {
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
          {dict.finalCta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-bone/60">{dict.finalCta.lead}</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="default-dark" size="lg">
            <a href="#contacto">{dict.finalCta.primary}</a>
          </Button>
          <Button asChild variant="outline-dark" size="lg">
            <a
              href={whatsappUrl(dict.whatsapp.prefilled)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-5" />
              {dict.finalCta.whatsapp}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
