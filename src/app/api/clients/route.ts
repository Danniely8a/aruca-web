import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const vendor = searchParams.get("vendor") || "";

  const supabase = createAdminClient();

  if (!q && !vendor) {
    return NextResponse.json([]);
  }

  let query = supabase
    .from("clients")
    .select("a2_code, name, rif, nit, phone, fax, email, address, contact, vendor_code, classification, balance, credit_limit, credit_days, currency")
    .order("name");

  if (q) {
    const clean = q.trim();
    query = query.or(`name.ilike.%${clean}%,a2_code.eq.${clean},rif.ilike.%${clean}%,nit.ilike.%${clean}%`);
  }

  if (vendor) {
    query = query.eq("vendor_code", vendor);
  }

  const { data, error } = await query.limit(20);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
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
    .select("a2_code, name, rif, nit, phone, fax, email, address, contact, vendor_code, classification, balance, credit_limit, credit_days, currency")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
