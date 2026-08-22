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

## Estilo visual

Referencia: sitios de agencia oscuros y densos, con acento rojo y sans en
negrita.

- Base oscura (`#0d0d10`) con **un bloque claro** en "Cómo trabajamos", para
  cortar la monotonía. Se logra con `.bloque-claro`, que **redefine los tokens**
  en lugar de escribir una regla por elemento.
- Titulares en sans 700 con tracking negativo. Radios amplios (24 px) y rótulos
  de sección como píldora.
- Las fotos van en duotono rojo sobre gris; al pasar el mouse recuperan color.
- **Cinta de servicios** en movimiento continuo tras el hero. La pista lleva el
  contenido dos veces y se desplaza `-50%`: al llegar a la mitad el fotograma es
  idéntico al inicial, así que el bucle no tiene costura. La copia va
  `aria-hidden` para que el lector de pantalla no lea los servicios dos veces.
  Se detiene al pasar el mouse y con `prefers-reduced-motion`.
- **Banda roja** a todo el ancho antes de contacto. Su botón se invierte a
  blanco: el relleno rojo desaparecería sobre el rojo del fondo.

**No se replicaron** las secciones de la referencia que exigen contenido que no
existe: cifras del tipo "230+ proyectos", testimonios, casos de estudio,
portafolio ni logos de clientes. Inventarlos sería publicar afirmaciones falsas
sobre el negocio.

## Paleta

**Dos rojos, y no es capricho.** El rojo de la referencia (`#e8232a`) no sirve
como botón: da 4.46:1 con texto blanco y 4.38:1 con negro — falla en ambos
sentidos porque queda atrapado a media luminosidad.

| Token | Valor | Uso |
| --- | --- | --- |
| `--rojo` | `#d81a22` | Relleno de botón, texto blanco encima (5.1:1) |
| `--acento` | `#ff5a5f` | Texto e iconos sobre oscuro (6.4:1) |
| `--acento` en `.bloque-claro` | `#c0141c` | El coral no rinde sobre fondo claro |

Todos los pares están verificados con una auditoría sobre la página renderizada
que **compone las capas translúcidas** — un fondo con alfa tratado como opaco da
ratios falsos.

## SEO

- `<html lang="es-CL">`, canonical, `robots.txt` y `sitemap.xml`.
- Open Graph y Twitter Card con imagen propia (`assets/img/og-techflow.jpg`,
  1200×630). Sin esto, compartir el enlace por WhatsApp mostraba solo texto
  plano — y en Chile WhatsApp es el canal donde más se comparte.
- JSON-LD `ProfessionalService` con los seis servicios en un `OfferCatalog`.
  Sirve tanto para resultados enriquecidos como para que los buscadores con IA
  puedan citar el sitio sin deducirlo del texto.

**Límite conocido:** es una sola URL para seis servicios distintos. Sirve para
posicionar por marca, pero no para competir por cada servicio por separado.
Eso exige una página por servicio.

## Rendimiento

p5.js pesa 245 KB comprimidos y el fondo es decorativo, así que `sketch.js`
decide si lo descarga. No lo hace cuando el sistema pide menos movimiento, con
ahorro de datos o 2G activos, o bajo 640 px de ancho. En móvil eso son ~1,4 MB
menos. La página se ve y funciona igual, solo sin partículas.

Para reactivarlo en móvil, borra la línea del `matchMedia("(max-width: 640px)")`
en `valeLaPena()`.

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
