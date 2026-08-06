"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, CircleAlert, LoaderCircle } from "lucide-react";

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

type FormState = {
  nombre: string;
  empresa: string;
  equipos: string;
  telefono: string;
  correo: string;
  mensaje: string;
};

const EMPTY_FORM: FormState = {
  nombre: "",
  empresa: "",
  equipos: "",
  telefono: "",
  correo: "",
  mensaje: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "loading" | "success" | "error";

const EQUIPOS_OPTIONS = [
  { value: "1-5", label: "1 a 5 equipos" },
  { value: "6-15", label: "6 a 15 equipos" },
  { value: "16-35", label: "16 a 35 equipos" },
  { value: "36+", label: "Más de 36 equipos" },
];

const PHONE_REGEX = /^\+?56?\s?9\s?\d{4}\s?\d{4}$/;

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (form.nombre.trim().length < 2) {
    errors.nombre = "Ingresa tu nombre completo.";
  }

  if (form.empresa.trim().length < 2) {
    errors.empresa = "Ingresa el nombre de tu empresa.";
  }

  if (!form.equipos) {
    errors.equipos = "Selecciona cuántos equipos tiene tu empresa.";
  }

  const telefono = form.telefono.trim();
  if (!telefono) {
    errors.telefono = "Ingresa un teléfono de contacto.";
  } else if (!PHONE_REGEX.test(telefono.replace(/[-.]/g, ""))) {
    errors.telefono = "Ingresa un teléfono válido, ej: +56 9 1234 5678.";
  }

  const correo = form.correo.trim();
  if (!correo) {
    errors.correo = "Ingresa tu correo.";
  } else if (!correo.includes("@")) {
    errors.correo = "El correo necesita un @.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errors.correo = "Revisa el formato del correo, ej: nombre@empresa.cl.";
  }

  if (form.mensaje.trim().length < 10) {
    errors.mensaje = "Cuéntanos brevemente qué necesitas (mínimo 10 caracteres).";
  }

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("No pudimos enviar tu solicitud.");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
      setServerError(
        "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 border border-accent bg-accent/5 p-10"
      >
        <CircleCheck className="h-8 w-8 text-accent" aria-hidden="true" />
        <h3 className="font-display text-2xl text-graphite">
          Recibimos tu solicitud.
        </h3>
        <p className="text-graphite/70">
          Te vamos a escribir dentro de 1 día hábil para coordinar el
          diagnóstico gratuito.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            autoComplete="name"
            value={form.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
          />
          {errors.nombre && (
            <p id="nombre-error" className="text-sm text-red-700">
              {errors.nombre}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            id="empresa"
            name="empresa"
            autoComplete="organization"
            value={form.empresa}
            onChange={(e) => updateField("empresa", e.target.value)}
            aria-invalid={Boolean(errors.empresa)}
            aria-describedby={errors.empresa ? "empresa-error" : undefined}
          />
          {errors.empresa && (
            <p id="empresa-error" className="text-sm text-red-700">
              {errors.empresa}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="equipos">Cantidad de equipos</Label>
          <Select
            value={form.equipos}
            onValueChange={(value) => updateField("equipos", value)}
          >
            <SelectTrigger
              id="equipos"
              aria-invalid={Boolean(errors.equipos)}
              aria-describedby={errors.equipos ? "equipos-error" : undefined}
            >
              <SelectValue placeholder="Selecciona un rango" />
            </SelectTrigger>
            <SelectContent>
              {EQUIPOS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.equipos && (
            <p id="equipos-error" className="text-sm text-red-700">
              {errors.equipos}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            value={form.telefono}
            onChange={(e) => updateField("telefono", e.target.value)}
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={errors.telefono ? "telefono-error" : undefined}
          />
          {errors.telefono && (
            <p id="telefono-error" className="text-sm text-red-700">
              {errors.telefono}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="correo">Correo</Label>
          <Input
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            placeholder="nombre@empresa.cl"
            value={form.correo}
            onChange={(e) => updateField("correo", e.target.value)}
            aria-invalid={Boolean(errors.correo)}
            aria-describedby={errors.correo ? "correo-error" : undefined}
          />
          {errors.correo && (
            <p id="correo-error" className="text-sm text-red-700">
              {errors.correo}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="mensaje">Mensaje</Label>
          <Textarea
            id="mensaje"
            name="mensaje"
            placeholder="Cuéntanos qué te está pasando o qué necesitas resolver."
            value={form.mensaje}
            onChange={(e) => updateField("mensaje", e.target.value)}
            aria-invalid={Boolean(errors.mensaje)}
            aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
          />
          {errors.mensaje && (
            <p id="mensaje-error" className="text-sm text-red-700">
              {errors.mensaje}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-red-700/40 bg-red-700/5 p-4 text-sm text-red-800"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {serverError}
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="sm:w-fit">
        {status === "loading" ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          "Agendar diagnóstico gratuito"
        )}
      </Button>
    </form>
  );
}
