"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Wrench,
  FileText,
  Scissors,
  Settings,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { company } from "@/lib/data/company";

const serviceIcons: Record<string, React.ReactNode> = {
  "shopping-cart": <ShoppingCart className="w-8 h-8" />,
  wrench: <Wrench className="w-8 h-8" />,
  "file-text": <FileText className="w-8 h-8" />,
  scissors: <Scissors className="w-8 h-8" />,
  settings: <Settings className="w-8 h-8" />,
};

export default function ServiciosPage() {
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
              Nuestros Servicios
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Servicios Profesionales
            </h1>
            <p className="text-white/80 text-lg">
              Ofrecemos soluciones completas para la industria de la madera,
              desde la venta de equipos hasta el soporte técnico.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                    {serviceIcons[service.icon]}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  {service.features && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <CheckCircle size={16} className="text-green-500 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
                  <div className="w-32 h-32 bg-brand/10 text-brand rounded-full flex items-center justify-center">
                    {serviceIcons[service.icon]}
                  </div>
                </div>
              </motion.div>
            ))}
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
              ¿Necesitas Asesoría Técnica?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Nuestro equipo de expertos está listo para ayudarte a encontrar la
              solución perfecta para tu proyecto.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/584126109597"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
              >
                Contactar por WhatsApp
                <ArrowRight size={18} />
              </a>
              <a
                href="tel:+584126109597"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                Llamar Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
