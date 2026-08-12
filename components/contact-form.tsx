"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CircleAlertIcon, CircleCheckIcon, LoaderCircleIcon } from "lucide-react";

import { submitContact } from "@/app/actions/contact";
import {
  createContactSchema,
  equiposOptions,
  type ContactValues,
} from "@/lib/contact-schema";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EMPTY: ContactValues = {
  nombre: "",
  empresa: "",
  equipos: "" as ContactValues["equipos"],
  telefono: "",
  correo: "",
  mensaje: "",
};

export function ContactForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // El esquema se arma por idioma para que los mensajes de error salgan en
  // el idioma que el visitante está leyendo.
  const options = equiposOptions(locale);

  const form = useForm<ContactValues>({
    resolver: zodResolver(createContactSchema(locale)),
    defaultValues: EMPTY,
    mode: "onBlur",
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ContactValues) {
    setServerError(null);

    const result = await submitContact(values);

    if (!result.ok) {
      setServerError(result.error);
      toast.error(result.error);
      return;
    }

    setSent(true);
    form.reset(EMPTY);
    toast.success(dict.form.successTitle);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 border border-accent bg-accent/5 p-10"
      >
        <CircleCheckIcon className="size-8 text-accent" aria-hidden="true" />
        <h3 className="font-display text-2xl">{dict.form.successTitle}</h3>
        <p className="text-muted-foreground">{dict.form.successBody}</p>
        <Button variant="outline" onClick={() => setSent(false)}>
          {dict.form.successAgain}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.name}</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.company}</FormLabel>
                <FormControl>
                  <Input autoComplete="organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="equipos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.units}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={dict.form.unitsPlaceholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.phone}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder={dict.form.phonePlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{dict.form.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder={dict.form.emailPlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mensaje"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{dict.form.message}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={dict.form.messagePlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            <CircleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="sm:w-fit"
        >
          {isSubmitting ? (
            <>
              <LoaderCircleIcon className="animate-spin" aria-hidden="true" />
              {dict.form.submitting}
            </>
          ) : (
            dict.form.submit
          )}
        </Button>
      </form>
    </Form>
  );
}
