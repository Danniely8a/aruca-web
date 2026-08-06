import { NextRequest, NextResponse } from "next/server";

interface A2Product {
  code: string;
  description: string;
  stock: number;
  price: number;
}

let cachedProducts: A2Product[] | null = null;

async function loadProducts(): Promise<A2Product[]> {
  if (cachedProducts) return cachedProducts;
  const data = await import("@/lib/data/a2inventory.json");
  cachedProducts = data.default as unknown as A2Product[];
  return cachedProducts!;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

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
