import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "TechFlow Soluciones — Soporte TI, desarrollo y redes para pymes en Santiago",
  description:
    "Soporte técnico gestionado, desarrollo web y automatización para pymes de Santiago. Respuesta en menos de 2 horas, sin contrato anual forzoso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="bg-bone font-sans text-graphite antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
