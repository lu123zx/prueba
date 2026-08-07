import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    question: "¿Se hacen cargo de todo o solo de la página?",
    answer:
      "De lo que necesites: puede ser solo tu sitio web, o todo tu soporte técnico, redes y sistemas. Armamos el plan según lo que de verdad uses, no un paquete cerrado que no te sirve.",
  },
  {
    question: "¿Quedo amarrado a ustedes?",
    answer:
      "No. Los dominios, licencias, correos y accesos quedan siempre a nombre de tu empresa, no de TechFlow. Si algún día decides trabajar con otro proveedor, te entregamos todo ordenado y documentado, sin costo.",
  },
  {
    question: "¿Las licencias están incluidas en el precio del plan?",
    answer:
      "No, y lo decimos antes de firmar. El plan cubre nuestro trabajo. Las licencias (Microsoft 365, antivirus, respaldo en la nube) se cobran aparte, al mismo precio que nos cuestan a nosotros, sin recargo. Suelen salir entre $8.000 y $14.000 por persona al mes, y en el diagnóstico te damos el número exacto de tu caso.",
  },
  {
    question: "¿Qué pasa si se cae algo un domingo?",
    answer:
      "Los planes Negocio e Integral incluyen revisión las 24 horas. Si detectamos una falla fuera de horario, te avisamos y nos conectamos de inmediato: no esperamos al lunes para mirar qué pasó.",
  },
  {
    question: "Si trabajan a distancia, ¿cómo arreglan un computador?",
    answer:
      "Nos conectamos a tu equipo por internet y trabajamos en él como si estuviéramos sentados al lado, con tu permiso y solo cuando tú lo autorizas. Así resolvemos en minutos lo que antes esperaba días a que llegara alguien. Si hay algo físico que hacer, como cambiar un equipo o instalar cableado, coordinamos a un técnico y supervisamos el trabajo.",
  },
  {
    question: "No tenemos a nadie de informática, ¿igual podemos contratarlos?",
    answer:
      "Sí, y es lo más común. La mayoría de nuestros clientes no tiene un área de informática propia. Por eso existimos: te explicamos todo en simple y tomamos las decisiones técnicas por ti.",
  },
  {
    question: "¿Por qué cobran en UF y no en pesos?",
    answer:
      "Para no tener que subirte el precio todos los años. La UF se reajusta sola con la inflación, así el valor real de lo que pagas se mantiene parejo y tú no recibes una carta de aumento cada enero. En cada plan te mostramos cuánto es hoy en pesos.",
  },
  {
    question: "¿Cómo empezamos a trabajar juntos?",
    answer:
      "Agendamos un diagnóstico gratuito de 30 minutos por videollamada. En una semana tienes una propuesta clara, con precio fijo mensual y sin compromiso de firmar nada.",
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
              className="max-w-xs font-display text-4xl leading-[0.95] sm:text-5xl"
            >
              Las dudas que sí nos hacen.
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full border-t border-border">
            {FAQS.map((faq, index) => (
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
