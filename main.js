/* ============================================================
   main.js — interacciones de la página
   Menú móvil, scroll suave, header fijo, enlace activo,
   puente con la animación p5 y formulario de contacto.
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* ── Año actual en el footer ───────────────────────────── */
    const anio = document.querySelector("[data-anio]");
    if (anio) anio.textContent = String(new Date().getFullYear());

    /* ── Menú móvil ────────────────────────────────────────── */
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.getElementById("nav-menu");

    function cerrarMenu() {
      if (!toggle || !menu) return;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú de navegación");
      menu.classList.remove("esta-abierto");
    }

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        const abierto = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!abierto));
        toggle.setAttribute(
          "aria-label",
          abierto ? "Abrir menú de navegación" : "Cerrar menú de navegación"
        );
        menu.classList.toggle("esta-abierto", !abierto);
      });

      // Al elegir un destino, el menú se cierra solo.
      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) cerrarMenu();
      });

      // Escape cierra y devuelve el foco al botón.
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
          cerrarMenu();
          toggle.focus();
        }
      });
    }

    /* ── Header con fondo al hacer scroll ──────────────────── */
    const header = document.querySelector(".site-header");
    let ticking = false;

    function alScrollear() {
      if (header) header.classList.toggle("esta-fijo", window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        // requestAnimationFrame: una sola lectura de layout por frame.
        if (!ticking) {
          window.requestAnimationFrame(alScrollear);
          ticking = true;
        }
      },
      { passive: true }
    );
    alScrollear();

    /* ── Scroll suave con foco correcto ────────────────────── */
    /* scroll-behavior: smooth ya anima el salto; acá además movemos
       el foco al destino, que es lo que el CSS no hace por sí solo. */
    document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {
      enlace.addEventListener("click", function (e) {
        const id = enlace.getAttribute("href");
        if (!id || id === "#") return;

        const destino = document.querySelector(id);
        if (!destino) return;

        e.preventDefault();
        destino.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });

        // Sin tabindex un <section> no recibe foco; se lo damos temporalmente.
        if (!destino.hasAttribute("tabindex")) {
          destino.setAttribute("tabindex", "-1");
        }
        destino.focus({ preventScroll: true });

        history.replaceState(null, "", id);
      });
    });

    /* ── Enlace activo según la sección visible ────────────── */
    const secciones = document.querySelectorAll("main section[id]");
    const enlacesNav = document.querySelectorAll('.nav__menu a[href^="#"]');

    if ("IntersectionObserver" in window && secciones.length) {
      const observador = new IntersectionObserver(
        function (entradas) {
          entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) return;
            const id = "#" + entrada.target.id;
            enlacesNav.forEach(function (a) {
              a.classList.toggle(
                "esta-activo",
                a.getAttribute("href") === id && !a.classList.contains("boton")
              );
            });
          });
        },
        // Franja centrada: la sección se marca cuando domina la pantalla.
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      secciones.forEach(function (s) { observador.observe(s); });
    }

    /* ── Puente con la animación p5 ────────────────────────── */
    /* Al entrar el cursor (o el foco) a una tarjeta, el campo de
       partículas cambia a dorado y acelera un poco. */
    const tarjetas = document.querySelectorAll(".tarjeta");

    function energia(valor) {
      if (window.FondoTechFlow) window.FondoTechFlow.setEnergia(valor);
    }

    tarjetas.forEach(function (tarjeta) {
      tarjeta.addEventListener("mouseenter", function () { energia(true); });
      tarjeta.addEventListener("mouseleave", function () { energia(false); });
      tarjeta.addEventListener("focusin",  function () { energia(true); });
      tarjeta.addEventListener("focusout", function () { energia(false); });
    });

    /* ── Formulario de contacto (aún sin backend) ──────────── */
    const formulario = document.querySelector(".formulario");
    const nota = document.querySelector("[data-nota]");

    if (formulario) {
      formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validación nativa: sin librerías y con mensajes del navegador.
        if (!formulario.checkValidity()) {
          formulario.reportValidity();
          return;
        }

        if (nota) {
          nota.innerHTML =
            'Gracias por escribir. El envío todavía no está conectado a un ' +
            'servidor, así que escríbenos directo a ' +
            '<a href="mailto:contacto@techflowsoluciones.com">' +
            "contacto@techflowsoluciones.com</a>.";
        }
      });
    }

  });
})();
