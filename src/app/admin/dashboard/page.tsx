"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Building2, FolderTree, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, brands: 0, categories: 0, featured: 0 });
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

  const cards = [
    { label: "Productos", value: stats.products, icon: Package, color: "bg-blue-500" },
    { label: "Marcas", value: stats.brands, icon: Building2, color: "bg-green-500" },
    { label: "Categorías", value: stats.categories, icon: FolderTree, color: "bg-purple-500" },
    { label: "Destacados", value: stats.featured, icon: TrendingUp, color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
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
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? "..." : card.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
