import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, total, userEmail, userName } = body;

    if (!orderId || !total) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://arucamaquinarias.com";

    const raw = total.toString().replace(/[^0-9,.]/g, "").replace(",", ".");
    const amountCents = Math.round(parseFloat(raw) * 100);

    if (isNaN(amountCents) || amountCents <= 0) {
      return NextResponse.json({ error: "Monto invalido" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: userEmail,
      metadata: {
        order_id: String(orderId),
        user_name: userName || "",
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Pedido #${orderId} - ARUCA Maquinarias`,
              description: "Compra en arucamaquinarias.com",
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/${orderId}?success=true`,
      cancel_url: `${baseUrl}/checkout/${orderId}?cancel=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message, bankTransfer: true }, { status: 500 });
  }
}
