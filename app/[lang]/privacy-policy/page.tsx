import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { LEGAL, SITE } from "@/lib/site";
import { routePath } from "@/lib/i18n";

/**
 * Versión en inglés de la política de privacidad.
 *
 * Es una traducción para que el visitante de fuera de Chile pueda leerla, no
 * un documento distinto: describe el mismo tratamiento de datos, bajo la
 * misma ley chilena. Ante cualquier diferencia de interpretación manda la
 * versión en español, y así se dice arriba de la página.
 *
 * PENDIENTE: que un abogado revise esta traducción antes de publicar, igual
 * que la versión en español.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What data TechFlow Soluciones collects when you contact us, what we use it for, and how to ask us to delete it.",
  alternates: {
    canonical: routePath("en", "privacy"),
    languages: {
      "es-CL": routePath("es", "privacy"),
      en: routePath("en", "privacy"),
      "x-default": routePath("es", "privacy"),
    },
  },
};

export default function PrivacyPolicy() {
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
        Privacy policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: August 2026
      </p>

      <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted-foreground">
        This is a translation provided for convenience. The service is governed
        by Chilean law, and in case of any discrepancy the{" "}
        <Link
          href={routePath("es", "privacy")}
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
            What data we collect
          </h2>
          <p className="leading-relaxed">
            When you fill in the contact form or write to us on WhatsApp or by
            email, we receive your name, your company&rsquo;s name, phone
            number, email address and the content of the message you send us.
            We do not collect browsing data for advertising purposes, nor do we
            share it with third parties for that purpose.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            What we use it for
          </h2>
          <p className="leading-relaxed">
            We use your data solely to respond to your enquiry, to arrange the
            free assessment and, if you take on our services, to provide
            technical support. If you expressly authorise it, we may also write
            to you about new services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Where it is stored
          </h2>
          <p className="leading-relaxed">
            Your data is stored in systems with access restricted to the person
            providing the service who needs to contact you. We never sell or
            rent your information to other companies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Our legal basis for processing it
          </h2>
          <p className="leading-relaxed">
            We process your data because you give it to us voluntarily so that
            we can contact you, and because it is necessary in order to prepare
            or perform the service agreement you ask us for. To write to you
            about new services we ask for your consent separately, and you can
            withdraw it whenever you want without that affecting the service
            you have contracted.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            How long we keep it
          </h2>
          <p className="leading-relaxed">
            If we don&rsquo;t end up working together, we delete the form data
            after 12 months. If you take on the service, we keep it for as long
            as the relationship lasts and for up to 6 years after it ends,
            which is the period for which the law may require us to hold tax
            and accounting records.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Your rights
          </h2>
          <p className="leading-relaxed">
            You can ask us at any time to show you the data we hold about you,
            to correct it if it is wrong, to delete it, to suspend its use, or
            to hand it over to you in a format you can take elsewhere. Write to
            us at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-accent underline underline-offset-4"
            >
              {SITE.email}
            </a>{" "}
            and we will reply within 30 calendar days. If you are not satisfied,
            you can complain to the Chilean Personal Data Protection Agency.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            If there is a data breach
          </h2>
          <p className="leading-relaxed">
            If your data is compromised, we will notify you and the authority as
            soon as we detect it, telling you what happened, which data was
            affected and what we are doing about it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Who is responsible
          </h2>
          <p className="leading-relaxed">
            The data controller is {LEGAL.fullName}, Chilean tax ID{" "}
            {LEGAL.rut}, who provides services under the trading name{" "}
            {LEGAL.tradeName}. You can contact us about any personal data
            matter at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-accent underline underline-offset-4"
            >
              {SITE.email}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
