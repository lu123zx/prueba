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
  title: "Términos de servicio",
  description:
    "Condiciones de contratación de TechFlow Soluciones: planes mensuales en UF, sin contrato anual forzoso y con las licencias a nombre de tu empresa.",
  alternates: {
    canonical: routePath("es", "terms"),
    languages: {
      "es-CL": routePath("es", "terms"),
      en: routePath("en", "terms"),
      "x-default": routePath("es", "terms"),
    },
  },
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
            nube y similares) no están incluidas en el valor del plan y no se
            revenden a través nuestro: se contratan directamente a nombre de tu
            empresa y con tu medio de pago, de modo que el proveedor te cobra a
            ti sin intermediarios ni recargo. Nosotros te asesoramos sobre qué
            contratar y administramos esas licencias dentro del plan.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Quién presta el servicio
          </h2>
          <p className="leading-relaxed">
            {LEGAL.tradeName} es el nombre comercial bajo el que{" "}
            {LEGAL.fullName} presta estos servicios como persona natural. No se trata de una sociedad. El servicio se
            documenta con boleta de honorarios electrónica, que está exenta de
            IVA; si tu empresa tributa en primera categoría, debe practicar la
            retención de segunda categoría vigente al momento de la emisión.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Responsabilidad
          </h2>
          <p className="leading-relaxed">
            Respondemos por la calidad del trabajo que realizamos sobre tus
            sistemas, con la diligencia propia de un prestador profesional. No
            respondemos por fallas de proveedores externos (tu compañía de
            internet, el fabricante de un equipo, un servicio en la nube de un
            tercero), aunque te ayudamos a gestionarlas.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong className="font-medium text-foreground">
              Límite de responsabilidad.
            </strong>{" "}
            Salvo dolo o culpa grave de nuestra parte, nuestra responsabilidad
            total por cualquier hecho relacionado con este servicio no excederá
            el monto efectivamente pagado por tu empresa en los tres meses
            anteriores al hecho que motiva el reclamo. No respondemos por lucro
            cesante, pérdida de negocios o de utilidades esperadas, ni por
            perjuicios indirectos.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong className="font-medium text-foreground">
              Respaldos.
            </strong>{" "}
            Configuramos, monitoreamos y probamos periódicamente los respaldos
            que estén dentro del plan contratado. Tu empresa mantiene la
            responsabilidad final sobre sus datos y sobre autorizar el alcance
            de los respaldos que se implementen.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong className="font-medium text-foreground">
              Plazos de respuesta.
            </strong>{" "}
            Los plazos indicados en los planes se cuentan en horario hábil
            (lunes a viernes, de 9:00 a 18:00, excluyendo festivos) desde que
            recibimos el aviso por los canales acordados. Son plazos de primera
            respuesta, no de solución: el tiempo de solución depende de la
            naturaleza de la falla y de terceros que no controlamos.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Accesos y confidencialidad
          </h2>
          <p className="leading-relaxed">
            Para dar soporte necesitamos accesos a tus sistemas. Los usamos
            solo para prestar el servicio contratado, se conectan con el
            conocimiento de la persona que usa el equipo y se eliminan al
            terminar la relación. Mantenemos en reserva toda la información de
            tu empresa a la que accedamos, sin límite de tiempo.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-foreground">
            Reclamos y ley aplicable
          </h2>
          <p className="leading-relaxed">
            Si algo sale mal, escríbenos primero a{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-accent underline underline-offset-4"
            >
              {SITE.email}
            </a>{" "}
            y tienes respuesta dentro de 5 días hábiles. Estos términos se rigen
            por la ley chilena y cualquier controversia se somete a los
            tribunales ordinarios de Santiago. Si tu empresa califica como micro
            o pequeña empresa, conservas además los derechos que te da la Ley
            19.496 por aplicación del artículo 9 de la Ley 20.416.
          </p>
        </section>
      </div>
    </main>
  );
}
