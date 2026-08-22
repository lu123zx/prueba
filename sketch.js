/* ============================================================
   sketch.js — fondo animado con p5.js
   Campo de partículas conectadas por líneas. Reacciona al mouse
   y se "enciende" cuando el cursor entra a una tarjeta de servicio.

   Reglas que respeta:
   - Se detiene si la pestaña no está visible (ahorra batería).
   - No dibuja nada si el usuario pidió movimiento reducido.
   - Densidad proporcional al área: en móvil hay menos partículas.
   - El canvas es decorativo: no captura clics (pointer-events en CSS).
   ============================================================ */

(function () {
  "use strict";

  // ── Parámetros de la simulación ──────────────────────────────
  const CONFIG = {
    densidad: 11000,      // 1 partícula por cada N px² del lienzo
    maxParticulas: 130,
    distanciaEnlace: 132, // px máximos para unir dos partículas
    radioMouse: 190,      // radio de influencia del cursor
    velocidadBase: 0.22,
  };

  // Calibrado para fondo claro: sobre #f7f6f3 las partículas tienen que ser
  // OSCURAS para verse. En dorado no se distinguen (1.99:1 contra el fondo),
  // así que el estado "encendido" usa el petróleo del acento.
  const COLOR = {
    particula: [150, 148, 158],
    enlace:    [120, 118, 128],
    acento:    [255, 90, 95],
  };

  let particulas = [];
  let lienzo;
  // Sube a 1 cuando el cursor está sobre una tarjeta; suaviza la transición.
  let energia = 0;
  let energiaObjetivo = 0;

  const prefiereMenosMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /** Una partícula del campo. */
  class Particula {
    constructor(p) {
      this.p = p;
      this.reiniciar(true);
    }

    reiniciar(alAzar) {
      const p = this.p;
      this.x = p.random(p.width);
      this.y = alAzar ? p.random(p.height) : p.random(p.height);
      const angulo = p.random(p.TWO_PI);
      const rapidez = p.random(0.4, 1) * CONFIG.velocidadBase;
      this.vx = Math.cos(angulo) * rapidez;
      this.vy = Math.sin(angulo) * rapidez;
      this.tam = p.random(1, 2.4);
    }

    actualizar() {
      const p = this.p;

      // Al subir la energía las partículas se mueven algo más rápido.
      const factor = 1 + energia * 0.85;
      this.x += this.vx * factor;
      this.y += this.vy * factor;

      // Repulsión suave: el cursor abre un claro a su alrededor.
      if (p.mouseX > 0 || p.mouseY > 0) {
        const dx = this.x - p.mouseX;
        const dy = this.y - p.mouseY;
        const d2 = dx * dx + dy * dy;
        const r = CONFIG.radioMouse;
        if (d2 < r * r && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const fuerza = (1 - d / r) * 0.55;
          this.x += (dx / d) * fuerza;
          this.y += (dy / d) * fuerza;
        }
      }

      // Bordes envolventes: el campo nunca se vacía por una esquina.
      if (this.x < -20) this.x = p.width + 20;
      if (this.x > p.width + 20) this.x = -20;
      if (this.y < -20) this.y = p.height + 20;
      if (this.y > p.height + 20) this.y = -20;
    }

    dibujar() {
      const p = this.p;
      const c = p.lerpColor(
        p.color(COLOR.particula[0], COLOR.particula[1], COLOR.particula[2]),
        p.color(COLOR.acento[0], COLOR.acento[1], COLOR.acento[2]),
        energia
      );
      c.setAlpha(120 + energia * 90);
      p.noStroke();
      p.fill(c);
      p.circle(this.x, this.y, this.tam * 2);
    }
  }

  /** Cantidad de partículas según el tamaño real de la ventana. */
  function calcularCantidad(p) {
    const bruto = Math.floor((p.width * p.height) / CONFIG.densidad);
    return p.constrain(bruto, 28, CONFIG.maxParticulas);
  }

  function crearParticulas(p) {
    const total = calcularCantidad(p);
    particulas = [];
    for (let i = 0; i < total; i++) particulas.push(new Particula(p));
  }

  // ── El sketch, en modo instancia para no ensuciar el global ──
  const sketch = function (p) {
    // El lienzo ya no ocupa la ventana: se mide contra su contenedor.
    function medidas() {
      const c = document.getElementById("fondo-p5");
      const r = c.getBoundingClientRect();
      return [Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height))];
    }

    p.setup = function () {
      const contenedor = document.getElementById("fondo-p5");
      const [w, h] = medidas();
      lienzo = p.createCanvas(w, h);
      lienzo.parent(contenedor);
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      crearParticulas(p);

      // Con movimiento reducido: se pinta un frame estático y se detiene.
      if (prefiereMenosMovimiento.matches) {
        p.noLoop();
        p.redraw();
      }
    };

    p.draw = function () {
      p.clear();

      // Suavizado de la energía hacia su objetivo (hover de tarjetas).
      energia += (energiaObjetivo - energia) * 0.06;

      // Enlaces primero, para que los nodos queden encima.
      p.strokeWeight(1);
      for (let i = 0; i < particulas.length; i++) {
        const a = particulas[i];
        for (let j = i + 1; j < particulas.length; j++) {
          const b = particulas[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const lim = CONFIG.distanciaEnlace;
          if (d2 > lim * lim) continue;

          const d = Math.sqrt(d2);
          const cercania = 1 - d / lim;

          const c = p.lerpColor(
            p.color(COLOR.enlace[0], COLOR.enlace[1], COLOR.enlace[2]),
            p.color(COLOR.acento[0], COLOR.acento[1], COLOR.acento[2]),
            energia
          );
          c.setAlpha(cercania * (46 + energia * 70));
          p.stroke(c);
          p.line(a.x, a.y, b.x, b.y);
        }
      }

      for (const part of particulas) {
        part.actualizar();
        part.dibujar();
      }
    };

    p.windowResized = function () {
      const [w, h] = medidas();
      p.resizeCanvas(w, h);
      crearParticulas(p);
      if (prefiereMenosMovimiento.matches) p.redraw();
    };

    // ── Control externo, expuesto para main.js ────────────────
    window.FondoTechFlow = {
      /** Enciende o apaga el modo "acento" (hover sobre tarjetas). */
      setEnergia(valor) {
        energiaObjetivo = valor ? 1 : 0;
      },
      /** Pausa/reanuda el bucle; lo usa el control de visibilidad. */
      pausar() {
        p.noLoop();
      },
      reanudar() {
        if (!prefiereMenosMovimiento.matches) p.loop();
      },
    };

    // La pestaña oculta no gasta CPU ni batería.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) p.noLoop();
      else if (!prefiereMenosMovimiento.matches) p.loop();
    });

    // Si el usuario cambia la preferencia en caliente, reaccionamos.
    prefiereMenosMovimiento.addEventListener("change", function (e) {
      if (e.matches) {
        p.noLoop();
        p.redraw();
      } else {
        p.loop();
      }
    });
  };

  /* ── Carga condicional de p5 ────────────────────────────────
     p5 pesa 245 KB comprimidos y esto es un fondo decorativo. No se
     descarga cuando no aporta o cuando cuesta caro:
       - el sistema pide menos movimiento
       - el usuario activó ahorro de datos, o va en 2G
       - pantalla angosta: el fondo casi no se ve y el dato se paga
     Sin p5 la página se ve y funciona igual, solo sin partículas.
     ──────────────────────────────────────────────────────────── */

  // Stub inerte para que main.js pueda llamar sin comprobar nada.
  function fondoInerte() {
    window.FondoTechFlow = {
      setEnergia: function () {},
      pausar: function () {},
      reanudar: function () {},
    };
  }

  function valeLaPena() {
    if (prefiereMenosMovimiento.matches) return false;
    const con = navigator.connection;
    if (con && (con.saveData || /(^|-)2g$/.test(con.effectiveType || ""))) return false;
    if (window.matchMedia("(max-width: 640px)").matches) return false;
    return true;
  }

  fondoInerte();
  if (!valeLaPena()) return;

  const tag = document.createElement("script");
  tag.src = "assets/vendor/p5.min.js";
  tag.async = true;
  // Al resolverse, el propio sketch reemplaza el stub por el control real.
  tag.onload = function () {
    if (typeof p5 !== "undefined") new p5(sketch);
  };
  tag.onerror = fondoInerte;
  document.head.appendChild(tag);
})();
