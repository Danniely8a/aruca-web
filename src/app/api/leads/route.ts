import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { name, email, phone, company, type, source, product, message } = await request.json();

  if (!name || name.trim() === "") {
    return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase.from("leads").insert({
    name: name.trim(),
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    company: company?.trim() || null,
    type: type || "contacto",
    source: source || "form",
    product: product?.trim() || null,
    message: message?.trim() || null,
    status: "nuevo",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const adminCheck = requireAdmin(request);
  if (adminCheck) return adminCheck;

  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (type) query = query.eq("type", type);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data || [] });
}

export async function PUT(request: NextRequest) {
  const adminCheck = requireAdmin(request);
  if (adminCheck) return adminCheck;

  const { id, status, notes } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  const supabase = createClient();
  const updateData: Record<string, string> = { updated_at: new Date().toISOString() };
  if (status) updateData.status = status;
  if (notes !== undefined) updateData.notes = notes;

  const { error } = await supabase
    .from("leads")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const adminCheck = requireAdmin(request);
  if (adminCheck) return adminCheck;

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
