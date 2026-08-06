"use client";

import { useEffect, useRef } from "react";
import type P5 from "p5";

// Colores del sistema de diseño, en RGB planos (para dibujar en canvas).
const GRAPHITE: [number, number, number] = [17, 19, 18];
const ACCENT: [number, number, number] = [15, 81, 50];

const EDGE_DISTANCE = 165; // px: bajo esta distancia dos nodos se conectan
const INFLUENCE_RADIUS = 230; // px: radio de "encendido" alrededor del cursor
const DRIFT_AMPLITUDE = 40; // px: cuánto flota cada nodo
const MAX_PACKETS = 10;

type NodePoint = {
  baseX: number;
  baseY: number;
  seed: number;
  x: number;
  y: number;
  lit: number; // 0..1, qué tan "encendido" está (se suaviza con el tiempo)
};

type Packet = {
  from: number;
  to: number;
  t: number; // 0..1 progreso a lo largo de la arista
  speed: number;
};

/**
 * Fondo decorativo del Hero: una red de nodos y conexiones que representa la
 * infraestructura que TechFlow mantiene viva. Flota suavemente y se
 * "enciende" en verde acento alrededor del cursor o el dedo. Puramente
 * decorativo (aria-hidden) y respeta prefers-reduced-motion apagando el
 * movimiento ambiental y los paquetes de datos, dejando solo la iluminación
 * al pasar el cursor.
 */
export function NetworkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let instance: P5 | null = null;

    const pointer = { x: -9999, y: -9999 };

    function toLocal(clientX: number, clientY: number) {
      const rect = container!.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
    }

    function handlePointerMove(e: PointerEvent) {
      toLocal(e.clientX, e.clientY);
    }
    function handlePointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    import("p5").then(({ default: p5 }) => {
      if (destroyed) return;

      const reduceMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      const sketch = (p: P5) => {
        let nodes: NodePoint[] = [];
        let packets: Packet[] = [];
        let reduceMotion = reduceMotionQuery.matches;

        function layout() {
          const w = container!.clientWidth;
          const h = container!.clientHeight;
          const area = w * h;
          const count = Math.round(
            Math.min(110, Math.max(28, area / 15000))
          );
          nodes = Array.from({ length: count }, () => {
            const x = p.random(w);
            const y = p.random(h);
            return {
              baseX: x,
              baseY: y,
              seed: p.random(1000),
              x,
              y,
              lit: 0,
            };
          });
          packets = [];
        }

        p.setup = () => {
          const canvas = p.createCanvas(
            container!.clientWidth,
            container!.clientHeight
          );
          canvas.parent(container!);
          canvas.style("display", "block");
          // El contenedor es pointer-events-none (ver el div de más abajo):
          // el canvas nunca recibe eventos táctiles directamente, así que el
          // scroll de la página nunca se bloquea en mobile.
          p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
          p.noStroke();
          p.frameRate(reduceMotion ? 30 : 45);
          layout();

          if (reduceMotion) {
            p.noLoop();
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(container!.clientWidth, container!.clientHeight);
          layout();
          if (reduceMotion) p.redraw();
        };

        p.draw = () => {
          p.clear();
          const t = reduceMotion ? 0 : p.frameCount * 0.0028;

          // 1. Actualiza posiciones (deriva orgánica vía ruido Perlin).
          for (const n of nodes) {
            if (reduceMotion) {
              n.x = n.baseX;
              n.y = n.baseY;
            } else {
              n.x = n.baseX + (p.noise(n.seed, t) - 0.5) * DRIFT_AMPLITUDE * 2;
              n.y =
                n.baseY + (p.noise(n.seed + 500, t) - 0.5) * DRIFT_AMPLITUDE * 2;
            }

            const d = p.dist(n.x, n.y, pointer.x, pointer.y);
            const target = d < INFLUENCE_RADIUS ? 1 - d / INFLUENCE_RADIUS : 0;
            n.lit = p.lerp(n.lit, target, reduceMotion ? 1 : 0.12);
          }

          // 2. Aristas entre nodos cercanos.
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const a = nodes[i];
              const b = nodes[j];
              const d = p.dist(a.x, a.y, b.x, b.y);
              if (d > EDGE_DISTANCE) continue;

              const proximity = 1 - d / EDGE_DISTANCE;
              const lit = Math.max(a.lit, b.lit);
              const baseAlpha = proximity * 26;
              const litAlpha = proximity * 150 * lit;

              const col = lit > 0.02 ? ACCENT : GRAPHITE;
              const alpha = lit > 0.02 ? baseAlpha + litAlpha : baseAlpha;

              p.stroke(col[0], col[1], col[2], alpha);
              p.strokeWeight(lit > 0.3 ? 1.1 : 0.6);
              p.line(a.x, a.y, b.x, b.y);
              p.noStroke();

              // 3. Ocasionalmente, un "paquete de datos" viaja por una arista
              // encendida: la metáfora de la red que nunca deja de moverse.
              if (
                !reduceMotion &&
                lit > 0.55 &&
                packets.length < MAX_PACKETS &&
                p.random() < 0.01
              ) {
                packets.push({ from: i, to: j, t: 0, speed: p.random(0.006, 0.012) });
              }
            }
          }

          // 4. Dibuja y avanza los paquetes activos.
          packets = packets.filter((packet) => packet.t <= 1);
          for (const packet of packets) {
            const a = nodes[packet.from];
            const b = nodes[packet.to];
            if (!a || !b) continue;
            const x = p.lerp(a.x, b.x, packet.t);
            const y = p.lerp(a.y, b.y, packet.t);
            p.fill(ACCENT[0], ACCENT[1], ACCENT[2], 210);
            p.circle(x, y, 4.5);
            p.noFill();
            packet.t += packet.speed;
          }

          // 5. Nodos.
          for (const n of nodes) {
            const size = 2.2 + n.lit * 2.6;
            const col = n.lit > 0.05 ? ACCENT : GRAPHITE;
            const alpha = n.lit > 0.05 ? 90 + n.lit * 160 : 70;
            p.fill(col[0], col[1], col[2], alpha);
            p.circle(n.x, n.y, size);
            p.noFill();
          }

          if (reduceMotion) p.noLoop();
        };

        reduceMotionQuery.addEventListener("change", (e) => {
          reduceMotion = e.matches;
          p.frameRate(reduceMotion ? 30 : 45);
          if (reduceMotion) {
            p.noLoop();
            p.redraw();
          } else {
            p.loop();
          }
        });
      };

      instance = new p5(sketch);
    });

    return () => {
      destroyed = true;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      instance?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [&_canvas]:pointer-events-none"
    />
  );
}
