"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { company } from "@/lib/data/company";

export default function ContactoPage() {
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
              Contacto
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Contáctanos
            </h1>
            <p className="text-white/80 text-lg">
              Estamos aquí para ayudarte. Comunícate con nosotros por el medio
              que prefieras.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h2>

                <div className="space-y-6">
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-all group"
                  >
                    <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center shrink-0">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        WhatsApp
                      </p>
                      <p className="text-sm text-gray-500">
                        Respuesta inmediata. Haz clic para chatear.
                      </p>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        {company.phone2}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${company.phone1.replace(/\D/g, "")}`}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-brand/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-brand text-white rounded-xl flex items-center justify-center shrink-0">
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-brand transition-colors">
                        Teléfono
                      </p>
                      <p className="text-sm text-gray-500">
                        Llámanos para consultas directas
                      </p>
                      <p className="text-sm text-brand font-medium mt-1">
                        {company.phone1}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-accent-orange/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-accent-orange text-white rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-accent-orange transition-colors">
                        Correo Electrónico
                      </p>
                      <p className="text-sm text-gray-500">
                        Envíanos tu consulta por email
                      </p>
                      <p className="text-sm text-accent-orange font-medium mt-1">
                        {company.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 bg-gray-700 text-white rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Ubicación</p>
                      <p className="text-sm text-gray-500">
                        {company.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 bg-gray-700 text-white rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        Horario de Atención
                      </p>
                      <p className="text-sm text-gray-500">
                        {company.schedule}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Envíanos un Mensaje
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                    const name = data.get("name") as string;
                    const email = data.get("email") as string;
                    const phone = data.get("phone") as string;
                    const message = data.get("message") as string;
                    const whatsappMessage = `Hola, me comunico desde la web:
Nombre: ${name}
Email: ${email}
Teléfono: ${phone}
Mensaje: ${message}`;
                    window.open(
                      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
                      "_blank"
                    );
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                      placeholder="(0412) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all"
                  >
                    <Send size={18} />
                    Enviar Mensaje
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
              Ubicación
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Encuéntranos
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.8!2d-66.8!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e84a5a3b0b0b0b0%3A0x0!2sCarr.+Petare+-+Sta.+Luc%C3%ADa%2C+Caracas+1073%2C+Miranda!5e0!3m2!1ses!2sve!4v1718000000000!5m2!1ses!2sve"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación ARUCA Maquinarias"
              className="w-full"
            />
          </motion.div>
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Carr.+Petare+-+Sta.+Luc%C3%ADa,+Caracas+1073,+Miranda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all"
            >
              <MapPin size={18} />
              Cómo llegar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
