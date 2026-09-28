"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  MessageCircle,
  RefreshCw,
  Search,
  SearchX,
  Tag,
  ShoppingCart,
} from "lucide-react";
import { company } from "@/lib/data/company";
import { useCart } from "@/lib/context/CartContext";
import { useProducts, type Product } from "@/lib/hooks/useProducts";
import { LEGACY_SLUGS } from "@/lib/legacySlugs";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductImage from "@/components/ProductImage";

function decodeSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function ProductSkeleton() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4 py-24">
        <Loader2 size={40} className="animate-spin text-brand" />
        <p className="text-gray-500 font-medium">Cargando producto…</p>
      </div>
    </section>
  );
}

function CatalogError({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-xl mx-auto px-4 text-center py-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          No pudimos cargar el catálogo
        </h1>
        <p className="text-gray-500 mb-6">
          Hubo un problema de conexión. Vuelve a intentarlo.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all cursor-pointer"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
          <Link
            href="/catalogo"
            className="px-6 py-3 text-brand font-semibold hover:text-brand-dark transition-colors"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductNotFound({
  rawSlug,
  products,
}: {
  rawSlug: string;
  products: Product[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState(() =>
    rawSlug.replace(/[-_]+/g, " ").trim()
  );

  const suggestions = useMemo(() => {
    const tokens = [
      ...new Set(
        rawSlug
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter(
            (t) =>
              t.length >= 3 &&
              t !== "gav" &&
              !/^\d+$/.test(t) &&
              !/^\d+mm$/.test(t)
          )
      ),
    ];
    if (!tokens.length || !products.length) return [];
    const scored = products
      .map((p) => {
        const hay = `${p.name} ${p.slug} ${p.brand}`.toLowerCase();
        const hits = tokens.filter((t) => hay.includes(t)).length;
        return { p, hits };
      })
      .filter((s) => s.hits > 0)
      .sort((a, b) => b.hits - a.hits);
    return scored.slice(0, 6).map((s) => s.p);
  }, [rawSlug, products]);

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <SearchX size={48} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Producto no encontrado
        </h1>
        <p className="text-gray-500 mb-6">
          El producto que buscas no existe, cambió de nombre o ya no está
          disponible. Búscalo en el catálogo:
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : "/catalogo");
          }}
          className="flex gap-2 max-w-lg mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/40 text-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-all cursor-pointer"
            aria-label="Buscar"
          >
            <Search size={18} />
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="mt-10 text-left">
            <h2 className="text-sm font-semibold text-gray-500 mb-4">
              Quizás buscas alguno de estos:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
                    <ProductImage
                      src={p.image}
                      alt={p.name}
                      brand={p.brand}
                      model={p.model}
                      width={200}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          href="/catalogo"
          className="inline-block mt-8 text-brand font-semibold hover:text-brand-dark transition-colors"
        >
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const {
    products: allProducts,
    loading,
    error,
    reload,
  } = useProducts();
  const { addItem } = useCart();

  const rawSlug = decodeSlug(slug);
  const legacyTarget =
    LEGACY_SLUGS[rawSlug] !== undefined ? LEGACY_SLUGS[rawSlug] : LEGACY_SLUGS[slug];

  // Link antiguo: redirigir al slug actual
  useEffect(() => {
    const target =
      LEGACY_SLUGS[decodeSlug(slug)] !== undefined
        ? LEGACY_SLUGS[decodeSlug(slug)]
        : LEGACY_SLUGS[slug];
    if (target) router.replace(`/productos/${target}`);
  }, [slug, router]);

  // Corregir mayúsculas/encoding: redirigir al slug canónico
  useEffect(() => {
    if (loading) return;
    const decoded = decodeSlug(slug);
    const ci = allProducts.find(
      (p) => p.slug.toLowerCase() === decoded.toLowerCase()
    );
    if (ci && ci.slug !== slug) router.replace(`/productos/${ci.slug}`);
  }, [loading, allProducts, slug, router]);

  const product = useMemo(() => {
    if (!allProducts.length) return undefined;
    return (
      allProducts.find((p) => p.slug === rawSlug) ??
      allProducts.find((p) => p.slug.toLowerCase() === rawSlug.toLowerCase())
    );
  }, [allProducts, rawSlug]);

  if (error) {
    return <CatalogError onRetry={reload} />;
  }

  if (loading || (legacyTarget !== undefined && !product)) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return (
      <ProductNotFound key={rawSlug} rawSlug={rawSlug} products={allProducts} />
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  const handleWhatsAppQuote = () => {
    const message = `Hola, me interesa el producto: ${product.name} (${product.brand} ${product.model}). Solicito información y cotización.`;
    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description || product.shortDescription,
            image: product.image
              ? product.image.startsWith("http")
                ? product.image
                : `https://arucamaquinarias.com${product.image}`
              : `https://arucamaquinarias.com/assets/logo.jpg`,
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            model: product.model,
            sku: product.id,
            category: product.category,
          }),
        }}
      />
      <section className="bg-brand pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  window.history.length > 1 ? router.back() : router.push("/catalogo")
                }
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium mb-3 transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                Volver
              </button>
              <Breadcrumbs
                dark
                items={[
                  { label: "Catálogo", href: "/catalogo" },
                  { label: product.name },
                ]}
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-white/10 text-white/90 text-xs font-semibold rounded-full">
                {product.brand.toUpperCase()}
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
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  brand={product.brand}
                  model={product.model}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="p-8"
                />
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
                  onClick={() =>
                    addItem({
                      id: product.id,
                      slug: product.slug,
                      name: product.name,
                      brand: product.brand,
                      model: product.model,
                      image: product.image || "",
                      price: product.price,
                    })
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all"
                >
                  <ShoppingCart size={18} />
                  Agregar al Carrito
                </button>
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
                    <ProductImage
                      src={p.image}
                      alt={p.name}
                      brand={p.brand}
                      model={p.model}
                      width={256}
                      height={192}
                      className="object-contain"
                    />
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
