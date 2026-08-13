import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import fs from "fs";
import path from "path";

const DATA_DIR = process.env.A2_DATA_DIR || path.join("C:\\Users\\caja.02\\Desktop");

function readStr(bytes: Buffer, offset: number, maxLen: number): string {
  let s = "";
  for (let i = offset; i < offset + maxLen; i++) {
    if (bytes[i] === 0) break;
    if (bytes[i] >= 32 && bytes[i] <= 126) s += String.fromCharCode(bytes[i]);
  }
  return s.trim();
}

function getVendorClients(vendorName: string): Set<string> {
  const codes = new Set<string>();
  const filePath = path.join(DATA_DIR, "Sclientes.dat");
  if (!fs.existsSync(filePath)) return codes;

  const bytes = fs.readFileSync(filePath);
  const REC_SIZE = 3120;
  const DATA_START = 1648593;
  const totalRecs = Math.floor((bytes.length - DATA_START) / REC_SIZE);

  for (let r = 0; r < totalRecs; r++) {
    const base = DATA_START + r * REC_SIZE;
    const code = readStr(bytes, base + 25, 30);
    const vendor = readStr(bytes, base + 526, 30);
    if (vendor.toUpperCase() === vendorName.toUpperCase()) {
      codes.add(code);
    }
  }
  return codes;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const vendor = searchParams.get("vendor") || "";

  if (!vendor) {
    return NextResponse.json({ error: "vendor required" }, { status: 400 });
  }

  const vendorClientCodes = getVendorClients(vendor);

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("accounts_receivable")
    .select("*")
    .order("client_name")
    .order("emission_date");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const filtered = (data || []).filter((row) =>
    vendorClientCodes.has(row.client_code)
  );

  const clientMap = new Map<
    string,
    {
      client_code: string;
      client_name: string;
      client_rif: string;
      client_phone: string;
      client_address: string;
      total_amount: number;
      documents: typeof filtered;
    }
  >();

  for (const row of filtered) {
    const key = row.client_code;
    if (!clientMap.has(key)) {
      clientMap.set(key, {
        client_code: row.client_code,
        client_name: row.client_name,
        client_rif: row.client_rif || "",
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
    report_date: filtered[0]?.report_date || null,
  });
}
