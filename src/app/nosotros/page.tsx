"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  Shield,
  Eye,
  Star,
  Clock,
  ArrowRight,
  Phone,
  Award,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { company } from "@/lib/data/company";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const valueIcons: Record<string, React.ReactNode> = {
  users: <Users size={24} />,
  shield: <Shield size={24} />,
  eye: <Eye size={24} />,
  star: <Star size={24} />,
  clock: <Clock size={24} />,
};

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-semibold rounded-full mb-4">
              Sobre Nosotros
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Conoce a ARUCA Maquinarias
            </h1>
            <p className="text-white/80 text-lg">
              Más de 50 años de experiencia respaldando a los mejores
              profesionales de la industria de la madera.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: company.experience, label: "Años de Experiencia", color: "text-brand", bg: "bg-brand/5" },
              { value: `${company.clients}+`, label: "Clientes Activos", color: "text-accent-orange", bg: "bg-accent-orange/5" },
              { value: `${company.products}+`, label: "Productos", color: "text-green-600", bg: "bg-green-50" },
              { value: company.brands, label: "Marcas Aliadas", color: "text-purple-600", bg: "bg-purple-50" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${stat.bg} rounded-2xl p-6 text-center`}
              >
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reseña Histórica */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
                Nuestra Historia
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Cinco Décadas de Compromiso y Transformación
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                {company.history.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-brand/5 rounded-2xl p-8 border border-brand/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                    <Target size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Misión</h3>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">{company.mission}</p>
              </div>

              <div className="bg-accent-orange/5 rounded-2xl p-8 border border-accent-orange/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent-orange/10 text-accent-orange rounded-xl flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Visión</h3>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">{company.vision}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
              Valores Corporativos
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Lo que nos define
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Principios fundamentales que guían cada una de nuestras acciones y decisiones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center mb-4">
                  {valueIcons[value.icon]}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              ¿Listo para Trabajar con Nosotros?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Contáctanos y descubre cómo podemos ayudarte a hacer crecer tu negocio.
            </p>
            <a
              href="https://wa.me/584126109597"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 transition-all"
            >
              <Phone size={18} />
              Contáctanos
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
