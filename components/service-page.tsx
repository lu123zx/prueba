import Link from "next/link";
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
import { getServices, type Service } from "@/lib/services-data";
import { COMUNAS } from "@/lib/seo";
import { getDictionary, localePath, routePath, type Locale } from "@/lib/i18n";

/**
 * Cuerpo de una página de servicio, compartido por los dos idiomas.
 *
 * Cada idioma tiene su propia ruta (/servicios/... y /en/services/...) para
 * que la URL esté en el idioma del contenido, pero el marcado es este y solo
 * este: si el diseño cambia, cambia en ambos a la vez.
 */
export function ServicePage({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const otros = getServices(locale).filter((s) => s.id !== service.id);
  const home = localePath(locale, "/");
  const path = routePath(locale, "services", service.slug);

  const comunas = [...COMUNAS];
  const where = dict.servicePage.whereBody
    .replace("{list}", comunas.slice(0, -1).join(", "))
    .replace("{last}", comunas.at(-1) ?? "");

  return (
    <>
      <Header dict={dict} locale={locale} />

      <main>
        <article>
          <header className="pt-40 pb-16 lg:pt-48 lg:pb-20">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
              <nav aria-label={dict.servicePage.breadcrumbLabel} className="mb-10">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href={home}
                      className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-accent"
                    >
                      <ArrowLeftIcon className="size-4" aria-hidden="true" />
                      {dict.servicePage.breadcrumbHome}
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
                  <Link href={`${home === "/" ? "" : home}/#contacto`}>
                    {dict.servicePage.ctaPrimary}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`${home === "/" ? "" : home}/#planes`}>
                    {dict.servicePage.ctaSecondary}
                  </Link>
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
                {dict.servicePage.detailLabel}
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
                    {dict.servicePage.whereTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                    {where}
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
                {dict.servicePage.faqTitle}
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
              {dict.servicePage.otherServices}
            </h2>
            <ul className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-3">
              {otros.map((otro) => (
                <li key={otro.id} className="border-b border-r border-border">
                  <Link
                    href={routePath(locale, "services", otro.slug)}
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

      <Footer dict={dict} locale={locale} />

      <ServiceSchema
        name={service.name}
        description={service.intro}
        path={path}
        locale={locale}
      />
      <FaqSchema faqs={service.faqs} locale={locale} />
      <BreadcrumbSchema
        items={[
          { name: dict.servicePage.breadcrumbHome, path: home },
          { name: service.name, path },
        ]}
      />
    </>
  );
}
