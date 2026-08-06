import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "¿Se hacen cargo de todo o solo de la página web?",
    answer:
      "Nos hacemos cargo de lo que necesites: puede ser solo tu sitio web, o todo tu soporte técnico, redes y sistemas. Armamos el plan según lo que realmente uses, no un paquete cerrado que no te sirve.",
  },
  {
    question: "¿Quedo amarrado a ustedes?",
    answer:
      "No. Los dominios, licencias, correos y accesos quedan siempre a nombre de tu empresa, no de TechFlow. Si en algún momento decides trabajar con otro proveedor, te entregamos todo ordenado y documentado, sin costo.",
  },
  {
    question: "¿Qué pasa si se cae algo un domingo?",
    answer:
      "Los planes Negocio e Integral incluyen monitoreo las 24 horas. Si detectamos una falla fuera de horario, te avisamos y actuamos de inmediato: no esperamos hasta el lunes para revisar qué pasó.",
  },
  {
    question: "No tenemos a nadie de informática en la empresa, ¿igual podemos contratarlos?",
    answer:
      "Sí, y es lo más común. La mayoría de nuestros clientes no tiene un área de informática propia. Por eso existimos: te explicamos todo en simple y tomamos las decisiones técnicas por ti, sin tecnicismos.",
  },
  {
    question: "¿Cuánto se demoran en responder cuando algo falla?",
    answer:
      "En horario hábil, menos de 2 horas. Si tienes el plan Negocio o Integral, tienes además un encargado fijo que ya conoce tu empresa y no parte de cero explicando el problema cada vez.",
  },
  {
    question: "¿Cómo empezamos a trabajar juntos?",
    answer:
      "Agendamos un diagnóstico gratuito, presencial en Santiago o por videollamada. En una semana tienes una propuesta clara, con precio fijo mensual y sin compromiso de firmar nada.",
  },
];

export function Faq() {
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
              Preguntas frecuentes
            </p>
            <h2
              id="faq-titulo"
              className="max-w-xs font-display text-4xl leading-tight95 text-graphite sm:text-5xl"
            >
              Las dudas que sí nos hacen.
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className={index === 0 ? "border-t border-graphite/12" : undefined}
              >
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
