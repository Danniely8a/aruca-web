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

const featuredBrand = {
  id: "kdt",
  name: "KDT",
  fullName: "KDT Machinery",
  logo: "/assets/kdt/kdt_ico.png",
  website: "https://kdtcolombia.com",
  category: "Maquinaria",
  tagline:
    "Máquinas de gran prestigio, solidez y fiabilidad para la industria del mueble y la madera.",
  description:
    "KDT Machinery es fabricante líder de maquinaria para procesar madera y láminas: seccionadoras, enchapadoras de canto, taladros CNC y centros de mecanizado. En ARUCA somos distribuidores oficiales, con instalación, asesoría técnica y respaldo de repuestos.",
  highlights: [
    "Distribuidor oficial y exclusivo",
    "Instalación y soporte técnico especializado",
    "Repuestos y servicio postventa garantizados",
  ],
};

const machines = [
  {
    id: "maquinas-de-corte",
    name: "Máquinas de Corte",
    model: "KS-832D",
    image: "/assets/kdt/kdt_ks132pv.png",
    description:
      "Seccionadoras y sierras escuadradoras CNC de alta precisión para corte de paneles.",
  },
  {
    id: "enchapadoras-de-canto",
    name: "Enchapadoras de Canto",
    model: "KE-365 · KE-665JKSA",
    image: "/assets/kdt/kdt_ke365.png",
    description:
      "Enchapadoras automáticas para acabados perfectos en cantos y bordes.",
  },
  {
    id: "taladros-cnc",
    name: "Taladros CNC",
    model: "KD-610HR",
    image: "/assets/kdt/kdt_kd610z.png",
    description:
      "Centros de perforado y ranurado de alta velocidad para producción en serie.",
  },
  {
    id: "cnc",
    name: "Centros CNC",
    model: "KN-2709L · KN-2710L",
    image: "/assets/kdt/kdt_kn2709l.png",
    description:
      "CNC nesting y centros de mecanizado para fresado, corte y taladrado.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function BrandSpotlight() {
  return (
    <section id="marca-kdt" className="relative overflow-hidden">
      {/* ===== Hero KDT (claro) ===== */}
      <div className="relative bg-white border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-kdt-secondary" />

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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-kdt text-white text-[10px] font-bold uppercase tracking-wider rounded-sm">
                  <Sparkles size={12} />
                  Marca Destacada
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-kdt/10 text-kdt text-[10px] font-bold uppercase tracking-wider rounded-sm">
                  <Award size={12} />
                  Distribuidor Oficial
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-5 mb-5">
                <a
                  href="/catalogo?brand=KDT"
                  className="group/brand flex items-center gap-5"
                >
                  <Image
                    src={featuredBrand.logo}
                    alt={`${featuredBrand.fullName} logo`}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-gray-900 font-bold text-xl sm:text-2xl leading-none group-hover/brand:text-kdt transition-colors">
                      {featuredBrand.fullName}
                    </p>
                    <p className="text-kdt text-xs font-semibold uppercase tracking-wider mt-1.5">
                      {featuredBrand.category}
                    </p>
                  </div>
                </a>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3"
              >
                {featuredBrand.tagline}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-gray-500 leading-relaxed mb-6 max-w-xl text-sm sm:text-base"
              >
                {featuredBrand.description}
              </motion.p>

              <motion.ul variants={fadeUp} className="space-y-2.5 mb-7">
                {featuredBrand.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="w-6 h-6 shrink-0 bg-kdt/10 text-kdt rounded-sm flex items-center justify-center">
                      <ShieldCheck size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="/catalogo?brand=KDT"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-kdt text-white font-semibold rounded-sm hover:bg-kdt-secondary transition-all text-sm"
                >
                  Ver Maquinaria KDT
                  <ArrowRight size={16} />
                </a>
                <a
                  href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                    `Hola, quiero una cotización de maquinaria ${featuredBrand.name}.`
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
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                <Image
                  src="/assets/kdt/kdt_hero1.jpg"
                  alt="Maquinaria KDT en producción"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-md border border-gray-100 px-5 py-3 hidden sm:flex items-center gap-3">
                <Factory size={20} className="text-kdt" />
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                    {featuredBrand.category}
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

      {/* ===== Maquinaria KDT ===== */}
      <div id="maquinaria-kdt" className="bg-gray-50 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 lg:mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-kdt/10 text-kdt text-sm font-semibold rounded-full mb-3 uppercase tracking-wide">
              Catálogo KDT
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 uppercase">
              Maquinaria de Precisión
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Líneas completas para corte, enchape, perforado y mecanizado CNC
              de madera y láminas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {machines.map((machine, index) => (
              <motion.div
                key={machine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <a
                  href="/catalogo?brand=KDT"
                  className="group block bg-white rounded-xl border border-gray-200 hover:border-kdt/40 hover:shadow-lg transition-all overflow-hidden h-full"
                >
                  <div className="aspect-square bg-white flex items-center justify-center overflow-hidden relative border-b border-gray-100">
                    <Image
                      src={machine.image}
                      alt={machine.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Factory size={14} className="text-kdt shrink-0" />
                      <span className="text-[10px] font-bold text-kdt uppercase tracking-wide">
                        {machine.model}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-kdt transition-colors">
                      {machine.name}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {machine.description}
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
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                `Hola, quiero información de la maquinaria ${featuredBrand.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-kdt text-white font-semibold rounded-sm hover:bg-kdt-secondary transition-all"
            >
              <Wrench size={16} />
              Solicitar Asesoría Técnica
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
