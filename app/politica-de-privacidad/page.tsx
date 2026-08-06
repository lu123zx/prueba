import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de privacidad — TechFlow Soluciones",
  description: "Cómo TechFlow Soluciones recopila, usa y protege tus datos.",
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 lg:px-0 lg:py-32">
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-2 text-sm text-graphite/60 transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver al inicio
      </Link>

      <h1 className="font-display text-4xl leading-tight95 text-graphite sm:text-5xl">
        Política de privacidad
      </h1>
      <p className="mt-4 text-sm text-graphite/50">
        Última actualización: agosto de 2026
      </p>

      <div className="mt-12 flex flex-col gap-8 text-graphite/75">
        <section>
          <h2 className="mb-3 font-display text-2xl text-graphite">
            Qué datos recopilamos
          </h2>
          <p className="leading-relaxed">
            Cuando completas el formulario de contacto o nos escribes por
            WhatsApp o correo, recibimos tu nombre, el nombre de tu empresa,
            teléfono, correo electrónico y el contenido del mensaje que nos
            envías. No recopilamos datos de navegación con fines
            publicitarios ni los compartimos con terceros para ese fin.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-graphite">
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
          <h2 className="mb-3 font-display text-2xl text-graphite">
            Dónde se guardan
          </h2>
          <p className="leading-relaxed">
            Tus datos se almacenan en sistemas con acceso restringido al
            equipo de TechFlow que necesita contactarte. Nunca vendemos ni
            arrendamos tu información a otras empresas.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-graphite">
            Tus derechos
          </h2>
          <p className="leading-relaxed">
            Puedes pedirnos en cualquier momento que te mostremos, corrijamos
            o eliminemos los datos que tenemos sobre ti, escribiendo a{" "}
            <a
              href="mailto:contacto@techflowsoluciones.cl"
              className="text-accent underline underline-offset-4"
            >
              contacto@techflowsoluciones.cl
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
