import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <Services />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
