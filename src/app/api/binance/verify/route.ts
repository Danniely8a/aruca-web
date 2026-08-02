import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function buildSignature(payload: string, secret: string): string {
  const crypto = require("crypto");
  return crypto.createHmac("sha512", secret).update(payload).digest("hex");
}

export async function GET(request: NextRequest) {
  try {
    const BINANCE_API_KEY = process.env.BINANCE_API_KEY || "";
    const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY || "";

    if (!BINANCE_API_KEY || !BINANCE_SECRET_KEY) {
      return NextResponse.json({ verified: false, error: "Binance no configurado" });
    }

    const orderId = request.nextUrl.searchParams.get("order_id");
    const expectedAmount = request.nextUrl.searchParams.get("amount");

    if (!orderId) {
      return NextResponse.json({ verified: false, error: "order_id requerido" });
    }

    const timestamp = Date.now();
    const nonce = Date.now().toString() + Math.random().toString(36).substring(2, 10);
    const payload = JSON.stringify({ timestamp, nonce });
    const signature = buildSignature(payload, BINANCE_SECRET_KEY);

    const res = await fetch("https://bpay.binanceapi.com/binancepay/openapi/v2/order/query", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "BinancePay-Certificate-SN": BINANCE_API_KEY,
        "BinancePay-Signature": signature,
      },
      body: payload,
    });

    if (!res.ok) {
      return NextResponse.json({ verified: false, error: "Error consultando Binance" });
    }

    const data = await res.json();

    if (data.status === "SUCCESS" && data.data?.orders) {
      const matchingOrder = data.data.orders.find((o: { merchantTradeNo: string; status: string; totalFee: string }) => {
        const match = o.merchantTradeNo?.match(/ARUCA-ORDER-(\d+)/);
        return match && parseInt(match[1]) === parseInt(orderId) && o.status === "PAID";
      });

      if (matchingOrder) {
        const supabase = createAdminClient();
        await supabase.from("orders").update({
          status: "payment_verified",
          payment_method: "binance",
          payment_reference: matchingOrder.tradeNo || "binance",
        }).eq("id", parseInt(orderId));

        return NextResponse.json({ verified: true, transactionId: matchingOrder.tradeNo });
      }
    }

    return NextResponse.json({ verified: false });
  } catch (err) {
    console.error("[Binance Verify] Error:", err);
    return NextResponse.json({ verified: false, error: "Error de conexion" });
  }
}
