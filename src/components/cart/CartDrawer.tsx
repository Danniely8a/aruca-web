"use client";

import { useCart } from "@/lib/context/CartContext";
import { company } from "@/lib/data/company";
import { useAuth } from "@/lib/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, CreditCard, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, isOpen, setIsOpen } = useCart();
  const { user } = useAuth();

  const subtotal = items.reduce((sum, item) => {
    if (!item.price) return sum;
    const num = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  const handleWhatsApp = () => {
    if (items.length === 0) return;
    const lines = items.map(
      (item) => `- ${item.name} (${item.brand} ${item.model}) x${item.quantity}${item.price ? ` — ${item.price}` : ""}`
    );
    const message = `Hola, solicito cotización para los siguientes productos:\n\n${lines.join("\n")}`;
    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand" />
                <h2 className="font-bold text-lg text-gray-900">Mi Carrito</h2>
                <span className="text-sm text-gray-400">({totalItems})</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium mb-2">Tu carrito está vacío</p>
                <p className="text-gray-400 text-sm mb-6">Agrega productos del catálogo para cotizar</p>
                <Link
                  href="/catalogo"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-colors"
                >
                  Ver Catálogo
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-gray-50 rounded-xl p-3"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden relative">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-contain p-1"
                          />
                        ) : (
                          <span className="text-brand font-bold text-xs text-center px-1">{item.brand}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/productos/${item.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="text-sm font-semibold text-gray-900 hover:text-brand line-clamp-2 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-400 mt-0.5">{item.brand} &middot; {item.model}</p>
                        {user && item.price && (
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm font-bold text-accent-orange">{item.price} c/u</p>
                            {item.quantity > 1 && (
                              <p className="text-xs font-semibold text-gray-600">
                                ${(() => {
                                  const num = parseFloat(item.price!.replace(/[^0-9.]/g, ""));
                                  return isNaN(num) ? "0.00" : (num * item.quantity).toFixed(2);
                                })()}
                              </p>
                            )}
                          </div>
                        )}
                        {!user && item.price && (
                          <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                            <Lock size={10} />
                            Inicia sesión para ver precio
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                  {user && subtotal > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Subtotal estimado</span>
                      <span className="font-bold text-accent-orange text-lg">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {!user && (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Lock size={12} />
                      Inicia sesión para ver precios y comprar
                    </p>
                  )}
                  {user && (
                    <Link
                      href="/checkout"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all"
                    >
                      <CreditCard size={18} />
                      Ir al Portal de Pago ({totalItems} {totalItems === 1 ? "producto" : "productos"})
                    </Link>
                  )}
                  {!user && (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all"
                    >
                      Inicia sesion para comprar
                    </Link>
                  )}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
                  >
                    <MessageCircle size={18} />
                    Cotizar por WhatsApp ({totalItems} {totalItems === 1 ? "producto" : "productos"})
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-sm text-gray-400 hover:text-red-500 transition-colors py-1"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
