import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { OrganizationSchema, WebSiteSchema } from "@/components/structured-data";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

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

export const metadata: Metadata = {
  // metadataBase resuelve las URLs relativas de canonical y Open Graph. Sin
  // esto, Next emite rutas relativas y los previsualizadores no cargan nada.
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Soporte informático para pymes en Santiago | TechFlow Soluciones",
    // Las páginas hijas solo declaran su nombre y heredan la marca.
    template: "%s | TechFlow Soluciones",
  },
  description:
    "Soporte informático remoto para pymes de Santiago: respondemos en menos de 2 horas, revisamos tus sistemas todos los días y no te amarramos con contratos anuales. Precio por computador, desde 4,25 UF al mes.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  category: "Tecnología",
  keywords: [
    "soporte informático empresas Santiago",
    "soporte TI pymes",
    "outsourcing informático Chile",
    "soporte técnico remoto empresas",
    "desarrollo web pymes Santiago",
    "ciberseguridad pymes",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Soporte informático para pymes en Santiago | TechFlow Soluciones",
    description:
      "Nos conectamos y lo arreglamos, sin esperar que llegue un técnico. Respuesta en menos de 2 horas y precio por computador, desde 4,25 UF al mes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soporte informático para pymes en Santiago | TechFlow Soluciones",
    description:
      "Nos conectamos y lo arreglamos, sin esperar que llegue un técnico. Respuesta en menos de 2 horas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CL"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans">
        {children}
        <WhatsAppButton />
        <Toaster />
        <OrganizationSchema />
        <WebSiteSchema />
      </body>
    </html>
  );
}
