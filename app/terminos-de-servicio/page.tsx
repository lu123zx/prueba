import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Condiciones de contratación de TechFlow Soluciones: planes mensuales en UF, sin contrato anual forzoso y con las licencias a nombre de tu empresa.",
  alternates: { canonical: "/terminos-de-servicio" },
};

export default function TerminosDeServicio() {
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
        Términos de servicio
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Última actualización: agosto de 2026
      </p>

      <div className="mt-12 flex flex-col gap-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Contratación
          </h2>
          <p className="leading-relaxed">
            El diagnóstico inicial es gratuito, se hace por videollamada y no
            obliga a contratar ningún plan. Si decides contratar, te enviamos
            una propuesta por escrito con el precio mensual en UF, los
            servicios incluidos, las licencias que se facturan aparte y la
            fecha de inicio, antes de cobrarte nada.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Duración y término
          </h2>
          <p className="leading-relaxed">
            Nuestros planes son mensuales y sin contrato anual forzoso.
            Puedes terminar el servicio avisando con 30 días de anticipación.
            Al finalizar, te entregamos todos los accesos, respaldos y
            documentación de tus sistemas.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Propiedad de tus datos y licencias
          </h2>
          <p className="leading-relaxed">
            Los dominios, licencias de software y cuentas que gestionamos
            para ti quedan siempre registrados a nombre de tu empresa, nunca
            a nombre de TechFlow.
          </p>
          <p className="mt-4 leading-relaxed">
            Las licencias de terceros (Microsoft 365, antivirus, respaldo en la
            nube y similares) no están incluidas en el valor del plan. Se
            facturan aparte, al precio de costo que nos cobra el proveedor y en
            una línea separada de la factura. Su valor puede cambiar si el
            proveedor ajusta sus precios; te avisamos antes de que ocurra.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Responsabilidad
          </h2>
          <p className="leading-relaxed">
            Respondemos por la calidad del trabajo que realizamos sobre tus
            sistemas. No respondemos por fallas de proveedores externos
            (como tu compañía de internet o el fabricante de un equipo),
            aunque te ayudamos a gestionarlas.
          </p>
        </section>
      </div>
    </main>
  );
}
