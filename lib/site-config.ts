// Único archivo que tienes que editar para cambiar datos del negocio.

export const site = {
  name: "TechFlow Soluciones",
  legalName: "TechFlow Soluciones SpA",
  rut: "76.543.210-9",
  url: "https://techflowsoluciones.cl",
  description:
    "Soporte técnico gestionado, desarrollo web y automatización para pymes de Santiago. Respuesta en menos de 2 horas, sin contrato anual forzoso.",
  phone: "+56 9 8765 4321",
  whatsapp: "56987654321",
  email: "contacto@techflowsoluciones.cl",
  address: {
    street: "Av. Apoquindo 4900, of. 602",
    district: "Las Condes",
    city: "Santiago",
    region: "Región Metropolitana",
    country: "CL",
  },
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hola, quiero agendar un diagnóstico gratuito para mi empresa.",
)}`;

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#planes", label: "Planes" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
] as const;

export const stats = [
  { value: 2, suffix: " h", label: "Tiempo de respuesta en horario hábil" },
  { value: 120, suffix: "+", label: "Equipos gestionados hoy en Santiago" },
  { value: 9, suffix: " años", label: "Trabajando solo con pymes chilenas" },
] as const;

export const painPoints = [
  "Se me cayó el sistema el viernes a las seis y el proveedor contestó el lunes.",
  "Nadie sabe qué contraseña tiene qué, ni dónde quedaron guardadas las licencias.",
  "Pago mantención todos los meses y el que llama al técnico sigo siendo yo.",
] as const;

export type Service = {
  icon: "headset" | "code" | "workflow" | "network";
  title: string;
  points: string[];
};

export const services: Service[] = [
  {
    icon: "headset",
    title: "Soporte TI gestionado",
    points: [
      "Mesa de ayuda con respuesta en menos de 2 horas en horario hábil",
      "Monitoreo de equipos y servidores para detectar fallas antes que tú",
      "Respaldo automático de tus archivos todos los días, sin que nadie lo recuerde",
    ],
  },
  {
    icon: "code",
    title: "Desarrollo web y e-commerce",
    points: [
      "Sitio o tienda online a tu nombre, sin plantillas genéricas",
      "Pasarela de pago integrada: Webpay, Mercado Pago o ambas",
      "Panel simple para que tú mismo subas productos, precios o noticias",
    ],
  },
  {
    icon: "workflow",
    title: "Automatización de procesos",
    points: [
      "Cotizaciones, boletas y reportes que se generan solos, sin planillas",
      "Tu sistema de ventas conversando con tu contabilidad, sin digitar dos veces",
      "Alertas automáticas por WhatsApp o correo cuando algo necesita tu firma",
    ],
  },
  {
    icon: "network",
    title: "Infraestructura y redes",
    points: [
      "Cableado y wifi de tu oficina, instalados y por fin ordenados",
      "Servidores y respaldo en la nube, con acceso solo para quien corresponde",
      "Revisión de seguridad para evitar virus, robo de datos y sorpresas",
    ],
  },
];

export const steps = [
  {
    n: "01",
    title: "Diagnóstico gratuito",
    body: "Visitamos tu oficina o revisamos tu sistema por videollamada. Te decimos qué está fallando y qué riesgos corres, sin compromiso ni letra chica.",
  },
  {
    n: "02",
    title: "Plan a medida",
    body: "Te armamos una propuesta con precio fijo mensual, hecha para tu empresa y no para una plantilla. Solo pagas por lo que vas a usar.",
  },
  {
    n: "03",
    title: "Soporte continuo",
    body: "Un equipo fijo de personas conoce tu empresa, tus sistemas y tu forma de trabajar. Nada de explicarle tu problema a alguien nuevo cada vez.",
  },
] as const;

export type Plan = {
  name: string;
  blurb: string;
  price: string;
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Esencial",
    blurb: "Para empresas de hasta 15 equipos que recién ordenan su TI.",
    price: "$189.000",
    features: [
      "Hasta 15 equipos cubiertos",
      "Soporte remoto en horario hábil",
      "Respaldo diario de archivos",
      "Revisión de seguridad mensual",
    ],
  },
  {
    name: "Negocio",
    blurb: "El más elegido por pymes de 15 a 35 personas en Santiago.",
    price: "$349.000",
    featured: true,
    features: [
      "Hasta 35 equipos cubiertos",
      "Soporte remoto y presencial cuando se necesita",
      "Monitoreo de sistemas las 24 horas",
      "Respuesta garantizada en menos de 2 horas",
      "Un encargado fijo asignado a tu empresa",
    ],
  },
  {
    name: "Integral",
    blurb: "Para empresas que quieren TI, web y automatización en un solo lugar.",
    price: "$590.000",
    features: [
      "Equipos ilimitados",
      "Todo lo incluido en el plan Negocio",
      "Mantención de tu sitio o tienda web",
      "Una automatización de proceso incluida al año",
      "Reunión mensual de revisión con tu encargado",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Dejamos de perder medio día cada vez que se caía el sistema de boletas. Ahora nos llaman ellos antes de que nosotros nos demos cuenta.",
    name: "Marcela Reyes",
    role: "Gerenta General, Distribuidora de Repuestos Industriales (Recoleta)",
    initials: "MR",
  },
  {
    quote:
      "Nos armaron la tienda online en un mes y sigue siendo nuestra: el dominio, las fotos, todo. Si algún día nos cambiamos de proveedor, no perdemos nada.",
    name: "Francisco Aránguiz",
    role: "Socio Fundador, Muebles Aránguiz (San Joaquín)",
    initials: "FA",
  },
] as const;

export const faqs = [
  {
    q: "¿Se hacen cargo de todo o solo de la página web?",
    a: "De todo lo que contrates. Hay clientes que solo nos dejan el soporte de sus equipos y otros que además tienen con nosotros el sitio, la red y las automatizaciones. El plan se arma con lo que necesitas, no con un paquete cerrado.",
  },
  {
    q: "¿Quedo amarrado a ustedes?",
    a: "No. No trabajamos con contrato anual forzoso y los accesos, dominios y licencias quedan siempre a nombre de tu empresa. Si un día decides irte, te vas con todo tuyo.",
  },
  {
    q: "¿Qué pasa si se cae algo un domingo?",
    a: "Los planes Negocio e Integral incluyen monitoreo 24 horas: en muchos casos detectamos la falla antes que tú. Para emergencias fuera de horario hábil hay un canal directo por WhatsApp con un encargado de turno.",
  },
  {
    q: "No tenemos a nadie de informática en la empresa, ¿igual podemos contratarlos?",
    a: "Es justamente el caso más común. Funcionamos como tu departamento de TI externo: tú nos avisas qué falla en tus palabras y nosotros nos entendemos con los proveedores, los equipos y los sistemas.",
  },
  {
    q: "¿Cuánto se demoran en responder cuando algo falla?",
    a: "Menos de 2 horas en horario hábil, y en el plan Negocio en adelante queda garantizado por escrito en la propuesta. La mayoría de los tickets se resuelven de forma remota el mismo día.",
  },
  {
    q: "¿Cómo empezamos a trabajar juntos?",
    a: "Con un diagnóstico gratuito de 30 minutos, presencial o por videollamada. De ahí sale un informe con lo que está fallando y una propuesta con precio fijo. Sin costo y sin compromiso de contratar.",
  },
] as const;
