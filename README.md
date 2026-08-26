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
api/contacto.js         función serverless: recibe el formulario y envía con Resend
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

Más una sección aparte, **Creación de páginas web**, con su propia rejilla de
seis ítems (sitios corporativos, tiendas en línea, portales con login, paneles
de administración, formularios y diseño móvil).

Los títulos de servicio nunca nombran la tecnología de fondo: ni las de
infraestructura (Terraform, Docker) ni las del stack con que se construyen los
sitios web. El cliente PyME compra el resultado, no el nombre del software —
y saber con qué herramienta se hace el trabajo no le aporta nada a su decisión
de compra.

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

Y las seis de la sección de páginas web:

| Ítem | Foto | Autor |
| --- | --- | --- |
| Sitios corporativos | Escritorio con portátil y monitor | Domenico Loia (@domenicoloia) |
| Tiendas en línea | Tarjeta bancaria frente a un portátil | rupixen (@rupixen) |
| Portales con login | Huella digital sobre lector | George Prentzas (@georgeprentzas) |
| Paneles de administración | Gráficos de panel en un portátil | Luke Chesser (@lukechesser) |
| Formularios y reservas | Calendario con chinches rojas | Towfiqu barbhuiya (@towfiqu999999) |
| Diseño móvil | Persona sosteniendo un teléfono | NordWood Themes (@nordwood) |

Licencia: [Unsplash License](https://unsplash.com/license) — uso comercial
libre, atribución no obligatoria pero apreciada (por eso las tablas de arriba).

**Descartada a propósito:** la mejor coincidencia para "portales con login" era
una captura de la pantalla de acceso de Facebook. Marca ajena en el sitio de un
cliente, así que se usó una huella digital genérica en su lugar.

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

Las partículas van en el **rojo de marca**. Los nodos usan el rojo pleno
(`#c0141c`) y los enlaces un rojo más claro: con ambos al mismo tono la malla
se empasta y compite con el titular del hero. Las opacidades se bajaron
respecto de la versión en gris, porque el rojo pleno pesa visualmente más.

## Formulario de contacto

El formulario envía a `/api/contacto`, una **función serverless de Vercel** que
llama a la API de Resend.

### Por qué hay un backend en un sitio estático

Porque la API key de Resend **no puede estar en el navegador**. Si el `fetch` a
Resend se hiciera desde `main.js`, la key viajaría al cliente y cualquiera
podría abrir el inspector, copiarla y enviar correos firmados como
`techflowsoluciones.com`. La key solo se lee en el servidor, desde
`process.env.RESEND_API_KEY`.

### Sin dependencias

`api/contacto.js` usa `fetch` contra la API REST de Resend en vez del SDK
oficial. Instalar el SDK obligaría a agregar `package.json` y un paso de
instalación — justo lo que este proyecto evita — y sería traer una dependencia
entera para hacer un `POST`.

### Configuración (una sola vez)

1. En [resend.com/api-keys](https://resend.com/api-keys) crea una API key con
   permiso de **envío**.
2. En Vercel: **Project → Settings → Environment Variables**
   - Nombre: `RESEND_API_KEY`
   - Valor: la key
   - Entornos: Production, Preview y Development
3. **Redespliega.** Las variables de entorno no se aplican solas a los deploys
   que ya existen.

> La key nunca se escribe en el repo ni se pega en un chat. Si alguna vez se
> expone, se rota en el panel de Resend.

El dominio `techflowsoluciones.com` ya está **verificado** en Resend (región
`sa-east-1`), así que se puede enviar desde cualquier dirección de ese dominio.

### Cómo funciona el correo

- **De:** `formulario@techflowsoluciones.com` — una dirección del dominio
  verificado, no la del visitante. Poner al visitante en el `from` haría fallar
  SPF y DKIM, y el correo terminaría en spam.
- **Para:** `contacto@techflowsoluciones.com`
- **Responder a:** el correo del visitante. Así, al apretar Responder, la
  respuesta le llega a él y no al propio buzón del formulario.

### Anti-spam

Un campo honeypot (`sitio_web`) oculto fuera de pantalla y fuera del recorrido
de teclado. Una persona no lo ve; un bot que rellena todo, sí. Cuando viene con
contenido, la función responde **200 sin enviar nada**: si devolviera un error,
el bot sabría que fue detectado y probaría otra vía.

No hay límite de frecuencia por IP. Si empieza a llegar spam pese al honeypot,
ese es el siguiente paso.

### Si el endpoint no existe

`main.js` revisa el `content-type` de la respuesta antes de parsearla. Si el
sitio se sirve como estático puro sin funciones, el 404 devuelve HTML y no
JSON; en vez de reventar con un error críptico, muestra el aviso con el correo
directo como enlace. Probado.

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
- [ ] **Formulario de contacto**: el código está listo, pero no envía hasta que
      `RESEND_API_KEY` esté configurada en Vercel (ver arriba).
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
