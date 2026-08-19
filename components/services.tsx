import {
  DatabaseBackupIcon,
  GlobeIcon,
  NetworkIcon,
  ServerIcon,
  type LucideIcon,
} from "lucide-react";

type Servicio = {
  n: string;
  tag: string;
  title: string;
  body: string;
  points: string[];
  icon: LucideIcon;
};

const SERVICIOS: Servicio[] = [
  {
    n: "01",
    tag: "SLA 99,9% · Monitoreo 24/7",
    title: "Administración de servidores y cloud",
    body: "Diseño, migración y operación de servidores dedicados, VPS e instancias en AWS o Azure. Alta disponibilidad y respaldo verificado cada noche.",
    points: [
      "Failover automático entre zonas",
      "Backups con restauración probada cada mes",
      "Alertas antes de que el usuario note algo",
    ],
    icon: ServerIcon,
  },
  {
    n: "02",
    tag: "LAN / WAN · VLAN · VPN",
    title: "Redes corporativas",
    body: "Cableado, segmentación y perímetro. Bajamos la latencia interna y cerramos las puertas que dejó abiertas la instalación anterior.",
    points: [
      "Firewall de hardware y VPN site-to-site",
      "Auditoría de topología y documentación entregable",
      "Wi-Fi empresarial con roaming",
    ],
    icon: NetworkIcon,
  },
  {
    n: "03",
    tag: "RAID · NAS · Discos dañados",
    title: "Recuperación forense de datos",
    body: "Laboratorio para arreglos RAID colapsados, daño lógico o físico y borrados accidentales. Evaluamos antes de tocar nada.",
    points: [
      "Diagnóstico sin costo en 24 horas",
      "Cadena de custodia y confidencialidad",
      "Turno de urgencia el fin de semana",
    ],
    icon: DatabaseBackupIcon,
  },
  {
    n: "04",
    tag: "Core Web Vitals",
    title: "Desarrollo web de alto rendimiento",
    body: "Sitios corporativos y catálogos B2B que cargan rápido y aparecen cuando alguien busca tu servicio en Santiago.",
    points: [
      "Hosting y despliegue incluidos",
      "SEO técnico y ficha de Google Business",
      "Medición mensual con números, no promesas",
    ],
    icon: GlobeIcon,
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="border-t border-border px-6 py-16 lg:px-20 lg:py-24"
    >
      <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
        SERVICIOS
      </p>
      <h2
        id="servicios-titulo"
        className="mt-2.5 text-[clamp(1.9rem,4vw,2.4rem)] font-bold tracking-tight text-ink"
      >
        Lo que mantenemos de pie
      </h2>

      <div className="mt-10 grid grid-cols-1 border border-border lg:grid-cols-2">
        {SERVICIOS.map((s) => {
          const Icon = s.icon;
          return (
            <article
              key={s.n}
              className="flex flex-col gap-4 border-b border-border p-8 last:border-b-0 lg:p-10 lg:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(odd)]:border-r lg:[&:nth-child(3)]:border-b-0 lg:[&:nth-child(4)]:border-b-0"
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-accent">{s.n}</span>
                <Icon className="size-5 text-ink-soft" aria-hidden="true" strokeWidth={1.5} />
              </div>

              <p className="text-xs font-medium tracking-wide text-ink-soft">
                {s.tag}
              </p>

              <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-[1.4rem]">
                {s.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-ink-soft">{s.body}</p>

              <ul className="mt-1.5 flex flex-col gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] size-1 shrink-0 rounded-full bg-accent"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
