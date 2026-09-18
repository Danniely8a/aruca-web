"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Brand {
  id: string;
  name: string;
  description: string;
  category: string;
  country: string;
  logo?: string;
  website?: string;
  active?: boolean;
}

interface BrandRow {
  id: string;
  name: string;
  description?: string;
  category?: string;
  country?: string;
  logo?: string;
  website?: string;
  active?: boolean;
}

function mapRowToBrand(row: BrandRow): Brand {
  return {
    id: row.id,
    name: row.name,
    description: row.description || "",
    category: row.category || "",
    country: row.country || "",
    logo: row.logo || "",
    website: row.website || "",
    active: row.active !== false,
  };
}

export function useBrands(showAll = false): { brands: Brand[]; loading: boolean } {
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
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
          setAllBrands(data.map(mapRowToBrand));
        }
      } catch {
        setAllBrands([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = showAll ? allBrands : allBrands.filter((b) => b.active !== false);
  return { brands: filtered, loading };
}
