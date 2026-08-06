# TechFlow Soluciones — Landing page

Landing page de TechFlow Soluciones, empresa chilena de servicios tecnológicos
para pymes. Construida con Next.js 14 (App Router), TypeScript, Tailwind CSS v4
y componentes shadcn/ui.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS v4** con tokens de diseño en `app/globals.css` (paleta grafito + acento cian, `oklch`, soporte dark mode)
- **shadcn/ui** (Radix UI + CVA) para acordeón, select, botón, input, label, textarea y toasts (`sonner`)
- **React Hook Form + Zod** para el formulario de contacto, validado con una Server Action
- Tipografía: Geist Sans + Geist Mono, vía el paquete `geist`
- Animaciones de scroll (`components/reveal.tsx`) y contadores animados (`components/counter.tsx`) sin librerías externas

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

- `app/page.tsx` — ensambla todas las secciones de la landing
- `app/actions/contact.ts` — Server Action que procesa el formulario de contacto
- `lib/site-config.ts` — todos los datos del negocio (contacto, planes, FAQ, testimonios); no hay datos duros en los componentes
- `lib/contact-schema.ts` — esquema Zod del formulario, compartido entre cliente y Server Action
- `components/` — una sección por archivo (header, hero, servicios, planes, contacto, etc.)
- `components/ui/` — primitivas de shadcn/ui adaptadas a la identidad visual

## Pendiente antes de producción

- **Envío real del formulario**: `app/actions/contact.ts` solo hace `console.log`. Reemplazar por Resend o una inserción en Supabase.
- **Imagen Open Graph**: falta `app/opengraph-image.tsx` (o `public/og.jpg` 1200×630).
- **Testimonios**: verificar que los nombres sean reales antes de publicar.

## Build de producción

```bash
npm run build
npm run start
```
