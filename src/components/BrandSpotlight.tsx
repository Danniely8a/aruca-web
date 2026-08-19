"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ExternalLink,
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
  logo: "/assets/kdt/kdt_logo.png",
  website: "https://kdtcolombia.com",
  category: "Maquinaria",
  country: "China / Colombia",
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
    model: "KS-132PV · KS-828D",
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
    model: "KD-610Z · KD-612G",
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
      {/* ===== Hero KDT ===== */}
      <div className="relative bg-kdt-dark overflow-hidden">
        <Image
          src="/assets/kdt/kdt_hero1.jpg"
          alt="Maquinaria KDT"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kdt-dark via-kdt-dark/85 to-kdt-dark/40" />
        <div className="absolute top-0 left-0 w-full h-1 bg-kdt" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-kdt text-white text-[10px] font-bold uppercase tracking-wider rounded-sm">
                <Sparkles size={12} />
                Marca Destacada
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/15 text-white/90 text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                <Award size={12} className="text-kdt" />
                Distribuidor Oficial
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-6">
              <Image
                src={featuredBrand.logo}
                alt={`${featuredBrand.fullName} logo`}
                width={220}
                height={64}
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
            >
              {featuredBrand.tagline}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-300 leading-relaxed mb-8 max-w-2xl"
            >
              {featuredBrand.description}
            </motion.p>

            <motion.ul variants={fadeUp} className="space-y-3 mb-10">
              {featuredBrand.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-200">
                  <span className="w-6 h-6 shrink-0 bg-kdt/20 text-kdt rounded-sm flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#maquinaria-kdt"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-kdt text-white font-semibold rounded-sm hover:bg-kdt/90 transition-all text-sm"
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-kdt-dark font-semibold rounded-sm hover:bg-gray-100 transition-all text-sm"
              >
                Cotizar por WhatsApp
              </a>
              <a
                href={featuredBrand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white/70 font-semibold hover:text-white transition-colors text-sm"
              >
                Sitio oficial
                <ExternalLink size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== Maquinaria KDT ===== */}
      <div id="maquinaria-kdt" className="bg-white border-b border-gray-100 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-kdt/10 text-kdt text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
              Catálogo KDT
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 uppercase">
              Maquinaria de Precisión
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Líneas completas para corte, enchape, perforado y mecanizado CNC
              de madera y láminas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {machines.map((machine, index) => (
              <motion.div
                key={machine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white rounded-xl border border-gray-200 hover:border-kdt/40 hover:shadow-lg transition-all overflow-hidden"
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
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Factory size={14} className="text-kdt shrink-0" />
                    <span className="text-[10px] font-bold text-kdt uppercase tracking-wide">
                      {machine.model}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{machine.name}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {machine.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                `Hola, quiero información de la maquinaria ${featuredBrand.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-kdt text-white font-semibold rounded-sm hover:bg-kdt/90 transition-all"
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
