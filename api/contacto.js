/* ============================================================
   api/contacto.js — Función serverless de Vercel
   Recibe el formulario de contacto y envía el correo con Resend.

   POR QUÉ EXISTE ESTE ARCHIVO:
   La API key de Resend NO puede vivir en el JavaScript del
   navegador. Cualquiera abriría el inspector, la copiaría y
   mandaría correos firmados como techflowsoluciones.com. La key
   solo se lee acá, en el servidor, desde una variable de entorno.

   Sin dependencias: se usa fetch contra la API REST de Resend en
   vez del SDK, porque el proyecto no tiene package.json ni build
   step y no queremos agregar ninguno de los dos por un POST.
   ============================================================ */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// El dominio está verificado en Resend, así que se puede enviar desde
// cualquier dirección @techflowsoluciones.com.
const DESTINO = "contacto@techflowsoluciones.com";
const REMITENTE = "Formulario web <formulario@techflowsoluciones.com>";

const LIMITES = { nombre: 120, email: 200, mensaje: 5000 };

/** Escapa HTML: el mensaje del visitante se incrusta en un correo HTML. */
function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Validación mínima de forma. No pretende validar que el buzón exista. */
function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido." });
  }

  // Vercel ya parsea el body cuando el content-type es JSON, pero si llega
  // como string (otro content-type, o un cliente que no lo declara) hay que
  // parsearlo a mano en vez de reventar.
  let datos = req.body;
  if (typeof datos === "string") {
    try {
      datos = JSON.parse(datos);
    } catch {
      return res.status(400).json({ ok: false, error: "Formato inválido." });
    }
  }
  if (!datos || typeof datos !== "object") {
    return res.status(400).json({ ok: false, error: "Formato inválido." });
  }

  const nombre = String(datos.nombre || "").trim();
  const email = String(datos.email || "").trim();
  const mensaje = String(datos.mensaje || "").trim();
  const trampa = String(datos.sitio_web || "").trim();

  /* Honeypot: el campo "sitio_web" está oculto por CSS, así que una persona
     nunca lo llena. Si viene con algo, es un bot. Se responde 200 a propósito:
     si devolviéramos un error, el bot sabría que fue detectado y probaría otra
     forma. Así cree que funcionó y se va. */
  if (trampa) {
    return res.status(200).json({ ok: true });
  }

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ ok: false, error: "Faltan datos por completar." });
  }
  if (!validarEmail(email)) {
    return res.status(400).json({ ok: false, error: "El email no parece válido." });
  }
  if (
    nombre.length > LIMITES.nombre ||
    email.length > LIMITES.email ||
    mensaje.length > LIMITES.mensaje
  ) {
    return res.status(400).json({ ok: false, error: "El mensaje es demasiado largo." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Falta configurar la variable en Vercel. Se registra en los logs para
    // poder diagnosticarlo, pero al visitante no se le cuenta el detalle.
    console.error("RESEND_API_KEY no está configurada en el entorno.");
    return res.status(500).json({
      ok: false,
      error: "El envío no está disponible ahora mismo. Escríbenos a " + DESTINO + ".",
    });
  }

  const asunto = `Contacto web — ${nombre}`;
  const cuerpoTexto =
    `Nombre: ${nombre}\n` +
    `Email: ${email}\n\n` +
    `Mensaje:\n${mensaje}\n`;

  const cuerpoHtml =
    `<div style="font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;line-height:1.6;color:#111114">` +
    `<h2 style="margin:0 0 16px;font-size:18px">Nuevo mensaje desde el formulario web</h2>` +
    `<p style="margin:0 0 4px"><strong>Nombre:</strong> ${escapar(nombre)}</p>` +
    `<p style="margin:0 0 16px"><strong>Email:</strong> ${escapar(email)}</p>` +
    `<div style="padding:14px 16px;background:#f7f6f4;border-left:3px solid #c0141c;border-radius:0 8px 8px 0">` +
    `${escapar(mensaje).replace(/\n/g, "<br>")}` +
    `</div></div>`;

  try {
    const respuesta = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: REMITENTE,
        to: [DESTINO],
        // Clave para la operación diaria: al responder el correo, la
        // respuesta le llega al visitante y no al buzón del formulario.
        reply_to: email,
        subject: asunto,
        text: cuerpoTexto,
        html: cuerpoHtml,
      }),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text();
      console.error("Resend respondió", respuesta.status, detalle);
      return res.status(502).json({
        ok: false,
        error: "No pudimos enviar el mensaje. Escríbenos a " + DESTINO + ".",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Fallo al llamar a Resend:", e);
    return res.status(502).json({
      ok: false,
      error: "No pudimos enviar el mensaje. Escríbenos a " + DESTINO + ".",
    });
  }
};
