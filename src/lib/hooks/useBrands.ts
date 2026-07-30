"use client";

import { useState, useEffect } from "react";
import { brands as staticBrands, type Brand } from "@/lib/data/brands";
import { createClient } from "@/lib/supabase/client";

export function useBrands(showAll = false): { brands: Brand[]; loading: boolean } {
  const [allBrands, setAllBrands] = useState<Brand[]>(staticBrands);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("brands")
          .select("*")
          .order("name");

        if (data && data.length > 0) {
          const staticIds = new Set(staticBrands.map((b) => b.id));

          const dbBrands: Brand[] = data.map((b) => ({
            id: b.id,
            name: b.name,
            description: b.description || "",
            category: b.category || "",
            country: b.country || "",
            logo: b.logo || "",
            website: b.website || "",
            active: b.active !== false,
          }));

          const dbBrandMap = new Map<string, Brand>();
          for (const b of dbBrands) {
            dbBrandMap.set(b.id, b);
          }

          const merged = staticBrands.map((sb) => dbBrandMap.get(sb.id) || { ...sb, active: true });
          const newFromDb = dbBrands.filter((b) => !staticIds.has(b.id));

          setAllBrands([...merged, ...newFromDb]);
        }
      } catch {
        // Fallback to static brands
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = showAll ? allBrands : allBrands.filter((b) => b.active !== false);
  return { brands: filtered, loading };
}
