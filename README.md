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
