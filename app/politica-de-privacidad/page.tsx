import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  // Sin la marca: la plantilla del layout ya la agrega.
  title: "Política de privacidad",
  description:
    "Qué datos recopila TechFlow Soluciones cuando nos contactas, para qué los usamos y cómo pedir que los eliminemos.",
  alternates: { canonical: "/politica-de-privacidad" },
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
            WhatsApp o correo, recibimos tu nombre, el nombre de tu empresa,
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
            Tus datos se almacenan en sistemas con acceso restringido al
            equipo de TechFlow que necesita contactarte. Nunca vendemos ni
            arrendamos tu información a otras empresas.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
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
