import { NextRequest, NextResponse } from "next/server";

const BINANCE_API_KEY = process.env.BINANCE_API_KEY || "";
const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY || "";
const BINANCE_MERCHANT_ID = process.env.BINANCE_MERCHANT_ID || "";

function buildSignature(payload: string, secret: string): string {
  const crypto = require("crypto");
  return crypto.createHmac("sha512", secret).update(payload).digest("hex");
}

function generateNonce(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 10);
}

async function binanceRequest(endpoint: string, method: string, body?: Record<string, unknown>) {
  if (!BINANCE_API_KEY || !BINANCE_SECRET_KEY) {
    throw new Error("Binance API no configurada");
  }

  const timestamp = Date.now();
  const nonce = generateNonce();
  const params = new URLSearchParams({ timestamp: timestamp.toString(), nonce });

  let payload = params.toString();
  if (body) {
    payload = JSON.stringify({ ...body, timestamp, nonce });
  }

  const signature = buildSignature(payload, BINANCE_SECRET_KEY);

  const url = `https://bpay.binanceapi.com${endpoint}`;
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "BinancePay-Certificate-SN": BINANCE_API_KEY,
    "BinancePay-Signature": signature,
  };

  const res = await fetch(url, {
    method,
    headers,
    body: method !== "GET" ? payload : undefined,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Binance API error: ${res.status} - ${err}`);
  }

  return res.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, currency } = body;

    if (!orderId || !amount) {
      return NextResponse.json({ error: "orderId y amount requeridos" }, { status: 400 });
    }

    if (!BINANCE_API_KEY || !BINANCE_SECRET_KEY || !BINANCE_MERCHANT_ID) {
      return NextResponse.json({
        error: "Binance no configurado",
        manualPayment: true,
        walletAddress: "0x1234567890abcdef",
        instructions: "Usa los datos bancarios para transferencia",
      }, { status: 200 });
    }

    const order = await binanceRequest("/binancepay/openapi/v3/order", "POST", {
      merchantId: BINANCE_MERCHANT_ID,
      subMerchantId: "",
      merchantTradeNo: `ARUCA-ORDER-${orderId}-${Date.now()}`,
      tradeType: "WEB",
      totalFee: amount,
      currency: currency || "USDT",
      productType: "Payment",
      productName: `Pedido ARUCA #${orderId}`,
      productDetail: `Pago del pedido #${orderId} en ARUCA Maquinarias`,
      returnUrl: `${request.nextUrl.origin}/checkout/${orderId}?binance=success`,
      cancelUrl: `${request.nextUrl.origin}/checkout/${orderId}?binance=cancel`,
      webhookUrl: `${request.nextUrl.origin}/api/binance/webhook`,
    });

    return NextResponse.json({
      prepayId: order.data?.prepayId,
      qrCode: order.data?.qrCode,
      qrcodeLink: order.data?.universalUrl,
      checkoutUrl: order.data?.checkoutUrl,
      expireTime: order.data?.expireTime,
    });
  } catch (err) {
    console.error("[Binance] Error creando orden:", err);
    return NextResponse.json({
      error: "Error al crear orden Binance",
      manualPayment: true,
    }, { status: 500 });
  }
}
