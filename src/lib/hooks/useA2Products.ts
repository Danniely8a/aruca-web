"use client";

import { useState, useCallback } from "react";

export interface A2Product {
  code: string;
  description: string;
  stock: number;
  price: number;
}

export function useA2Products() {
  const [results, setResults] = useState<A2Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const search = useCallback(async (q: string, limit = 20) => {
    if (!q.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/a2inventory?q=${encodeURIComponent(q)}&limit=${limit}`
      );
      if (res.ok) {
        const data = await res.json();
        setResults(data.products);
        setTotal(data.total);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  return { results, loading, total, search };
}
