import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { LEGAL, SITE } from "@/lib/site";
import { routePath } from "@/lib/i18n";

/**
 * Versión en inglés de los términos de servicio.
 *
 * Traducción de referencia, no un contrato distinto: el servicio se rige por
 * la ley chilena y se somete a los tribunales de Santiago, igual que en la
 * versión en español. Ante cualquier diferencia manda el español, y así se
 * dice arriba de la página.
 *
 * PENDIENTE: que un abogado revise esta traducción antes de publicar. Las
 * cláusulas de límite de responsabilidad son las que más pierden al
 * traducirse sin revisión.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms under which TechFlow Soluciones provides IT support, web development and automation services.",
  alternates: {
    canonical: routePath("en", "terms"),
    languages: {
      "es-CL": routePath("es", "terms"),
      en: routePath("en", "terms"),
      "x-default": routePath("es", "terms"),
    },
  },
};

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 lg:px-0 lg:py-32">
      <Link
        href={routePath("en", "home")}
        className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Back to home
      </Link>

      <h1 className="font-display text-4xl leading-[0.95] text-foreground sm:text-5xl">
        Terms of service
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: August 2026
      </p>

      <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted-foreground">
        This is a translation provided for convenience. These terms are governed
        by Chilean law, and in case of any discrepancy the{" "}
        <Link
          href={routePath("es", "terms")}
          hrefLang="es"
          className="text-accent underline underline-offset-4"
        >
          Spanish version
        </Link>{" "}
        prevails.
      </p>

      <div className="mt-12 flex flex-col gap-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Engaging the service
          </h2>
          <p className="leading-relaxed">
            The initial assessment is free, is carried out by video call and
            does not oblige you to take on any plan. If you decide to go ahead,
            we send you a written proposal with the monthly price in UF, the
            services included, the licences billed separately and the start
            date, before charging you anything.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Term and termination
          </h2>
          <p className="leading-relaxed">
            Our plans are monthly and carry no forced annual contract. You can
            end the service by giving 30 days&rsquo; notice. On termination, we
            hand over all access credentials, backups and documentation for your
            systems.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Ownership of your data and licences
          </h2>
          <p className="leading-relaxed">
            The domains, software licences and accounts we manage for you are
            always registered in your company&rsquo;s name, never in
            TechFlow&rsquo;s.
          </p>
          <p className="mt-4 leading-relaxed">
            Third-party licences (Microsoft 365, antivirus, cloud backup and
            similar) are not included in the plan price and are not resold
            through us: they are purchased directly in your company&rsquo;s
            name and on your payment method, so the vendor bills you with no
            intermediary and no markup. We advise you on what to buy and manage
            those licences as part of the plan.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Who provides the service
          </h2>
          <p className="leading-relaxed">
            {LEGAL.tradeName} is the trading name under which {LEGAL.fullName},
            Chilean tax ID {LEGAL.rut}, provides these services as a sole
            trader. It is not a company. The service is documented with a
            Chilean electronic fee receipt (boleta de honorarios), which is
            exempt from VAT; if your company is a Chilean first-category
            taxpayer, it must apply the withholding in force at the time of
            issue.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Liability
          </h2>
          <p className="leading-relaxed">
            We are answerable for the quality of the work we carry out on your
            systems, with the diligence expected of a professional provider. We
            are not answerable for failures of external providers (your internet
            company, a hardware manufacturer, a third party&rsquo;s cloud
            service), although we help you manage them.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong className="font-medium text-foreground">
              Limitation of liability.
            </strong>{" "}
            Except in cases of wilful misconduct or gross negligence on our
            part, our total liability for any matter related to this service
            will not exceed the amount actually paid by your company in the
            three months prior to the event giving rise to the claim. We are not
            liable for loss of profit, loss of business or expected earnings, or
            for indirect damages.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong className="font-medium text-foreground">Backups.</strong>{" "}
            We configure, monitor and periodically test the backups that fall
            within the plan you have contracted. Your company retains ultimate
            responsibility for its data and for authorising the scope of the
            backups implemented.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong className="font-medium text-foreground">
              Response times.
            </strong>{" "}
            The times stated in the plans are counted in business hours (Monday
            to Friday, 9:00 to 18:00, excluding public holidays) from when we
            receive the notice through the agreed channels. They are first
            response times, not resolution times: how long a fix takes depends
            on the nature of the failure and on third parties we do not control.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Access and confidentiality
          </h2>
          <p className="leading-relaxed">
            To provide support we need access to your systems. We use it only to
            deliver the service you have contracted, connections are made with
            the knowledge of the person using the machine, and access is removed
            when the relationship ends. We keep all information about your
            company that we access confidential, with no time limit.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Complaints and governing law
          </h2>
          <p className="leading-relaxed">
            If something goes wrong, write to us first at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-accent underline underline-offset-4"
            >
              {SITE.email}
            </a>{" "}
            and you will have a reply within 5 business days. These terms are
            governed by Chilean law and any dispute is submitted to the ordinary
            courts of Santiago. If your company qualifies as a micro or small
            enterprise, you also retain the rights granted to you by Chilean Law
            19,496 through the application of article 9 of Law 20,416.
          </p>
        </section>
      </div>
    </main>
  );
}
