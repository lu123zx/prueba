import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  BreadcrumbSchema,
  FaqSchema,
  ServiceSchema,
} from "@/components/structured-data";
import { SERVICES, getService } from "@/lib/services-data";
import { COMUNAS } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const path = `/servicios/${service.slug}`;

  return {
    // absolute: este título ya incluye la marca donde corresponde y no debe
    // heredar la plantilla "%s | TechFlow Soluciones".
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "es_CL",
      url: path,
      title: service.metaTitle,
      description: service.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otros = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Header />

      <main>
        <article>
          <header className="pt-40 pb-16 lg:pt-48 lg:pb-20">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
              <nav aria-label="Ruta de navegación" className="mb-10">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-accent"
                    >
                      <ArrowLeftIcon className="size-4" aria-hidden="true" />
                      Inicio
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-foreground">
                    {service.name}
                  </li>
                </ol>
              </nav>

              <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
                {service.name}
              </p>

              <h1 className="max-w-4xl text-balance font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                {service.h1}
              </h1>

              {/* Respuesta directa en el primer párrafo: es lo que citan los
                  buscadores con IA y lo que lee quien llega desde Google. */}
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
                {service.intro}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/#contacto">Agendar diagnóstico gratuito</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/#planes">Ver planes y precios</Link>
                </Button>
              </div>
            </div>
          </header>

          <div className="border-y border-border bg-graphite py-16 text-bone">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <CheckIcon
                      className="mt-1 size-4 shrink-0 text-accent-tint"
                      aria-hidden="true"
                    />
                    <span className="text-bone/80">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="py-20 lg:py-28">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-20 lg:px-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
                En detalle
              </p>
              <div className="flex flex-col gap-12">
                {service.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-2xl sm:text-3xl">
                      {section.heading}
                    </h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                      {section.body}
                    </p>
                  </section>
                ))}

                <section>
                  <h2 className="font-display text-2xl sm:text-3xl">
                    Dónde atendemos
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                    Trabajamos de forma remota con pymes de toda la Región
                    Metropolitana, entre ellas {COMUNAS.slice(0, -1).join(", ")} y{" "}
                    {COMUNAS.at(-1)}. Como no dependemos de trasladarnos, la
                    comuna en la que estés no cambia el tiempo de respuesta.
                  </p>
                </section>
              </div>
            </div>
          </div>

          <section
            aria-labelledby="faq-servicio"
            className="border-t border-border py-20 lg:py-28"
          >
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16 lg:px-12">
              <h2
                id="faq-servicio"
                className="max-w-xs font-display text-3xl leading-[0.95] sm:text-4xl"
              >
                Preguntas sobre este servicio
              </h2>
              <Accordion
                type="single"
                collapsible
                className="w-full border-t border-border"
              >
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </article>

        {/* Enlazado interno entre servicios: reparte autoridad y evita
            que estas URLs queden huérfanas colgando solo de la home. */}
        <section
          aria-labelledby="otros-servicios"
          className="border-t border-border py-20 lg:py-28"
        >
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <h2
              id="otros-servicios"
              className="mb-12 font-display text-3xl sm:text-4xl"
            >
              Otros servicios
            </h2>
            <ul className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-3">
              {otros.map((otro) => (
                <li key={otro.slug} className="border-b border-r border-border">
                  <Link
                    href={`/servicios/${otro.slug}`}
                    className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors duration-200 hover:bg-graphite hover:text-bone"
                  >
                    <span className="font-display text-xl">{otro.name}</span>
                    <ArrowRightIcon
                      className="size-5 text-accent transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-tint"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />

      <ServiceSchema
        name={service.name}
        description={service.intro}
        slug={service.slug}
      />
      <FaqSchema faqs={service.faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
      />
    </>
  );
}
