import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("products").select("*").order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createAdminClient();

  const product = {
    id: body.id || slugify(body.name),
    slug: body.slug || slugify(body.name),
    name: body.name,
    brand: body.brand || "",
    model: body.model || "",
    description: body.description || "",
    short_description: body.short_description || "",
    category: body.category || "",
    subcategory: body.subcategory || "",
    image: body.image || "",
    specs: body.specs || {},
    included: body.included || "",
    featured: body.featured || false,
    price: body.price || "",
  };

  const { error } = await supabase.from("products").insert(product);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, id: product.id });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const supabase = createAdminClient();
  const { id, ...updates } = body;
  updates.updated_at = new Date().toISOString();

  const { error } = await supabase.from("products").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
