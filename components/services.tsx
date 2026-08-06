import type { LucideIcon } from "lucide-react";
import { Headset, Code2, Workflow, Network } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    icon: Headset,
    title: "Soporte TI gestionado",
    bullets: [
      "Mesa de ayuda con respuesta en menos de 2 horas en horario hábil",
      "Monitoreo de equipos y servidores para detectar fallas antes que tú",
      "Respaldo automático de tus archivos todos los días, sin que nadie lo recuerde",
    ],
  },
  {
    icon: Code2,
    title: "Desarrollo web y e-commerce",
    bullets: [
      "Sitio o tienda online a tu nombre, sin plantillas genéricas",
      "Pasarela de pago integrada: Webpay, Mercado Pago o ambas",
      "Panel simple para que tú mismo subas productos, precios o noticias",
    ],
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    bullets: [
      "Cotizaciones, boletas y reportes que se generan solos, sin planillas",
      "Tu sistema de ventas conversando con tu contabilidad, sin digitar dos veces",
      "Alertas automáticas por WhatsApp o correo cuando algo necesita tu firma",
    ],
  },
  {
    icon: Network,
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
              className="max-w-xl font-display text-4xl leading-tight95 text-graphite sm:text-5xl"
            >
              Cuatro formas de dejar de apagar incendios.
            </h2>
          </div>
          <p className="max-w-sm text-graphite/60">
            Puedes contratar uno o todos. El plan se arma según lo que tu
            empresa realmente necesita.
          </p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-graphite/12 sm:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group border-b border-r border-graphite/12 p-8 transition-colors duration-200 hover:bg-graphite lg:p-10"
              >
                <Icon
                  className="h-8 w-8 text-accent transition-colors duration-200 group-hover:text-bone"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="mt-8 font-display text-2xl text-graphite transition-colors duration-200 group-hover:text-bone lg:text-[1.75rem]">
                  {service.title}
                </h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-graphite/65 transition-colors duration-200 group-hover:text-bone/75"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
