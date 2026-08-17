import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePage } from "@/components/service-page";
import { serviceMetadata, serviceParams } from "@/lib/i18n/service-route";
import { getService } from "@/lib/services-data";

/**
 * Ruta en español: /servicios/<slug>.
 *
 * Solo genera los slugs del español. dynamicParams en false hace que
 * /en/servicios/... devuelva 404 en vez de servir la misma página bajo dos
 * URLs distintas, que sería contenido duplicado.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  // Devuelve lang y slug juntos a propósito. Si solo devolviera el slug,
  // Next lo combinaría con los dos idiomas del layout padre y generaría
  // también la ruta del otro idioma bajo este segmento.
  return serviceParams("es");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata("es", slug);
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService("es", slug);
  if (!service) notFound();

  return <ServicePage service={service} locale="es" />;
}
