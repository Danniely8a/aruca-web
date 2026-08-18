import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const A2_API = process.env.A2_API_URL;

async function fetchFromA2(q: string, vendor: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (vendor) params.set("vendor", vendor);
  params.set("limit", "20");

  const res = await fetch(`${A2_API}/api/clients?${params}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error("A2 API error");
  return res.json();
}

async function fetchFromSupabase(q: string, vendor: string) {
  const supabase = createAdminClient();

  let query = supabase
    .from("clients")
    .select("a2_code, name, rif, nit, phone, fax, email, address, contact, vendor_code, classification, balance, credit_limit, credit_days, currency")
    .order("name");

  if (q) {
    const clean = q.trim();
    query = query.or(
      `name.ilike.%${clean}%,a2_code.eq.${clean},rif.ilike.%${clean}%,nit.ilike.%${clean}%`
    );
  }
  if (vendor) {
    query = query.eq("vendor_code", vendor);
  }

  const { data, error } = await query.limit(20);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const vendor = searchParams.get("vendor") || "";

  if (!q && !vendor) {
    return NextResponse.json([]);
  }

  try {
    if (A2_API) {
      const data = await fetchFromA2(q, vendor);
      return NextResponse.json(data);
    }
  } catch {
    // Fall through to Supabase
  }

  try {
    const data = await fetchFromSupabase(q, vendor);
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: body.name,
      phone: body.phone || "",
      email: body.email || "",
      rif: body.rif || "",
      nit: body.nit || "",
      address: body.address || "",
      contact: body.contact || "",
      fax: body.fax || "",
      vendor_code: body.vendor_code || "",
      classification: body.classification || "",
      notes: body.notes || "",
      price_list: body.price_list || "",
    })
    .select(
      "a2_code, name, rif, nit, phone, fax, email, address, contact, vendor_code, classification, balance, credit_limit, credit_days, currency"
    )
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
