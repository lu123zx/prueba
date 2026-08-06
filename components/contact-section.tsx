"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { submitContact } from "@/app/actions/contact";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { site, whatsappUrl } from "@/lib/site-config";

const deviceRanges = ["1-10", "11-25", "26-50", "50+"] as const;

export function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", phone: "", email: "", message: "" },
  });

  const onSubmit = (data: ContactInput) => {
    startTransition(async () => {
      const result = await submitContact(data);
      if (result.ok) {
        setSent(true);
        reset();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <section id="contacto" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Columna informativa */}
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Contacto"
              title="Cuéntanos qué está fallando."
              description="Completa el formulario y te contactamos dentro de un día hábil para coordinar tu diagnóstico gratuito de 30 minutos. Sin compromiso y sin letra chica."
            />

            <ul className="mt-10 space-y-4">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-soft flex items-center gap-4 rounded-2xl bg-card p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <MessageCircle aria-hidden className="size-5" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">{site.phone}</span>
                    <span className="block text-muted-foreground">
                      WhatsApp — respuesta más rápida
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="card-soft flex items-center gap-4 rounded-2xl bg-card p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Mail aria-hidden className="size-5" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">{site.email}</span>
                    <span className="block text-muted-foreground">Correo comercial</span>
                  </span>
                </a>
              </li>
              <li className="card-soft flex items-center gap-4 rounded-2xl bg-card p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <MapPin aria-hidden className="size-5" />
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{site.address.street}</span>
                  <span className="block text-muted-foreground">
                    {site.address.district}, {site.address.city}
                  </span>
                </span>
              </li>
            </ul>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={120}>
            <div className="card-soft rounded-2xl bg-card p-6 sm:p-8">
              {sent ? (
                <div className="flex min-h-80 flex-col items-center justify-center text-center">
                  <CheckCircle2 className="size-12 text-primary" />
                  <h3 className="mt-5 text-xl font-semibold">Solicitud enviada</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Te contactamos dentro de un día hábil para coordinar el diagnóstico.
                    Si es urgente, escríbenos directo por WhatsApp.
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                    Enviar otra solicitud
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Nombre" error={errors.name?.message}>
                      <Input
                        id="name"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                      />
                    </Field>

                    <Field id="company" label="Empresa" error={errors.company?.message}>
                      <Input
                        id="company"
                        autoComplete="organization"
                        placeholder="Nombre de tu empresa"
                        aria-invalid={!!errors.company}
                        {...register("company")}
                      />
                    </Field>
                  </div>

                  <Field
                    id="devices"
                    label="Cantidad de equipos"
                    error={errors.devices?.message}
                  >
                    <Select
                      onValueChange={(v) =>
                        setValue("devices", v as ContactInput["devices"], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger id="devices" className="w-full">
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range} equipos
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="phone" label="Teléfono" error={errors.phone?.message}>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+56 9 ..."
                        aria-invalid={!!errors.phone}
                        {...register("phone")}
                      />
                    </Field>

                    <Field id="email" label="Correo" error={errors.email?.message}>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="tu@empresa.cl"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                      />
                    </Field>
                  </div>

                  <Field id="message" label="Mensaje" error={errors.message?.message}>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Cuéntanos qué está fallando o qué necesitas resolver."
                      aria-invalid={!!errors.message}
                      {...register("message")}
                    />
                  </Field>

                  <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                    {isPending && <Loader2 className="size-4 animate-spin" />}
                    {isPending ? "Enviando..." : "Agendar diagnóstico gratuito"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Usamos tus datos solo para contactarte. Nada de spam.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
