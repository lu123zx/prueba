import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo ${site.name} recopila, usa y protege tus datos.`,
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al inicio
      </Link>

      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Política de privacidad
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Última actualización: agosto de 2026
      </p>

      <div className="mt-12 flex flex-col gap-8">
        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Qué datos recopilamos
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Cuando completas el formulario de contacto o nos escribes por
            WhatsApp o correo, recibimos tu nombre, el nombre de tu empresa,
            teléfono, correo electrónico y el contenido del mensaje que nos
            envías. No recopilamos datos de navegación con fines
            publicitarios ni los compartimos con terceros para ese fin.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Para qué los usamos
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Usamos tus datos únicamente para responder tu solicitud, coordinar
            el diagnóstico gratuito y, si contratas nuestros servicios,
            entregarte soporte técnico. Si nos autorizas expresamente, también
            podemos escribirte para contarte sobre nuevos servicios.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Dónde se guardan
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Tus datos se almacenan en sistemas con acceso restringido al
            equipo de {site.name} que necesita contactarte. Nunca vendemos ni
            arrendamos tu información a otras empresas.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Tus derechos
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Puedes pedirnos en cualquier momento que te mostremos, corrijamos
            o eliminemos los datos que tenemos sobre ti, escribiendo a{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-primary underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
