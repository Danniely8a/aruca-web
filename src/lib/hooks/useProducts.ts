"use client";

import { useState, useEffect } from "react";
import { products as staticProducts, type Product } from "@/lib/data/products";
import { createClient } from "@/lib/supabase/client";

interface ExtendedProduct extends Product {
  stock?: number;
}

export function useProducts(): { products: ExtendedProduct[]; loading: boolean } {
  const [allProducts, setAllProducts] = useState<ExtendedProduct[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("products")
          .select("*")
          .order("name");

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
