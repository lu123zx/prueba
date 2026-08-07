import { SITE } from "@/lib/site";
import { absoluteUrl, COMUNAS, SITE_NAME, SITE_URL } from "@/lib/seo";
import { EQUIPOS_DEFAULT, UF_CLP, planPriceUF, type Plan } from "@/lib/pricing";
import { SERVICES } from "@/lib/services-data";

/**
 * JSON-LD. Es lo que permite que Google entienda que TechFlow es una empresa
 * de servicios TI en Santiago con precios y respuestas concretas, y que los
 * asistentes de IA puedan citarla en vez de parafrasear a un competidor.
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

const ORGANIZATION_ID = `${SITE_URL}/#organizacion`;

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        email: SITE.email,
        telephone: `+${SITE.whatsappNumber}`,
        description:
          "Soporte informático remoto, desarrollo web y automatización de procesos para pymes de Santiago.",
        slogan: "Tu empresa no se detiene porque se cayó un computador.",
        priceRange: "$$",
        currenciesAccepted: "CLP",
        paymentAccepted: "Transferencia, tarjeta de crédito",
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
        knowsLanguage: ["es-CL"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de TI para pymes",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.intro,
              url: absoluteUrl(`/servicios/${service.slug}`),
            },
          })),
        },
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "es-CL",
        publisher: { "@id": ORGANIZATION_ID },
      }}
    />
  );
}

/**
 * Los planes. Como el precio depende del número de equipos, se declara el
 * valor para una empresa de referencia y se deja explícita esa cantidad con
 * referenceQuantity: publicar solo el cargo base sería engañoso.
 */
export function PricingSchema({
  plans,
  equiposReferencia = EQUIPOS_DEFAULT,
}: {
  plans: Plan[];
  equiposReferencia?: number;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Soporte informático gestionado para pymes",
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "City", name: "Santiago, Chile" },
        offers: plans.map((plan) => {
          const precio = Math.round(planPriceUF(plan, equiposReferencia) * UF_CLP);
          return {
            "@type": "Offer",
            name: `Plan ${plan.name}`,
            description: `${plan.description} Valor para una empresa de ${equiposReferencia} equipos.`,
            price: precio,
            priceCurrency: "CLP",
            url: absoluteUrl("/#planes"),
            availability: "https://schema.org/InStock",
            eligibleCustomerType: "https://schema.org/Business",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: precio,
              priceCurrency: "CLP",
              billingIncrement: 1,
              unitText: "mes",
              valueAddedTaxIncluded: false,
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: equiposReferencia,
                unitText: "equipos",
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
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
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
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: absoluteUrl(`/servicios/${slug}`),
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "City", name: "Santiago, Chile" },
        audience: {
          "@type": "BusinessAudience",
          name: "Pymes de 10 a 60 trabajadores",
        },
      }}
    />
  );
}
