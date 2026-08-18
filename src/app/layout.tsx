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
import { AuthProvider } from "@/lib/context/AuthContext";
import { company } from "@/lib/data/company";

const BASE_URL = "https://arucamaquinarias.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ARUCA Maquinarias | Soluciones para la Industria de la Madera",
    template: "%s | ARUCA Maquinarias",
  },
  description:
    "Distribuidor profesional de maquinaria, herramientas, compresores y productos para la industria de la madera en Venezuela. Más de 50 años de experiencia. Marcas como Makita, Euro Air, Titebond y más.",
  keywords: [
    "maquinaria madera",
    "herramientas profesionales",
    "Makita Venezuela",
    "compresores",
    "carpintería",
    "sierras de banco",
    "discos de corte",
    "ARUCA",
    "maquinaria industrial Venezuela",
  ],
  authors: [{ name: "ARUCA Maquinarias" }],
  creator: "ARUCA Maquinarias",
  publisher: "ARUCA Maquinarias",
  category: "Maquinaria industrial",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: BASE_URL,
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
    card: "summary_large_image",
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
    icon: "/assets/logo.jpg",
    apple: "/assets/logo.jpg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: company.description,
  url: BASE_URL,
  logo: `${BASE_URL}/assets/logo.jpg`,
  email: company.email,
  telephone: company.phone2.replace(/[()\s-]/g, ""),
  address: {
    "@type": "PostalAddress",
    addressRegion: "Miranda",
    addressCountry: "VE",
  },
  sameAs: [`https://instagram.com/${company.instagram.replace("@", "")}`],
  foundingDate: "1976",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
