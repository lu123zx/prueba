# TechFlow Soluciones — Landing page

Landing page de TechFlow Soluciones, empresa chilena de servicios tecnológicos
para pymes. Construida con Next.js 14 (App Router), TypeScript, Tailwind CSS
y componentes shadcn/ui.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** con tokens de diseño propios (bone, graphite, acento verde)
- **shadcn/ui** (Radix UI + CVA) para acordeón, select, botón, input, label
- Tipografía: Instrument Serif (titulares) + Inter (cuerpo), vía `next/font/google`

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

- `app/page.tsx` — ensambla todas las secciones de la landing
- `app/api/contacto/route.ts` — endpoint del formulario de contacto
- `components/` — una sección por archivo (header, hero, servicios, planes, etc.)
- `components/ui/` — primitivas de shadcn/ui adaptadas a la identidad visual

## Build de producción

```bash
npm run build
npm run start
```
