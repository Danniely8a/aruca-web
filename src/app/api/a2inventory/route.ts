import { NextRequest, NextResponse } from "next/server";

interface A2Product {
  code: string;
  description: string;
  stock: number;
  price: number;
}

const A2_API = process.env.A2_API_URL;

let cachedProducts: A2Product[] | null = null;

async function loadProducts(): Promise<A2Product[]> {
  if (cachedProducts) return cachedProducts;
  const data = await import("@/lib/data/a2inventory.json");
  cachedProducts = data.default as unknown as A2Product[];
  return cachedProducts!;
}

async function fetchFromA2(q: string, limit: number) {
  const params = new URLSearchParams({ q, limit: String(limit) });
  const res = await fetch(`${A2_API}/api/products?${params}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error("A2 API error");
  const data = await res.json();
  return data.map((p: Record<string, unknown>) => ({
    code: p.code,
    description: p.description,
    stock: p.stock,
    price: p.price,
  }));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  if (q && A2_API) {
    try {
      const products = await fetchFromA2(q, limit);
      return NextResponse.json({
        total: products.length,
        offset: 0,
        limit,
        products,
      });
    } catch {
      // Fall through to static
    }
  }

  const all = await loadProducts();

  let results = all;
  if (q) {
    results = all.filter(
      (p) =>
        p.code.includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const paged = results.slice(offset, offset + limit);

  return NextResponse.json({
    total: results.length,
    offset,
    limit,
    products: paged,
  });
}
