import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { FaqSchema, PricingSchema } from "@/components/structured-data";
import { EQUIPOS_DEFAULT, PLANS } from "@/lib/pricing";
import { getRates } from "@/lib/rates";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Services } from "@/components/services";
import { HowWeWork } from "@/components/how-we-work";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  // UF y dólar del día. Se revalida cada 24 horas, así que la página sigue
  // sirviéndose estática y no pide nada en cada visita.
  const rates = await getRates(lang);

  return (
    <>
      <Header dict={dict} locale={lang} />
      <main>
        <Hero dict={dict} />
        <Problem dict={dict} />
        <Services dict={dict} locale={lang} />
        <HowWeWork dict={dict} />
        <Pricing dict={dict} locale={lang} rates={rates} />
        <Testimonials dict={dict} />
        <Faq dict={dict} />
        <FinalCta dict={dict} />
        <Contact dict={dict} locale={lang} />
      </main>
      <Footer dict={dict} locale={lang} />

      <PricingSchema
        plans={PLANS}
        dict={dict}
        locale={lang}
        ufClp={rates.ufClp}
        equiposReferencia={EQUIPOS_DEFAULT}
      />
      <FaqSchema faqs={dict.faq.items} locale={lang} />
    </>
  );
}
