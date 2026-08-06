"use client";

interface PrintableOrderItem {
  code: string;
  name: string;
  quantity: number;
  price: number;
}

interface PrintableOrderProps {
  orderNumber: string;
  date: string;
  time: string;
  customerName: string;
  customerRif: string;
  customerPhone: string;
  customerAddress: string;
  vendorName: string;
  items: PrintableOrderItem[];
  notes?: string;
  orderType?: "PRESUPUESTO" | "PEDIDO";
}

function numberToWords(n: number): string {
  if (n === 0) return "CERO";
  const ones = [
    "", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO",
    "NUEVE", "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE",
    "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE", "VEINTE",
  ];
  const tens = [
    "", "", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA",
    "SETENTA", "OCHENTA", "NOVENTA",
  ];

  const integerPart = Math.floor(n);
  const decimalPart = Math.round((n - integerPart) * 100);

  if (integerPart <= 20) {
    const base = ones[integerPart];
    return decimalPart > 0 ? `${base} CON ${decimalPart}/100` : base;
  }

  const t = Math.floor(integerPart / 10);
  const o = integerPart % 10;
  let result = tens[t];
  if (o > 0) result += ` Y ${ones[o]}`;
  if (decimalPart > 0) result += ` CON ${decimalPart}/100`;
  return result;
}

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

const COMPANY = {
  name: "ARUCA",
  subtitle: "Maquinarias para Madera SA.",
  rif: "J-30358145-5",
  address: "Carretera Nacional Petare Santa Lucia, KM 9, Galpon N° 407, Filas de Mariche, Estado Miranda",
};

export default function PrintableOrder({
  orderNumber,
  date,
  time,
  customerName,
  customerRif,
  customerPhone,
  customerAddress,
  vendorName,
  items,
  notes,
  orderType = "PRESUPUESTO",
}: PrintableOrderProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  const fullDate = formatA2Date(date);
  const fullTime = formatA2Time(date);

  return (
    <div className="print-order-container">
      {/* Header */}
      <div className="print-header">
        <div className="print-header-left">
          <div className="print-company-name">{COMPANY.name}</div>
          <div className="print-company-subtitle">{COMPANY.subtitle}</div>
          <div className="print-company-rif">Rif: {COMPANY.rif}</div>
        </div>
        <div className="print-header-right">
          <div className="print-company-address">{COMPANY.address}</div>
          <div className="print-company-small">ARUCA MAQUINARIAS PARA MADERA SA</div>
        </div>
      </div>

      {/* Order info */}
      <div className="print-order-info">
        <div className="print-order-info-left">
          <div className="print-info-row">
            <span className="print-info-label">Cliente:</span>
            <span className="print-info-value">{customerName}</span>
          </div>
          <div className="print-info-row">
            <span className="print-info-label">Dirección:</span>
            <span className="print-info-value">{customerAddress}</span>
          </div>
          <div className="print-info-row">
            <span className="print-info-label">R.I.F.:</span>
            <span className="print-info-value">{customerRif}</span>
            <span className="print-info-label" style={{ marginLeft: 24 }}>Teléfono:</span>
            <span className="print-info-value">{customerPhone}</span>
          </div>
          {vendorName && (
            <div className="print-info-row">
              <span className="print-info-label">Vendedor:</span>
              <span className="print-info-value">{vendorName}</span>
            </div>
          )}
        </div>
        <div className="print-order-info-right">
          <div className="print-order-type">{orderType}</div>
          <div className="print-order-number">{orderNumber}</div>
          <div className="print-info-row">
            <span className="print-info-label">Hora:</span>
            <span className="print-info-value">{fullTime} ha: {fullDate}</span>
          </div>
        </div>
      </div>

      {/* Items table */}
      <table className="print-table">
        <thead>
          <tr>
            <th className="print-th" style={{ width: "15%" }}>Código</th>
            <th className="print-th" style={{ width: "45%" }}>Descripción</th>
            <th className="print-th" style={{ width: "10%", textAlign: "center" }}>Cantidad</th>
            <th className="print-th" style={{ width: "15%", textAlign: "right" }}>Precio Unitario</th>
            <th className="print-th" style={{ width: "15%", textAlign: "right" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="print-tr">
              <td className="print-td">{item.code}</td>
              <td className="print-td">{item.name}</td>
              <td className="print-td" style={{ textAlign: "center" }}>
                {item.quantity.toFixed(2)}
              </td>
              <td className="print-td" style={{ textAlign: "right" }}>
                {item.price.toFixed(4)}
              </td>
              <td className="print-td" style={{ textAlign: "right" }}>
                {(item.price * item.quantity).toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="print-footer">
        <div className="print-footer-left">
          <div className="print-son">
            Son: {numberToWords(total)} {total.toFixed(2)} 100
          </div>
        </div>
        <div className="print-footer-right">
          <div className="print-total-row">
            <span>Total Neto:</span>
            <span>{subtotal.toFixed(4)}</span>
          </div>
          <div className="print-total-row">
            <span>I.V.A.:</span>
            <span>16.0000  {iva.toFixed(4)}</span>
          </div>
          <div className="print-total-row print-total-final">
            <span>Total Operación:</span>
            <span>{total.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Signature line */}
      <div className="print-signature">
        <div className="print-signature-field">
          Recibido por: _______________
        </div>
        <div className="print-signature-field">
          Cedula: _______________
        </div>
        <div className="print-signature-field">
          Fecha: __/__/____
        </div>
      </div>

      {notes && (
        <div className="print-notes">
          <strong>Notas:</strong> {notes}
        </div>
      )}
    </div>
  );
}
