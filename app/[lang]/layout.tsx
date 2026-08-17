import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Instrument_Serif } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { OrganizationSchema, WebSiteSchema } from "@/components/structured-data";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

/** Las dos versiones se generan en el build: ninguna se arma en caliente. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/**
 * Metadatos de la home de cada idioma.
 *
 * La home NO compite por "soporte informático empresas Santiago": esa
 * búsqueda es de /servicios/soporte-informatico, que la responde con una
 * página entera. Cuando dos URLs del mismo sitio pelean por el mismo
 * término, Google reparte señales entre ambas y ninguna sube.
 *
 * La home juega un nivel más arriba: la empresa completa, con los cuatro
 * servicios, para quien busca proveedor y todavía no sabe qué necesita.
 */
const META: Record<Locale, { title: string; description: string; ogDescription: string; keywords: string[] }> = {
  es: {
    title: "Empresa de informática para pymes en Santiago | TechFlow",
    description:
      "Nos hacemos cargo de la informática de tu pyme en Santiago: soporte remoto, páginas web, automatización y ciberseguridad. Precio por computador, sin contrato anual.",
    ogDescription:
      "Nos conectamos y lo arreglamos, sin esperar que llegue un técnico. Respuesta en 2 horas hábiles y precio por computador, desde 4,25 UF al mes.",
    keywords: [
      "empresa de informática Santiago",
      "outsourcing informático Chile",
      "servicios TI para pymes",
      "proveedor informático pymes Santiago",
      "área de informática externa",
    ],
  },
  en: {
    title: "Your IT department, outsourced | TechFlow, Santiago de Chile",
    description:
      "We take over IT for small companies in Santiago, Chile: remote support, websites, automation and cybersecurity. Priced per computer, with no annual contract.",
    ogDescription:
      "We connect and fix it, with no waiting for a technician. Response within 2 business hours and a price per computer.",
    keywords: [
      "outsourced IT department Chile",
      "IT provider for small business Santiago",
      "IT outsourcing Chile",
      "nearshore IT support Chile",
      "small business IT services Santiago",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const meta = META[lang];

  return {
    // metadataBase resuelve las URLs relativas de canonical y Open Graph. Sin
    // esto, Next emite rutas relativas y los previsualizadores no cargan nada.
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      // Las páginas hijas solo declaran su nombre y heredan la marca.
      template: "%s | TechFlow Soluciones",
    },
    description: meta.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: localePath(lang, "/"),
      // hreflang de la home. Le dice a Google que estas dos URLs son la misma
      // página en distinto idioma, para que indexe ambas en vez de tratarlas
      // como contenido duplicado. x-default apunta al español, que es el
      // idioma del mercado principal.
      languages: {
        "es-CL": localePath("es", "/"),
        en: localePath("en", "/"),
        "x-default": localePath("es", "/"),
      },
    },
    // Verificación de Google Search Console. Se hereda del sitio anterior en
    // este mismo dominio: sin esto, al cambiar el proyecto que sirve
    // techflowsoluciones.com se pierde la propiedad ya verificada.
    verification: { google: "P-cFh3lF_IIJb930pCtKiUPJImNnHZIURX_tgQ-sk1g" },
    category: "Tecnología",
    keywords: meta.keywords,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      url: localePath(lang, "/"),
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: true, address: false, email: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html
      lang={HTML_LANG[lang]}
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans">
        {children}
        <WhatsAppButton dict={dict} />
        <Toaster />
        <OrganizationSchema locale={lang} />
        <WebSiteSchema locale={lang} />
      </body>
    </html>
  );
}
