"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingCart,
  Wrench,
  FileText,
  Scissors,
  Settings,
  Star,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import { company } from "@/lib/data/company";
import { services } from "@/lib/data/services";
import { brands } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import HeroSlideshow from "@/components/HeroSlideshow";

const serviceIcons: Record<string, React.ReactNode> = {
  "shopping-cart": <ShoppingCart className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
  "file-text": <FileText className="w-6 h-6" />,
  scissors: <Scissors className="w-6 h-6" />,
  settings: <Settings className="w-6 h-6" />,
};

const stats = [
  { value: `${company.experience}`, label: "Años de Experiencia", icon: Clock },
  { value: `${company.products}+`, label: "Productos", icon: ShoppingCart },
  { value: `${company.brands}`, label: "Marcas Aliadas", icon: Award },
  { value: `${company.clients}+`, label: "Clientes Satisfechos", icon: Star },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* Background slideshow */}
        <HeroSlideshow />

        {/* Geometric accent shapes */}
        <div className="absolute top-20 right-[15%] w-72 h-72 border border-white/[0.03] rounded-full" />
        <div className="absolute top-32 right-[18%] w-56 h-56 border border-white/[0.03] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand/[0.05] rounded-full blur-[100px]" />

        {/* Horizontal line accents */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-accent-orange" />
                  <span className="text-accent-orange text-xs font-semibold uppercase tracking-[0.2em]">
                    Desde 1976
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] mb-6"
              >
                Maquinaria profesional{" "}
                <br className="hidden sm:block" />
                que impulsa tu{" "}
                <span className="relative">
                  negocio
                  <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M1 5.5C40 2 80 1 100 3C120 5 160 6 199 3" stroke="#D4892A" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-gray-300/90 mb-10 max-w-xl leading-relaxed"
              >
                Herramientas, compresores y equipos de las mejores marcas.
                Asesoría técnica y las mejores cotizaciones del mercado.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0c1829] font-semibold rounded-lg hover:bg-gray-100 transition-all text-sm"
                >
                  Explorar Catálogo
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="https://wa.me/584126109597"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-all text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Cotizar por WhatsApp
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-8"
              >
                <div>
                  <p className="text-3xl font-bold text-white">50<span className="text-accent-orange">+</span></p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Años de experiencia</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <p className="text-3xl font-bold text-white">14</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Marcas aliadas</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <p className="text-3xl font-bold text-white">500<span className="text-accent-orange">+</span></p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Clientes activos</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.1] transition-all">
                  <div className="w-10 h-10 bg-accent-orange/15 rounded-lg flex items-center justify-center mb-4">
                    <Wrench size={20} className="text-accent-orange" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">Herramientas</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Profesionales de las mejores marcas</p>
                </div>
                <div className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.1] transition-all">
                  <div className="w-10 h-10 bg-brand/15 rounded-lg flex items-center justify-center mb-4">
                    <Settings size={20} className="text-brand-light" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">Compresores</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Industriales y de alta potencia</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.1] transition-all">
                  <div className="w-10 h-10 bg-green-500/15 rounded-lg flex items-center justify-center mb-4">
                    <Scissors size={20} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">Corte</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Sierras, cortadoras y discos</p>
                </div>
                <div className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.1] transition-all">
                  <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center mb-4">
                    <Shield size={20} className="text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">Garantía</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Soporte técnico especializado</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-brand/10 text-brand rounded-lg mb-3">
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
              Nuestros Servicios
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Soluciones Completas para Tu Negocio
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Ofrecemos un servicio integral que va desde la venta de equipos
              hasta el soporte técnico especializado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center mb-4">
                  {serviceIcons[service.icon]}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.features && (
                  <ul className="space-y-1.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Shield size={14} className="text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-accent-orange/10 text-accent-orange text-sm font-semibold rounded-full mb-4">
              Marcas Aliadas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trabajamos con las Mejores Marcas
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Somos distribuidores oficiales de las marcas más reconocidas
              internacionalmente en la industria.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-brand/5 hover:shadow-md transition-all border border-transparent hover:border-brand/20 min-h-[120px]"
              >
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow overflow-hidden">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <span className="text-brand font-bold text-xs text-center leading-tight px-1">
                      {brand.name.split(" ")[0]}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700 leading-tight">
                  {brand.name}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {brand.country}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Ver todas las marcas
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
              Productos Destacados
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Lo Que Nuestros Clientes Eligen
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Los equipos y herramientas más demandados por los profesionales
              de la industria de la madera.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => p.featured).slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/productos/${product.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-center">
                        <p className="text-brand font-bold text-lg">{product.brand}</p>
                        <p className="text-gray-400 text-xs mt-1">{product.model}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {product.brand}
                      </span>
                      <span className="text-[10px] text-gray-400">{product.model}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {product.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-orange group-hover:gap-2 transition-all">
                      Solicitar Cotización
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all"
            >
              Ver Catálogo Completo
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              ¿Necesitas una Cotización?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Contáctanos ahora y recibe asesoría personalizada. Respondemos en
              menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cotizacion"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 hover:shadow-lg transition-all"
              >
                Solicitar Cotización
                <ArrowRight size={18} />
              </Link>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
