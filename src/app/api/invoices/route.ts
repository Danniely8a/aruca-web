import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) return NextResponse.json({ error: "orderId requerido" }, { status: 400 });

    const supabase = createAdminClient();

    const { data: order } = await supabase
      .from("orders")
      .select("*, deliveries(*)")
      .eq("id", orderId)
      .single();

    if (!order) return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });

    const { data: userData } = await supabase
      .from("users")
      .select("name, email, phone, company")
      .eq("id", order.user_id)
      .single();

    const invoiceNumber = `ARU-${String(orderId).padStart(6, "0")}`;
    const items = (order.items as Array<{
      name: string; brand: string; model: string; quantity: number; price: string;
    }>) || [];

    const invoiceHTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Factura ${invoiceNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #1a1a1a; }
    .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 30px; border-bottom: 3px solid #2A3B7B; padding-bottom: 20px; }
    .header h1 { color: #2A3B7B; margin: 0; font-size: 24px; }
    .header .info { text-align: right; font-size: 12px; color: #666; }
    .header .logo { font-weight: bold; font-size: 16px; color: #2A3B7B; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #2A3B7B; color: white; padding: 10px; text-align: left; font-size: 12px; }
    td { padding: 10px; border-bottom: 1px solid #eee; font-size: 12px; }
    .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
    .footer { margin-top: 40px; font-size: 10px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
    .section { margin: 20px 0; }
    .section h3 { color: #2A3B7B; font-size: 14px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">ARUCA MAQUINARIAS, C.A.</div>
      <p style="margin:5px 0;font-size:12px;">RIF: J-XXXXXXXX-X</p>
      <p style="margin:5px 0;font-size:12px;">Carr. Petare - Sta. Lucia, Caracas 1073, Miranda</p>
      <p style="margin:5px 0;font-size:12px;">(0212) 532-1996</p>
    </div>
    <div class="info">
      <h1>FACTURA</h1>
      <p>Nro: ${invoiceNumber}</p>
      <p>Fecha: ${new Date().toLocaleDateString("es-VE")}</p>
      <p>Pedido: #${orderId}</p>
    </div>
  </div>

  <div class="section">
    <h3>Datos del Cliente</h3>
    <p style="font-size:12px;margin:3px 0;"><strong>Nombre:</strong> ${userData?.name || "N/A"}</p>
    <p style="font-size:12px;margin:3px 0;"><strong>Email:</strong> ${userData?.email || "N/A"}</p>
    <p style="font-size:12px;margin:3px 0;"><strong>Telefono:</strong> ${userData?.phone || "N/A"}</p>
    ${userData?.company ? `<p style="font-size:12px;margin:3px 0;"><strong>Empresa:</strong> ${userData.company}</p>` : ""}
  </div>

  <table>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Cant.</th>
        <th style="text-align:right">Precio</th>
        <th style="text-align:right">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      ${items.map((item) => {
        const price = parseFloat((item.price || "0").replace(/[^0-9,.]/g, "").replace(",", ".")) || 0;
        const subtotal = price * item.quantity;
        return `
        <tr>
          <td>${item.name}</td>
          <td>${item.brand}</td>
          <td>${item.model}</td>
          <td>${item.quantity}</td>
          <td style="text-align:right">${item.price || "Consultar"}</td>
          <td style="text-align:right">$${subtotal.toFixed(2)}</td>
        </tr>`;
      }).join("")}
    </tbody>
  </table>

  <div class="total">
    <p>Total: ${order.total || "Consultar"}</p>
  </div>

  <div class="section">
    <h3>Informacion de Pago</h3>
    <p style="font-size:12px;margin:3px 0;"><strong>Metodo:</strong> ${order.payment_method || "N/A"}</p>
    <p style="font-size:12px;margin:3px 0;"><strong>Referencia:</strong> ${order.payment_reference || "N/A"}</p>
    <p style="font-size:12px;margin:3px 0;"><strong>Estado:</strong> ${order.status}</p>
  </div>

  <div class="footer">
    <p>Gracias por su compra. ARUCA Maquinarias - Soluciones para la Industria de la Madera.</p>
    <p>aruca.maquinarias@gmail.com | @arucavzla</p>
  </div>
</body>
</html>`;

    const pdfBuffer = Buffer.from(invoiceHTML, "utf-8");
    const fileName = `invoice-${invoiceNumber}-${Date.now()}.html`;

    const { error: uploadError } = await supabase.storage
      .from("invoices")
      .upload(fileName, pdfBuffer, {
        contentType: "text/html",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload invoice error:", uploadError);
      return NextResponse.json({ error: "Error al subir factura" }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("invoices").getPublicUrl(fileName);
    const invoiceUrl = urlData.publicUrl;

    await supabase.from("invoices").insert({
      order_id: orderId,
      invoice_number: invoiceNumber,
      invoice_url: invoiceUrl,
    });

    return NextResponse.json({ invoiceUrl, invoiceNumber });
  } catch (err) {
    console.error("[Invoice] Error:", err);
    return NextResponse.json({ error: "Error al generar factura" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("order_id");
  if (!orderId) return NextResponse.json({ error: "order_id required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return NextResponse.json(data || {});
}
