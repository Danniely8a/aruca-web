"use client";

import { useState, useEffect } from "react";
import { brands as staticBrands, type Brand } from "@/lib/data/brands";
import { createClient } from "@/lib/supabase/client";

export function useBrands(): { brands: Brand[]; loading: boolean } {
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

          const dbBrands = new Map<string, Brand>();
          for (const b of data) {
            dbBrands.set(b.id, {
              id: b.id,
              name: b.name,
              description: b.description || "",
              category: b.category || "",
              country: b.country || "",
              logo: b.logo || "",
              website: b.website || "",
            });
          }

          const merged = staticBrands.map((sb) => dbBrands.get(sb.id) || sb);
          const newFromDb = data
            .filter((b) => !staticIds.has(b.id))
            .map((b) => ({
              id: b.id,
              name: b.name,
              description: b.description || "",
              category: b.category || "",
              country: b.country || "",
              logo: b.logo || "",
              website: b.website || "",
            }));

          setAllBrands([...merged, ...newFromDb]);
        }
      } catch {
        // Fallback to static brands
      }
      setLoading(false);
    }
    load();
  }, []);

  return { brands: allBrands, loading };
}
