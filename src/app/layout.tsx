import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";
import ViewTracker from "@/components/ViewTracker";
import ChatWidget from "@/components/chat/ChatWidget";
import { CartProvider } from "@/lib/context/CartContext";

export const metadata: Metadata = {
  title: {
    default: "ARUCA Maquinarias | Soluciones para la Industria de la Madera",
    template: "%s | ARUCA Maquinarias",
  },
  description:
    "Distribuidor profesional de maquinaria, herramientas y compresores para la industria de la madera. Más de 50 años de experiencia. Marcas como Makita, Euro Air, Titebond y más.",
  keywords: [
    "maquinaria madera",
    "herramientas profesionales",
    "Makita Venezuela",
    "compresores",
    "carpintería",
    "ARUCA",
  ],
  authors: [{ name: "ARUCA Maquinarias" }],
  creator: "ARUCA Maquinarias",
  metadataBase: new URL("https://arucamaquinarias.com"),
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "https://arucamaquinarias.com",
    siteName: "ARUCA Maquinarias",
    title: "ARUCA Maquinarias | Soluciones para la Industria de la Madera",
    description:
      "Distribuidor profesional de maquinaria, herramientas y compresores. Más de 50 años de experiencia en Venezuela.",
    images: [
      {
        url: "/assets/logo.jpg",
        width: 512,
        height: 512,
        alt: "ARUCA Maquinarias",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ARUCA Maquinarias",
    description:
      "Distribuidor profesional de maquinaria, herramientas y compresores para la industria de la madera.",
    images: ["/assets/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
