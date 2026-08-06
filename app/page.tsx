import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { PainPoints } from "@/components/pain-points";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <Process />
        <Pricing />
        <Testimonials />
        <Faq />
        <CtaBand />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </>
  );
}
