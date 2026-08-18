"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Users,
  Shield,
  Eye,
  Star,
  Clock,
  Phone,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Zap,
  HeartHandshake,
  Heart,
} from "lucide-react";
import { company } from "@/lib/data/company";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const valueIcons: Record<string, React.ReactNode> = {
  users: <Users size={28} />,
  shield: <Shield size={28} />,
  eye: <Eye size={28} />,
  star: <Star size={28} />,
  clock: <Clock size={28} />,
  heart: <Heart size={28} />,
};

const timeline = [
  { year: "1976", title: "Nacimiento", text: "Nace ARUCA como proyecto familiar con vocación de servicio." },
  { year: "1990", title: "Consolidación", text: "Nos establecemos como referente en distribución de maquinaria." },
  { year: "2010", title: "Expansión", text: "Integramos tecnología de vanguardia y ampliamos cobertura nacional." },
  { year: "2026", title: "Futuro", text: "50+ años de excelencia, liderando con rigor corporativo." },
];

export default function NosotrosPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative bg-brand pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-orange/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />
        </div>

        <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-4">
              <Breadcrumbs dark items={[{ label: "Nosotros" }]} />
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-accent-orange" />
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
                Desde 1976
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Construyendo el futuro{" "}
              <span className="text-accent-orange">junto a ti</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Más de 50 años respaldando a los mejores profesionales de la
              industria de la madera en Venezuela.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Stats bar */}
      <section className="relative z-10 -mt-8 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 sm:p-8"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: company.experience, label: "Años", icon: <Zap size={18} className="text-brand" /> },
                { value: `${company.clients}+`, label: "Clientes", icon: <Users size={18} className="text-accent-orange" /> },
                { value: `${company.products}+`, label: "Productos", icon: <Star size={18} className="text-green-500" /> },
                { value: company.brands, label: "Marcas", icon: <HeartHandshake size={18} className="text-purple-500" /> },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl mb-3">
                    {stat.icon}
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reseña Histórica */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent-orange rounded-full" />
                <span className="text-sm font-semibold text-accent-orange uppercase tracking-wider">
                  Reseña Histórica
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Cinco Décadas de{" "}
                <span className="text-brand">Compromiso</span> y{" "}
                <span className="text-accent-orange">Transformación</span>
              </h2>

              <div className="space-y-5">
                {company.history.split("\n\n").map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="text-gray-500 leading-relaxed text-base sm:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-accent-orange to-brand/20" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-0 w-12 h-12 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-brand">{item.year.slice(2)}</span>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base font-bold text-brand">{item.year}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-base font-medium text-gray-700">{item.title}</span>
                      </div>
                      <p className="text-base text-gray-500">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-brand to-brand/80 rounded-3xl p-8 sm:p-10 text-white overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <Target size={28} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Misión</h3>
                <p className="text-white/80 leading-relaxed text-base sm:text-lg">{company.mission}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-white rounded-3xl p-8 sm:p-10 text-brand overflow-hidden border border-gray-100 shadow-sm"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Visión</h3>
                <p className="text-gray-500 leading-relaxed text-base sm:text-lg">{company.vision}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent-orange" />
              <span className="text-sm font-semibold text-accent-orange uppercase tracking-wider">
                Valores Corporativos
              </span>
              <div className="w-8 h-px bg-accent-orange" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Lo que nos define
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Principios fundamentales que guían cada una de nuestras acciones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {company.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                  {valueIcons[value.icon]}
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{value.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-24 bg-brand overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Contáctanos y descubre cómo podemos ayudarte a hacer crecer tu negocio.
            </p>
            <a
              href="https://wa.me/584126109597"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 transition-all shadow-lg shadow-accent-orange/25"
            >
              <Phone size={20} />
              Contáctanos ahora
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
