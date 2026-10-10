"use client";

import { useState, useEffect } from "react";

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

export function useProducts(): {
  products: Product[];
  loading: boolean;
  error: boolean;
  reload: () => void;
} {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        // Una sola petición a nuestra API (cacheada en el CDN de Vercel)
        // en vez de N consultas directas a Supabase desde el navegador.
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("products fetch failed");
        const data: ProductRow[] = await res.json();

        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setAllProducts(data.map(mapRowToProduct));
        } else if (!Array.isArray(data)) {
          setError(true);
        } else {
          setAllProducts([]);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return {
    products: allProducts,
    loading,
    error,
    reload: () => setAttempt((a) => a + 1),
  };
}
