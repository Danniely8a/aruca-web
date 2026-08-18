import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface A2Product {
  code: string;
  description: string;
  stock: number;
  price: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const supabase = createAdminClient();

  let query = supabase
    .from("a2_products")
    .select("code, description, stock, price")
    .order("description");

  if (q) {
    query = query.or(`code.ilike.%${q}%,description.ilike.%${q}%`);
  }

  const { data, error } = await query.range(offset, offset + limit - 1);

  let countQuery = supabase
    .from("a2_products")
    .select("code", { count: "exact", head: true });
  if (q) {
    countQuery = countQuery.or(`code.ilike.%${q}%,description.ilike.%${q}%`);
  }
  const { count } = await countQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    total: count ?? (data?.length || 0),
    offset,
    limit,
    products: (data || []).map((p) => ({
      code: p.code,
      description: p.description,
      stock: Number(p.stock ?? 0),
      price: Number(p.price ?? 0),
    })),
  });
}
