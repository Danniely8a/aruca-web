"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { createClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    router.push("/login");
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Carrito vacio</h2>
          <p className="text-gray-500 mb-6">Agrega productos antes de continuar</p>
          <button
            onClick={() => router.push("/catalogo")}
            className="px-6 py-3 bg-brand text-white rounded-xl"
          >
            Ver Catalogo
          </button>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, item) => {
    if (item.price) {
      const numPrice = parseFloat(item.price.replace(/[^0-9,.]/g, "").replace(",", "."));
      return sum + (isNaN(numPrice) ? 0 : numPrice * item.quantity);
    }
    return sum;
  }, 0);

  const handleCreateOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const formattedItems = items.map((i) => ({
        id: i.id,
        slug: i.slug,
        name: i.name,
        brand: i.brand,
        model: i.model,
        image: i.image,
        quantity: i.quantity,
        price: i.price || "",
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: formattedItems,
          total: total > 0 ? `$${total.toFixed(2)}` : "Consultar",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al crear la orden");
      }

      const order = await res.json();
      clearCart();
      router.push(`/checkout/${order.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al crear la orden");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmar Pedido</h1>
          <p className="text-gray-500 mb-8">Revisa tu pedido antes de continuar al pago</p>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Productos ({items.length})</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.brand} - {item.model} x{item.quantity}</p>
                  </div>
                  <p className="font-semibold text-accent-orange text-sm">
                    {item.price ? (
                      item.quantity > 1 ? `${item.price} x${item.quantity}` : item.price
                    ) : "Consultar"}
                  </p>
                </div>
              ))}
            </div>
            {total > 0 && (
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <p className="font-bold text-gray-900">Total a pagar</p>
                <p className="font-bold text-xl text-accent-orange">${total.toFixed(2)}</p>
              </div>
            )}
            {total === 0 && (
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <p className="font-bold text-gray-900">Total a pagar</p>
                <p className="font-bold text-xl text-gray-400">Consultar</p>
              </div>
            )}
          </div>

          {error && (
            <p className="mb-4 text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={handleCreateOrder}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all disabled:opacity-50"
          >
            {loading ? "Creando orden..." : "Continuar al Portal de Pago"}
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
