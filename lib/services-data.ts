/**
 * Una entrada por servicio = una URL = una intención de búsqueda.
 *
 * La landing sola no puede rankear por "soporte informático empresas Santiago"
 * y por "desarrollo de páginas web para pymes" al mismo tiempo: son búsquedas
 * distintas y Google necesita una URL distinta para cada una. Cada servicio
 * vive en /servicios/<slug> y esta es su fuente de contenido.
 *
 * Cada servicio existe en los dos idiomas y con slug propio en cada uno
 * (/servicios/soporte-informatico y /en/services/managed-it-support). El
 * campo `id` es el que los une: es lo que permite emitir el hreflang que le
 * dice a Google que las dos URLs son la misma página en distinto idioma.
 * El slug se traduce porque una URL en el idioma del contenido posiciona
 * mejor; el id nunca se toca, porque cambiarlo rompe ese vínculo.
 */

import type { Locale } from "@/lib/i18n/config";

/** Identificador estable, común a todos los idiomas. No se traduce. */
export type ServiceId =
  | "it-support"
  | "web-development"
  | "automation"
  | "networks-security";

export type Service = {
  id: ServiceId;
  /** Trozo final de la URL, propio de cada idioma. */
  slug: string;
  /** Nombre corto, para tarjetas y navegación. */
  name: string;
  /** <title>. Va con el término que la gente escribe, no con el interno. */
  metaTitle: string;
  metaDescription: string;
  /** H1 de la página de servicio. */
  h1: string;
  /** Frase de apertura: responde la búsqueda en la primera línea (AEO). */
  intro: string;
  /** Bullets para la tarjeta de la home. */
  bullets: string[];
  /** Bloques de contenido de la página. */
  sections: { heading: string; body: string }[];
  /** Preguntas propias del servicio: alimentan el FAQPage de esa URL. */
  faqs: { question: string; answer: string }[];
};

const SERVICES_ES: Service[] = [
  {
    id: "it-support",
    slug: "soporte-informatico",
    name: "Soporte informático gestionado",
    metaTitle: "Soporte informático para empresas en Santiago | Desde 4,25 UF",
    metaDescription:
      "Soporte informático remoto para pymes de Santiago. Respondemos en menos de 2 horas hábiles, monitoreamos tus equipos y no te amarramos con contratos anuales.",
    h1: "Soporte informático para empresas que no tienen a nadie de informática",
    intro:
      "El soporte informático gestionado es tener un equipo externo que se hace cargo de todos los computadores, servidores y sistemas de tu empresa por un precio fijo al mes. Nos conectamos a distancia, arreglamos lo que falla y revisamos que nada se caiga, sin que tengas que contratar a nadie interno.",
    bullets: [
      "Nos conectamos a tu equipo y lo arreglamos, sin esperar la visita del técnico",
      "Revisamos tus equipos y servidores para detectar fallas antes que tú",
      "Respaldo automático de tus archivos todos los días, sin que nadie lo recuerde",
    ],
    sections: [
      {
        heading: "Qué incluye el soporte",
        body: "Atendemos a tus trabajadores cuando algo falla: el computador que no prende, el correo que no llega, la impresora que dejó de responder, el sistema de boletas que se cayó. Nos conectamos al equipo por internet, con permiso de la persona, y lo resolvemos en el momento. También mantenemos al día Windows, los antivirus y los respaldos, que es lo que evita que el problema aparezca.",
      },
      {
        heading: "En cuánto respondemos",
        body: "Menos de 2 horas en horario hábil. En los planes Negocio e Integral el monitoreo vigila tus sistemas también de noche y el fin de semana, y avisa apenas detecta una falla; las emergencias de fin de semana se atienden en el plan Integral, coordinadas por WhatsApp. Cada empresa tiene un encargado fijo, así no le explicas tu problema a alguien nuevo cada vez que escribes.",
      },
      {
        heading: "Para qué tamaño de empresa sirve",
        body: "El servicio está dimensionado para pymes de 10 a 60 equipos en Santiago. Bajo ese tamaño casi siempre conviene un plan por horas; sobre eso conviene evaluar un encargado interno más nuestro respaldo. En el diagnóstico gratuito te decimos cuál de los tres casos es el tuyo, aunque la respuesta sea que todavía no nos necesitas.",
      },
      {
        heading: "Cuánto cuesta",
        body: "Se cobra un cargo fijo al mes más un valor por cada computador que cuidamos, así pagas por lo que de verdad tienes y no por un tramo. Una empresa de 10 equipos parte en 6 UF al mes en el plan Esencial y 8,5 UF en el plan Negocio; una de 20, en 9,5 y 13 UF. Cobramos en UF para no subirte el precio cada año. El servicio se documenta con boleta de honorarios, exenta de IVA. Las licencias (Microsoft 365, antivirus, respaldo en la nube) van aparte, al precio que nos cuestan a nosotros y a nombre de tu empresa.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta el soporte informático para una pyme en Santiago?",
        answer:
          "Se paga un cargo fijo al mes más un valor por computador. Para una empresa de 10 equipos son 6 UF al mes en el plan Esencial y 8,5 UF en el plan Negocio; para una de 20 equipos, 9,5 y 13 UF. El servicio se documenta con boleta de honorarios, que está exenta de IVA. No incluye las licencias de terceros, que se cobran aparte a precio de costo y quedan a nombre de tu empresa.",
      },
      {
        question: "¿Necesito tener un informático contratado además del soporte?",
        answer:
          "No. El servicio está pensado justamente para empresas que no tienen a nadie de informática: nosotros tomamos las decisiones técnicas y te las explicamos en simple, sin tecnicismos.",
      },
      {
        question: "¿El soporte informático remoto sirve igual que uno presencial?",
        answer:
          "Para la mayoría de los problemas es mejor, porque resolvemos en minutos en vez de esperar una visita agendada. Nos conectamos al equipo por internet y trabajamos en él con tu permiso. Cuando el problema es físico, como cambiar un equipo o instalar cableado, coordinamos a un técnico y supervisamos el trabajo.",
      },
    ],
  },
  {
    id: "web-development",
    slug: "desarrollo-web",
    name: "Desarrollo web y e-commerce",
    metaTitle: "Páginas web y tiendas online para pymes | Santiago",
    metaDescription:
      "Diseñamos y programamos sitios web y tiendas online para pymes de Santiago, con Webpay y Mercado Pago. El dominio y los accesos quedan a nombre de tu empresa.",
    h1: "Páginas web y tiendas online que quedan a tu nombre",
    intro:
      "Diseñamos y programamos el sitio web o la tienda online de tu empresa, con pasarela de pago chilena y un panel simple para que tú mismo cambies precios, productos o textos. El dominio, el hosting y todos los accesos quedan registrados a nombre de tu empresa, no de la nuestra.",
    bullets: [
      "Sitio o tienda online a tu nombre, sin plantillas genéricas",
      "Pasarela de pago integrada: Webpay, Mercado Pago o ambas",
      "Panel simple para que tú mismo subas productos, precios o noticias",
    ],
    sections: [
      {
        heading: "Qué construimos",
        body: "Sitios institucionales para empresas que necesitan que las encuentren y las tomen en serio, y tiendas online para las que venden directo. Todo hecho a medida de tu negocio: nada de plantillas donde tu empresa se ve igual que otras cien. El sitio queda rápido en celular, que es donde te va a mirar la mayoría de tus clientes.",
      },
      {
        heading: "Pagos y boletas",
        body: "Integramos Webpay Plus de Transbank, Mercado Pago o ambos, según lo que te convenga por comisiones. Si necesitas que las ventas emitan boleta electrónica automática, conectamos la tienda con tu sistema de facturación para no digitar dos veces.",
      },
      {
        heading: "Cuánto se demora y cuánto cuesta",
        body: "Un sitio institucional toma entre 3 y 5 semanas; una tienda online, entre 6 y 10, según cuántos productos haya que cargar. El desarrollo se cotiza por proyecto, con precio cerrado antes de empezar: no lo metemos en la mensualidad porque eso te obligaría a firmar un contrato largo. La mantención posterior sí es mensual y viene incluida en el plan Integral.",
      },
      {
        heading: "Qué pasa después de que se publica",
        body: "Te entregamos todos los accesos y una guía en simple para que cargues productos o publiques noticias sin depender de nadie. Si prefieres que lo mantengamos nosotros, la mantención va dentro del plan Integral. Si algún día trabajas con otro proveedor, se lleva todo tal cual, sin costo de salida.",
      },
    ],
    faqs: [
      {
        question: "¿La página web queda a nombre de mi empresa?",
        answer:
          "Sí. El dominio, el hosting, las licencias y todos los accesos quedan registrados a nombre de tu empresa desde el primer día. Si algún día decides cambiar de proveedor, te llevas todo sin costo.",
      },
      {
        question: "¿Puedo actualizar la página yo mismo sin saber programar?",
        answer:
          "Sí. Dejamos un panel simple para cambiar textos, precios, productos y fotos, y te enseñamos a usarlo en una sesión. No necesitas saber nada técnico.",
      },
      {
        question: "¿Cuánto se demora hacer una página web para una pyme?",
        answer:
          "Un sitio institucional toma entre 3 y 5 semanas desde que aprobamos el diseño. Una tienda online toma entre 6 y 10 semanas, dependiendo de cuántos productos haya que cargar.",
      },
    ],
  },
  {
    id: "automation",
    slug: "automatizacion-de-procesos",
    name: "Automatización de procesos",
    metaTitle: "Automatización de procesos para pymes | Santiago",
    metaDescription:
      "Automatizamos cotizaciones, boletas, reportes y traspasos entre sistemas para pymes de Santiago. Menos planillas, menos digitar dos veces, menos errores.",
    h1: "Automatización de procesos: que el computador haga lo repetitivo",
    intro:
      "Automatizar un proceso es lograr que una tarea que alguien hace a mano todos los días —copiar datos de una planilla a otra, armar la misma cotización, mandar el reporte del lunes— la haga el sistema solo. En una pyme eso suele devolver entre 10 y 30 horas de trabajo al mes.",
    bullets: [
      "Cotizaciones, boletas y reportes que se generan solos, sin planillas",
      "Tu sistema de ventas conversando con tu contabilidad, sin digitar dos veces",
      "Alertas automáticas por WhatsApp o correo cuando algo necesita tu firma",
    ],
    sections: [
      {
        heading: "Qué se puede automatizar en una pyme",
        body: "Lo que más pedimos automatizar: cotizaciones que hoy se arman copiando una plantilla, el traspaso de ventas al sistema contable, los reportes que alguien prepara a mano cada lunes, el aviso al cliente de que su pedido está listo, y el control de stock que vive en una planilla que solo entiende una persona.",
      },
      {
        heading: "Cómo lo hacemos",
        body: "Primero miramos cómo trabajas hoy, sin cambiarte nada. Después conectamos los sistemas que ya tienes —tu facturador, tu planilla, tu tienda, tu correo— para que se pasen la información entre ellos. Casi nunca hay que comprar un sistema nuevo: el ahorro está en que los que ya usas dejen de estar aislados.",
      },
      {
        heading: "Cómo se mide si valió la pena",
        body: "Antes de empezar contamos cuántas horas al mes toma el proceso hoy. Al mes siguiente lo volvemos a contar. Si no bajó, no cobramos la diferencia: preferimos eso a venderte una automatización que se ve bien en una demostración y nadie usa.",
      },
    ],
    faqs: [
      {
        question: "¿Tengo que cambiar los sistemas que ya uso?",
        answer:
          "Casi nunca. Lo normal es conectar los que ya tienes para que se pasen la información entre ellos. Solo proponemos cambiar un sistema cuando el que tienes de verdad no da para más, y te explicamos por qué.",
      },
      {
        question: "¿Cuánto tiempo se ahorra con una automatización?",
        answer:
          "Depende del proceso, y por eso no partimos con una promesa. Antes de empezar medimos cuántas horas al mes toma hoy el trabajo a mano, y al mes siguiente lo volvemos a medir. Si no bajó, lo conversamos con el número al frente y no con una impresión.",
      },
    ],
  },
  {
    id: "networks-security",
    slug: "redes-y-ciberseguridad",
    name: "Redes y ciberseguridad",
    metaTitle: "Redes y ciberseguridad para pymes | Santiago",
    metaDescription:
      "Configuramos y protegemos la red, el wifi y los respaldos de tu pyme en Santiago. Prevención de virus, ransomware y robo de datos, con revisión periódica.",
    h1: "Redes y ciberseguridad para que no te pase lo que le pasó al vecino",
    intro:
      "Nos hacemos cargo de que la red de tu empresa funcione y de que tus datos estén protegidos: wifi estable, accesos separados por persona, respaldos que de verdad se pueden recuperar y defensas contra virus y secuestro de datos. Todo configurado y revisado a distancia.",
    bullets: [
      "Configuramos y aseguramos tu red y tu wifi a distancia",
      "Servidores y respaldo en la nube, con acceso solo para quien corresponde",
      "Si hay que poner las manos, coordinamos al técnico y supervisamos el trabajo",
    ],
    sections: [
      {
        heading: "El riesgo real de una pyme",
        body: "Las pymes creen que no son blanco porque son chicas, y por eso son blanco: los ataques de secuestro de datos son automáticos y buscan al que tenga la puerta abierta, no al más grande. El daño típico no es el rescate, es quedar sin poder facturar durante días porque nadie tenía un respaldo que sirviera.",
      },
      {
        heading: "Qué revisamos",
        body: "Quién tiene acceso a qué y con qué contraseña, si el respaldo se puede restaurar de verdad —probándolo, no mirando que diga que sí—, si el wifi de visitas está separado del de la empresa, si hay equipos con Windows sin actualizar, y si alguien que ya no trabaja contigo sigue teniendo acceso al correo.",
      },
      {
        heading: "Redes y wifi",
        body: "Configuramos routers, firewall y puntos de wifi de forma remota, y dejamos la red separada por áreas para que una visita no vea los archivos de contabilidad. Cuando hay trabajo físico, como pasar cableado nuevo o instalar un equipo, coordinamos al técnico y supervisamos que quede bien.",
      },
    ],
    faqs: [
      {
        question: "¿Una pyme chica necesita ciberseguridad?",
        answer:
          "Sí, y más que una grande, porque los ataques son automáticos y buscan a quien tenga la puerta abierta, no al más grande. El daño habitual no es pagar un rescate, es quedar sin poder facturar durante días.",
      },
      {
        question: "¿Cómo sé si mis respaldos sirven de verdad?",
        answer:
          "Probándolos. En la revisión restauramos un respaldo de prueba para confirmar que se puede recuperar. Muchas empresas descubren el día del problema que el respaldo llevaba meses fallando en silencio.",
      },
      {
        question: "¿Pueden configurar la red si trabajan a distancia?",
        answer:
          "Sí. Los routers, firewalls y equipos de wifi se administran por internet, así que la configuración, los cambios y el monitoreo los hacemos en remoto. Solo el trabajo físico necesita a alguien en terreno, y ahí coordinamos y supervisamos al técnico.",
      },
    ],
  },
];

const SERVICES_EN: Service[] = [
  {
    id: "it-support",
    slug: "managed-it-support",
    name: "Managed IT support",
    metaTitle: "Managed IT support for small businesses | Santiago, Chile",
    metaDescription:
      "Remote IT support for small and mid-sized companies in Santiago, Chile. Under 2 business hours to respond, proactive monitoring, and no annual lock-in.",
    h1: "IT support for companies with nobody in IT",
    intro:
      "Managed IT support means an outside team takes responsibility for all the computers, servers and systems in your company for a fixed monthly price. We connect remotely, fix what breaks and keep watch so things don't fall over, without you hiring anyone in-house.",
    bullets: [
      "We connect to the machine and fix it, with no waiting for a technician",
      "We watch your machines and servers and catch failures before you do",
      "Automatic daily backups of your files, with nobody having to remember",
    ],
    sections: [
      {
        heading: "What the support covers",
        body: "We look after your staff when something breaks: the computer that won't start, the email that isn't arriving, the printer that stopped responding, the billing system that went down. We connect to the machine over the internet, with the person's permission, and solve it there and then. We also keep Windows, antivirus and backups current, which is what stops the problem happening in the first place.",
      },
      {
        heading: "How fast we respond",
        body: "Under 2 hours during business hours. On the Negocio and Integral plans, monitoring watches your systems overnight and at weekends too, and alerts as soon as it detects a failure; weekend emergencies are handled on the Integral plan, coordinated over WhatsApp. Every company has a fixed point of contact, so you're not explaining your problem to someone new each time you write.",
      },
      {
        heading: "What size of company it suits",
        body: "The service is sized for companies with 10 to 60 machines in Santiago. Below that, an hourly plan almost always works out better; above it, it's worth weighing an in-house lead plus our backup. In the free assessment we tell you which of the three cases is yours, even if the answer is that you don't need us yet.",
      },
      {
        heading: "What it costs",
        body: "There's a fixed monthly fee plus a rate for each computer we look after, so you pay for what you actually have rather than for a bracket. A company with 10 machines starts at 6 UF a month on the Esencial plan and 8.5 UF on Negocio; one with 20, at 9.5 and 13 UF. UF is the Chilean inflation-indexed unit, which is how we avoid raising your price every year. Licences (Microsoft 365, antivirus, cloud backup) are separate, at cost, and stay in your company's name.",
      },
    ],
    faqs: [
      {
        question: "How much does IT support cost for a small business in Santiago?",
        answer:
          "You pay a fixed monthly fee plus a rate per computer. For a company with 10 machines that's 6 UF a month on the Esencial plan and 8.5 UF on Negocio; for one with 20 machines, 9.5 and 13 UF. UF is the Chilean inflation-indexed unit. The service is documented with an electronic fee receipt, which is exempt from Chilean VAT. It doesn't include third-party licences, which are billed separately at cost and stay in your company's name.",
      },
      {
        question: "Do I need someone in IT as well as the support service?",
        answer:
          "No. The service is designed precisely for companies with nobody in IT: we make the technical decisions and explain them to you in plain language, without jargon.",
      },
      {
        question: "Is remote IT support as good as on-site support?",
        answer:
          "For most problems it's better, because we solve things in minutes instead of waiting for a scheduled visit. We connect to the machine over the internet and work on it with your permission. When the problem is physical, like swapping a machine or running cable, we coordinate a technician and supervise the work.",
      },
    ],
  },
  {
    id: "web-development",
    slug: "web-development",
    name: "Web development and e-commerce",
    metaTitle: "Websites and online stores for small businesses | Santiago, Chile",
    metaDescription:
      "We design and build websites and online stores for small businesses in Chile, with local payment gateways. The domain and all accounts stay in your company's name.",
    h1: "Websites and online stores that stay in your name",
    intro:
      "We design and build your company's website or online store, with a Chilean payment gateway and a simple admin panel so you can change prices, products or copy yourself. The domain, the hosting and every account are registered in your company's name, not ours.",
    bullets: [
      "A site or store in your name, with no generic templates",
      "Payment gateway built in: Webpay, Mercado Pago or both",
      "A simple panel so you can add products, prices or news yourself",
    ],
    sections: [
      {
        heading: "What we build",
        body: "Company sites for businesses that need to be found and taken seriously, and online stores for those selling direct. All built around your business: no templates where your company looks like a hundred others. The site is fast on a phone, which is where most of your customers will look at it.",
      },
      {
        heading: "Payments and receipts",
        body: "We integrate Transbank's Webpay Plus, Mercado Pago or both, depending on which works out better on fees. If you need sales to issue an electronic receipt automatically, we connect the store to your billing system so nothing is keyed in twice.",
      },
      {
        heading: "How long it takes and what it costs",
        body: "A company site takes 3 to 5 weeks; an online store, 6 to 10, depending on how many products need loading. Development is quoted per project, at a fixed price agreed before we start: we don't fold it into the monthly fee, because that would force you into a long contract. Ongoing maintenance is monthly and is included in the Integral plan.",
      },
      {
        heading: "What happens after launch",
        body: "We hand over every account and a plain-language guide so you can add products or publish news without depending on anyone. If you'd rather we maintained it, maintenance sits inside the Integral plan. If you ever move to another provider, it all goes with you as-is, at no exit cost.",
      },
    ],
    faqs: [
      {
        question: "Does the website stay in my company's name?",
        answer:
          "Yes. The domain, the hosting, the licences and every account are registered in your company's name from day one. If you ever decide to change provider, you take everything at no cost.",
      },
      {
        question: "Can I update the site myself without knowing how to code?",
        answer:
          "Yes. We leave a simple panel for changing copy, prices, products and photos, and we teach you to use it in one session. You don't need to know anything technical.",
      },
      {
        question: "How long does it take to build a website for a small business?",
        answer:
          "A company site takes 3 to 5 weeks from the point we sign off the design. An online store takes 6 to 10 weeks, depending on how many products need loading.",
      },
    ],
  },
  {
    id: "automation",
    slug: "process-automation",
    name: "Process automation",
    metaTitle: "Process automation for small businesses | Santiago, Chile",
    metaDescription:
      "We automate quotes, receipts, reports and hand-offs between systems for small businesses in Chile. Fewer spreadsheets, less double entry, fewer errors.",
    h1: "Process automation: let the computer do the repetitive part",
    intro:
      "Automating a process means getting the system to do a task somebody does by hand every day — copying data from one spreadsheet to another, building the same quote, sending Monday's report. In a small business that usually gives back somewhere between 10 and 30 hours of work a month.",
    bullets: [
      "Quotes, receipts and reports that generate themselves, without spreadsheets",
      "Your sales system talking to your accounting, with no double entry",
      "Automatic alerts by WhatsApp or email when something needs your sign-off",
    ],
    sections: [
      {
        heading: "What can be automated in a small business",
        body: "The things we're asked to automate most: quotes that today get built by copying a template, moving sales into the accounting system, the reports someone prepares by hand every Monday, telling the customer their order is ready, and the stock control living in a spreadsheet only one person understands.",
      },
      {
        heading: "How we do it",
        body: "First we look at how you work today, without changing anything. Then we connect the systems you already have — your billing tool, your spreadsheet, your store, your email — so they pass information between them. There's almost never a need to buy a new system: the saving comes from the ones you already use no longer being islands.",
      },
      {
        heading: "How we tell whether it was worth it",
        body: "Before we start we count how many hours a month the process takes today. The following month we count again. If it hasn't gone down, we don't charge the difference: we'd rather do that than sell you an automation that demos well and nobody uses.",
      },
    ],
    faqs: [
      {
        question: "Do I have to replace the systems I already use?",
        answer:
          "Almost never. The normal path is to connect the ones you already have so they pass information between them. We only propose replacing a system when the one you have genuinely can't cope, and we explain why.",
      },
      {
        question: "How much time does an automation save?",
        answer:
          "It depends on the process, which is why we don't open with a promise. Before starting we measure how many hours a month the manual work takes today, and the following month we measure again. If it hasn't gone down, we discuss it with the number in front of us rather than an impression.",
      },
    ],
  },
  {
    id: "networks-security",
    slug: "networks-and-cybersecurity",
    name: "Networks and cybersecurity",
    metaTitle: "Networks and cybersecurity for small businesses | Santiago, Chile",
    metaDescription:
      "We configure and protect your company's network, wifi and backups. Defence against viruses, ransomware and data theft, with regular review.",
    h1: "Networks and cybersecurity, so what happened to them doesn't happen to you",
    intro:
      "We take responsibility for your company's network working and your data being protected: stable wifi, access separated per person, backups that can genuinely be restored, and defences against viruses and ransomware. All configured and reviewed remotely.",
    bullets: [
      "We configure and secure your network and wifi remotely",
      "Servers and cloud backup, with access only for the people who should have it",
      "When hands-on work is needed, we coordinate the technician and supervise",
    ],
    sections: [
      {
        heading: "The real risk for a small business",
        body: "Small companies assume they're not a target because they're small, and that's exactly why they are: ransomware attacks are automated and look for whoever left the door open, not for the biggest. The typical damage isn't the ransom, it's being unable to invoice for days because nobody had a backup that worked.",
      },
      {
        heading: "What we review",
        body: "Who has access to what and with which password; whether the backup can actually be restored — by testing it, not by reading a green tick; whether the guest wifi is separated from the company's; whether there are machines running unpatched Windows; and whether someone who no longer works with you still has access to email.",
      },
      {
        heading: "Networks and wifi",
        body: "We configure routers, firewalls and wifi access points remotely, and separate the network by area so a visitor can't see the accounting files. When there's physical work, like running new cable or installing hardware, we coordinate the technician and check the job is done properly.",
      },
    ],
    faqs: [
      {
        question: "Does a small company really need cybersecurity?",
        answer:
          "Yes, and more than a large one, because the attacks are automated and look for whoever left the door open rather than for the biggest target. The usual damage isn't paying a ransom, it's being unable to invoice for days.",
      },
      {
        question: "How do I know my backups actually work?",
        answer:
          "By testing them. In the review we restore a test backup to confirm it can be recovered. Plenty of companies find out on the day it matters that the backup had been failing silently for months.",
      },
      {
        question: "Can you configure the network if you work remotely?",
        answer:
          "Yes. Routers, firewalls and wifi hardware are managed over the internet, so configuration, changes and monitoring are all done remotely. Only physical work needs someone on site, and there we coordinate and supervise the technician.",
      },
    ],
  },
];

const BY_LOCALE: Record<Locale, Service[]> = {
  es: SERVICES_ES,
  en: SERVICES_EN,
};

/** Servicios de un idioma, en orden de presentación. */
export function getServices(locale: Locale): Service[] {
  return BY_LOCALE[locale] ?? SERVICES_ES;
}

/** Busca por el slug de ese idioma. Devuelve undefined si no existe. */
export function getService(locale: Locale, slug: string) {
  return getServices(locale).find((s) => s.slug === slug);
}

/**
 * Busca por id, que es el mismo en todos los idiomas. Es lo que permite,
 * estando en /servicios/soporte-informatico, saber que la versión en inglés
 * es /en/services/managed-it-support y emitir el hreflang correcto.
 */
export function getServiceById(locale: Locale, id: ServiceId) {
  return getServices(locale).find((s) => s.id === id);
}
