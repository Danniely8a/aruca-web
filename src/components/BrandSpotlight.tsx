"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Factory,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { company } from "@/lib/data/company";
import { useProducts } from "@/lib/hooks/useProducts";

type Item = {
  name: string;
  model: string;
  image: string;
  description: string;
  href: string;
};

type Brand = {
  id: string;
  brandName: string;
  displayName: string;
  logo: string;
  color: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  imageScale?: string;
  imageContain?: boolean;
  highlights: string[];
  items?: Item[];
};

const brands: Brand[] = [
  {
    id: "kdt",
    brandName: "KDT",
    displayName: "KDT Machinery",
    logo: "/assets/kdt/kdt_ico.png",
    color: "#284a90",
    category: "Maquinaria",
    tagline:
      "Máquinas de gran prestigio, solidez y fiabilidad para la industria del mueble y la madera.",
    description:
      "KDT Machinery es fabricante líder de maquinaria para procesar madera y láminas: seccionadoras, enchapadoras de canto, taladros CNC y centros de mecanizado. En ARUCA somos distribuidores oficiales, con instalación, asesoría técnica y respaldo de repuestos.",
    image: "/assets/kdt/kdt_hero1.jpg",
    highlights: [
      "Distribuidor oficial y exclusivo",
      "Instalación y soporte técnico especializado",
      "Repuestos y servicio postventa garantizados",
    ],
    items: [
      {
        name: "Máquinas de Corte",
        model: "KS-832D",
        image: "/assets/kdt/kdt_ks132pv.png",
        description:
          "Seccionadoras y sierras escuadradoras CNC de alta precisión para corte de paneles.",
        href: "/catalogo?brand=KDT",
      },
      {
        name: "Enchapadoras de Canto",
        model: "KE-365 · KE-665JKSA",
        image: "/assets/kdt/kdt_ke365.png",
        description:
          "Enchapadoras automáticas para acabados perfectos en cantos y bordes.",
        href: "/catalogo?brand=KDT",
      },
      {
        name: "Taladros CNC",
        model: "KD-610HR",
        image: "/assets/kdt/kdt_kd610z.png",
        description:
          "Centros de perforado y ranurado de alta velocidad para producción en serie.",
        href: "/catalogo?brand=KDT",
      },
      {
        name: "Centros CNC",
        model: "KN-2709L · KN-2710L",
        image: "/assets/kdt/kdt_kn2709l.png",
        description:
          "CNC nesting y centros de mecanizado para fresado, corte y taladrado.",
        href: "/catalogo?brand=KDT",
      },
    ],
  },
  {
    id: "titebond",
    brandName: "Titebond",
    displayName: "Titebond",
    logo: "/assets/brands/titebond.jpg",
    color: "#D4A017",
    category: "Adhesivos",
    tagline: "El estándar de la industria en pegamentos para madera.",
    description:
      "Pegamentos y adhesivos profesionales para carpintería con uniones duraderas y de máxima resistencia. La elección número uno de carpinteros en todo el mundo.",
    image: "/assets/brands/titebond1.jpg",
    imageScale: "scale-[1.6]",
    highlights: [
      "Adhesivos de alta resistencia",
      "Uniones duraderas y seguras",
    ],
    items: [
      {
        name: "Titebond Original",
        model: "Cola para madera",
        image: "/assets/product-images/titebond/TITEBOND ORIGINAL 1.8.png",
        description:
          "Pegamento para madera de secado rápido, el estándar de la industria.",
        href: "/productos/titebond-original-1-8-0-473l",
      },
      {
        name: "Titebond Heavy Duty",
        model: "Construcción",
        image: "/assets/product-images/titebond/TITEBOND HEAVY DUTY A BASE DE AGUA.avif",
        description:
          "Adhesivo de construcción de alta resistencia para múltiples superficies.",
        href: "/productos/titebond-heavy-duty-base-agua-295ml",
      },
      {
        name: "Titebond TiteGrab",
        model: "Construcción",
        image: "/assets/product-images/titebond/TITEBOND TITEGRAB.jpg",
        description: "Adhesivo de construcción con agarre instantáneo.",
        href: "/productos/titebond-titegrab-295ml",
      },
      {
        name: "Titebond Instant Bond",
        model: "Agarre rápido",
        image: "/assets/product-images/titebond/TITEBOND INSTANT BOND.webp",
        description: "Adhesivo de agarre inmediato para proyectos rápidos.",
        href: "/productos/titebond-instant-bond-2oz-1-64",
      },
    ],
  },
  {
    id: "ica",
    brandName: "ICA",
    displayName: "ICA",
    logo: "/assets/brands/ica.png",
    color: "#005BAC",
    category: "Pinturas y Acabados",
    tagline: "Acabados italianos de alta calidad.",
    description:
      "Selladores, fondos, transparentes y acabados poliuretano para un acabado perfecto de la madera. Calidad italiana para cada superficie.",
    image: "/assets/product-images/ica/ICA KIT SELLADOR P.U.jpg",
    imageContain: true,
    highlights: ["Acabados poliuretano", "Calidad italiana"],
    items: [
      {
        name: "ICA Kit Fondo Blanco",
        model: "Fondo",
        image: "/assets/product-images/ica/ICA KIT FONDO BLANCO P.U.jpg",
        description:
          "Kit de fondo blanco poliuretano para un acabado base perfecto.",
        href: "/productos/ica-kit-fondo-blanco-pu-fp1031b",
      },
      {
        name: "ICA Topdeck",
        model: "Topdeck",
        image: "/assets/product-images/ica/topdeck.jpg",
        description:
          "Recubrimiento Topdeck de alta resistencia para superficies de madera.",
        href: "/productos/ica-topdeck-05",
      },
      {
        name: "ICA Parquet VPA823G40-05",
        model: "Parquet",
        image: "/assets/product-images/ica/ICA PARQUET SATINADO ACUOSO.jpg",
        description:
          "Parquet satinado acuoso para acabados de alta calidad.",
        href: "/productos/ica-parquet-satinado-acuoso",
      },
      {
        name: "ICA Solvente",
        model: "Solvente",
        image: "/assets/product-images/ica/solvente-pu-u1010-05.png",
        description:
          "Solvente poliuretano para dilución y limpieza de herramientas.",
        href: "/productos/ica-solvente-pu-u1010-05",
      },
    ],
  },
  {
    id: "cmt-orange-tools",
    brandName: "CMT Orange Tools",
    displayName: "CMT Orange Tools",
    logo: "/assets/brands/cmt_x2.0.jpeg",
    color: "#E87722",
    category: "Herramientas de Corte",
    tagline: "Precisión italiana para el corte de madera.",
    description:
      "Sierras, fresas y accesorios de corte profesional para carpintería y ebanistería. Herramientas de precisión de la más alta calidad.",
    image: "/assets/product-images/cmt-orange-tools/290.200.24M.jpg",
    highlights: ["Herramientas de precisión", "Corte profesional"],
  },
  {
    id: "milescraft",
    brandName: "Milescraft",
    displayName: "Milescraft",
    logo: "/assets/brands/milescraft.jpg",
    color: "#0057B8",
    category: "Accesorios",
    tagline: "Accesorios y plantillas para carpintería.",
    description:
      "Plantillas, accesorios y guías especializadas para carpintería y trabajos de madera. Soluciones que simplifican tu trabajo.",
    image: "/assets/product-images/milescraft/1097.jpg",
    highlights: ["Plantillas especializadas", "Accesorios para carpintería"],
  },
  {
    id: "sicar",
    brandName: "Sicar",
    displayName: "Sicar",
    logo: "/assets/brands/sicar.jpg",
    color: "#C8102E",
    category: "Herramientas Manuales",
    tagline: "Herramientas especializadas para la madera.",
    description:
      "Herramientas y productos especializados para la industria de la madera. Calidad y durabilidad para el trabajo diario.",
    image: "",
    highlights: ["Herramientas manuales", "Para la industria de la madera"],
  },
  {
    id: "pony-jorgensen",
    brandName: "Pony Jorgensen",
    displayName: "Pony Jorgensen",
    logo: "/assets/brands/pony.jpg",
    color: "#003865",
    category: "Herramientas Manuales",
    tagline: "Abrazaderas profesionales de alta calidad.",
    description:
      "Abrazaderas y herramientas manuales de alta calidad para carpintería profesional. Sujeción firme y confiable para cada proyecto.",
    image: "",
    highlights: ["Abrazaderas profesionales", "Alta resistencia"],
  },
  {
    id: "shamal",
    brandName: "Shamal",
    displayName: "Shamal",
    logo: "/assets/brands/shamal_logo.jpg",
    color: "#0E7C66",
    category: "Compresores",
    tagline: "Compresores a tornillo industriales.",
    description:
      "Compresores a tornillo y secadores de aire industriales de alta eficiencia. Potencia y confiabilidad para la industria.",
    image: "/assets/product-images/shamal/compresor-tornillo-sin-tanque.jpg",
    highlights: ["Compresores a tornillo", "Uso industrial"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function BrandSection({ brand }: { brand: Brand }) {
  const items: Item[] =
    brand.items ||
    [];
  const hasItems = items.length > 0;

  return (
    <section id={`marca-${brand.id}`} className="relative overflow-hidden">
      {/* ===== Hero ===== */}
      <div className="relative bg-white border-b border-gray-100">
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ backgroundColor: brand.color }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm"
                  style={{ backgroundColor: brand.color }}
                >
                  <Sparkles size={12} />
                  Marca Destacada
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm"
                  style={{ backgroundColor: `${brand.color}1a`, color: brand.color }}
                >
                  <Award size={12} />
                  Distribuidor Oficial
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-5 mb-5">
                <a
                  href={`/catalogo?brand=${encodeURIComponent(brand.brandName)}`}
                  className="group/brand flex items-center gap-5"
                >
                  <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 relative">
                    <Image
                      src={brand.logo}
                      alt={`${brand.displayName} logo`}
                      fill
                      sizes="56px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div>
                    <p
                      className="text-gray-900 font-bold text-xl sm:text-2xl leading-none transition-colors"
                      style={{}}
                    >
                      {brand.displayName}
                    </p>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mt-1.5"
                      style={{ color: brand.color }}
                    >
                      {brand.category}
                    </p>
                  </div>
                </a>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3"
              >
                {brand.tagline}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-gray-500 leading-relaxed mb-6 max-w-xl text-sm sm:text-base"
              >
                {brand.description}
              </motion.p>

              <motion.ul variants={fadeUp} className="space-y-2.5 mb-7">
                {brand.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span
                      className="w-6 h-6 shrink-0 rounded-sm flex items-center justify-center"
                      style={{ backgroundColor: `${brand.color}1a`, color: brand.color }}
                    >
                      <ShieldCheck size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`/catalogo?brand=${encodeURIComponent(brand.brandName)}`}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-white font-semibold rounded-sm transition-opacity hover:opacity-90 text-sm"
                  style={{ backgroundColor: brand.color }}
                >
                  Ver productos {brand.displayName}
                  <ArrowRight size={16} />
                </a>
                <a
                  href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                    `Hola, quiero una cotización de ${brand.displayName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#20bd5a] transition-all text-sm"
                >
                  Cotizar por WhatsApp
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <p className="font-bold text-lg sm:text-xl mb-3" style={{ color: brand.color }}>
                ¡La Tecnología que impulsa tu negocio!
              </p>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-gray-50 flex items-center justify-center">
                <Image
                  src={brand.image || brand.logo}
                  alt={brand.displayName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={
                    !brand.image
                      ? "object-contain p-12"
                      : brand.imageContain
                        ? "object-contain p-4"
                        : `object-cover ${brand.imageScale || ""}`
                  }
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-md border border-gray-100 px-5 py-3 hidden sm:flex items-center gap-3">
                <Factory size={20} style={{ color: brand.color }} />
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                    {brand.category}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Distribuidor oficial ARUCA
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== Productos ===== */}
      {hasItems && (
        <div className="bg-gray-50 py-10 sm:py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 lg:mb-12"
            >
              <span
                className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-3 uppercase tracking-wide"
                style={{ backgroundColor: `${brand.color}1a`, color: brand.color }}
              >
                Catálogo {brand.displayName}
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 uppercase">
                {brand.category}
              </h3>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                Los productos más destacados de {brand.displayName}.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {items.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <a
                    href={item.href}
                    className="group block bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden h-full"
                  >
                    <div className="aspect-square bg-white flex items-center justify-center overflow-hidden relative border-b border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Factory size={14} className="shrink-0" style={{ color: brand.color }} />
                        <span
                          className="text-[10px] font-bold uppercase tracking-wide"
                          style={{ color: brand.color }}
                        >
                          {item.model}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <a
                href={`/catalogo?brand=${encodeURIComponent(brand.brandName)}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: brand.color }}
              >
                <Wrench size={16} />
                Ver catálogo completo
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function BrandSpotlight() {
  const { products } = useProducts();

  return (
    <>
      {brands.map((brand) => {
        const resolvedItems: Item[] =
          brand.items && brand.items.length > 0
            ? brand.items
            : products
                .filter(
                  (p) =>
                    (p.brand || "").toLowerCase() === brand.brandName.toLowerCase()
                )
                .slice(0, 4)
                .map((p) => ({
                  name: p.name,
                  model: p.model || "",
                  image: p.image || "",
                  description: p.shortDescription || p.description || "",
                  href: `/productos/${p.slug}`,
                }));

        return (
          <BrandSection
            key={brand.id}
            brand={{ ...brand, items: resolvedItems }}
          />
        );
      })}
    </>
  );
}
