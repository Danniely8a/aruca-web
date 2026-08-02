import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from("orders")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from("orders")
    .insert({
      user_id: session.user.id,
      items: body.items || [],
      total: body.total || "",
      status: "pending_payment",
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const items = body.items || [];
  for (const item of items) {
    if (item.id) {
      await adminClient.rpc("decrement_stock", {
        product_id: item.id,
        decrement_by: item.quantity || 1,
      });
    }
  }

  fetch(`${request.nextUrl.origin}/api/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "new_order",
      orderId: data.id,
      orderTotal: data.total,
      userName: body.userName || "Cliente",
      userEmail: session.user.email,
      userPhone: body.userPhone || "",
    }),
  }).catch(() => {});

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const adminClient = createAdminClient();

  const { data: order } = await adminClient
    .from("orders")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!order || order.user_id !== session.user.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { data, error } = await adminClient
    .from("orders")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
