"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  LogOut,
  ArrowRight,
  Shield,
  Save,
  Loader2,
  Package,
  Camera,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function PerfilPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [orders, setOrders] = useState<Array<{
    id: number;
    status: string;
    total: string;
    created_at: string;
    items: Array<{ name: string; brand: string; model: string; quantity: number; price: string }>;
  }>>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setCompany(user.company);
      setAvatarUrl(user.avatar_url || "");
      fetchOrders();
    }
  }, [user, authLoading, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {}
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gray-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-brand" />
      </div>
    );
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "avatars");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setAvatarUrl(data.url);
        const supabase = createClient();
        await supabase.from("users").update({ avatar_url: data.url }).eq("id", user.id);
        await refreshUser();
        setMessage("Foto de perfil actualizada");
        setMessageType("success");
      }
    } catch {
      setMessage("Error al subir la imagen");
      setMessageType("error");
    }
    e.target.value = "";
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({ name, phone, company, avatar_url: avatarUrl })
      .eq("id", user.id);

    if (error) {
      setMessage("Error al guardar: " + error.message);
      setMessageType("error");
    } else {
      setMessage("Perfil actualizado con éxito");
      setMessageType("success");
      await refreshUser();
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
              <p className="text-gray-500 text-sm mt-1">Gestiona tu cuenta</p>
            </div>
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>

          <div className="space-y-6">
            {/* User Info Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Información Personal
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <label className="relative cursor-pointer group">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-brand"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-brand transition-colors">
                      <Camera size={28} className="text-gray-400 group-hover:text-brand" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
                <div>
                  <p className="font-semibold text-gray-900">{user.name || "Usuario"}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+58 412 000 0000"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nombre de tu empresa"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>
              </div>

              {message && (
                <p
                  className={`mt-4 text-sm text-center py-2 rounded-lg ${
                    messageType === "success"
                      ? "text-green-600 bg-green-50"
                      : "text-red-500 bg-red-50"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>

            {/* Account Type */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Tipo de Cuenta
              </h2>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 rounded-lg">
                  <Shield size={20} className="text-brand" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.role === "admin"
                      ? "Administrador"
                      : user.role === "staff"
                      ? "Personal"
                      : "Cliente"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.role === "admin"
                      ? "Acceso completo al panel de administración"
                      : user.role === "staff"
                      ? "Acceso limitado al panel"
                      : "Acceso a precios y compras"}
                  </p>
                </div>
              </div>
            </div>

            {/* Mis Pedidos */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Mis Pedidos</h2>
                <span className="text-sm text-gray-400">{orders.length} pedidos</span>
              </div>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm mb-4">No tienes pedidos aun</p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white text-sm rounded-xl hover:bg-brand/90"
                  >
                    Ver Catalogo
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => {
                    const statusColors: Record<string, string> = {
                      pending_payment: "bg-yellow-100 text-yellow-800",
                      payment_verification: "bg-blue-100 text-blue-800",
                      payment_verified: "bg-green-100 text-green-800",
                      in_process: "bg-purple-100 text-purple-800",
                      shipped: "bg-indigo-100 text-indigo-800",
                      delivered: "bg-green-100 text-green-800",
                      cancelled: "bg-red-100 text-red-800",
                    };
                    const statusLabels: Record<string, string> = {
                      pending_payment: "Pago Pendiente",
                      payment_verification: "Verificando Pago",
                      payment_verified: "Pago Verificado",
                      in_process: "En Proceso",
                      shipped: "Enviado",
                      delivered: "Entregado",
                      cancelled: "Cancelado",
                    };
                    return (
                      <Link
                        key={order.id}
                        href={`/checkout/${order.id}`}
                        className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Pedido #{order.id}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(order.created_at).toLocaleDateString("es-VE")} - {order.total}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {order.items?.length || 0} productos
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                            {statusLabels[order.status] || order.status}
                          </span>
                          <ArrowRight size={14} className="text-gray-400" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-center hover:bg-gray-50 transition-colors"
              >
                Volver al Inicio
              </Link>
              <Link
                href="/catalogo"
                className="flex-1 py-3 bg-brand text-white rounded-xl text-sm font-medium text-center hover:bg-brand/90 transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
