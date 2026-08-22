# TechFlow Soluciones — landing page

Sitio de una sola página para **techflowsoluciones.com**. HTML, CSS y JavaScript
puros, con [p5.js](https://p5js.org/) como motor visual del fondo animado. Sin
frameworks, sin build step: se abre `index.html` y funciona.

## Estructura

```
index.html              markup completo de la página
style.css               estilos (paleta oscura + acento dorado)
sketch.js               animación de fondo con p5.js
main.js                 menú, scroll, header y formulario
assets/vendor/p5.min.js p5.js auto-alojado (v1.11.2)
assets/img/             fotografías optimizadas
```

## Ver el sitio

Abrir `index.html` directamente funciona, pero es mejor servirlo para que las
rutas relativas se comporten igual que en producción:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Decisiones técnicas

- **p5.js auto-alojado** en vez de CDN. El sitio no depende de que un tercero
  esté arriba, y funciona sin conexión. Si prefieres el CDN, la URL está
  comentada junto a la etiqueta `<script>` en `index.html`.
- **Si p5 no carga**, `sketch.js` detecta que falta y deja el resto del sitio
  intacto: el fondo es decorativo, nunca un requisito para leer la página.
- **La animación se detiene sola** cuando la pestaña deja de estar visible y
  cuando el sistema pide `prefers-reduced-motion: reduce`.
- **Tipografía del sistema** (Inter → Segoe UI → system-ui). No se cargan
  fuentes externas, así no hay una segunda dependencia de red.
- **Duotono por CSS** sobre las fotos: vienen de autores distintos y el filtro
  las deja como un solo set coherente con la paleta.

## Paleta

Fondo hueso cálido (`#f7f6f3`), acento **petróleo** (`#0e5a56`) y el dorado
(`#e0a800`) reservado para los botones.

La regla que ordena todo: **el dorado nunca es texto.** Sobre este fondo da
1.99:1 de contraste, muy por debajo del mínimo AA de 4.5:1. Funciona como
relleno de botón con texto casi negro encima (8.5:1), pero como color de letra
o de icono es ilegible. Por eso los rótulos, iconos y viñetas usan petróleo.

Todos los pares texto/fondo están verificados contra WCAG AA, incluida una
auditoría sobre la página ya renderizada, no solo sobre la tabla de tokens.

Las fotos llevan un duotono en clave alta: escala de grises con el contraste
comprimido y un velo petróleo suave. Varias son casi negras de origen, y sin
comprimir el contraste quedaban como bloques oscuros sobre un fondo claro. Al
pasar el mouse recuperan color.

## Despliegue

El sitio se publica en Vercel. Como no hay `package.json` ni build step, el
`vercel.json` de la raíz desactiva explícitamente el framework y los comandos
de build e instalación:

```json
{ "framework": null, "buildCommand": null, "installCommand": null, "outputDirectory": null }
```

Esto es necesario porque el proyecto en Vercel venía configurado con el preset
de **Next.js**, de cuando el repo era una app Next. Al quedar sin
`package.json`, ese preset hacía fallar el build. Lo que está en `vercel.json`
tiene precedencia sobre la configuración del panel, así que el arreglo viaja
con el repo y no depende de que alguien recuerde tocar los ajustes.

Si algún día se agrega un build step, hay que actualizar este archivo.

## Imágenes

Todas provienen de [Pexels](https://www.pexels.com/) (licencia libre, uso
comercial sin atribución obligatoria). Están recortadas y recomprimidas: las
originales pesaban 20 MB en total, en el repo ocupan menos de 1 MB.

## Pendiente antes de publicar

- [ ] **Teléfono y ubicación**: en `index.html` están como `[+56 9 XXXX XXXX]` y
      `[ciudad, país]`. Se muestran en cursiva gris para que no se publiquen por
      descuido.
- [ ] **Formulario de contacto**: hoy solo valida en el navegador y muestra un
      aviso. No envía nada. Falta conectarlo a un endpoint o a un servicio tipo
      Formspree.
- [ ] **Redes sociales**: los tres enlaces del footer apuntan a `#`.
- [ ] **Páginas legales**: aviso legal, política de privacidad y términos de
      servicio son placeholders.
- [ ] **Subpuntos de servicios**: se redactaron como descripción de alcance. Si
      tienes el listado original definitivo, hay que reemplazarlos.

## Accesibilidad

HTML semántico, enlace de salto al contenido, foco visible en todo lo
interactivo, navegación completa por teclado (incluidas las tarjetas de
servicio), objetivos táctiles de 44 px o más y `alt` descriptivo en todas las
imágenes.
