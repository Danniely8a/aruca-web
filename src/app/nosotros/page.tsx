"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, CheckCircle } from "lucide-react";
import { company } from "@/lib/data/company";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const valueIcons = [Target, Eye, Heart, Award];

export default function NosotrosPage() {
  return (
    <>
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

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
                Nuestra Historia
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {company.description}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Fundada en 1976, desde nuestros inicios nos hemos dedicado a ser
                el puente entre los mejores fabricantes internacionales y los
                profesionales de la madera en Venezuela. Nuestra pasión por la
                calidad y el servicio nos ha convertido en un referente del sector.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Trabajamos con marcas como Makita, Euro Air, Titebond, CMT Orange
                Tools y muchas más, ofreciendo no solo productos de primera calidad,
                sino también el conocimiento técnico para ayudarte a sacar el máximo
                provecho de cada herramienta.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-brand/5 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-brand">{company.experience}</p>
                <p className="text-sm text-gray-500 mt-1">Años de Experiencia</p>
              </div>
              <div className="bg-accent-orange/5 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-accent-orange">{company.clients}+</p>
                <p className="text-sm text-gray-500 mt-1">Clientes Activos</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-green-600">{company.products}+</p>
                <p className="text-sm text-gray-500 mt-1">Productos</p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-purple-600">{company.brands}</p>
                <p className="text-sm text-gray-500 mt-1">Marcas Aliadas</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Lo que nos define
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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
              <Users size={18} />
              Contáctanos
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
