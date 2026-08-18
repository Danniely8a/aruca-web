import type { Metadata } from "next";

const BASE_URL = "https://arucamaquinarias.com";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios integrales para la industria de la madera: venta de maquinaria, asesoría técnica, compresores, herramientas de corte y más. ARUCA Maquinarias, Venezuela.",
  alternates: { canonical: `${BASE_URL}/servicios` },
  openGraph: {
    title: "Servicios | ARUCA Maquinarias",
    description:
      "Servicios integrales para la industria de la madera: venta de maquinaria, asesoría técnica y soporte especializado.",
    url: `${BASE_URL}/servicios`,
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
