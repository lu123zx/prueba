import { ImageResponse } from "next/og";

export const alt =
  "TechFlow Soluciones — Soporte informático remoto para pymes en Santiago";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen que se ve al compartir el sitio por WhatsApp, LinkedIn o correo.
 * Se genera del mismo sistema visual de la página: grafito, hueso y el verde
 * de acento. Sin foto de stock, igual que el resto del sitio.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111312",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#FAFAF8" }}>
          TechFlow<span style={{ color: "#3D9970" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              color: "#FAFAF8",
              maxWidth: 900,
            }}
          >
            Tu empresa no se detiene porque se cayó un computador.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 27,
              color: "rgba(250,250,248,0.65)",
              fontFamily: "sans-serif",
            }}
          >
            Soporte informático remoto para pymes de Santiago
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            fontSize: 21,
            color: "#3D9970",
            fontFamily: "sans-serif",
            borderTop: "1px solid rgba(250,250,248,0.16)",
            paddingTop: 26,
          }}
        >
          <span>Respuesta en 2 horas</span>
          <span>Planes desde 4,5 UF</span>
          <span>Sin contrato anual</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
