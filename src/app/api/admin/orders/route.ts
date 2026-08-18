import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const userIds = [...new Set(orders.map((o) => o.user_id))];
  let userMap: Record<string, { email: string; name: string; phone: string }> = {};

  if (userIds.length > 0) {
    const { data: users } = await supabase
      .from("users")
      .select("id, email, name, phone")
      .in("id", userIds);

    if (users) {
      for (const u of users) {
        userMap[u.id] = { email: u.email, name: u.name, phone: u.phone };
      }
    }
  }

  const { data: deliveries } = await supabase
    .from("deliveries")
    .select("*");

  const ordersWithUsers = orders.map((o) => ({
    ...o,
    user_email: userMap[o.user_id]?.email || "",
    user_name: userMap[o.user_id]?.name || "",
    user_phone: userMap[o.user_id]?.phone || "",
  }));

  return NextResponse.json({ orders: ordersWithUsers, deliveries });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: body.user_id || null,
      items: body.items || [],
      total: body.total || "",
      status: "pending_payment",
      customer_name: body.customer_name || "",
      customer_phone: body.customer_phone || "",
      customer_email: body.customer_email || "",
      customer_rif: body.customer_rif || "",
      customer_address: body.customer_address || "",
      customer_code: body.customer_code || "",
      customer_notes: body.customer_notes || "",
      vendor_name: body.vendor_name || "",
      source: body.source || "admin",
      exported_to_a2: false,
      ...(body.order_number ? { order_number: body.order_number } : {}),
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(order);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { ids, exported_to_a2 } = body;
  if (!ids || !Array.isArray(ids)) return NextResponse.json({ error: "Missing ids array" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ exported_to_a2 })
    .in("id", ids);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
