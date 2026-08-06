import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

interface A2Product {
  code: string;
  description: string;
  stock: number;
  price: number;
}

let cachedProducts: A2Product[] | null = null;

function loadProducts(): A2Product[] {
  if (cachedProducts) return cachedProducts;
  const filePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "data",
    "a2inventory.json"
  );
  const raw = readFileSync(filePath, "utf-8");
  cachedProducts = JSON.parse(raw);
  return cachedProducts!;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const all = loadProducts();

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
