import type { Metadata } from "next";

const BASE_URL = "https://arucamaquinarias.com";

export const metadata: Metadata = {
  title: "Cotización",
  description:
    "Solicita una cotización de maquinaria, herramientas y compresores para la industria de la madera. Recibe asesoría personalizada en menos de 24 horas.",
  alternates: { canonical: `${BASE_URL}/cotizacion` },
  openGraph: {
    title: "Solicitar Cotización | ARUCA Maquinarias",
    description:
      "Solicita una cotización de maquinaria y herramientas profesionales. Respondemos en menos de 24 horas.",
    url: `${BASE_URL}/cotizacion`,
  },
};

export default function CotizacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
