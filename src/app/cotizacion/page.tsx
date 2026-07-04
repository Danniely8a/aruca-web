"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { company } from "@/lib/data/company";

export default function CotizacionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hola, solicito cotización:
Nombre: ${formData.name}
Empresa: ${formData.company}
Email: ${formData.email}
Teléfono: ${formData.phone}
Producto/Servicio: ${formData.product}
Cantidad: ${formData.quantity}
Detalles: ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodedMessage}`,
      "_blank"
    );
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              Cotización
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Solicita tu Cotización
            </h1>
            <p className="text-white/80 text-lg">
              Completa el formulario y recibe una cotización personalizada en
              menos de 24 horas.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 rounded-2xl p-8 text-center border border-green-200"
                >
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Solicitud Enviada!
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Tu solicitud de cotización ha sido enviada por WhatsApp.
                    Pronto nos pondremos en contacto contigo.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        product: "",
                        quantity: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all"
                  >
                    Enviar Otra Cotización
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Datos de Contacto
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                        placeholder="Nombre de tu empresa"
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
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                        placeholder="(0412) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Producto o Servicio *
                    </label>
                    <input
                      type="text"
                      name="product"
                      required
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                      placeholder="Ej: Sierra circular Makita, Compresor Euro Air..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Cantidad
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                      placeholder="Cantidad requerida"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Detalles Adicionales
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                      placeholder="Especificaciones técnicas, urgencia, o cualquier otro detalle..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent-orange text-white font-semibold rounded-xl hover:bg-accent-orange/90 transition-all"
                  >
                    <Send size={18} />
                    Enviar Cotización por WhatsApp
                  </button>
                </motion.form>
              )}
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WhatsApp</p>
                      <p className="text-xs text-gray-400">{company.phone2}</p>
                    </div>
                  </a>
                  <a
                    href={`tel:${company.phone1.replace(/\D/g, "")}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-brand transition-colors"
                  >
                    <div className="w-10 h-10 bg-brand/10 text-brand rounded-lg flex items-center justify-center">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Teléfono</p>
                      <p className="text-xs text-gray-400">{company.phone1}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-accent-orange transition-colors"
                  >
                    <div className="w-10 h-10 bg-accent-orange/10 text-accent-orange rounded-lg flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-gray-400">{company.email}</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-brand/5 rounded-2xl p-6 border border-brand/10"
              >
                <h3 className="font-bold text-gray-900 mb-2">
                  Respuesta Garantizada
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Nos comprometemos a responder todas las cotizaciones en un
                  plazo máximo de 24 horas hábiles. Para urgencias, contáctanos
                  directamente por WhatsApp.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
