import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: "ARUCA Maquinarias | Soluciones para la Industria de la Madera",
  description:
    "Distribuidor profesional de maquinaria, herramientas y compresores para la industria de la madera. Marcas como Makita, Euro Air, Titebond y más. Asesoría técnica y cotizaciones.",
  keywords: [
    "maquinaria madera",
    "herramientas profesionales",
    "Makita Venezuela",
    "compresores",
    "carpintería",
    "ARUCA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
        <WhatsAppButton />
      </body>
    </html>
  );
}
