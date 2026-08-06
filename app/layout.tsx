import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";
import { faqs, site } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Soporte TI, desarrollo y redes para pymes en Santiago`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "soporte TI Santiago",
    "soporte técnico pymes Chile",
    "desarrollo web Santiago",
    "automatización de procesos pymes",
    "redes y servidores empresas Chile",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Soporte TI para pymes en Santiago`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Soporte TI para pymes en Santiago`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101418" },
  ],
};

// Datos estructurados: ayuda a que Google entienda negocio local + FAQ.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: site.legalName,
      description: site.description,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      areaServed: { "@type": "City", name: "Santiago, Chile" },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.district,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Saltar al contenido
        </a>
        {children}
        <Toaster position="top-center" richColors />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
