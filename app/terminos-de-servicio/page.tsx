import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description: `Condiciones bajo las que ${site.name} presta sus servicios.`,
};

export default function TerminosDeServicio() {
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
        Términos de servicio
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Última actualización: agosto de 2026
      </p>

      <div className="mt-12 flex flex-col gap-8">
        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Contratación
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            El diagnóstico inicial es gratuito y no obliga a contratar
            ningún plan. Si decides contratar, te enviamos una propuesta
            por escrito con el precio mensual, los servicios incluidos y la
            fecha de inicio, antes de cobrarte nada.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Duración y término
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Nuestros planes son mensuales y sin contrato anual forzoso.
            Puedes terminar el servicio avisando con 30 días de anticipación.
            Al finalizar, te entregamos todos los accesos, respaldos y
            documentación de tus sistemas.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Propiedad de tus datos y licencias
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Los dominios, licencias de software y cuentas que gestionamos
            para ti quedan siempre registrados a nombre de tu empresa, nunca
            a nombre de {site.name}.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Responsabilidad
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
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
