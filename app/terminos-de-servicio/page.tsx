import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos de servicio — TechFlow Soluciones",
  description: "Condiciones bajo las que TechFlow Soluciones presta sus servicios.",
};

export default function TerminosDeServicio() {
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
        Términos de servicio
      </h1>
      <p className="mt-4 text-sm text-graphite/50">
        Última actualización: agosto de 2026
      </p>

      <div className="mt-12 flex flex-col gap-8 text-graphite/75">
        <section>
          <h2 className="mb-3 font-display text-2xl text-graphite">
            Contratación
          </h2>
          <p className="leading-relaxed">
            El diagnóstico inicial es gratuito y no obliga a contratar
            ningún plan. Si decides contratar, te enviamos una propuesta
            por escrito con el precio mensual, los servicios incluidos y la
            fecha de inicio, antes de cobrarte nada.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-graphite">
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
          <h2 className="mb-3 font-display text-2xl text-graphite">
            Propiedad de tus datos y licencias
          </h2>
          <p className="leading-relaxed">
            Los dominios, licencias de software y cuentas que gestionamos
            para ti quedan siempre registrados a nombre de tu empresa, nunca
            a nombre de TechFlow.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-graphite">
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
