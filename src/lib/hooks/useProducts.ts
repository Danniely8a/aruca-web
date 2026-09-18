"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  features: string[];
  specs: { [key: string]: string };
  featured: boolean;
  price?: string;
  videoId?: string;
  stock?: number;
}

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model?: string;
  description?: string;
  short_description?: string;
  category?: string;
  subcategory?: string;
  image?: string;
  images?: string[];
  specs?: { [key: string]: string };
  features?: string[];
  featured?: boolean;
  price?: string;
  stock?: number;
}

function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    model: row.model || "",
    description: row.description || "",
    shortDescription: row.short_description || "",
    category: row.category || "",
    subcategory: row.subcategory || "",
    image: row.image || "",
    images: row.images || [],
    specs: row.specs || {},
    features: row.features || [],
    featured: row.featured || false,
    price: row.price || undefined,
    stock: row.stock ?? undefined,
  };
}

export function useProducts(): { products: Product[]; loading: boolean } {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();

        const PAGE_SIZE = 1000;
        const { count } = await supabase
          .from("products")
          .select("id", { count: "exact", head: true });

        const total = count ?? 0;
        const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

        const pagePromises = [];
        for (let i = 0; i < pageCount; i++) {
          pagePromises.push(
            supabase
              .from("products")
              .select("*")
              .order("name")
              .range(i * PAGE_SIZE, (i + 1) * PAGE_SIZE - 1)
          );
        }

        const results = await Promise.all(pagePromises);
        const data: ProductRow[] = results.flatMap(
          (r) => (r.data || []) as ProductRow[]
        );

        if (data && data.length > 0) {
          setAllProducts(data.map(mapRowToProduct));
        }
      } catch {
        setAllProducts([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return { products: allProducts, loading };
}
