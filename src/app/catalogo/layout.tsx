import type { Metadata } from "next";

const BASE_URL = "https://arucamaquinarias.com";

export const metadata: Metadata = {
  title: "Catálogo de Maquinaria y Herramientas",
  description:
    "Explora nuestro catálogo de maquinaria para madera, herramientas profesionales, compresores, discos de corte y más. Marcas como Makita, Euro Air, Titebond y muchas más.",
  alternates: { canonical: `${BASE_URL}/catalogo` },
  openGraph: {
    title: "Catálogo de Maquinaria y Herramientas | ARUCA Maquinarias",
    description:
      "Explora nuestro catálogo de maquinaria para madera, herramientas profesionales y compresores. Más de 3000 productos disponibles.",
    url: `${BASE_URL}/catalogo`,
  },
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
