"use client";

import { useState, useEffect } from "react";
import { products as staticProducts, type Product } from "@/lib/data/products";
import { createClient } from "@/lib/supabase/client";

interface ExtendedProduct extends Product {
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

export function useProducts(): { products: ExtendedProduct[]; loading: boolean } {
  const [allProducts, setAllProducts] = useState<ExtendedProduct[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();

        const PAGE_SIZE = 1000;
        let from = 0;
        const rows: ProductRow[] = [];
        while (true) {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("name")
            .range(from, from + PAGE_SIZE - 1);

          if (error || !data || data.length === 0) break;
          rows.push(...(data as ProductRow[]));
          if (data.length < PAGE_SIZE) break;
          from += PAGE_SIZE;
        }

        const data = rows;

        if (data && data.length > 0) {
          const staticIds = new Set(staticProducts.map((p) => p.id));

          const dbProducts = new Map<string, ExtendedProduct>();
          for (const p of data) {
            dbProducts.set(p.id, {
              id: p.id,
              slug: p.slug,
              name: p.name,
              brand: p.brand,
              model: p.model || "",
              description: p.description || "",
              shortDescription: p.short_description || "",
              category: p.category || "",
              subcategory: p.subcategory || "",
              image: p.image || "",
              images: p.images || [],
              specs: p.specs || {},
              features: p.features || [],
              featured: p.featured || false,
              price: p.price || undefined,
              stock: p.stock ?? undefined,
            });
          }

          const merged = staticProducts.map((sp) => {
            const db = dbProducts.get(sp.id);
            if (!db) return sp;
            return {
              ...db,
              price: db.price || sp.price,
            };
          });
          const newFromDb = data
            .filter((p) => !staticIds.has(p.id))
            .map((p) => ({
              id: p.id,
              slug: p.slug,
              name: p.name,
              brand: p.brand,
              model: p.model || "",
              description: p.description || "",
              shortDescription: p.short_description || "",
              category: p.category || "",
              subcategory: p.subcategory || "",
              image: p.image || "",
              images: p.images || [],
              specs: p.specs || {},
              features: p.features || [],
              featured: p.featured || false,
              price: p.price || undefined,
              stock: p.stock ?? undefined,
            }));

          setAllProducts([...merged, ...newFromDb]);
        }
      } catch {
        // Fallback to static products
      }
      setLoading(false);
    }
    load();
  }, []);

  return { products: allProducts, loading };
}
