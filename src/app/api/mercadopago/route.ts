import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) return NextResponse.json({ error: "orderId requerido" }, { status: 400 });

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("user_id", session.user.id)
      .single();

    if (!order) return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });

    const items = (order.items as Array<{ name: string; quantity: number; price: string }>) || [];
    const totalAmount = order.total || "0";
    const amount = parseFloat(totalAmount.replace(/[^0-9,.]/g, "").replace(",", "."));

    if (!MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json({
        error: "MercadoPago no configurado. Use los datos bancarios para transferencia.",
        bankTransfer: true,
        orderId,
      }, { status: 200 });
    }

    const preference = {
      items: [
        {
          id: String(orderId),
          title: `Pedido ARUCA #${orderId}`,
          description: items.map((i) => `${i.name} x${i.quantity}`).join(", ").slice(0, 200),
          quantity: 1,
          unit_price: amount || 1,
          currency_id: "VES",
        },
      ],
      external_reference: String(orderId),
      notification_url: `${request.nextUrl.origin}/api/mercadopago/webhook`,
      back_urls: {
        success: `${request.nextUrl.origin}/checkout/${orderId}`,
        failure: `${request.nextUrl.origin}/checkout/${orderId}`,
        pending: `${request.nextUrl.origin}/checkout/${orderId}`,
      },
      auto_return: "approved",
    };

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    if (!mpRes.ok) {
      const err = await mpRes.text();
      console.error("[MercadoPago] Error creating preference:", err);
      return NextResponse.json({ error: "Error al crear preferencia de pago", bankTransfer: true }, { status: 500 });
    }

    const mpData = await mpRes.json();
    return NextResponse.json({ initPoint: mpData.init_point, sandboxInitPoint: mpData.sandbox_init_point });
  } catch (err) {
    console.error("[MercadoPago] Unexpected error:", err);
    return NextResponse.json({ error: "Error interno", bankTransfer: true }, { status: 500 });
  }
}
