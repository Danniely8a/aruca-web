import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("vendor-session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const vendorName = request.cookies.get("vendor-name")?.value || "";
  if (!vendorName) {
    return NextResponse.json({ error: "Vendedor no identificado" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {},
      },
    }
  );

  let query = supabase
    .from("orders")
    .select("*")
    .eq("vendor_name", vendorName)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(`customer_name.ilike.%${search}%,order_number.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data || [] });
}
