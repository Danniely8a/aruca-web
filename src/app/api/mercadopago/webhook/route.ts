import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "";

export async function POST(request: NextRequest) {
  try {
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json({ received: true });
    }

    const body = await request.json();
    const { type, data } = body;

    if (type === "payment" && data?.id) {
      const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
        headers: { Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}` },
      });
      const payment = await paymentRes.json();

      if (payment.status === "approved" && payment.external_reference) {
        const supabase = createAdminClient();
        await supabase
          .from("orders")
          .update({
            status: "payment_verified",
            payment_method: "mercadopago",
            payment_reference: String(payment.id),
          })
          .eq("id", parseInt(payment.external_reference));
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[MercadoPago Webhook] Error:", err);
    return NextResponse.json({ received: true });
  }
}
