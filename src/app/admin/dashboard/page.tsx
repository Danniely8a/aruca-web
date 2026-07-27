"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Building2, FolderTree, TrendingUp, Eye, Globe, BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ViewStats {
  total: number;
  uniquePaths: number;
  daily: Record<string, number>;
  recent: { path: string; created_at: string }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, brands: 0, categories: 0, featured: 0 });
  const [views, setViews] = useState<ViewStats | null>(null);
  const [viewRange, setViewRange] = useState("7d");
  const [loading, setLoading] = useState(true);

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
  const maxDaily = Math.max(...dailyEntries.map(([, v]) => v), 1);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

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

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 size={18} />
            Visitas diarias
          </h2>
          <div className="flex gap-1">
            {[
              { label: "24h", value: "24h" },
              { label: "7d", value: "7d" },
              { label: "30d", value: "30d" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setViewRange(opt.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  viewRange === opt.value ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {dailyEntries.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">Sin datos de visitas todavía</p>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {dailyEntries.map(([day, count]) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-400">{count}</span>
                <div
                  className="w-full bg-brand/20 rounded-t-md relative"
                  style={{ height: `${(count / maxDaily) * 100}%`, minHeight: "4px" }}
                >
                  <div className="absolute bottom-0 w-full bg-brand rounded-t-md" style={{ height: "100%" }} />
                </div>
                <span className="text-[9px] text-gray-400 truncate w-full text-center">{day.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {views && views.recent.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Visitas recientes</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {views.recent.map((v, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm font-medium text-gray-700">{v.path}</span>
                <span className="text-xs text-gray-400">
                  {new Date(v.created_at).toLocaleString("es-VE", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
