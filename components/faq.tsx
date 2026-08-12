import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/lib/i18n";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-titulo"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
              {dict.faq.eyebrow}
            </p>
            <h2
              id="faq-titulo"
              className="max-w-xs font-display text-4xl leading-[0.95] sm:text-5xl"
            >
              {dict.faq.title}
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full border-t border-border">
            {dict.faq.items.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
