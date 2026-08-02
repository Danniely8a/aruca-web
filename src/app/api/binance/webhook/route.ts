import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function buildSignature(payload: string, secret: string): string {
  const crypto = require("crypto");
  return crypto.createHmac("sha512", secret).update(payload).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY || "";
    const BINANCE_API_KEY = process.env.BINANCE_API_KEY || "";

    if (!BINANCE_API_KEY || !BINANCE_SECRET_KEY) {
      return NextResponse.json({ received: true });
    }

    const body = await request.json();
    const receivedSignature = request.headers.get("BinancePay-Signature") || "";
    const payload = JSON.stringify(body);
    const expectedSignature = buildSignature(payload, BINANCE_SECRET_KEY);

    if (receivedSignature !== expectedSignature) {
      console.error("[Binance Webhook] Firma invalida");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const { bizType, bizIdStr, data: bizData } = body;

    if (bizType === "PAY" && bizData?.status === "PAID") {
      const merchantTradeNo: string = bizData.merchantTradeNo || "";
      const match = merchantTradeNo.match(/ARUCA-ORDER-(\d+)/);

      if (match) {
        const orderId = parseInt(match[1]);
        const supabase = createAdminClient();

        await supabase.from("orders").update({
          status: "payment_verified",
          payment_method: "binance",
          payment_reference: bizData.tradeNo || bizIdStr || "binance",
        }).eq("id", orderId);

        const { data: order } = await supabase.from("orders").select("user_id, total").eq("id", orderId).single();
        if (order) {
          const { data: user } = await supabase.from("users").select("name, email").eq("id", order.user_id).single();
          await fetch(`${request.nextUrl.origin}/api/notifications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "comprobante_uploaded",
              orderId,
              orderTotal: order.total,
              userName: user?.name || "Cliente",
              userEmail: user?.email || "",
              comprobanteUrl: "",
            }),
          }).catch(() => {});
        }
      }
    }

    return NextResponse.json({ returnCode: "SUCCESS", returnMessage: "" });
  } catch (err) {
    console.error("[Binance Webhook] Error:", err);
    return NextResponse.json({ received: true });
  }
}
