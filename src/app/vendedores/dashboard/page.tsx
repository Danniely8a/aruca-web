"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  DollarSign,
  LogOut,
  Lock,
  Loader2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VendedorDashboardPage() {
  const router = useRouter();
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/vendor");
        const data = await res.json();
        if (!data.authenticated) {
          router.replace("/vendedores");
          return;
        }
        setVendorName(data.name || "");
        setVendorEmail(data.email || "");
      } catch {
        router.replace("/vendedores");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/vendor", { method: "DELETE" });
    router.push("/vendedores");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.jpg"
              alt="ARUCA"
              width={32}
              height={32}
              className="w-8 h-8 object-contain rounded bg-white p-0.5"
            />
            <div>
              <p className="font-bold text-sm">Portal de Ventas</p>
              {vendorName ? (
                <p className="text-white/80 text-[10px]">
                  {vendorName} · {vendorEmail}
                </p>
              ) : (
                <p className="text-white/60 text-[10px]">ARUCA Maquinarias</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-xs hidden sm:inline"
            >
              Ver Sitio Web
            </Link>
            <Link
              href="/vendedores/cambiar-contrasena"
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs"
            >
              <Lock size={14} />
              Contraseña
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido</h1>
          <p className="text-gray-500 text-sm mt-1">
            {vendorName} · Selecciona una opción
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/vendedores/pedidos">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl border border-gray-100 p-8 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-4">
                <ShoppingCart size={28} />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Pedidos</h2>
              <p className="text-sm text-gray-500">
                Crear nuevos presupuestos y pedidos para clientes
              </p>
            </motion.div>
          </Link>

          <Link href="/vendedores/cuentas-cobrar">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl border border-gray-100 p-8 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-accent-orange/10 text-accent-orange rounded-2xl flex items-center justify-center mb-4">
                <DollarSign size={28} />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Cuentas por Cobrar
              </h2>
              <p className="text-sm text-gray-500">
                Consultar saldos, facturas y notas de tus clientes
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
