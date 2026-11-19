import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Royal Vega · Club & Casino Privé",
  description:
    "Casino privado entre amigos. Solo fichas de juego, sin dinero real.",
  appleWebApp: {
    capable: true,
    title: "Royal Vega",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800;900&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,500,1,0&display=swap"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <div className="mx-auto min-h-dvh w-full max-w-md">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
