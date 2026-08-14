import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  const supabase = createAdminClient();

  const vendorNameCookie = request.cookies.get("vendor-name")?.value || "";
  const vendorSession = request.cookies.get("vendor-session")?.value || "";
  const isAdmin =
    request.cookies.get("admin-session")?.value === "authenticated";

  let vendorClientCodes: string[] = [];
  if (vendorSession && vendorNameCookie && !isAdmin) {
    const { data: vcData, error: vcError } = await supabase
      .from("vendor_clients")
      .select("client_code")
      .eq("vendor_name", vendorNameCookie);

    if (vcError) {
      return NextResponse.json({ error: vcError.message }, { status: 500 });
    }

    vendorClientCodes = (vcData || []).map((r) => r.client_code);
  }

  let query = supabase
    .from("accounts_receivable")
    .select("*")
    .order("client_name")
    .order("emission_date");

  if (vendorClientCodes.length > 0) {
    query = query.in("client_code", vendorClientCodes);
  }

  if (search) {
    query = query.or(
      `client_name.ilike.%${search}%,client_code.ilike.%${search}%,client_rif.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const clientMap = new Map<
    string,
    {
      client_code: string;
      client_name: string;
      client_rif: string;
      client_nit: string;
      client_phone: string;
      client_address: string;
      total_amount: number;
      documents: typeof data;
    }
  >();

  for (const row of data || []) {
    const key = row.client_code;
    if (!clientMap.has(key)) {
      clientMap.set(key, {
        client_code: row.client_code,
        client_name: row.client_name,
        client_rif: row.client_rif || "",
        client_nit: row.client_nit || "",
        client_phone: row.client_phone || "",
        client_address: row.client_address || "",
        total_amount: row.total_amount || 0,
        documents: [],
      });
    }
    clientMap.get(key)!.documents.push(row);
  }

  return NextResponse.json({
    clients: Array.from(clientMap.values()),
    report_date: data?.[0]?.report_date || null,
  });
}
