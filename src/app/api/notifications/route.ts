import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "aruca.maquinarias@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log("[Email] No RESEND_API_KEY configured, skipping email:", subject);
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ARUCA Maquinarias <notificaciones@arucamaquinarias.com>",
        to,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[Email] Failed to send:", await res.text());
    }
  } catch (err) {
    console.error("[Email] Error:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, orderId, orderTotal, userName, userEmail, userPhone, comprobanteUrl } = body;

    if (type === "new_order") {
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#2A3B7B;">Nuevo Pedido #${orderId}</h2>
          <p>Un cliente ha creado un nuevo pedido:</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Cliente</td><td style="padding:8px;border:1px solid #ddd;">${userName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${userEmail}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Teléfono</td><td style="padding:8px;border:1px solid #ddd;">${userPhone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Total</td><td style="padding:8px;border:1px solid #ddd;">${orderTotal}</td></tr>
          </table>
          <p style="margin-top:20px;">
            <a href="https://arucamaquinarias.com/admin/pedidos" style="background:#2A3B7B;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;">
              Ver Pedido en Admin
            </a>
          </p>
        </div>`;

      await sendEmail(ADMIN_EMAIL, `Nuevo Pedido #${orderId} - ${userName}`, html);
    }

    if (type === "comprobante_uploaded") {
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#2A3B7B;">Comprobante de Pago - Pedido #${orderId}</h2>
          <p>Un cliente ha subido un comprobante de pago:</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Cliente</td><td style="padding:8px;border:1px solid #ddd;">${userName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${userEmail}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Total</td><td style="padding:8px;border:1px solid #ddd;">${orderTotal}</td></tr>
          </table>
          ${comprobanteUrl ? `<p style="margin-top:20px;"><a href="${comprobanteUrl}" style="background:#22c55e;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;">Ver Comprobante</a></p>` : ""}
          <p style="margin-top:20px;">
            <a href="https://arucamaquinarias.com/admin/pedidos" style="background:#2A3B7B;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;">
              Ver Panel de Pedidos
            </a>
          </p>
        </div>`;

      await sendEmail(ADMIN_EMAIL, `Comprobante de Pago - Pedido #${orderId} - ${userName}`, html);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Email API] Error:", err);
    return NextResponse.json({ error: "Error sending notification" }, { status: 500 });
  }
}
