import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { LEGAL, SITE } from "@/lib/site";
import { routePath } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "es" }];
}

export const metadata: Metadata = {
  // Sin la marca: la plantilla del layout ya la agrega.
  title: "Política de privacidad",
  description:
    "Qué datos recopila TechFlow Soluciones cuando nos contactas, para qué los usamos y cómo pedir que los eliminemos.",
  alternates: {
    canonical: routePath("es", "privacy"),
    languages: {
      "es-CL": routePath("es", "privacy"),
      en: routePath("en", "privacy"),
      "x-default": routePath("es", "privacy"),
    },
  },
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 lg:px-0 lg:py-32">
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Volver al inicio
      </Link>

      <h1 className="font-display text-4xl leading-[0.95] text-foreground sm:text-5xl">
        Política de privacidad
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Última actualización: agosto de 2026
      </p>

      <div className="mt-12 flex flex-col gap-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Qué datos recopilamos
          </h2>
          <p className="leading-relaxed">
            Cuando completas el formulario de contacto o nos escribes por
            correo, recibimos tu nombre, el nombre de tu empresa,
            teléfono, correo electrónico y el contenido del mensaje que nos
            envías. No recopilamos datos de navegación con fines
            publicitarios ni los compartimos con terceros para ese fin.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Para qué los usamos
          </h2>
          <p className="leading-relaxed">
            Usamos tus datos únicamente para responder tu solicitud, coordinar
            el diagnóstico gratuito y, si contratas nuestros servicios,
            entregarte soporte técnico. Si nos autorizas expresamente, también
            podemos escribirte para contarte sobre nuevos servicios.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Dónde se guardan
          </h2>
          <p className="leading-relaxed">
            Tus datos se almacenan en sistemas con acceso restringido a quien
            presta el servicio y necesita contactarte. Nunca vendemos ni
            arrendamos tu información a otras empresas.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Con qué justificación los tratamos
          </h2>
          <p className="leading-relaxed">
            Tratamos tus datos porque tú nos los entregas voluntariamente para
            que te contactemos, y porque son necesarios para preparar o cumplir
            el contrato de servicios que nos pidas. Para escribirte sobre
            servicios nuevos pedimos tu consentimiento por separado, y puedes
            retirarlo cuando quieras sin que eso afecte el servicio contratado.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Cuánto tiempo los guardamos
          </h2>
          <p className="leading-relaxed">
            Si no llegamos a trabajar juntos, eliminamos los datos del
            formulario a los 12 meses. Si contratas el servicio, los mantenemos
            mientras dure la relación y hasta 6 años después del término, que
            es el plazo en que la ley nos puede exigir respaldo tributario y
            contable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Tus derechos
          </h2>
          <p className="leading-relaxed">
            Puedes pedirnos en cualquier momento que te mostremos los datos que
            tenemos sobre ti, que los corrijamos si están errados, que los
            eliminemos, que suspendamos su uso, o que te los entreguemos en un
            formato que puedas llevarte a otra parte. Escríbenos a{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-accent underline underline-offset-4"
            >
              {SITE.email}
            </a>{" "}
            y respondemos dentro de 30 días corridos. Si no quedas conforme,
            puedes reclamar ante la Agencia de Protección de Datos Personales.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Si ocurre una filtración
          </h2>
          <p className="leading-relaxed">
            Si tus datos se ven comprometidos, te avisamos a ti y a la
            autoridad tan pronto lo detectemos, contándote qué pasó, qué datos
            se vieron afectados y qué estamos haciendo al respecto.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Quién es responsable
          </h2>
          <p className="leading-relaxed">
            El responsable del tratamiento es {LEGAL.fullName}, que presta
            servicios bajo el nombre comercial {LEGAL.tradeName}. Puedes contactarnos por cualquier tema de datos
            personales en{" "}
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
