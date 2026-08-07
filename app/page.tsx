import { Header } from "@/components/header";
import { FaqSchema, PricingSchema } from "@/components/structured-data";
import { FAQS } from "@/components/faq";
import { PLANS } from "@/components/pricing";
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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Services />
        <HowWeWork />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />

      <PricingSchema plans={PLANS} />
      <FaqSchema faqs={FAQS} />
    </>
  );
}
