# TechFlow Soluciones — landing page

Sitio de una sola página para **techflowsoluciones.com**. HTML, CSS y JavaScript
puros, con [p5.js](https://p5js.org/) como motor visual del fondo animado del
hero. Sin frameworks, sin build step: se abre `index.html` y funciona.

## Estructura

```
index.html              markup completo de la página
style.css               estilos (fondo blanco + acento rojo)
sketch.js               animación de fondo con p5.js (solo en el hero)
main.js                 menú, scroll, header y formulario
assets/vendor/p5.min.js p5.js auto-alojado (v1.11.2)
assets/img/             imagen de Open Graph
```

Las fotos de los seis servicios **no están en el repo**: van hotlinked al CDN
de Unsplash. Ver la sección [Imágenes](#imágenes) más abajo — no es un olvido,
es lo que exige el API de Unsplash.

## Ver el sitio

Abrir `index.html` directamente funciona, pero es mejor servirlo para que las
rutas relativas se comporten igual que en producción:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Sobre el stack

Este proyecto usa HTML/CSS/JS plano a propósito, **no** el stack canónico
Next.js + Tailwind v4 + shadcn/ui de la skill `frontend-v0`. Es una decisión
deliberada, no un descuido: el sitio ya estaba en producción como HTML
estático cuando se pidió cargar esa skill, y migrar el framework de un sitio
en vivo es un proyecto aparte — no algo que se cuela dentro de un pedido de
"cambia el color y reescribe el copy". Si en algún momento se quiere pasar a
Next.js, es un trabajo con su propio plan, no un efecto colateral.

## Estilo visual

Base **blanca**, acento **rojo único** (`#c0141c`) para texto, íconos y
botones. Sin negro en ningún fondo de sección — fue un pedido explícito del
cliente tras probar una versión oscura.

- **Un solo rojo hace todo el trabajo.** A diferencia de una paleta oscura
  (donde hacían falta dos tonos de rojo porque ninguno pasaba el contraste en
  ambos roles), sobre fondo blanco `#c0141c` sirve **a la vez** como relleno de
  botón con texto blanco (6.25:1) y como color de texto o ícono (6.25:1). Un
  token, dos usos, sin excepciones.
- **Cinta de servicios** en movimiento continuo tras el hero. La pista lleva
  el contenido dos veces y se desplaza `-50%`: al llegar a la mitad el
  fotograma es idéntico al inicial, así que el bucle no tiene costura. La
  copia va `aria-hidden` para que el lector de pantalla no lea los servicios
  dos veces. Se detiene al pasar el mouse y con `prefers-reduced-motion`.
- **Banda roja** a todo el ancho entre servicios y "Cómo trabajamos". Su botón
  se invierte a blanco: el relleno rojo desaparecería sobre el fondo rojo.
- **FAQ como `<details>`/`<summary>` nativos** — accesibles y con teclado sin
  una línea de JavaScript adicional.

**No se fabricó contenido de prueba social.** Ni cifras tipo "230+ proyectos",
ni testimonios, ni logos de clientes, ni casos de estudio. Publicar eso sin
que sea real es mentirle al visitante.

## Servicios

El orden en la página **no es alfabético ni por complejidad técnica**: es el
orden de venta pedido — el servicio más fácil de entender primero, para
enganchar, y los más técnicos después:

1. Soporte TI gestionado
2. Automatización de procesos
3. Infraestructura en la nube
4. Herramientas propias (en vez de licencias mensuales)
5. Modernización de sistemas antiguos
6. Optimización de costos en la nube

Los títulos de servicio nunca nombran la tecnología de fondo (Terraform,
Docker, n8n): esas herramientas aparecen solo en el cuerpo, como respaldo
técnico. El cliente PyME compra el resultado, no el nombre del software.

## Imágenes

Las seis fotos de servicios se sirven **directamente desde el CDN de
Unsplash** (`images.unsplash.com`), no descargadas al repo. Esto es al revés
de lo habitual en este proyecto (las fotos anteriores sí se autoalojaban), y
es intencional: las **Directrices de la API de Unsplash** exigen enlazar
("hotlink") a la URL que entrega la API en vez de descargar y redistribuir la
imagen desde un servidor propio. Como estas se eligieron con el buscador de
Unsplash, corresponde hotlink.

| Servicio | Foto | Autor |
| --- | --- | --- |
| Soporte TI gestionado | Técnico revisando racks | Unsplash |
| Automatización de procesos | Panel de monitoreo | Stephen Dawson (@dawson2406) |
| Infraestructura en la nube | Ventiladores de centro de datos | Winston Chen (@winstonchen) |
| Herramientas propias | Monitor sobre escritorio blanco | Boitumelo (@writecodenow) |
| Modernización de sistemas | Computador retro Commodore Amiga | Unsplash |
| Optimización de costos | Monedas doradas apiladas | Ibrahim Rifath (@ripey__) |

Licencia: [Unsplash License](https://unsplash.com/license) — uso comercial
libre, atribución no obligatoria pero apreciada (por eso la tabla de arriba).

**Consecuencia práctica:** estas imágenes no se pueden verificar visualmente
desde este entorno de desarrollo (su proxy de red bloquea `images.unsplash.com`
por política), así que el layout se validó con el `alt` visible y sin la
imagen cargada. En producción (Vercel, o cualquier navegador normal) el CDN de
Unsplash es públicamente accesible y las fotos cargan sin problema — conviene
confirmarlo una vez desplegado.

La imagen de Open Graph (`assets/img/og-techflow.jpg`) sí está autoalojada:
es generada, no de banco.

## SEO

- `<html lang="es-CL">`, canonical, `robots.txt` y `sitemap.xml`.
- Open Graph y Twitter Card con imagen propia (`assets/img/og-techflow.jpg`,
  1200×630). Sin esto, compartir el enlace por WhatsApp muestra solo texto
  plano — y en Chile WhatsApp es el canal donde más se comparte un enlace de
  negocio.
- JSON-LD `ProfessionalService` con los seis servicios en un `OfferCatalog`.

**Límite conocido:** es una sola URL para seis servicios distintos. Sirve para
posicionar por marca, pero no para competir por cada servicio por separado.
Eso exigiría una página por servicio.

## Rendimiento

p5.js pesa 245 KB comprimidos y el fondo es decorativo, así que `sketch.js`
decide si lo descarga: no lo hace con movimiento reducido, ahorro de datos, 2G
activo o bajo 640 px de ancho. La página se ve y funciona igual, solo sin
partículas.

El lienzo además vive **solo detrás del hero**, no en toda la página — evita
que la animación se lea como ruido sobre las demás secciones.

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

## Pendiente antes de publicar

- [ ] **Teléfono**: en `index.html` está como `[+56 9 XXXX XXXX]`, en cursiva
      gris para que no se publique por descuido.
- [ ] **Formulario de contacto**: hoy solo valida en el navegador y muestra un
      aviso. No envía nada. Falta conectarlo a un endpoint o a un servicio tipo
      Formspree.
- [ ] **Redes sociales**: los tres enlaces del footer apuntan a `#`.
- [ ] **Páginas legales**: aviso legal, política de privacidad y términos de
      servicio son placeholders.
- [ ] **Imágenes de Unsplash**: confirmar visualmente en producción (ver
      sección Imágenes).

## Accesibilidad

HTML semántico, enlace de salto al contenido, foco visible en todo lo
interactivo, navegación completa por teclado, FAQ con `<details>` nativo,
objetivos táctiles de 44 px o más y `alt` descriptivo en todas las imágenes.
Contraste verificado con una auditoría automatizada sobre la página ya
renderizada (no solo sobre la tabla de tokens): todo el texto cumple WCAG AA.
