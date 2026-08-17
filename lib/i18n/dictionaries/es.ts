/**
 * Copy en español. Es el original: el resto de los idiomas se traduce desde
 * acá, no al revés.
 *
 * La forma de este objeto es la que define el tipo `Dictionary`, así que si
 * se agrega una clave hay que agregarla también en los demás idiomas o el
 * build falla. Eso es a propósito: una traducción a medias se nota en
 * compilación y no en producción.
 */
export const es = {
  nav: {
    services: "Servicios",
    howWeWork: "Cómo trabajamos",
    plans: "Planes",
    faq: "Preguntas frecuentes",
    cta: "Agendar diagnóstico",
    mainNav: "Navegación principal",
    mobileNav: "Navegación móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Idioma",
    switchTo: "English",
  },

  hero: {
    sectionLabel: "Presentación",
    eyebrow: "Soporte informático remoto para pymes en Santiago",
    h1: "Tu empresa no se detiene porque se cayó un computador.",
    lead: "Damos soporte informático a distancia a pymes de Santiago: nos conectamos y lo arreglamos, sin esperar que llegue un técnico. Un solo número al que escribir, y gente que ya conoce tu empresa cuando contesta.",
    ctaPrimary: "Agendar diagnóstico gratuito",
    ctaSecondary: "Ver planes",
    stats: [
      { value: "2 horas", label: "Plazo de respuesta en horario hábil" },
      { value: "100% remoto", label: "Sin esperar la visita de un técnico" },
      { value: "Mes a mes", label: "Sin permanencia mínima ni multa de salida" },
    ],
  },

  problem: {
    title: "El problema",
    pains: [
      "Se me cayó el sistema el viernes a las seis y el proveedor contestó el lunes.",
      "Nadie sabe qué contraseña tiene qué, ni dónde quedaron guardadas las licencias.",
      "Pago mantención todos los meses y el que llama al técnico sigo siendo yo.",
    ],
  },

  services: {
    eyebrow: "Servicios",
    title: "Cuatro formas de dejar de apagar incendios.",
    lead: "Trabajamos de forma remota, así que no esperas la visita de nadie. Puedes contratar uno o todos: el plan se arma según lo que tu empresa de verdad necesita.",
    linkPrefix: "Ver",
  },

  howWeWork: {
    eyebrow: "Cómo trabajamos",
    title: "Tres pasos, sin sorpresas en el camino.",
    steps: [
      {
        number: "01",
        title: "Diagnóstico gratuito",
        description:
          "Revisamos tus sistemas en una videollamada de 30 minutos. Te decimos qué está fallando y qué riesgos corres, sin compromiso.",
      },
      {
        number: "02",
        title: "Plan a medida",
        description:
          "Te armamos una propuesta con precio fijo mensual, hecha para tu empresa y no para una plantilla. Solo pagas por lo que vas a usar.",
      },
      {
        number: "03",
        title: "Soporte continuo",
        description:
          "Nos conectamos a tus equipos y resolvemos a distancia. Un equipo fijo conoce tu empresa, así no le explicas tu problema a alguien nuevo cada vez.",
      },
    ],
  },

  pricing: {
    eyebrow: "Planes",
    title: "Pagas por los computadores que cuidamos.",
    lead: "Un cargo fijo al mes más un valor por cada equipo. Mueve la barra hasta el tamaño de tu empresa y verás el precio exacto: sin tramos donde terminas pagando por equipos que no tienes.",
    sliderLabel: "¿Cuántos computadores tiene tu empresa?",
    sliderHelp: "Cuenta notebooks, computadores de escritorio y servidores.",
    sliderAria: "Cantidad de computadores",
    unitsSuffix: "computadores",
    maxSuffix: "o más",
    recommended: "Recomendado",
    perMonth: "/mes",
    /** Texto de cada plan. Los números viven en lib/pricing.ts. */
    plans: {
      esencial: {
        name: "Esencial",
        description:
          "Para empezar a ordenar la informática, con lo indispensable cubierto.",
        features: [
          "Mesa de ayuda en horario hábil, por teléfono y correo",
          "Respuesta en menos de 4 horas hábiles",
          "Respaldo diario de tus archivos",
          "Revisión de seguridad una vez al mes",
        ],
      },
      negocio: {
        name: "Negocio",
        description: "El que recomendamos para pymes de 15 a 40 personas en Santiago.",
        features: [
          "Todo lo del plan Esencial",
          "Respuesta en menos de 2 horas hábiles",
          "Monitoreo automático de tus sistemas, con aviso ante fallas",
          "Un encargado fijo que conoce tu empresa",
          "Administramos tus licencias y sus renovaciones",
        ],
      },
      integral: {
        name: "Integral",
        description: "Cuando la informática ya es parte del negocio y no puede fallar.",
        features: [
          "Todo lo del plan Negocio",
          "Atención de emergencias fuera de horario, por los canales acordados",
          "Mantención de tu sitio o tienda web incluida",
          "Revisión de ciberseguridad y prueba de respaldos cada trimestre",
          "Reunión mensual de revisión con tu encargado",
        ],
      },
    },
    /** {amount} y {units} se reemplazan en el componente. */
    clpEquivalent: "Hoy son unos ${amount} al mes por {units} equipos",
    usdEquivalent: "Unos US${amount} al mes por {units} equipos",
    breakdown: "{base} UF fijas + {perUnit} UF por equipo",
    planCta: "Agendar diagnóstico",
    planCtaSr: "plan",
    extrasTitle: "Qué se paga aparte, dicho antes de firmar.",
    extras: {
      licensesStrong:
        "Las licencias no están incluidas en el plan y no pasan por nosotros.",
      licensesBody1: "Microsoft 365, antivirus, respaldo en la nube y cualquier programa que uses se contratan",
      licensesStrong2: "directamente a nombre de tu empresa",
      licensesBody2:
        ", con tu medio de pago. Nosotros te decimos qué necesitas, te ayudamos a contratarlo y lo administramos, pero el proveedor te cobra a ti: así no te recargamos nada y el día que te vayas la licencia ya es tuya. Suelen salir entre $8.000 y $14.000 por persona al mes.",
      projectsStrong: "Los proyectos se cotizan por separado.",
      projectsBody:
        "Hacer tu página web, montar una tienda online o automatizar un proceso son trabajos con principio y fin: se cotizan una vez, con precio cerrado. No los metemos dentro de la mensualidad porque eso te obligaría a firmar un contrato largo, y no trabajamos así.",
      ownershipBody1: "Todo queda",
      ownershipStrong: "a nombre de tu empresa",
      ownershipBody2:
        ", no del nuestro. Si algún día te vas, se va contigo. Sin contrato anual forzoso.",
    },
    /** {date} es la fecha del valor de la UF. */
    disclaimer:
      "Valores en UF. El equivalente en pesos es referencial, con la UF del {date}. El servicio lo presta una persona natural y se documenta con boleta de honorarios electrónica, que está exenta de IVA: no se agrega ese 19% al valor publicado. Si tu empresa tributa en primera categoría, debe practicar la retención de segunda categoría que corresponda al emitirse la boleta. Bajo {min} equipos conviene más el soporte por hora: te lo decimos en el diagnóstico.",
    disclaimerUsd:
      "Los precios se fijan en UF, la unidad reajustable chilena. El monto en dólares es referencial, convertido con la UF del {date} y el tipo de cambio del mismo día; el cobro se hace en pesos chilenos. El servicio lo presta una persona natural y se documenta con boleta de honorarios electrónica, exenta de IVA. Bajo {min} equipos conviene más el soporte por hora: te lo decimos en el diagnóstico.",
  },

  commitments: {
    eyebrow: "Nuestro compromiso",
    title: "Tres cosas que quedan por escrito.",
    items: [
      {
        title: "Los accesos son tuyos",
        body: "Dominios, licencias y cuentas quedan a nombre de tu empresa desde el primer día. Si te vas, te llevas todo, documentado y sin costo de salida.",
      },
      {
        title: "Sin permanencia mínima",
        body: "El servicio es mes a mes. Terminas avisando con 30 días y no hay multa por salirte antes de ningún plazo.",
      },
      {
        title: "El precio está publicado",
        body: "Lo que ves en el simulador es lo que se cobra. Las licencias las contratas tú directamente y los proyectos se cotizan aparte, con precio cerrado.",
      },
    ],
    clientsTitle: "Clientes",
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Las dudas que sí nos hacen.",
    items: [
      {
        question: "¿Se hacen cargo de todo o solo de la página?",
        answer:
          "De lo que necesites. El plan mensual cubre el soporte informático, las redes y la seguridad de tu empresa. Hacer tu página web o automatizar un proceso son proyectos con principio y fin: se cotizan aparte, una sola vez y con precio cerrado.",
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
          "Los planes Negocio e Integral incluyen monitoreo automático que vigila tus sistemas también fuera de horario y avisa apenas algo falla. En el plan Integral atendemos emergencias el fin de semana, por los canales que acordemos contigo. En los otros planes el aviso queda registrado y se atiende a primera hora del día hábil siguiente: preferimos decírtelo así y cumplirlo, en vez de prometer una guardia de 24 horas que no tendrías cómo exigirnos.",
      },
      {
        question: "Si trabajan a distancia, ¿cómo arreglan un computador?",
        answer:
          "Nos conectamos a tu equipo por internet y trabajamos en él como si estuviéramos sentados al lado, con tu permiso y solo cuando tú lo autorizas. Así resolvemos en minutos lo que antes esperaba días a que llegara alguien. Si hay algo físico que hacer, como cambiar un equipo o instalar cableado, coordinamos a un técnico y supervisamos el trabajo.",
      },
      {
        question: "No tenemos a nadie de informática, ¿igual podemos contratarlos?",
        answer:
          "Sí. El servicio está pensado justamente para empresas que no tienen un área de informática propia: te explicamos todo en simple y tomamos las decisiones técnicas por ti.",
      },
      {
        question: "¿Por qué cobran en UF y no en pesos?",
        answer:
          "Para no tener que subirte el precio todos los años. La UF se reajusta sola con la inflación, así el valor real de lo que pagas se mantiene parejo y tú no recibes una carta de aumento cada enero. En cada plan te mostramos cuánto es hoy en pesos.",
      },
      {
        question: "¿Por qué cobran por computador y no un precio plano?",
        answer:
          "Porque cuidar 30 computadores cuesta el doble que cuidar 15, y un precio plano por tramos termina cobrándole lo mismo a los dos. Con el precio por equipo pagas por lo que de verdad tienes: si el mes que viene contratas a dos personas más, suben dos equipos y nada más. Y si alguien se va, baja.",
      },
      {
        question: "¿Me dan factura?",
        answer:
          "No: el servicio lo presta una persona natural y se documenta con boleta de honorarios electrónica, que está exenta de IVA. Para tu empresa el gasto es igual de deducible, y como no hay IVA tampoco hay crédito fiscal que recuperar. Lo que sí debes hacer, si tributas en primera categoría, es practicar la retención de segunda categoría al pagar la boleta. Te lo dejamos indicado en cada documento para que no tengas que calcularlo.",
      },
      {
        question: "¿Cómo empezamos a trabajar juntos?",
        answer:
          "Agendamos un diagnóstico gratuito de 30 minutos por videollamada. En una semana tienes una propuesta clara, con precio fijo mensual y sin compromiso de firmar nada.",
      },
    ],
  },

  finalCta: {
    title: "Hablemos antes de que se caiga algo.",
    lead: "Agenda un diagnóstico gratuito de 30 minutos por videollamada. Sin compromiso y sin letra chica.",
    primary: "Agendar diagnóstico",
    whatsapp: "Escríbenos por WhatsApp",
  },

  contact: {
    eyebrow: "Contacto",
    title: "Cuéntanos qué está fallando.",
    lead: "Completa el formulario y te contactamos dentro de un día hábil para coordinar tu diagnóstico gratuito por videollamada. Si prefieres ir directo al grano, escríbenos al correo.",
  },

  form: {
    name: "Nombre",
    company: "Empresa",
    units: "Cantidad de equipos",
    unitsPlaceholder: "Elige un rango",
    phone: "Teléfono",
    phonePlaceholder: "+56 9 1234 5678",
    email: "Correo",
    emailPlaceholder: "nombre@empresa.cl",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos qué se te está cayendo o qué necesitas resolver.",
    submit: "Agendar diagnóstico gratuito",
    submitting: "Enviando…",
    successTitle: "Recibimos tu solicitud.",
    successBody: "Te escribimos dentro de 1 día hábil para coordinar el diagnóstico gratuito.",
    successAgain: "Enviar otra solicitud",
  },

  whatsapp: {
    floatingAria: "Escribirnos por WhatsApp",
    floatingLabel: "Escríbenos por WhatsApp",
    prefilled: "Hola, quiero agendar el diagnóstico gratuito para mi empresa.",
  },

  footer: {
    tagline:
      "Soporte informático remoto, desarrollo web y automatización para pymes de Santiago.",
    services: "Servicios",
    contact: "Contacto",
    legal: "Legal",
    privacy: "Política de privacidad",
    terms: "Términos de servicio",
    rights: "Todos los derechos reservados.",
    /** {trade}, {full} y {rut} se reemplazan con los datos de lib/site.ts. */
    legalLine: "{trade} es el nombre comercial de {full}, RUT {rut}.",
  },

  servicePage: {
    backToServices: "Volver a servicios",
    detailLabel: "En detalle",
    whereTitle: "Dónde atendemos",
    /** {list} son las comunas, {last} la última, separada con "y". */
    whereBody:
      "Trabajamos de forma remota con pymes de toda la Región Metropolitana, entre ellas {list} y {last}. Como no dependemos de trasladarnos, la comuna en la que estés no cambia el tiempo de respuesta.",
    faqTitle: "Preguntas sobre este servicio",
    otherServices: "Otros servicios",
    ctaPrimary: "Agendar diagnóstico gratuito",
    ctaSecondary: "Ver planes y precios",
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
  },

};

/**
 * El tipo sale del español, sin `as const`: así los literales se ensanchan a
 * `string` y los demás idiomas pueden tener su propio texto conservando la
 * misma forma. Si a un idioma le falta una clave, el build falla.
 */
export type Dictionary = typeof es;
