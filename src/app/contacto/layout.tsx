import type { Metadata } from "next";

const BASE_URL = "https://arucamaquinarias.com";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a ARUCA Maquinarias. Estamos en Caracas, Venezuela. Teléfonos, WhatsApp, correo y horario de atención. Asesoría personalizada para tu negocio.",
  alternates: { canonical: `${BASE_URL}/contacto` },
  openGraph: {
    title: "Contacto | ARUCA Maquinarias",
    description:
      "Contacta a ARUCA Maquinarias en Caracas, Venezuela. Asesoría personalizada en maquinaria para la industria de la madera.",
    url: `${BASE_URL}/contacto`,
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
