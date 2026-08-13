"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Package, Calendar, DollarSign, Eye, EyeOff,
  LogOut, Menu, X, ClipboardList, ChevronDown, ChevronUp,
  Loader2, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_rif: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total: string;
  status: string;
  source: string;
  created_at: string;
  exported_to_a2: boolean;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending_payment: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  payment_verification: { label: "Verificando", color: "bg-blue-100 text-blue-800" },
  payment_verified: { label: "Verificado", color: "bg-green-100 text-green-800" },
  in_process: { label: "En Proceso", color: "bg-indigo-100 text-indigo-800" },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
};

export default function HistorialPedidosPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [vendorName, setVendorName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/vendor-orders?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/vendor");
      if (!res.ok) {
        router.push("/vendedores");
        return;
      }
      const data = await res.json();
      setVendorName(data.name || "");
    })();
  }, [router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleLogout = async () => {
    await fetch("/api/vendor", { method: "DELETE" });
    router.push("/vendedores");
  };

  const totalVendido = orders.reduce((sum, o) => {
    const t = parseFloat(o.total) || 0;
    return sum + t;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B0000] to-[#5C0000] shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/vendedores/dashboard" className="flex items-center gap-1 text-white/70 hover:text-white">
              <ArrowLeft size={18} />
            </Link>
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <ClipboardList size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm sm:text-base">Historial de Pedidos</h1>
              <p className="text-white/60 text-[10px] sm:text-xs">{vendorName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-xs hidden sm:inline"
            >
              Ver Sitio Web
            </Link>
            <button onClick={handleLogout} className="text-white/70 hover:text-white">
              <LogOut size={18} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 space-y-2">
            <Link href="/vendedores/dashboard" className="block text-white/80 hover:text-white text-sm py-2">
              Dashboard
            </Link>
            <Link href="/vendedores/pedidos" className="block text-white/80 hover:text-white text-sm py-2">
              Crear Pedido
            </Link>
            <Link href="/" className="block text-white/80 hover:text-white text-sm py-2">
              Ver Sitio Web
            </Link>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Resumen */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <ClipboardList size={14} />
              Total Pedidos
            </div>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <DollarSign size={14} />
              Monto Total
            </div>
            <p className="text-2xl font-bold text-green-600">${totalVendido.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Package size={14} />
              Exportados A2
            </div>
            <p className="text-2xl font-bold text-indigo-600">{orders.filter(o => o.exported_to_a2).length}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente o número..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000]"
              />
            </div>
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] appearance-none"
              >
                <option value="">Todos los estados</option>
                {Object.entries(STATUS_MAP).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Lista de pedidos */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[#8B0000]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No se encontraron pedidos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const isExpanded = expandedId === order.id;
              const statusInfo = STATUS_MAP[order.status] || { label: order.status, color: "bg-gray-100 text-gray-800" };
              const items: OrderItem[] = Array.isArray(order.items) ? order.items : [];

              return (
                <motion.div
                  key={order.id}
                  layout
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full px-4 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-sm text-gray-900">
                          {order.order_number || `#${order.id}`}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        {order.exported_to_a2 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-100 text-indigo-700">
                            A2
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(order.created_at).toLocaleDateString("es-VE")}
                        </span>
                        <span className="font-medium text-gray-700">{order.customer_name}</span>
                        {order.customer_rif && <span className="text-gray-400">RIF: {order.customer_rif}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-sm">
                        ${parseFloat(order.total || "0").toFixed(2)}
                      </p>
                      <p className="text-[10px] text-gray-400">{items.length} producto{items.length !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                          {/* Info del cliente */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-xs">
                            <div>
                              <span className="text-gray-400">Teléfono</span>
                              <p className="text-gray-700">{order.customer_phone || "—"}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Dirección</span>
                              <p className="text-gray-700">{order.customer_address || "—"}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Fuente</span>
                              <p className="text-gray-700 capitalize">{order.source}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Fecha</span>
                              <p className="text-gray-700">{new Date(order.created_at).toLocaleString("es-VE")}</p>
                            </div>
                          </div>

                          {/* Tabla de items */}
                          {items.length > 0 && (
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 text-gray-500 font-medium">Producto</th>
                                    <th className="text-right py-2 text-gray-500 font-medium">Cant.</th>
                                    <th className="text-right py-2 text-gray-500 font-medium">Precio</th>
                                    <th className="text-right py-2 text-gray-500 font-medium">Subtotal</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {items.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-100">
                                      <td className="py-2 text-gray-700">{item.name}</td>
                                      <td className="py-2 text-right text-gray-700">{item.quantity}</td>
                                      <td className="py-2 text-right text-gray-700">
                                        ${parseFloat(String(item.price)).toFixed(2)}
                                      </td>
                                      <td className="py-2 text-right font-medium text-gray-900">
                                        ${(item.quantity * parseFloat(String(item.price))).toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
