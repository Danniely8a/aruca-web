import type { Metadata } from "next";
import { products } from "@/lib/data/products";

const BASE_URL = "https://arucamaquinarias.com";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto que buscas no existe o fue movido.",
    };
  }

  const title = `${product.name} (${product.brand} ${product.model})`;
  const description =
    product.shortDescription ||
    `${product.name} de ${product.brand}. ${product.description?.slice(0, 150)}`;
  const image = product.image
    ? `${BASE_URL}${product.image}`
    : `${BASE_URL}/assets/logo.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/productos/${product.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "es_VE",
      url: `${BASE_URL}/productos/${product.slug}`,
      siteName: "ARUCA Maquinarias",
      title,
      description,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
