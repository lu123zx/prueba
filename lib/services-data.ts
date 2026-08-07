/**
 * Una entrada por servicio = una URL = una intención de búsqueda.
 *
 * La landing sola no puede rankear por "soporte informático empresas Santiago"
 * y por "desarrollo de páginas web para pymes" al mismo tiempo: son búsquedas
 * distintas y Google necesita una URL distinta para cada una. Cada servicio
 * vive en /servicios/<slug> y esta es su fuente de contenido.
 */

export type Service = {
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

export const SERVICES: Service[] = [
  {
    slug: "soporte-informatico",
    name: "Soporte informático gestionado",
    metaTitle: "Soporte informático para empresas en Santiago | Desde 4,25 UF al mes",
    metaDescription:
      "Soporte informático remoto para pymes de Santiago. Respondemos en menos de 2 horas, revisamos tus equipos todos los días y no te amarramos con contratos anuales.",
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
        body: "Menos de 2 horas en horario hábil, y en los planes Negocio e Integral revisamos tus sistemas las 24 horas. Si detectamos una falla un domingo, te avisamos y actuamos: no esperamos al lunes. Cada empresa tiene un encargado fijo, así no le explicas tu problema a alguien nuevo cada vez que llamas.",
      },
      {
        heading: "Para qué tamaño de empresa sirve",
        body: "Trabajamos con pymes de 10 a 60 equipos en Santiago. Bajo ese tamaño casi siempre conviene un plan por horas; sobre eso conviene evaluar un encargado interno más nuestro respaldo. En el diagnóstico gratuito te decimos cuál de los tres casos es el tuyo, aunque la respuesta sea que todavía no nos necesitas.",
      },
      {
        heading: "Cuánto cuesta",
        body: "Se cobra un cargo fijo al mes más un valor por cada computador que cuidamos, así pagas por lo que de verdad tienes y no por un tramo. Una empresa de 10 equipos parte en 6 UF al mes más IVA en el plan Esencial y 8,5 UF en el plan Negocio; una de 20, en 9,5 y 13 UF. Cobramos en UF para no subirte el precio cada año. Las licencias (Microsoft 365, antivirus, respaldo en la nube) van aparte, al precio que nos cuestan a nosotros y a nombre de tu empresa.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta el soporte informático para una pyme en Santiago?",
        answer:
          "Se paga un cargo fijo al mes más un valor por computador. Para una empresa de 10 equipos son 6 UF al mes más IVA en el plan Esencial y 8,5 UF en el plan Negocio; para una de 20 equipos, 9,5 y 13 UF. No incluye las licencias de terceros, que se facturan aparte a precio de costo y quedan a nombre de tu empresa.",
      },
      {
        question: "¿Necesito tener un informático contratado además del soporte?",
        answer:
          "No. La mayoría de nuestros clientes no tiene área de informática. Nosotros tomamos las decisiones técnicas y te las explicamos en simple, sin tecnicismos.",
      },
      {
        question: "¿El soporte informático remoto sirve igual que uno presencial?",
        answer:
          "Para la mayoría de los problemas es mejor, porque resolvemos en minutos en vez de esperar una visita agendada. Nos conectamos al equipo por internet y trabajamos en él con tu permiso. Cuando el problema es físico, como cambiar un equipo o instalar cableado, coordinamos a un técnico y supervisamos el trabajo.",
      },
    ],
  },
  {
    slug: "desarrollo-web",
    name: "Desarrollo web y e-commerce",
    metaTitle: "Desarrollo de páginas web y tiendas online para pymes | Santiago",
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
    slug: "automatizacion-de-procesos",
    name: "Automatización de procesos",
    metaTitle: "Automatización de procesos para pymes en Santiago | TechFlow",
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
          "En las pymes con las que trabajamos, entre 10 y 30 horas al mes por proceso automatizado. Antes de empezar medimos cuánto toma hoy, para poder comparar después con un número y no con una impresión.",
      },
    ],
  },
  {
    slug: "redes-y-ciberseguridad",
    name: "Redes y ciberseguridad",
    metaTitle: "Redes y ciberseguridad para pymes en Santiago | TechFlow Soluciones",
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

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
