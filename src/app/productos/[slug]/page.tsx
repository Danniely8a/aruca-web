"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Tag,
} from "lucide-react";
import { products } from "@/lib/data/products";
import { company } from "@/lib/data/company";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h1>
          <Link
            href="/catalogo"
            className="text-brand font-semibold hover:text-brand-dark"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    );
  }

  const relatedProducts = products
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 3);

  const handleWhatsAppQuote = () => {
    const message = `Hola, me interesa el producto: ${product.name} (${product.brand} ${product.model}). Solicito información y cotización.`;
    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      <section className="bg-brand pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Volver al Catálogo
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-white/10 text-white/90 text-xs font-semibold rounded-full">
                {product.brand}
              </span>
              <span className="px-2.5 py-0.5 bg-white/10 text-white/90 text-xs font-semibold rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-white/70">
                Modelo: <span className="font-bold text-white">{product.model}</span>
              </p>
              <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full">
                Código: {product.model}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden relative">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-8"
                    priority
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-brand font-bold text-3xl">{product.brand}</p>
                    <p className="text-gray-400 text-lg mt-2">{product.model}</p>
                  </div>
                )}
                <span className="absolute top-4 right-4 px-3 py-1.5 bg-brand text-white text-sm font-bold rounded-full z-10">
                  {product.model}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Descripción
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.specs && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Especificaciones Técnicas
                  </h2>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Tag size={14} className="text-brand" />
                          <span className="text-sm font-medium text-gray-700">
                            {key}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppQuote}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
                >
                  <MessageCircle size={18} />
                  Cotizar por WhatsApp
                </button>
                <Link
                  href="/cotizacion"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 transition-all"
                >
                  Formulario de Cotización
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={256}
                        height={192}
                        className="object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-brand font-bold">{p.brand}</p>
                        <p className="text-gray-400 text-xs mt-1">{p.model}</p>
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-1 bg-brand text-white text-[10px] font-bold rounded-full">
                      {p.model}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {p.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
