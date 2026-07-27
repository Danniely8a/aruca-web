import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";
import ViewTracker from "@/components/ViewTracker";
import { CartProvider } from "@/lib/context/CartContext";

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
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <ViewTracker />
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
