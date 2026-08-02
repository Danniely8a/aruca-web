"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  Building2,
  FolderTree,
  TrendingUp,
  Eye,
  Globe,
  BarChart3,
  PieChart,
  Download,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface ViewStats {
  total: number;
  uniquePaths: number;
  daily: Record<string, number>;
  weekly: Record<string, number>;
  pathDistribution: { path: string; count: number }[];
  recent: { path: string; created_at: string }[];
}

const COLORS = ["#2A3B7B", "#A67C52", "#D4892A", "#06b6d4", "#10b981", "#8b5cf6", "#f43f5e", "#f59e0b", "#3b82f6", "#14b8a6"];
const PATH_LABELS: Record<string, string> = {
  "/": "Inicio",
  "/catalogo": "Catálogo",
  "/nosotros": "Nosotros",
  "/servicios": "Servicios",
  "/contacto": "Contacto",
  "/cotizacion": "Cotización",
};

function getPathLabel(path: string): string {
  if (PATH_LABELS[path]) return PATH_LABELS[path];
  if (path.startsWith("/productos/")) return "Producto";
  if (path.startsWith("/admin")) return "Admin";
  return path.length > 25 ? path.slice(0, 25) + "…" : path;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, brands: 0, categories: 0, featured: 0 });
  const [views, setViews] = useState<ViewStats | null>(null);
  const [viewRange, setViewRange] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending_payment: 0,
    payment_verified: 0,
    in_process: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    recent: [] as Array<{ id: number; total: string; status: string; created_at: string }>,
  });

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const [products, brands, categories, featured] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("brands").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }).eq("featured", true),
      ]);
      setStats({
        products: products.count || 0,
        brands: brands.count || 0,
        categories: categories.count || 0,
        featured: featured.count || 0,
      });

      const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (orders) {
        setOrderStats({
          total: orders.length,
          pending_payment: orders.filter((o) => o.status === "pending_payment").length,
          payment_verified: orders.filter((o) => o.status === "payment_verified").length,
          in_process: orders.filter((o) => o.status === "in_process").length,
          shipped: orders.filter((o) => o.status === "shipped").length,
          delivered: orders.filter((o) => o.status === "delivered").length,
          cancelled: orders.filter((o) => o.status === "cancelled").length,
          recent: orders.slice(0, 10).map((o) => ({
            id: o.id,
            total: o.total,
            status: o.status,
            created_at: o.created_at,
          })),
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    async function loadViews() {
      const res = await fetch(`/api/views?range=${viewRange}`);
      const data = await res.json();
      setViews(data);
    }
    loadViews();
  }, [viewRange]);

  const statCards = [
    { label: "Productos", value: stats.products, icon: Package, color: "bg-blue-500" },
    { label: "Marcas", value: stats.brands, icon: Building2, color: "bg-green-500" },
    { label: "Categorías", value: stats.categories, icon: FolderTree, color: "bg-purple-500" },
    { label: "Destacados", value: stats.featured, icon: TrendingUp, color: "bg-orange-500" },
  ];

  const viewCards = [
    { label: "Visitas totales", value: views?.total || 0, icon: Eye, color: "bg-cyan-500" },
    { label: "Páginas únicas", value: views?.uniquePaths || 0, icon: Globe, color: "bg-pink-500" },
  ];

  const dailyEntries = views?.daily ? Object.entries(views.daily).sort() : [];
  const chartData = dailyEntries.map(([day, count]) => ({
    name: viewRange === "24h" ? day.slice(-5) : day,
    full: day,
    visits: count,
  }));

  const pieData = views?.pathDistribution?.map((item) => ({
    name: getPathLabel(item.path),
    value: item.count,
  })) || [];

  function exportCSV() {
    if (!views) return;
    const rows = [["Fecha", "Visitas"]];
    dailyEntries.forEach(([day, count]) => rows.push([day, String(count)]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitas-aruca-${viewRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={exportCSV}
          disabled={!views}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Download size={16} />
          Exportar CSV
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${card.color}`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{loading ? "..." : card.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {viewCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${card.color}`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{views ? card.value : "..."}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Order stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Pedidos", value: orderStats.total, icon: ShoppingCart, color: "bg-brand" },
          { label: "Pagos Pend.", value: orderStats.pending_payment + (orderStats.payment_verified || orderStats.pending_payment), icon: Clock, color: "bg-yellow-500" },
          { label: "Verificados", value: orderStats.payment_verified, icon: CheckCircle, color: "bg-green-500" },
          { label: "En Proceso", value: orderStats.in_process, icon: Package, color: "bg-purple-500" },
          { label: "Enviados", value: orderStats.shipped, icon: TrendingUp, color: "bg-blue-500" },
          { label: "Entregados", value: orderStats.delivered, icon: CheckCircle, color: "bg-emerald-500" },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{card.label}</p>
                  <p className="text-xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Order Status Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={18} />
            Pedidos por Estado
          </h2>
          <Link href="/admin/pedidos" className="text-sm text-brand font-medium hover:underline">
            Ver todos
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={[
              { name: "Pago Pend.", value: orderStats.pending_payment, fill: "#eab308" },
              { name: "Verificado", value: orderStats.payment_verified, fill: "#22c55e" },
              { name: "En Proceso", value: orderStats.in_process, fill: "#a855f7" },
              { name: "Enviado", value: orderStats.shipped, fill: "#3b82f6" },
              { name: "Entregado", value: orderStats.delivered, fill: "#10b981" },
              { name: "Cancelado", value: orderStats.cancelled, fill: "#ef4444" },
            ]}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {[
                { name: "Pago Pend.", value: orderStats.pending_payment, fill: "#eab308" },
                { name: "Verificado", value: orderStats.payment_verified, fill: "#22c55e" },
                { name: "En Proceso", value: orderStats.in_process, fill: "#a855f7" },
                { name: "Enviado", value: orderStats.shipped, fill: "#3b82f6" },
                { name: "Entregado", value: orderStats.delivered, fill: "#10b981" },
                { name: "Cancelado", value: orderStats.cancelled, fill: "#ef4444" },
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      {orderStats.recent.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Ultimos Pedidos</h2>
          <div className="space-y-2">
            {orderStats.recent.map((order) => {
              const statusLabels: Record<string, string> = {
                pending_payment: "Pago Pendiente",
                payment_verification: "Verificando",
                payment_verified: "Verificado",
                in_process: "En Proceso",
                shipped: "Enviado",
                delivered: "Entregado",
                cancelled: "Cancelado",
              };
              const statusColors: Record<string, string> = {
                pending_payment: "bg-yellow-100 text-yellow-800",
                payment_verification: "bg-blue-100 text-blue-800",
                payment_verified: "bg-green-100 text-green-800",
                in_process: "bg-purple-100 text-purple-800",
                shipped: "bg-blue-100 text-blue-800",
                delivered: "bg-green-100 text-green-800",
                cancelled: "bg-red-100 text-red-800",
              };
              return (
                <Link
                  key={order.id}
                  href="/admin/pedidos"
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-gray-900">#{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status] || "bg-gray-100"}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900">{order.total}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("es-VE")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Line chart - Visitas diarias */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 size={18} />
              Visitas {viewRange === "24h" ? "por hora" : "diarias"}
            </h2>
            <div className="flex gap-1">
              {[
                { label: "24h", value: "24h" },
                { label: "7d", value: "7d" },
                { label: "30d", value: "30d" },
                { label: "90d", value: "90d" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setViewRange(opt.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    viewRange === opt.value
                      ? "bg-brand text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {chartData.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-12">Sin datos de visitas todavía</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A3B7B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2A3B7B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  interval={chartData.length > 14 ? "preserveStartEnd" : 0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: 13,
                  }}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.full || label}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#2A3B7B"
                  strokeWidth={2}
                  fill="url(#colorVisits)"
                  dot={{ r: 3, fill: "#2A3B7B", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#2A3B7B", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie chart - Distribución por páginas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <PieChart size={18} />
            Páginas más visitadas
          </h2>
          {pieData.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-12">Sin datos</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <RePieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-3">
                {pieData.slice(0, 5).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-gray-600 truncate flex-1">{item.name}</span>
                    <span className="text-gray-400 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent visits */}
      {views && views.recent.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Visitas recientes</h2>
          <div className="space-y-1 max-h-72 overflow-y-auto">
            {views.recent.slice(0, 30).map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">{v.path}</span>
                <span className="text-xs text-gray-400">
                  {new Date(v.created_at).toLocaleString("es-VE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
