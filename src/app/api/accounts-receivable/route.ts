import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("vendor-session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const clientCode = searchParams.get("client") || "";

  const supabase = createAdminClient();

  if (clientCode) {
    const { data, error } = await supabase
      .from("accounts_receivable")
      .select("*")
      .eq("client_code", clientCode)
      .order("emission_date", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const grouped = groupDocuments(data || []);
    return NextResponse.json(grouped);
  }

  if (!q) {
    const { data, error } = await supabase
      .from("accounts_receivable")
      .select("client_code, client_name, client_rif, client_phone, total_documents, total_amount")
      .order("total_amount", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const uniqueClients = deduplicateClients(data || []);
    return NextResponse.json({ clients: uniqueClients });
  }

  const { data, error } = await supabase
    .from("accounts_receivable")
    .select("client_code, client_name, client_rif, client_phone, total_documents, total_amount")
    .or(`client_name.ilike.%${q}%,client_code.eq.${q},client_rif.ilike.%${q}%`)
    .order("total_amount", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const uniqueClients = deduplicateClients(data || []);
  return NextResponse.json({ clients: uniqueClients });
}

function deduplicateClients(clients: Record<string, unknown>[]) {
  const seen = new Set<string>();
  return clients.filter((c) => {
    if (seen.has(c.client_code as string)) return false;
    seen.add(c.client_code as string);
    return true;
  });
}

function groupDocuments(docs: Record<string, unknown>[]) {
  if (docs.length === 0) return { client: null, documents: [] };
  const first = docs[0];
  return {
    client: {
      client_code: first.client_code,
      client_name: first.client_name,
      client_rif: first.client_rif,
      client_nit: first.client_nit,
      client_phone: first.client_phone,
      client_address: first.client_address,
      total_documents: first.total_documents,
      total_amount: first.total_amount,
    },
    documents: docs.map((d) => ({
      document_type: d.document_type,
      emission_date: d.emission_date,
      due_date: d.due_date,
      days: d.days,
      document_number: d.document_number,
      description: d.description,
      amount: d.amount,
    })),
  };
}
