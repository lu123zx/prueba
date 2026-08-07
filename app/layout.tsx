import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "TechFlow Soluciones — Soporte TI remoto para pymes en Santiago",
  description:
    "Soporte técnico remoto, desarrollo web y automatización para pymes de Santiago. Respondemos en menos de 2 horas, planes en UF y sin contrato anual forzoso.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CL"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans">
        {children}
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
