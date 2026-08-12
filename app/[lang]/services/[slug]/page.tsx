import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePage } from "@/components/service-page";
import { serviceMetadata, serviceParams } from "@/lib/i18n/service-route";
import { getService } from "@/lib/services-data";

/** Ruta en inglés: /en/services/<slug>. Ver la nota en la ruta española. */
export const dynamicParams = false;

export function generateStaticParams() {
  // Devuelve lang y slug juntos a propósito. Si solo devolviera el slug,
  // Next lo combinaría con los dos idiomas del layout padre y generaría
  // también la ruta del otro idioma bajo este segmento.
  return serviceParams("en");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata("en", slug);
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService("en", slug);
  if (!service) notFound();

  return <ServicePage service={service} locale="en" />;
}
