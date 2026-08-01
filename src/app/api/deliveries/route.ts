import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const orderId = request.nextUrl.searchParams.get("order_id");
  const adminClient = createAdminClient();

  let query = adminClient.from("deliveries").select("*");
  if (orderId) query = query.eq("order_id", orderId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const adminClient = createAdminClient();

  const { data: order } = await adminClient
    .from("orders")
    .select("user_id")
    .eq("id", body.order_id)
    .single();

  if (!order || order.user_id !== session.user.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { data, error } = await adminClient
    .from("deliveries")
    .insert({
      order_id: body.order_id,
      method: body.method,
      status: body.status || "pending",
      recipient_name: body.recipient_name || "",
      recipient_id_number: body.recipient_id_number || "",
      address: body.address || "",
      office_destiny: body.office_destiny || "",
      notes: body.notes || "",
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
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

  const { data: delivery } = await adminClient
    .from("deliveries")
    .select("order_id, orders!inner(user_id)")
    .eq("id", id)
    .single();

  if (!delivery) {
    return NextResponse.json({ error: "Delivery not found" }, { status: 404 });
  }

  const { data, error } = await adminClient
    .from("deliveries")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
