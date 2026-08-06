import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24 lg:px-12">
        <div>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
            Contacto
          </p>
          <h2
            id="contacto-titulo"
            className="max-w-sm font-display text-4xl leading-tight95 text-graphite sm:text-5xl"
          >
            Cuéntanos qué está fallando.
          </h2>
          <p className="mt-6 max-w-sm text-graphite/60">
            Completa el formulario y te contactamos dentro de un día hábil
            para coordinar tu diagnóstico gratuito. También puedes escribirnos
            directo por WhatsApp.
          </p>
          <a
            href="https://wa.me/56987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block border-b border-accent text-accent transition-colors duration-200 hover:text-graphite hover:border-graphite"
          >
            +56 9 8765 4321 (WhatsApp)
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
