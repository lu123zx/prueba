/**
 * Una entrada por servicio = una URL = una intención de búsqueda.
 *
 * La landing sola no puede rankear por "desarrollo de aplicaciones web a
 * medida" y por "chatbot con IA para empresas" al mismo tiempo: son búsquedas
 * distintas y Google necesita una URL distinta para cada una.
 *
 * Cada servicio existe en los dos idiomas y con slug propio en cada uno
 * (/servicios/desarrollo-web y /en/services/web-development). El campo `id`
 * es el que los une: es lo que permite emitir el hreflang que le dice a
 * Google que las dos URLs son la misma página en distinto idioma. El slug se
 * traduce porque una URL en el idioma del contenido posiciona mejor; el id
 * nunca se toca, porque cambiarlo rompe ese vínculo.
 *
 * SOBRE LOS SLUGS QUE SE CONSERVAN
 *
 * Al pasar de 4 servicios a 6, tres slugs se mantienen aunque el servicio
 * haya cambiado de nombre visible: `desarrollo-web`,
 * `automatizacion-de-procesos` y `soporte-informatico`. Esas URLs ya están
 * indexadas y la intención de búsqueda detrás sigue siendo la misma, así que
 * moverlas sería regalar el posicionamiento a cambio de nada. El único que
 * desaparece es `redes-y-ciberseguridad`, y va con 301 en next.config.mjs.
 */

import type { Locale } from "@/lib/i18n/config";

/** Identificador estable, común a todos los idiomas. No se traduce. */
export type ServiceId =
  | "web-development"
  | "infrastructure"
  | "automation"
  | "ai-solutions"
  | "ai-agents"
  | "support-plan";

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
    id: "web-development",
    slug: "desarrollo-web",
    name: "Desarrollo web y apps",
    metaTitle: "Desarrollo web y aplicaciones a medida | Santiago",
    metaDescription:
      "Programamos sitios corporativos, aplicaciones web a medida, tiendas online y MVPs para empresas en Chile. El código y los accesos quedan a nombre de tu empresa.",
    h1: "Sitios y aplicaciones web hechos para tu negocio, no para una plantilla",
    intro:
      "Diseñamos y programamos lo que tu empresa necesita mostrar o usar en internet: desde una landing que convierte hasta una aplicación web a medida con la que trabaja tu equipo todos los días. Todo queda registrado a nombre de tu empresa, con el código entregado y documentado.",
    bullets: [
      "Landings y sitios corporativos que cargan rápido y se ven serios",
      "Aplicaciones a medida: paneles, portales de clientes, sistemas de gestión",
      "Tiendas online y prototipos para validar una idea antes de invertir",
    ],
    sections: [
      {
        heading: "Landing pages y sitios corporativos",
        body: "Sitios para empresas que necesitan que las encuentren y las tomen en serio. Hechos a medida de tu negocio: nada de plantillas donde tu empresa se ve igual que otras cien. Quedan rápidos en celular, que es donde te va a mirar la mayoría de tus clientes, y con la estructura que Google necesita para posicionarlos.",
      },
      {
        heading: "Aplicaciones web a medida",
        body: "Cuando la planilla ya no da más, lo que sigue es una aplicación propia: un panel para ver cómo va el negocio, un portal donde tus clientes revisan su estado sin llamarte, un sistema de gestión que refleja cómo trabajas tú y no cómo trabaja el software que arrendaste. Se construye por módulos, así ves algo funcionando en semanas y no al final.",
      },
      {
        heading: "Tiendas online",
        body: "Tiendas con pasarela de pago chilena —Webpay Plus de Transbank, Mercado Pago o ambas, según lo que convenga por comisiones— y un panel simple para que tú mismo cambies precios, productos y fotos. Si necesitas que las ventas emitan boleta electrónica automática, conectamos la tienda con tu sistema de facturación para no digitar dos veces.",
      },
      {
        heading: "Prototipos y MVPs",
        body: "Si la idea todavía no está probada, no conviene construirla entera. Levantamos una versión funcional en pocas semanas, con lo mínimo para ponerla frente a usuarios reales y ver si alguien la usa. Sale más barato descubrir ahí que el negocio no era, que descubrirlo con el producto terminado.",
      },
      {
        heading: "Qué recibes al terminar",
        body: "El código fuente, los accesos al hosting y al dominio, y una guía en simple para operar lo que se pueda operar sin programar. Todo a nombre de tu empresa desde el primer día. Si algún día trabajas con otro proveedor, se lleva todo tal cual y sin costo de salida.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto se demora hacer una página web para una empresa?",
        answer:
          "Una landing toma entre 2 y 3 semanas. Un sitio corporativo completo, entre 3 y 5. Una tienda online, entre 6 y 10, según cuántos productos haya que cargar. Una aplicación a medida depende del alcance y se estima por módulos después del levantamiento.",
      },
      {
        question: "¿El código y el dominio quedan a nombre de mi empresa?",
        answer:
          "Sí. El código fuente, el dominio, el hosting y todos los accesos quedan registrados a nombre de tu empresa desde el primer día. Si decides cambiar de proveedor, te llevas todo sin costo de salida.",
      },
      {
        question: "¿Puedo actualizar el sitio yo mismo sin saber programar?",
        answer:
          "Sí. Dejamos un panel simple para cambiar textos, precios, productos y fotos, y te enseñamos a usarlo en una sesión. No necesitas saber nada técnico para el día a día.",
      },
      {
        question: "¿Qué diferencia hay entre una landing y una aplicación web?",
        answer:
          "La landing existe para que alguien de afuera te encuentre y te contacte: es una página que vende. La aplicación web existe para que alguien de adentro trabaje: gestiona datos, usuarios y permisos. Se cotizan distinto porque el esfuerzo es de otro orden.",
      },
    ],
  },
  {
    id: "infrastructure",
    slug: "infraestructura-y-bases-de-datos",
    name: "Infraestructura y bases de datos",
    metaTitle: "Infraestructura, bases de datos y migración a la nube | Chile",
    metaDescription:
      "Diseñamos bases de datos y backend a medida, migramos sistemas antiguos a la nube y dejamos el alojamiento gestionado, con dominio y certificado incluidos.",
    h1: "La parte que no se ve y que sostiene todo lo demás",
    intro:
      "Nos hacemos cargo de dónde viven tus datos y tus sistemas: diseñamos la base de datos, montamos el backend, migramos lo que hoy corre en un servidor antiguo y dejamos el alojamiento andando con dominio y certificado de seguridad incluidos. Después lo mantenemos, que es la parte que se suele olvidar.",
    bullets: [
      "Bases de datos y backend diseñados para tu operación, no genéricos",
      "Migración de sistemas antiguos a la nube, sin cortar la operación",
      "Alojamiento gestionado con dominio, HTTPS y monitoreo incluidos",
    ],
    sections: [
      {
        heading: "Diseño de bases de datos y backend",
        body: "Una base de datos mal diseñada no se nota el primer mes: se nota cuando hay que sacar un reporte y los números no cuadran, o cuando agregar un campo obliga a tocar todo. Modelamos los datos según cómo funciona tu negocio de verdad, con las relaciones y las validaciones donde corresponde, y montamos el backend que los expone de forma segura.",
      },
      {
        heading: "Migración a la nube",
        body: "Sacamos lo que hoy corre en un servidor bajo un escritorio, en un hosting compartido antiguo o en un computador que nadie se atreve a apagar, y lo llevamos a infraestructura moderna. Se hace en paralelo: el sistema viejo sigue funcionando hasta que el nuevo está probado, y recién ahí se corta. Nunca al revés.",
      },
      {
        heading: "Despliegue y alojamiento gestionado",
        body: "Dejamos tu aplicación publicada y andando, con el dominio configurado y el certificado de seguridad (HTTPS) emitido y renovándose solo. Incluye los respaldos automáticos y la configuración de correo del dominio. No tienes que entender de servidores: entiendes de tu negocio y para eso nos tienes.",
      },
      {
        heading: "Mantenimiento de infraestructura",
        body: "Monitoreo que avisa cuando algo se cae, antes de que te avise un cliente. Escalado cuando el tráfico sube, para que la aplicación no se caiga justo el día que más se usa. Y actualizaciones de seguridad al día, que es lo aburrido que nadie hace y lo que termina costando caro.",
      },
    ],
    faqs: [
      {
        question: "¿Qué pasa con mi sistema actual mientras se hace la migración?",
        answer:
          "Sigue funcionando. La migración se hace en paralelo: montamos el sistema nuevo, lo probamos con datos reales y solo cortamos cuando está confirmado que funciona. Si algo sale mal el día del cambio, se vuelve al anterior.",
      },
      {
        question: "¿El alojamiento gestionado incluye el dominio y el certificado?",
        answer:
          "Sí. Incluye la configuración del dominio, el certificado de seguridad HTTPS con renovación automática, los respaldos y el monitoreo. Lo que pagues al proveedor de nube va directo a tu nombre, sin recargo nuestro.",
      },
      {
        question: "¿Puedo llevarme la infraestructura a otro proveedor?",
        answer:
          "Sí, y sin costo de salida. Las cuentas de nube y el dominio quedan a nombre de tu empresa desde el principio, y entregamos la documentación de cómo está montado todo.",
      },
    ],
  },
  {
    id: "automation",
    slug: "automatizacion-de-procesos",
    name: "Automatización de procesos",
    metaTitle: "Automatización de procesos para empresas | Santiago",
    metaDescription:
      "Conectamos tu CRM, correo, planillas, tienda y ERP para que se pasen la información solos. Menos digitar dos veces, menos errores, más horas libres al mes.",
    h1: "Automatización de procesos: que el sistema haga lo repetitivo",
    intro:
      "Automatizar un proceso es lograr que una tarea que alguien hace a mano todos los días —copiar datos de una planilla a otra, armar la misma cotización, mandar el reporte del lunes— la haga el sistema solo. En una empresa mediana eso suele devolver entre 10 y 30 horas de trabajo al mes.",
    bullets: [
      "Tus sistemas conversando entre ellos: CRM, correo, planillas, tienda, ERP",
      "Facturación, seguimiento y reportes que se generan solos",
      "Flujos que combinan automatización con inteligencia artificial",
    ],
    sections: [
      {
        heading: "Conexión entre tus sistemas",
        body: "Lo más caro de una empresa mediana no es el software: es que cada sistema viva aislado y alguien tenga que pasar los datos de uno a otro. Conectamos tu CRM, tu correo, tus planillas, tu tienda online, tu WhatsApp Business y tu ERP para que se pasen la información entre ellos. Casi nunca hay que comprar un sistema nuevo: el ahorro está en que los que ya usas dejen de estar separados.",
      },
      {
        heading: "Automatización de tareas internas",
        body: "Lo que más nos piden automatizar: la facturación que hoy se arma copiando una plantilla, el seguimiento de clientes que depende de que alguien se acuerde, las notificaciones al cliente de que su pedido está listo, y los reportes que alguien prepara a mano cada lunes por la mañana.",
      },
      {
        heading: "Flujos inteligentes",
        body: "Hay decisiones que una automatización clásica no puede tomar porque no son una regla fija: clasificar un correo que llega, resumir una reunión, decidir a qué vendedor le toca un contacto según lo que escribió. Ahí metemos inteligencia artificial dentro del flujo, en el paso exacto donde hace falta, y el resto sigue siendo automatización normal, que es más barata y más predecible.",
      },
      {
        heading: "Cómo se mide si valió la pena",
        body: "Antes de empezar contamos cuántas horas al mes toma el proceso hoy. Al mes siguiente lo volvemos a contar. Si no bajó, lo conversamos con el número al frente y no con una impresión: preferimos eso a venderte una automatización que se ve bien en una demostración y nadie usa.",
      },
    ],
    faqs: [
      {
        question: "¿Tengo que cambiar los sistemas que ya uso?",
        answer:
          "Casi nunca. Lo normal es conectar los que ya tienes para que se pasen la información entre ellos. Solo proponemos cambiar un sistema cuando el que tienes de verdad no da para más, y te explicamos por qué antes de que decidas.",
      },
      {
        question: "¿Cuánto tiempo se ahorra con una automatización?",
        answer:
          "Depende del proceso, y por eso no partimos con una promesa. Antes de empezar medimos cuántas horas al mes toma hoy el trabajo a mano, y al mes siguiente lo volvemos a medir. En procesos administrativos repetitivos lo habitual es entre 10 y 30 horas al mes.",
      },
      {
        question: "¿Se puede automatizar el WhatsApp de la empresa?",
        answer:
          "Sí, usando WhatsApp Business API, que es la vía oficial y la única que no arriesga el bloqueo de la cuenta. Se puede avisar automáticamente del estado de un pedido, responder preguntas frecuentes o derivar a una persona cuando la consulta se sale del guion.",
      },
    ],
  },
  {
    id: "ai-solutions",
    slug: "inteligencia-artificial",
    name: "Soluciones con inteligencia artificial",
    metaTitle: "Chatbots y soluciones con IA para empresas | Chile",
    metaDescription:
      "Chatbots entrenados con la información de tu empresa, asistentes internos que buscan en tus documentos y generación automática de contenido. Implementado, no vendido como humo.",
    h1: "Inteligencia artificial aplicada a lo que tu empresa hace todos los días",
    intro:
      "No vendemos IA como concepto: la conectamos a la información de tu empresa para resolver algo concreto. Un chatbot que responde a tus clientes con tus datos y no con lo que se imagina, un asistente que busca dentro de tus documentos, o la generación de contenido repetitivo que hoy escribe alguien a mano.",
    bullets: [
      "Chatbots entrenados con la información real de tu empresa",
      "Asistentes internos que buscan y resumen tus propios documentos",
      "Generación de fichas de producto, textos de marketing y documentos",
    ],
    sections: [
      {
        heading: "Chatbots de atención al cliente",
        body: "Un chatbot genérico responde cualquier cosa y queda mal. El que instalamos se entrena con la información de tu empresa —tus precios, tus plazos, tus condiciones, tus preguntas frecuentes— y responde solo dentro de eso. Cuando la pregunta se sale de lo que sabe, lo dice y deriva a una persona, en vez de inventar una respuesta que después te toca desmentir.",
      },
      {
        heading: "Asistentes internos para tu equipo",
        body: "El conocimiento de una empresa vive repartido en contratos, manuales, correos viejos y la cabeza de dos o tres personas. Un asistente interno indexa esos documentos y permite preguntarle en lenguaje normal: qué decía el contrato de tal cliente, cuál es el procedimiento para tal caso, qué se acordó en la reunión de marzo. Responde citando el documento de donde lo sacó.",
      },
      {
        heading: "Generación automática de contenido",
        body: "Fichas de producto para una tienda con cientos de artículos, textos de marketing, borradores de documentos que siempre siguen la misma estructura. La IA hace el borrador y una persona lo revisa antes de publicar: ese paso de revisión no lo saltamos, porque es lo que separa una herramienta útil de un generador de errores a escala.",
      },
      {
        heading: "Qué no prometemos",
        body: "Que la IA reemplace a tu equipo. Lo que hace bien es quitar de encima el trabajo repetitivo y la búsqueda de información, para que las personas dediquen su tiempo a lo que sí requiere criterio. Si alguien te ofrece más que eso, conviene preguntar por casos concretos que ya estén funcionando.",
      },
    ],
    faqs: [
      {
        question: "¿El chatbot puede inventar respuestas?",
        answer:
          "Se configura precisamente para que no lo haga. Responde solo con la información de tu empresa que se le entregó, y cuando la pregunta se sale de eso lo dice y deriva a una persona. Antes de publicarlo probamos preguntas límite para ver cómo se comporta.",
      },
      {
        question: "¿Mis documentos quedan expuestos al entrenar la IA?",
        answer:
          "No se usan para entrenar modelos públicos. Se indexan en un espacio privado de tu empresa y el modelo los consulta en el momento de responder. Definimos contigo qué documentos entran y quién puede preguntarle al asistente.",
      },
      {
        question: "¿Cuánto cuesta mantener una solución con IA?",
        answer:
          "Hay dos costos: la implementación, que se cotiza una vez, y el consumo mensual del modelo, que depende de cuánto se use y se paga directamente al proveedor a nombre de tu empresa, sin recargo nuestro. En el diagnóstico estimamos ese consumo con tu volumen real.",
      },
    ],
  },
  {
    id: "ai-agents",
    slug: "agentes-autonomos",
    name: "Agentes de negocio autónomos",
    metaTitle: "Agentes de IA autónomos para empresas | Chile",
    metaDescription:
      "Un asistente digital conectado a tus herramientas que ejecuta tareas por sí solo: reportes, seguimiento, control de inventario. Trabaja las 24 horas.",
    h1: "Un empleado digital que trabaja cuando tu equipo no está",
    intro:
      "Un agente autónomo es un asistente digital conectado a las herramientas que ya usas y que ejecuta tareas por sí solo, sin que nadie apriete un botón. Revisa, decide dentro de los límites que le pusiste y actúa: arma el reporte, hace el seguimiento, avisa cuando el inventario baja.",
    bullets: [
      "Conectado a tus herramientas, ejecuta tareas sin que nadie lo gatille",
      "Reportes, seguimiento de clientes y control de inventario programados",
      "Trabaja las 24 horas, también cuando tu equipo no está",
    ],
    sections: [
      {
        heading: "En qué se diferencia de una automatización",
        body: "Una automatización sigue una regla fija: si pasa esto, haz esto otro. Un agente recibe un objetivo y decide los pasos: revisa varias fuentes, evalúa lo que encuentra y actúa en consecuencia. Sirve cuando el trabajo no se puede escribir como una lista de reglas porque depende de lo que se encuentre en el camino.",
      },
      {
        heading: "Tareas programadas",
        body: "El reporte de ventas de cada lunes armado y en tu correo antes de que llegues. El seguimiento a los clientes que cotizaron y no respondieron. El control de inventario que avisa cuando un producto va a quebrar stock según cómo se está vendiendo, no según un mínimo fijo escrito hace dos años.",
      },
      {
        heading: "Los límites se definen antes",
        body: "Un agente con acceso a tus sistemas y sin límites es un riesgo, no una herramienta. Antes de encenderlo definimos qué puede hacer solo, qué tiene que pasar por aprobación de una persona y qué no puede tocar nunca. Todo lo que hace queda registrado, así siempre se puede revisar qué hizo y por qué.",
      },
      {
        heading: "Cómo se implementa",
        body: "Se parte con una sola tarea, la más repetitiva y la de menor riesgo, y se deja corriendo con supervisión unas semanas. Cuando esa está probada, se suma la siguiente. Encender un agente que hace diez cosas el primer día es la forma más rápida de que nadie confíe en él.",
      },
    ],
    faqs: [
      {
        question: "¿Qué diferencia hay entre un agente y una automatización?",
        answer:
          "La automatización sigue reglas fijas que se escriben de antemano. El agente recibe un objetivo, decide los pasos según lo que encuentra y actúa. La automatización es más barata y predecible; el agente sirve cuando el trabajo no se puede escribir como una lista cerrada de reglas.",
      },
      {
        question: "¿Puede hacer algo que yo no quiera?",
        answer:
          "Solo si se configura sin límites, y no lo hacemos así. Antes de encenderlo definimos qué puede ejecutar solo, qué requiere aprobación de una persona y qué queda fuera de su alcance. Cada acción queda registrada para poder revisarla después.",
      },
      {
        question: "¿Necesito tener sistemas modernos para usar un agente?",
        answer:
          "No necesariamente, pero sí necesita poder leer tus datos. Si la información vive solo en planillas sueltas o en papel, el primer paso suele ser ordenar eso, y ahí conviene partir por infraestructura o automatización antes que por el agente.",
      },
    ],
  },
  {
    id: "support-plan",
    slug: "soporte-informatico",
    name: "Plan de soporte continuo",
    metaTitle: "Soporte informático y mantenimiento mensual | Santiago",
    metaDescription:
      "Alojamiento, mantenimiento, mejoras y soporte técnico remoto con monitoreo RMM, en un plan mensual. Respondemos en horario hábil, sin contrato anual forzoso.",
    h1: "Soporte y mantenimiento para que lo que construimos siga funcionando",
    intro:
      "El plan de soporte continuo es un pago mensual que cubre el alojamiento, el mantenimiento, las mejoras y el soporte técnico de lo que tu empresa tiene andando. Incluye monitoreo remoto (RMM) que vigila tus sistemas y avisa de una falla antes de que la note un cliente.",
    bullets: [
      "Alojamiento y mantenimiento incluidos en una sola cuota mensual",
      "Soporte técnico remoto con monitoreo RMM, sin esperar la visita de nadie",
      "Horas de mejoras cada mes, para que el sistema no se congele el día uno",
    ],
    sections: [
      {
        heading: "Qué cubre el plan",
        body: "El alojamiento de tus sistemas, las actualizaciones de seguridad, los respaldos y su prueba periódica, el monitoreo, y una bolsa de horas mensuales para mejoras. Lo último es lo que más se agradece con el tiempo: un sistema que no evoluciona empieza a estorbar a los seis meses.",
      },
      {
        heading: "Soporte técnico con RMM",
        body: "RMM significa monitoreo y administración remota: un agente instalado en tus equipos y servidores que reporta su estado, aplica parches y nos deja resolver a distancia. En la práctica significa que nos conectamos y lo arreglamos, con tu permiso, en vez de agendar la visita de un técnico para el jueves.",
      },
      {
        heading: "En cuánto respondemos",
        body: "Menos de 2 horas en horario hábil, contadas desde que recibimos el aviso por los canales acordados. Son plazos de primera respuesta, no de solución: cuánto toma el arreglo depende de la naturaleza de la falla y de terceros que no controlamos, y preferimos decirlo así y cumplirlo antes que prometer una guardia de 24 horas que no tendrías cómo exigirnos.",
      },
      {
        heading: "Sin contrato anual forzoso",
        body: "El plan es mes a mes. Se termina avisando con 30 días y no hay multa por salir antes de ningún plazo. Los dominios, licencias y accesos quedan a nombre de tu empresa desde el primer día, así que si te vas, se va contigo, documentado y sin costo de salida.",
      },
    ],
    faqs: [
      {
        question: "¿Qué es RMM y para qué sirve?",
        answer:
          "RMM es monitoreo y administración remota: un agente instalado en tus equipos que reporta su estado, aplica actualizaciones de seguridad y permite resolver problemas a distancia. Sirve para detectar una falla antes que tú y para arreglar en minutos lo que antes esperaba días a que llegara alguien.",
      },
      {
        question: "¿El plan incluye mejoras o solo arreglar lo que se rompe?",
        answer:
          "Incluye ambas. Cada mes hay una bolsa de horas para mejoras y cambios, además del mantenimiento correctivo. Un sistema que solo se repara pero no evoluciona termina estorbando en menos de un año.",
      },
      {
        question: "¿Puedo contratar el soporte si el sistema lo hizo otro proveedor?",
        answer:
          "Sí, previa revisión. Antes de tomarlo hacemos un levantamiento para ver en qué estado está y qué se necesita para dejarlo mantenible. Si encontramos algo que conviene arreglar antes de entrar al plan, te lo decimos con el costo al frente.",
      },
      {
        question: "¿Quedo amarrado con un contrato anual?",
        answer:
          "No. El plan es mensual, se termina avisando con 30 días y no hay multa de salida. Los dominios, licencias y accesos están a nombre de tu empresa desde el primer día, así que puedes llevarte todo cuando quieras.",
      },
    ],
  },
];

const SERVICES_EN: Service[] = [
  {
    id: "web-development",
    slug: "web-development",
    name: "Web and app development",
    metaTitle: "Custom web and app development | Santiago, Chile",
    metaDescription:
      "We build corporate sites, custom web applications, online stores and MVPs for companies in Chile. The code and every account stay in your company's name.",
    h1: "Websites and web apps built for your business, not from a template",
    intro:
      "We design and build what your company needs to show or use online: from a landing page that converts to a custom web application your team works in every day. Everything is registered in your company's name, with the code handed over and documented.",
    bullets: [
      "Landing pages and corporate sites that load fast and look serious",
      "Custom applications: dashboards, client portals, management systems",
      "Online stores and prototypes to validate an idea before investing",
    ],
    sections: [
      {
        heading: "Landing pages and corporate sites",
        body: "Sites for companies that need to be found and taken seriously. Built around your business: no templates where your company looks like a hundred others. They're fast on a phone, which is where most of your customers will look at them, and structured the way search engines need in order to rank them.",
      },
      {
        heading: "Custom web applications",
        body: "When the spreadsheet can't cope any more, what comes next is an application of your own: a dashboard showing how the business is doing, a portal where your clients check their status without calling you, a management system that reflects how you work rather than how the software you rented works. It's built in modules, so you see something working in weeks rather than at the end.",
      },
      {
        heading: "Online stores",
        body: "Stores with a Chilean payment gateway — Transbank's Webpay Plus, Mercado Pago or both, depending on which works out better on fees — and a simple panel so you can change prices, products and photos yourself. If you need sales to issue an electronic receipt automatically, we connect the store to your billing system so nothing is keyed in twice.",
      },
      {
        heading: "Prototypes and MVPs",
        body: "If the idea isn't proven yet, building it in full is the wrong move. We put together a working version in a few weeks, with the minimum needed to put it in front of real users and see whether anyone uses it. Finding out there that the business wasn't viable is far cheaper than finding out with the finished product.",
      },
      {
        heading: "What you get at the end",
        body: "The source code, the hosting and domain credentials, and a plain-language guide for operating whatever can be operated without coding. All in your company's name from day one. If you ever move to another provider, it all goes with you as-is, at no exit cost.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a company website?",
        answer:
          "A landing page takes 2 to 3 weeks. A full corporate site, 3 to 5. An online store, 6 to 10, depending on how many products need loading. A custom application depends on scope and is estimated by module after the discovery phase.",
      },
      {
        question: "Do the code and the domain stay in my company's name?",
        answer:
          "Yes. The source code, the domain, the hosting and every account are registered in your company's name from day one. If you decide to change provider, you take everything at no exit cost.",
      },
      {
        question: "Can I update the site myself without knowing how to code?",
        answer:
          "Yes. We leave a simple panel for changing copy, prices, products and photos, and we teach you to use it in one session. You don't need anything technical for day-to-day work.",
      },
      {
        question: "What's the difference between a landing page and a web app?",
        answer:
          "The landing page exists so someone outside finds you and gets in touch: it's a page that sells. The web application exists so someone inside can work: it handles data, users and permissions. They're quoted differently because the effort is of a different order.",
      },
    ],
  },
  {
    id: "infrastructure",
    slug: "infrastructure-and-databases",
    name: "Infrastructure and databases",
    metaTitle: "Infrastructure, databases and cloud migration | Chile",
    metaDescription:
      "We design custom databases and backends, migrate legacy systems to the cloud, and run managed hosting with domain and SSL certificate included.",
    h1: "The part nobody sees, holding up everything else",
    intro:
      "We take responsibility for where your data and systems live: we design the database, build the backend, migrate whatever runs today on an ageing server, and keep hosting running with the domain and security certificate included. Then we maintain it, which is the part that usually gets forgotten.",
    bullets: [
      "Databases and backends designed for your operation, not generic ones",
      "Legacy systems migrated to the cloud without interrupting the business",
      "Managed hosting with domain, HTTPS and monitoring included",
    ],
    sections: [
      {
        heading: "Database and backend design",
        body: "A badly designed database doesn't show in the first month: it shows when you need a report and the numbers don't add up, or when adding one field means touching everything. We model the data around how your business actually works, with the relationships and validations where they belong, and build the backend that exposes it securely.",
      },
      {
        heading: "Cloud migration",
        body: "We take what runs today on a server under a desk, on ageing shared hosting or on a machine nobody dares turn off, and move it to modern infrastructure. It's done in parallel: the old system keeps running until the new one is tested, and only then do we cut over. Never the other way round.",
      },
      {
        heading: "Deployment and managed hosting",
        body: "We leave your application published and running, with the domain configured and the security certificate (HTTPS) issued and renewing itself. That includes automated backups and the domain's email configuration. You don't have to understand servers: you understand your business, and that's what you have us for.",
      },
      {
        heading: "Infrastructure maintenance",
        body: "Monitoring that alerts when something goes down, before a customer does. Scaling when traffic rises, so the application doesn't fall over on the day it's used most. And security updates kept current — the boring part nobody does and the one that ends up costing.",
      },
    ],
    faqs: [
      {
        question: "What happens to my current system during the migration?",
        answer:
          "It keeps running. The migration happens in parallel: we build the new system, test it with real data and only cut over once it's confirmed working. If anything goes wrong on switchover day, we fall back to the previous one.",
      },
      {
        question: "Does managed hosting include the domain and the certificate?",
        answer:
          "Yes. It includes domain configuration, the HTTPS security certificate with automatic renewal, backups and monitoring. Whatever you pay the cloud provider goes directly in your name, with no markup from us.",
      },
      {
        question: "Can I move the infrastructure to another provider?",
        answer:
          "Yes, at no exit cost. The cloud accounts and the domain are in your company's name from the start, and we hand over documentation of how everything is set up.",
      },
    ],
  },
  {
    id: "automation",
    slug: "process-automation",
    name: "Process automation",
    metaTitle: "Business process automation | Santiago, Chile",
    metaDescription:
      "We connect your CRM, email, spreadsheets, store and ERP so they pass information between them. Less double entry, fewer errors, more hours back every month.",
    h1: "Process automation: let the system do the repetitive part",
    intro:
      "Automating a process means getting the system to do a task somebody does by hand every day — copying data from one spreadsheet to another, building the same quote, sending Monday's report. In a mid-sized company that usually gives back somewhere between 10 and 30 hours of work a month.",
    bullets: [
      "Your systems talking to each other: CRM, email, spreadsheets, store, ERP",
      "Invoicing, follow-ups and reports that generate themselves",
      "Workflows that combine automation with artificial intelligence",
    ],
    sections: [
      {
        heading: "Connecting your systems",
        body: "The expensive part of a mid-sized company isn't the software: it's that each system lives on its own island and somebody has to carry the data between them. We connect your CRM, your email, your spreadsheets, your online store, your WhatsApp Business and your ERP so they pass information between them. There's almost never a need to buy a new system: the saving comes from the ones you already use no longer being islands.",
      },
      {
        heading: "Automating internal tasks",
        body: "What we're asked to automate most: invoicing that today gets built by copying a template, client follow-up that depends on somebody remembering, notifying the customer that their order is ready, and the reports someone prepares by hand every Monday morning.",
      },
      {
        heading: "Intelligent workflows",
        body: "Some decisions a classic automation can't make, because they aren't a fixed rule: classifying an incoming email, summarising a meeting, deciding which salesperson a lead should go to based on what they wrote. That's where we put artificial intelligence inside the workflow, at the exact step that needs it, while the rest stays ordinary automation — cheaper and more predictable.",
      },
      {
        heading: "How we tell whether it was worth it",
        body: "Before we start we count how many hours a month the process takes today. The following month we count again. If it hasn't gone down, we discuss it with the number in front of us rather than an impression: we'd rather do that than sell you an automation that demos well and nobody uses.",
      },
    ],
    faqs: [
      {
        question: "Do I have to replace the systems I already use?",
        answer:
          "Almost never. The normal path is to connect the ones you already have so they pass information between them. We only propose replacing a system when the one you have genuinely can't cope, and we explain why before you decide.",
      },
      {
        question: "How much time does an automation save?",
        answer:
          "It depends on the process, which is why we don't open with a promise. Before starting we measure how many hours a month the manual work takes today, and the following month we measure again. On repetitive admin processes, 10 to 30 hours a month is typical.",
      },
      {
        question: "Can the company WhatsApp be automated?",
        answer:
          "Yes, using the WhatsApp Business API, which is the official route and the only one that doesn't risk the account being blocked. It can notify order status automatically, answer frequently asked questions, or hand over to a person when the query goes off-script.",
      },
    ],
  },
  {
    id: "ai-solutions",
    slug: "ai-solutions",
    name: "Artificial intelligence solutions",
    metaTitle: "AI chatbots and business AI solutions | Chile",
    metaDescription:
      "Chatbots trained on your company's own information, internal assistants that search your documents, and automated content generation. Implemented, not sold as hype.",
    h1: "Artificial intelligence applied to what your company does every day",
    intro:
      "We don't sell AI as a concept: we connect it to your company's information to solve something concrete. A chatbot that answers your customers using your data rather than what it imagines, an assistant that searches inside your documents, or the generation of repetitive content somebody writes by hand today.",
    bullets: [
      "Chatbots trained on your company's real information",
      "Internal assistants that search and summarise your own documents",
      "Generation of product listings, marketing copy and documents",
    ],
    sections: [
      {
        heading: "Customer service chatbots",
        body: "A generic chatbot answers anything and embarrasses you. The one we install is trained on your company's information — your prices, your lead times, your terms, your FAQs — and answers only within that. When a question falls outside what it knows, it says so and hands over to a person, instead of inventing an answer you then have to walk back.",
      },
      {
        heading: "Internal assistants for your team",
        body: "A company's knowledge lives scattered across contracts, manuals, old emails and the heads of two or three people. An internal assistant indexes those documents and lets you ask in plain language: what did that client's contract say, what's the procedure for this case, what was agreed in the March meeting. It answers citing the document it came from.",
      },
      {
        heading: "Automated content generation",
        body: "Product listings for a store with hundreds of items, marketing copy, drafts of documents that always follow the same structure. The AI writes the draft and a person reviews it before publishing: we don't skip that review step, because it's what separates a useful tool from an error generator at scale.",
      },
      {
        heading: "What we don't promise",
        body: "That AI will replace your team. What it does well is take repetitive work and information hunting off people's hands, so they spend their time on what actually needs judgement. If someone offers you more than that, it's worth asking for concrete cases already running.",
      },
    ],
    faqs: [
      {
        question: "Can the chatbot make up answers?",
        answer:
          "It's configured precisely so it doesn't. It answers only with the company information it was given, and when a question falls outside that it says so and hands over to a person. Before going live we test edge-case questions to see how it behaves.",
      },
      {
        question: "Are my documents exposed when training the AI?",
        answer:
          "They are not used to train public models. They're indexed in a private space belonging to your company, and the model consults them at the moment of answering. We define with you which documents are included and who can query the assistant.",
      },
      {
        question: "What does it cost to run an AI solution?",
        answer:
          "There are two costs: implementation, quoted once, and the monthly model usage, which depends on volume and is paid directly to the provider in your company's name, with no markup from us. In the assessment we estimate that usage against your real volume.",
      },
    ],
  },
  {
    id: "ai-agents",
    slug: "autonomous-agents",
    name: "Autonomous business agents",
    metaTitle: "Autonomous AI agents for business | Chile",
    metaDescription:
      "A digital assistant connected to your tools that carries out tasks on its own: reports, follow-ups, stock control. It works around the clock.",
    h1: "A digital employee that works when your team isn't there",
    intro:
      "An autonomous agent is a digital assistant connected to the tools you already use that carries out tasks on its own, without anyone pressing a button. It checks, decides within the limits you set, and acts: builds the report, chases the follow-up, flags when stock is running low.",
    bullets: [
      "Connected to your tools, it runs tasks with nobody triggering them",
      "Scheduled reports, client follow-up and stock control",
      "Works around the clock, including when your team isn't there",
    ],
    sections: [
      {
        heading: "How it differs from an automation",
        body: "An automation follows a fixed rule: if this happens, do that. An agent is given an objective and works out the steps: it checks several sources, weighs what it finds and acts accordingly. It earns its place when the work can't be written down as a list of rules, because it depends on what turns up along the way.",
      },
      {
        heading: "Scheduled tasks",
        body: "Monday's sales report built and in your inbox before you arrive. Follow-up with the clients who asked for a quote and never replied. Stock control that flags a product about to run out based on how it's actually selling, not on a fixed minimum written down two years ago.",
      },
      {
        heading: "The limits are set beforehand",
        body: "An agent with access to your systems and no limits is a risk, not a tool. Before switching it on we define what it can do alone, what has to go through a person for approval, and what it must never touch. Everything it does is logged, so you can always review what it did and why.",
      },
      {
        heading: "How it gets implemented",
        body: "We start with a single task — the most repetitive and the lowest risk — and leave it running under supervision for a few weeks. Once that one is proven, we add the next. Switching on an agent that does ten things on day one is the fastest way to make sure nobody trusts it.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between an agent and an automation?",
        answer:
          "An automation follows fixed rules written in advance. An agent is given an objective, works out the steps based on what it finds, and acts. Automation is cheaper and more predictable; an agent earns its place when the work can't be written as a closed list of rules.",
      },
      {
        question: "Could it do something I don't want it to?",
        answer:
          "Only if it's configured without limits, and that's not how we do it. Before switching it on we define what it can run alone, what requires a person's approval, and what is out of its reach entirely. Every action is logged so it can be reviewed afterwards.",
      },
      {
        question: "Do I need modern systems to use an agent?",
        answer:
          "Not necessarily, but it does need to be able to read your data. If the information lives only in loose spreadsheets or on paper, the first step is usually to sort that out, and there it makes more sense to start with infrastructure or automation rather than with the agent.",
      },
    ],
  },
  {
    id: "support-plan",
    slug: "ongoing-support",
    name: "Ongoing support plan",
    metaTitle: "IT support and monthly maintenance plan | Santiago, Chile",
    metaDescription:
      "Hosting, maintenance, improvements and remote IT support with RMM monitoring, in one monthly plan. Response during business hours, no forced annual contract.",
    h1: "Support and maintenance so what we built keeps working",
    intro:
      "The ongoing support plan is a monthly fee covering hosting, maintenance, improvements and technical support for whatever your company has running. It includes remote monitoring (RMM) that watches your systems and flags a failure before a customer notices it.",
    bullets: [
      "Hosting and maintenance included in a single monthly fee",
      "Remote IT support with RMM monitoring, no waiting for a site visit",
      "Improvement hours every month, so the system doesn't freeze on day one",
    ],
    sections: [
      {
        heading: "What the plan covers",
        body: "Hosting for your systems, security updates, backups and their periodic testing, monitoring, and a monthly allowance of hours for improvements. That last one is what gets appreciated over time: a system that doesn't evolve starts getting in the way within six months.",
      },
      {
        heading: "Technical support with RMM",
        body: "RMM stands for remote monitoring and management: an agent installed on your machines and servers that reports their state, applies patches and lets us fix things remotely. In practice it means we connect and fix it, with your permission, instead of booking a technician's visit for Thursday.",
      },
      {
        heading: "How fast we respond",
        body: "Under 2 business hours, counted from when we receive the notice through the agreed channels. These are first-response times, not resolution times: how long a fix takes depends on the nature of the failure and on third parties we don't control, and we'd rather say that and keep to it than promise 24-hour cover you'd have no way of holding us to.",
      },
      {
        heading: "No forced annual contract",
        body: "The plan is month to month. You end it with 30 days' notice and there's no penalty for leaving early. Domains, licences and access credentials are in your company's name from day one, so if you leave, they leave with you, documented and at no exit cost.",
      },
    ],
    faqs: [
      {
        question: "What is RMM and what is it for?",
        answer:
          "RMM is remote monitoring and management: an agent installed on your machines that reports their state, applies security updates and allows problems to be solved remotely. It's what lets us spot a failure before you do, and fix in minutes what used to wait days for someone to arrive.",
      },
      {
        question: "Does the plan include improvements or only fixing what breaks?",
        answer:
          "Both. Each month there's an allowance of hours for improvements and changes, on top of corrective maintenance. A system that only gets repaired but never evolves ends up getting in the way within a year.",
      },
      {
        question: "Can I take the support plan if another provider built the system?",
        answer:
          "Yes, subject to review. Before taking it on we run an assessment to see what state it's in and what's needed to make it maintainable. If we find something worth fixing before entering the plan, we tell you with the cost up front.",
      },
      {
        question: "Am I locked into an annual contract?",
        answer:
          "No. The plan is monthly, ends with 30 days' notice and carries no exit penalty. Domains, licences and access credentials are in your company's name from day one, so you can take everything whenever you want.",
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
 * estando en /servicios/desarrollo-web, saber que la versión en inglés es
 * /en/services/web-development y emitir el hreflang correcto.
 */
export function getServiceById(locale: Locale, id: ServiceId) {
  return getServices(locale).find((s) => s.id === id);
}
