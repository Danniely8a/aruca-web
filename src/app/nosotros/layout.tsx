import type { Metadata } from "next";

const BASE_URL = "https://arucamaquinarias.com";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "ARUCA Maquinarias: más de 50 años distribuyendo maquinaria profesional para la industria de la madera en Venezuela. Conoce nuestra historia, misión, visión y valores.",
  alternates: { canonical: `${BASE_URL}/nosotros` },
  openGraph: {
    title: "Nosotros | ARUCA Maquinarias",
    description:
      "Más de 50 años distribuyendo maquinaria profesional para la industria de la madera en Venezuela. Conoce nuestra historia, misión y visión.",
    url: `${BASE_URL}/nosotros`,
  },
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
