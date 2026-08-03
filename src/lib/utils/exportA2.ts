import * as XLSX from "xlsx";

interface OrderItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_rif: string;
  customer_address: string;
  vendor_name: string;
  created_at: string;
}

const COMPANY = {
  name: "ARUCA Maquinarias para Madera S.A.",
  rif: "J-30358145-5",
  address: "Carretera Nacional Petare Santa Lucia, KM 9, Galpon Nº 407, Filas de Mariche, Estado Miranda. Código Postal 1070.",
  phones: "(0212) 532.20.53",
  email: "aruca.maquinarias@gmail.com",
  web: "www.arucamaquinarias.com.ve",
};

function formatA2Date(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function formatA2Time(iso: string): string {
  const d = new Date(iso);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "p.m." : "a.m.";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

function parsePrice(price: string): number {
  if (!price) return 0;
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
}

function numberToWords(n: number): string {
  if (n === 0) return "CERO";
  const ones = ["", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE", "VEINTE"];
  const tens = ["", "", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];

  const integerPart = Math.floor(n);
  const decimalPart = Math.round((n - integerPart) * 100);

  if (integerPart <= 20) return ones[integerPart];

  let result = "";
  const t = Math.floor(integerPart / 10);
  const o = integerPart % 10;
  result = tens[t];
  if (o > 0) result += ` Y ${ones[o]}`;

  if (decimalPart > 0) {
    result += ` CON ${decimalPart}/100`;
  }
  return result;
}

export function exportOrdersToA2(orders: Order[]): void {
  const wb = XLSX.utils.book_new();

  orders.forEach((order) => {
    const wsData: (string | number)[][] = [];

    // Company header
    wsData.push([]);
    wsData.push([COMPANY.name]);
    wsData.push([`RIF: ${COMPANY.rif}`]);
    wsData.push([COMPANY.address]);
    wsData.push([`Teléfonos: ${COMPANY.phones} | E-mail: ${COMPANY.email} | Web: ${COMPANY.web}`]);
    wsData.push([]);

    // Order header
    wsData.push([
      `Cliente: ${order.customer_name || ""}`,
      "",
      "",
      "",
      `PEDIDO`,
    ]);
    wsData.push([
      `Dirección: ${order.customer_address || ""}`,
      "",
      "",
      "",
      `No.${String(order.id).padStart(8, "0")}`,
    ]);
    wsData.push([
      `R.I.F.: ${order.customer_rif || ""}`,
      `Teléfono: ${order.customer_phone || ""}`,
      `Vendedor: ${order.vendor_name || ""}`,
      `Hora: ${formatA2Time(order.created_at)}`,
      `Fecha: ${formatA2Date(order.created_at)}`,
    ]);
    wsData.push([]);

    // Table header
    wsData.push(["Código", "Descripción", "Cantidad", "Precio Unitario", "Total"]);
    wsData.push([]);

    // Items
    let totalNeto = 0;
    order.items.forEach((item) => {
      const precio = parsePrice(item.price);
      const subtotal = precio * item.quantity;
      totalNeto += subtotal;
      const description = `${item.brand} ${item.name} ${item.model}`.trim();
      wsData.push([
        item.model || item.id,
        description,
        item.quantity,
        precio.toFixed(4),
        subtotal.toFixed(4),
      ]);
    });

    const iva = totalNeto * 0.16;
    const totalOperacion = totalNeto + iva;

    wsData.push([]);
    wsData.push([]);
    wsData.push([]);
    wsData.push([
      `Son: ${numberToWords(totalOperacion)} ${totalOperacion.toFixed(2)} 100`,
      "",
      "",
      "Total Neto:",
      totalNeto.toFixed(4),
    ]);
    wsData.push(["", "", "", "I.V.A. (16%):", iva.toFixed(4)]);
    wsData.push(["", "", "", "Total Operación:", totalOperacion.toFixed(4)]);
    wsData.push([]);
    wsData.push(["Recibido por: _________________", "Cédula: _________________", "Fecha: __/__/____"]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws["!cols"] = [
      { wch: 30 },
      { wch: 45 },
      { wch: 12 },
      { wch: 16 },
      { wch: 16 },
    ];

    const sheetName = `Pedido ${String(order.id).padStart(8, "0")}`;
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  const timestamp = new Date().toISOString().slice(0, 10);
  const fileName = `Pedidos_A2_${timestamp}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
