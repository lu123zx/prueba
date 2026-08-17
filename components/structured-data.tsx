import { SITE, WHATSAPP_ENABLED } from "@/lib/site";
import { absoluteUrl, COMUNAS, SITE_NAME, SITE_URL } from "@/lib/seo";
import { planPriceUF, type Plan, type PlanId } from "@/lib/pricing";
import { getServices } from "@/lib/services-data";
import { HTML_LANG, routePath, type Dictionary, type Locale } from "@/lib/i18n";

/**
 * JSON-LD. Es lo que permite que Google entienda que TechFlow es una empresa
 * de servicios TI en Santiago con precios y respuestas concretas, y que los
 * asistentes de IA puedan citarla en vez de parafrasear a un competidor.
 *
 * Todo lo que se declara acá va en el idioma de la página. Un FAQPage en
 * español colgando de una URL en inglés no lo sirve Google como resultado
 * enriquecido, porque no coincide con el idioma que declara el documento.
 */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro y estático; no viene de entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * El @id es único por sitio, no por idioma: es la misma empresa descrita en
 * dos idiomas, no dos empresas. Si cada idioma declarara su propio @id,
 * Google entendería que hay dos organizaciones distintas.
 */
const ORGANIZATION_ID = `${SITE_URL}/#organizacion`;

const SCHEMA_TEXT: Record<
  Locale,
  {
    description: string;
    slogan: string;
    catalogName: string;
    serviceName: string;
    audience: string;
    payment: string;
    unitMonth: string;
    unitMachines: string;
    planPrefix: string;
    referenceNote: (units: number) => string;
  }
> = {
  es: {
    description:
      "Soporte informático remoto, desarrollo web y automatización de procesos para pymes de Santiago.",
    slogan: "Tu empresa no se detiene porque se cayó un computador.",
    catalogName: "Servicios de TI para pymes",
    serviceName: "Soporte informático gestionado para pymes",
    audience: "Pymes de 10 a 60 trabajadores",
    payment: "Transferencia, tarjeta de crédito",
    unitMonth: "mes",
    unitMachines: "equipos",
    planPrefix: "Plan",
    referenceNote: (units) => `Valor para una empresa de ${units} equipos.`,
  },
  en: {
    description:
      "Remote IT support, web development and process automation for small businesses in Santiago, Chile.",
    slogan: "Your business shouldn't stop because a computer went down.",
    catalogName: "IT services for small businesses",
    serviceName: "Managed IT support for small businesses",
    audience: "Small businesses of 10 to 60 staff",
    payment: "Bank transfer, credit card",
    unitMonth: "month",
    unitMachines: "machines",
    planPrefix: "Plan",
    referenceNote: (units) => `Price for a company with ${units} machines.`,
  },
};

export function OrganizationSchema({ locale }: { locale: Locale }) {
  const text = SCHEMA_TEXT[locale];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        email: SITE.email,
        // El teléfono se declara solo si es real. Un número de relleno en
        // datos estructurados es peor que no tener el campo: Google lo
        // publica tal cual en el panel de conocimiento.
        ...(WHATSAPP_ENABLED ? { telephone: `+${SITE.whatsappNumber}` } : {}),
        description: text.description,
        slogan: text.slogan,
        priceRange: "$$",
        // El cobro se hace en pesos chilenos aunque el precio se muestre en
        // dólares: declarar USD acá sería declarar algo que no ocurre.
        currenciesAccepted: "CLP",
        paymentAccepted: text.payment,
        // Sin oficina de atención: el servicio es remoto, así que se declara
        // el área servida en lugar de una dirección física.
        areaServed: COMUNAS.map((name) => ({
          "@type": "City",
          name: `${name}, Santiago, Chile`,
        })),
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: -33.4489,
            longitude: -70.6693,
          },
          geoRadius: 40000,
        },
        // Los dos idiomas en los que se atiende de verdad.
        knowsLanguage: ["es-CL", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: text.catalogName,
          itemListElement: getServices(locale).map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.intro,
              url: absoluteUrl(routePath(locale, "services", service.slug)),
            },
          })),
        },
      }}
    />
  );
}

export function WebSiteSchema({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: absoluteUrl(routePath(locale, "home")),
        name: SITE_NAME,
        inLanguage: HTML_LANG[locale],
        publisher: { "@id": ORGANIZATION_ID },
      }}
    />
  );
}

/**
 * Los planes. Como el precio depende del número de equipos, se declara el
 * valor para una empresa de referencia y se deja explícita esa cantidad con
 * referenceQuantity: publicar solo el cargo base sería engañoso.
 *
 * El precio se declara siempre en pesos chilenos, que es la moneda en que se
 * cobra, aunque el visitante de fuera lo esté viendo convertido a dólares.
 */
export function PricingSchema({
  plans,
  dict,
  locale,
  ufClp,
  equiposReferencia,
}: {
  plans: Plan[];
  dict: Dictionary;
  locale: Locale;
  ufClp: number;
  equiposReferencia: number;
}) {
  const text = SCHEMA_TEXT[locale];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: text.serviceName,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "City", name: "Santiago, Chile" },
        offers: plans.map((plan) => {
          const precio = Math.round(planPriceUF(plan, equiposReferencia) * ufClp);
          const copy = dict.pricing.plans[plan.id as PlanId];

          return {
            "@type": "Offer",
            name: `${text.planPrefix} ${copy.name}`,
            description: `${copy.description} ${text.referenceNote(equiposReferencia)}`,
            price: precio,
            priceCurrency: "CLP",
            url: absoluteUrl(`${routePath(locale, "home")}#planes`.replace("//", "/")),
            availability: "https://schema.org/InStock",
            eligibleCustomerType: "https://schema.org/Business",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: precio,
              priceCurrency: "CLP",
              billingIncrement: 1,
              unitText: text.unitMonth,
              valueAddedTaxIncluded: false,
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: equiposReferencia,
                unitText: text.unitMachines,
              },
            },
          };
        }),
      }}
    />
  );
}

/** FAQPage: la vía más directa para aparecer citado en respuestas de IA. */
export function FaqSchema({
  faqs,
  locale,
}: {
  faqs: { question: string; answer: string }[];
  locale: Locale;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: HTML_LANG[locale],
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  path,
  locale,
}: {
  name: string;
  description: string;
  /** Ruta ya resuelta en el idioma correcto. */
  path: string;
  locale: Locale;
}) {
  const text = SCHEMA_TEXT[locale];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: absoluteUrl(path),
        inLanguage: HTML_LANG[locale],
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "City", name: "Santiago, Chile" },
        audience: {
          "@type": "BusinessAudience",
          name: text.audience,
        },
      }}
    />
  );
}
