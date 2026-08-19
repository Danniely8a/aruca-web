"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const featuredBrands = [
  {
    brandName: "KDT",
    displayName: "KDT Machinery",
    logo: "/assets/kdt/kdt_ico.png",
    color: "#284a90",
    category: "Maquinaria",
    tagline: "¡La Tecnología que impulsa tu negocio!",
    description:
      "Maquinaria de precisión para la industria del mueble y la madera: seccionadoras, enchapadoras, taladros CNC y centros de mecanizado.",
    image: "/assets/kdt/kdt_hero1.jpg",
    highlights: [
      "Distribuidor oficial y exclusivo",
      "Instalación y soporte técnico especializado",
      "Repuestos y servicio postventa garantizados",
    ],
  },
  {
    brandName: "Titebond",
    displayName: "Titebond",
    logo: "/assets/brands/titebond.jpg",
    color: "#D71920",
    category: "Adhesivos",
    tagline: "El estándar de la industria en pegamentos para madera.",
    description:
      "Pegamentos y adhesivos profesionales para carpintería con uniones duraderas y de máxima resistencia.",
    image: "/assets/product-images/titebond/TITEBOND III CUNO.webp",
    highlights: ["Adhesivos de alta resistencia", "Estándar de la industria"],
  },
  {
    brandName: "ICA",
    displayName: "ICA",
    logo: "/assets/brands/ica.png",
    color: "#005BAC",
    category: "Pinturas y Acabados",
    tagline: "Acabados italianos de alta calidad.",
    description:
      "Selladores, fondos, transparentes y acabados poliuretano para un acabado perfecto de la madera.",
    image: "/assets/product-images/ica/ICA KIT SELLADOR P.U.jpg",
    highlights: ["Acabados poliuretano", "Calidad italiana"],
  },
  {
    brandName: "CMT Orange Tools",
    displayName: "CMT Orange Tools",
    logo: "/assets/brands/cmt_x2.0.jpeg",
    color: "#E87722",
    category: "Herramientas de Corte",
    tagline: "Precisión italiana para el corte de madera.",
    description:
      "Sierras, fresas y accesorios de corte profesional para carpintería y ebanistería.",
    image: "/assets/product-images/cmt-orange-tools/290.200.24M.jpg",
    highlights: ["Herramientas de precisión", "Corte profesional"],
  },
  {
    brandName: "Milescraft",
    displayName: "Milescraft",
    logo: "/assets/brands/milescraft.jpg",
    color: "#0057B8",
    category: "Accesorios",
    tagline: "Accesorios y plantillas para carpintería.",
    description:
      "Plantillas, accesorios y guías especializadas para carpintería y trabajos de madera.",
    image: "/assets/product-images/milescraft/1097.jpg",
    highlights: ["Plantillas especializadas", "Accesorios para carpintería"],
  },
  {
    brandName: "Sicar",
    displayName: "Sicar",
    logo: "/assets/brands/sicar.jpg",
    color: "#C8102E",
    category: "Herramientas Manuales",
    tagline: "Herramientas especializadas para la madera.",
    description:
      "Herramientas y productos especializados para la industria de la madera.",
    image: "",
    highlights: ["Herramientas manuales", "Para la industria de la madera"],
  },
  {
    brandName: "Pony Jorgensen",
    displayName: "Pony Jorgensen",
    logo: "/assets/brands/pony.jpg",
    color: "#003865",
    category: "Herramientas Manuales",
    tagline: "Abrazaderas profesionales de alta calidad.",
    description:
      "Abrazaderas y herramientas manuales de alta calidad para carpintería profesional.",
    image: "",
    highlights: ["Abrazaderas profesionales", "Alta resistencia"],
  },
  {
    brandName: "Shamal",
    displayName: "Shamal",
    logo: "/assets/brands/shamal_logo.jpg",
    color: "#0E7C66",
    category: "Compresores",
    tagline: "Compresores a tornillo industriales.",
    description:
      "Compresores a tornillo y secadores de aire industriales de alta eficiencia.",
    image: "/assets/product-images/shamal/compresor-tornillo-sin-tanque.jpg",
    highlights: ["Compresores a tornillo", "Uso industrial"],
  },
];

export default function BrandSpotlight() {
  return (
    <section id="marcas-destacadas" className="bg-white border-b border-gray-100 py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-3 uppercase tracking-wide">
            Marcas Destacadas
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 uppercase">
            Nuestras Marcas Aliadas
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3">
            Distribuidores oficiales de las marcas líderes de la industria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {featuredBrands.map((brand, index) => (
            <motion.div
              key={brand.brandName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 2) * 0.1 }}
              className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              {/* Header de marca */}
              <div
                className="p-5 flex items-center gap-4"
                style={{ backgroundColor: brand.color }}
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative">
                  <Image
                    src={brand.logo}
                    alt={`${brand.displayName} logo`}
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-lg sm:text-xl leading-tight truncate">
                    {brand.displayName}
                  </h3>
                  <span className="text-white/80 text-[11px] font-semibold uppercase tracking-wide">
                    {brand.category}
                  </span>
                </div>
              </div>

              {/* Imagen */}
              <div className="aspect-[16/9] bg-gray-50 flex items-center justify-center overflow-hidden relative">
                {brand.image ? (
                  <Image
                    src={brand.image}
                    alt={brand.displayName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={brand.logo}
                    alt={brand.displayName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-10 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Contenido */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="font-bold text-gray-900 text-base sm:text-lg mb-2">
                  {brand.tagline}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {brand.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {brand.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck
                        size={15}
                        className="shrink-0"
                        style={{ color: brand.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/catalogo?brand=${encodeURIComponent(brand.brandName)}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-md text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: brand.color }}
                >
                  Ver productos {brand.displayName}
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
