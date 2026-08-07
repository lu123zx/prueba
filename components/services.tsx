import {
  Code2Icon,
  HeadsetIcon,
  NetworkIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    icon: HeadsetIcon,
    title: "Soporte TI gestionado",
    bullets: [
      "Mesa de ayuda que responde en menos de 2 horas en horario hábil",
      "Revisamos tus equipos y servidores para detectar fallas antes que tú",
      "Respaldo automático de tus archivos todos los días, sin que nadie lo recuerde",
    ],
  },
  {
    icon: Code2Icon,
    title: "Desarrollo web y e-commerce",
    bullets: [
      "Sitio o tienda online a tu nombre, sin plantillas repetidas",
      "Pago en línea integrado: Webpay, Mercado Pago o los dos",
      "Panel simple para que tú mismo cambies precios, productos o noticias",
    ],
  },
  {
    icon: WorkflowIcon,
    title: "Automatización de procesos",
    bullets: [
      "Cotizaciones, boletas y reportes que salen solos, sin planillas a mano",
      "Tu sistema de ventas conversando con tu contabilidad, sin digitar dos veces",
      "Avisos por WhatsApp o correo cuando algo necesita tu firma",
    ],
  },
  {
    icon: NetworkIcon,
    title: "Infraestructura y redes",
    bullets: [
      "Cableado y wifi de tu oficina, instalados y por fin ordenados",
      "Servidores y respaldo en la nube, con acceso solo para quien corresponde",
      "Revisión de seguridad para evitar virus, robo de datos y sorpresas",
    ],
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
              Servicios
            </p>
            <h2
              id="servicios-titulo"
              className="max-w-xl font-display text-4xl leading-[0.95] sm:text-5xl"
            >
              Cuatro formas de dejar de apagar incendios.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Puedes contratar uno o todos. El plan se arma según lo que tu
            empresa de verdad necesita.
          </p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group border-b border-r border-border p-8 transition-colors duration-200 hover:bg-graphite lg:p-10"
              >
                <Icon
                  className="size-8 text-accent transition-colors duration-200 group-hover:text-accent-tint"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="mt-8 font-display text-2xl transition-colors duration-200 group-hover:text-bone lg:text-[1.75rem]">
                  {service.title}
                </h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-bone/75"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent transition-colors duration-200 group-hover:bg-accent-tint"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
