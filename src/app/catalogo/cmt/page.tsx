"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useProducts } from "@/lib/hooks/useProducts";

const brandConfig = {
  name: "CMT Orange Tools",
  displayName: "CMT Orange Tools",
  color: "#E87722",
  colorDark: "#C66A1A",
  tagline: "Precisión que transforma cada corte",
  description:
    "Discos, fresas y herramientas de corte para resultados profesionales.",
  logo: "/assets/brands/cmt_x2.0.jpeg",
  heroImage: "/assets/hero-cmt.png",
  categories: [
    { name: "Discos de corte", icon: "⚙️" },
    { name: "Fresas", icon: "🔧" },
    { name: "Accesorios", icon: "🛠️" },
  ],
};

export default function CMTBrandPage() {
  const { products } = useProducts();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const carouselRef = useRef<HTMLDivElement>(null);

  const cmtProducts = useMemo(
    () => products.filter((p) => p.brand === "CMT Orange Tools"),
    [products]
  );

  const featuredProducts = useMemo(() => {
    const featured = [
      "cmt-ot-disco-melamina-250-z80-283-080-10M",
      "cmt-ot-disco-melamina-300-z72-283-100-12",
      "cmt-fresa-redondeadora-r-12-7mm-852-625-11",
      "cmt-ot-cabezal-multiprurile-120mm-694-120-30",
    ];
    const found = featured
      .map((id) => cmtProducts.find((p) => p.id === id))
      .filter(Boolean);
    if (found.length >= 4) return found;
    return cmtProducts.slice(0, 4);
  }, [cmtProducts]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return cmtProducts;
    return cmtProducts.filter((p) => p.category === activeCategory);
  }, [cmtProducts, activeCategory]);

  const displayProducts = useMemo(
    () => filteredProducts.slice(0, 12),
    [filteredProducts]
  );

  const scrollCarousel = useCallback((dir: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#1a1a2e]">
        <div className="absolute inset-0">
          <Image
            src={brandConfig.heroImage}
            alt={brandConfig.displayName}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/90 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Image
                  src={brandConfig.logo}
                  alt={brandConfig.name}
                  width={180}
                  height={60}
                  className="object-contain"
                />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {brandConfig.tagline}
              </h1>

              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                {brandConfig.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#productos"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#1a1a29] font-semibold rounded-lg hover:bg-gray-100 transition-all text-sm"
                >
                  Ver productos CMT
                  <ArrowRight size={16} />
                </a>
                <a
                  href={`https://wa.me/584126109597?text=${encodeURIComponent("Hola, quiero una cotización de productos CMT Orange Tools.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#25D366] text-[#25D366] font-semibold rounded-lg hover:bg-[#25D366] hover:text-white transition-all text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Cotizar por WhatsApp
                </a>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-3">
                {brandConfig.categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(
                        activeCategory === cat.name ? "Todos" : cat.name
                      );
                      document
                        .getElementById("productos")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${
                      activeCategory === cat.name
                        ? "bg-white text-[#1a1a2e] border-white"
                        : "bg-transparent text-white border-white/30 hover:border-white/60"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right side - Product showcase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src="/assets/product-images/cmt-orange-tools/283-080-10M.jpg"
                  alt="CMT Disco Melamina"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Productos CMT Orange Tools
              </h2>
              <p className="text-gray-500 mt-1">
                {activeCategory === "Todos"
                  ? `${cmtProducts.length} productos disponibles`
                  : `${filteredProducts.length} productos en ${activeCategory}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-2.5 bg-[#E87722] text-white rounded-lg hover:bg-[#C66A1A] transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Product Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-72 snap-start"
              >
                <Link
                  href={`/productos/${product.slug}`}
                  className="block bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden h-full group"
                >
                  <div className="aspect-square bg-white flex items-center justify-center overflow-hidden relative border-b border-gray-100 p-4">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="288px"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-[#E87722] font-bold text-lg">
                          {product.brand}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {product.model}
                        </p>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 bg-[#E87722] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      {product.model}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-[#E87722] transition-colors line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-10">
            <Link
              href="/catalogo?brand=CMT%20Orange%20Tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E87722] text-white font-semibold rounded-lg hover:bg-[#C66A1A] transition-all"
            >
              Ver catálogo completo CMT
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
