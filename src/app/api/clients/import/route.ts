import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import clientsData from "@/lib/data/a2clients.json";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  if (body.secret !== "aruca-import-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const batchSize = 500;
  let inserted = 0;
  let errors: string[] = [];

  for (let i = 0; i < clientsData.length; i += batchSize) {
    const batch = clientsData.slice(i, i + batchSize).map((c: any) => ({
      a2_code: c.code,
      name: c.name,
      rif: c.rif || "",
      nit: c.nit || "",
      phone: c.phone || "",
      fax: c.fax || "",
      email: c.email || "",
      address: c.address || "",
      contact: c.contact || "",
      vendor_code: c.vendor_code || "",
      classification: c.classification || "",
      balance: c.balance || 0,
      credit_limit: c.credit_limit || 0,
      credit_days: c.credit_days || 0,
      currency: c.currency || "",
    }));

    const { data, error } = await supabase
      .from("clients")
      .upsert(batch, { onConflict: "a2_code" });

    if (error) {
      errors.push(`Batch ${Math.floor(i / batchSize)}: ${error.message}`);
    } else {
      inserted += batch.length;
    }
  }

  return NextResponse.json({
    success: true,
    total: clientsData.length,
    inserted,
    errors: errors.length > 0 ? errors : undefined,
  });
}
