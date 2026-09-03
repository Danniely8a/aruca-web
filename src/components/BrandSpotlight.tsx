"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
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
  dedicatedPage?: string;
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
    image: "/assets/brands/cmt123.jpg",
    highlights: ["Herramientas de precisión", "Corte profesional"],
    dedicatedPage: "/catalogo/cmt",
    items: [
      {
        name: "Kit de Discos para Ranurar",
        model: "230.012.08",
        image: "/assets/product-images/cmt-orange-tools/230.012.08.jpg",
        description: "Kit de discos para ranurar con precisión milimétrica.",
        href: "/productos/cmt-kit-de-discos-para-ranurar-230.012.08",
      },
      {
        name: "Disco Especial Melamina",
        model: "283.080.10M",
        image: "/assets/product-images/cmt-orange-tools/283-080-10M.jpg",
        description: "Disco de 250mm Z80 para cortes limpios en melamina.",
        href: "/productos/cmt-disco-melamina-250mm-z80-283-080-10M",
      },
      {
        name: "Mecha Recta para Ranurar",
        model: "811.627.11",
        image: "/assets/product-images/cmt-orange-tools/foto-811-812.jpg",
        description: "Mecha recta de 1/2 para ranurado preciso.",
        href: "/productos/cmt-mecha-recta-ranurar-1-2-eje-1-2-811-627-11",
      },
      {
        name: "Rematador de Cantos Doble",
        model: "DET-001",
        image: "/assets/product-images/cmt-orange-tools/DET-001.jpg",
        description: "Rematador doble de cantos para acabados perfectos.",
        href: "/productos/cmt-rematador-de-cantos-doble-det-001",
      },
      {
        name: "Fresa para Juntas",
        model: "800.606.11",
        image: "/assets/product-images/cmt-orange-tools/800-606-11.png",
        description: "Fresa para juntas de 1-7/8 para uniones precisas.",
        href: "/productos/cmt-fresa-juntas-1-7-8-800-606-11",
      },
    ],
  },
  {
    id: "milescraft",
    brandName: "Milescraft",
    displayName: "Milescraft",
    logo: "/assets/brands/milescraft.jpg",
    color: "#800020",
    category: "Accesorios",
    tagline: "Accesorios y plantillas para carpintería.",
    description:
      "Plantillas, accesorios y guías especializadas para carpintería y trabajos de madera. Soluciones que simplifican tu trabajo.",
    image: "/assets/brands/milescraft1.jpg",
    highlights: ["Plantillas especializadas", "Accesorios para carpintería"],
    items: [
      {
        name: "Base Ind. Dremel/Taladro",
        model: "1097",
        image: "/assets/product-images/milescraft/1097.jpg",
        description: "Base industrial para Dremel o taladro.",
        href: "/productos/milescraft-1097-toolstand",
      },
      {
        name: "Kit de Plantillas p/ Cerradura",
        model: "1213",
        image: "/assets/product-images/milescraft/1213.jpg",
        description: "Kit de plantillas para instalación de cerraduras.",
        href: "/productos/milescraft-1213-door-mortise-kit",
      },
      {
        name: "Plantilla para Cola de Milano",
        model: "1218",
        image: "/assets/product-images/milescraft/1218.jpg",
        description: "Plantilla para uniones de cola de milano.",
        href: "/productos/milescraft-1218-dovetail-template",
      },
      {
        name: "Plantilla de Círculos",
        model: "1219",
        image: "/assets/product-images/milescraft/1219.jpg",
        description: "Plantilla para cortar círculos perfectos.",
        href: "/productos/milescraft-1219-circleguide-kit",
      },
      {
        name: "Plantilla de Tornillos Ocultos PocketJig 200",
        model: "1325",
        image: "/assets/product-images/milescraft/1325.jpg",
        description: "Plantilla PocketJig 200 para tornillos ocultos.",
        href: "/productos/milescraft-1325-pocketjig-200",
      },
    ],
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
    image: "/assets/brands/sicar1.jpg",
    highlights: ["Herramientas manuales", "Para la industria de la madera"],
  },
  {
    id: "pony-jorgensen",
    brandName: "Pony Jorgensen",
    displayName: "Pony Jorgensen",
    logo: "/assets/brands/pony.jpg",
    color: "#D4892A",
    category: "Accesorios para Carpinteria",
    tagline: "Abrazaderas y herramientas profesionales de alta calidad.",
    description:
      "Abrazaderas, prensas y herramientas manuales de alta calidad para carpintería profesional. Sujeción firme y confiable para cada proyecto.",
    image: "/assets/brands/pony1.jpg",
    highlights: ["Abrazaderas profesionales", "Herramientas para carpintería", "Alta resistencia"],
    items: [
      {
        name: "Burros con Prensas",
        model: "60400",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/pony-jorgensen/60400.png",
        description: "Sujeción de piezas.",
        href: "/productos/pj-60400-burros-con-prensas",
      },
      {
        name: "Multiherramienta",
        model: "70800",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/pony-jorgensen/70800.png",
        description: "4AMP cortes y lijados.",
        href: "/productos/pj-70800-multiherramienta",
      },
      {
        name: "Prensa Rápida",
        model: "33408",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/pony-jorgensen/PRENSA_RAPIDO.jpg",
        description: "Sujeción instantánea 4\".",
        href: "/productos/pj-33408-prensa-rapida",
      },
      {
        name: "Kit Tipo Dremel 51pcs",
        model: "70931",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/pony-jorgensen/70931.jpg",
        description: "51 accesorios.",
        href: "/productos/pj-70931-kit-tipo-dremel-de-51pcs",
      },
      {
        name: "Prensa de Banco",
        model: "29050",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/pony-jorgensen/PRENSA_DE_BANCO_INDUSTRIAL.jpg",
        description: "Industrial 5\".",
        href: "/productos/pj-29050-prensa-de-banco-industrial",
      },
      {
        name: "Prensa con Cincha",
        model: "3225",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/pony-jorgensen/PRENSA_PARA_ENSAMBLAR_CON_CINCHA.jpg",
        description: "Ensamblar 12FT.",
        href: "/productos/pj-3225-prensa-para-ensamblar-con-cincha",
      },
    ],
  },
  {
    id: "prexiso",
    brandName: "Prexiso",
    displayName: "Prexiso",
    logo: "/assets/brands/prexiso-logo.png",
    color: "#D4A017",
    category: "Herramientas de Medición",
    tagline: "Herramientas de medición y marcado profesional de alta precisión.",
    description:
      "Medidores de distancia láser, niveles, escuadras y detectores profesionales de alta precisión. Instrumentos confiables para construcción y carpintería.",
    image: "/assets/brands/prexiso-hero.png",
    highlights: ["Medición láser de alta precisión", "Instrumentos profesionales"],
    items: [
      {
        name: "Medidor Distancia Laser",
        model: "P15P",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/prexiso/P15P.jpg",
        description: "15Mts con botón.",
        href: "/productos/prexiso-p15p-medidor-distancia-laser",
      },
      {
        name: "Metro Recarg. 2 en 1",
        model: "PLT40LI",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/prexiso/PLT40LI.jpg",
        description: "5Mts recargable.",
        href: "/productos/prexiso-plt40li-metro-recarg-2en1",
      },
      {
        name: "Nivel Laser 2 Ejes",
        model: "PLC10UT",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/prexiso/PLC10UT.jpg",
        description: "Tripos 10Mts.",
        href: "/productos/prexiso-plc10ut-nivel-laser-2-ejes-tripode",
      },
      {
        name: "Nivel Laser 360°",
        model: "PLC3-360G",
        image: "/assets/brands/prexiso-hero.png",
        description: "Tripos recargable.",
        href: "/productos/prexiso-plc3-360g-nivel-laser-360",
      },
      {
        name: "Detector Paredes",
        model: "PWDX-F38",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/prexiso/PWDX-F38.jpg",
        description: "Paredes y cables.",
        href: "/productos/prexiso-pwdx-f38-detector-paredes-cables",
      },
      {
        name: "Escuadra con Nivel",
        model: "PTL10G",
        image: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/prexiso/PTL10G.jpg",
        description: "20Mts con laser.",
        href: "/productos/prexiso-ptl10g-escuadra-nivel-laser",
      },
    ],
  },
  {
    id: "shamal",
    brandName: "Shamal",
    displayName: "Shamal",
    logo: "/assets/brands/shamal_logo.jpg",
    color: "#D71920",
    category: "Compresores",
    tagline: "Compresores a tornillo industriales.",
    description:
      "Compresores a tornillo y secadores de aire industriales de alta eficiencia. Potencia y confiabilidad para la industria.",
    image: "/assets/brands/shamal1.jpg",
    highlights: ["Compresores a tornillo", "Uso industrial"],
    items: [
      {
        name: "Compresor a Gasolina 7.5HP",
        model: "7.5HP",
        image:
          "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/product-images/1787578997399-8q4zm3.jpg",
        description: "Compresor a gasolina de 7.5HP con tanque de 270 litros.",
        href: "/productos/shamal-compresor-a-gasolina-7-5hp-270l",
      },
      {
        name: "Compresor a Tornillo con Tanque + Secador",
        model: "15HP",
        image: "/assets/product-images/shamal/compresor-tornillo-tanque-secador.jpg",
        description: "Compresor a tornillo con tanque y secador de 15HP.",
        href: "/productos/shamal-compresor-tornillo-tanque-secador-15HP",
      },
      {
        name: "Compresor a Tornillo sin Tanque 15HP",
        model: "15HP",
        image: "/assets/product-images/shamal/compresor-tornillo-sin-tanque.jpg",
        description: "Compresor a tornillo sin tanque de 15HP.",
        href: "/productos/shamal-compresor-tornillo-sin-tanque-15HP",
      },
      {
        name: "Compresor a Tornillo sin Tanque 20HP",
        model: "20HP",
        image: "/assets/product-images/shamal/compresor-tornillo-sin-tanque.jpg",
        description: "Compresor a tornillo sin tanque de 20HP.",
        href: "/productos/shamal-compresor-tornillo-sin-tanque-20HP",
      },
    ],
  },
  {
    id: "makita",
    brandName: "Makita",
    displayName: "Makita",
    logo: "/assets/brands/makita_x2.0.jpg",
    color: "#0098B6",
    category: "Herramientas Eléctricas",
    tagline: "Herramientas profesionales de alto rendimiento.",
    description:
      "Líder mundial en herramientas eléctricas inalámbricas LXT. Taladros, sierras, lijadoras, rotomartillos y más para profesionales.",
    image: "/assets/brands/makita-hero.png",
    highlights: ["Herramientas inalámbricas LXT", "Calidad profesional japonesa"],
    items: [
      {
        name: "Rotomartillo HR2470",
        model: "HR2470",
        image: "/assets/product-images/makita/HR2470.jpg",
        description: "Rotomartillo SDS-Plus de 780W para perforación y maciceo.",
        href: "/catalogo?brand=Makita",
      },
      {
        name: "Sierra Circular 5007N",
        model: "5007N",
        image: "/assets/product-images/makita/5007N.jpg",
        description: "Sierra circular de 7-1/4\" con base de magnesio.",
        href: "/catalogo?brand=Makita",
      },
      {
        name: "Lijadora BO5030",
        model: "BO5030",
        image: "/assets/product-images/makita/BO5030.jpg",
        description: "Lijadora orbital de 5\" con aspiración para acabados perfectos.",
        href: "/catalogo?brand=Makita",
      },
      {
        name: "Cepillo KP0800",
        model: "KP0800",
        image: "/assets/product-images/makita/KP0800.jpg",
        description: "Cepillo eléctrico de 3-1/4\" para acabados de madera.",
        href: "/catalogo?brand=Makita",
      },
      {
        name: "Ingletadora LS1040F",
        model: "LS1040F",
        image: "/assets/product-images/makita/LS1040F.jpg",
        description: "Ingletadora de 10\" con corte inclinado de alta precisión.",
        href: "/catalogo?brand=Makita",
      },
    ],
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
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

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

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Desliza para ver más productos de {brand.displayName}.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  aria-label="Anterior"
                  className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={20} style={{ color: brand.color }} />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  aria-label="Siguiente"
                  className="p-2.5 text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: brand.color }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex-shrink-0 w-64 sm:w-72 snap-start"
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
                        sizes="288px"
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
                href={brand.dedicatedPage || `/catalogo?brand=${encodeURIComponent(brand.brandName)}`}
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
