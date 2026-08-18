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
  customerCode?: string;
  customerRif: string;
  customerPhone: string;
  customerAddress: string;
  vendorName: string;
  items: PrintableOrderItem[];
  notes?: string;
  orderType?: "PRESUPUESTO" | "PEDIDO";
}

function formatVenezuela(n: number, decimals = 4): string {
  return n.toLocaleString("es-VE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
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
  const dd = d.getDate();
  const mm = d.getMonth() + 1;
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
  address: "Carretera Nacional Petare Santa Lucia, KM 9, Galpon N\u00b0 407, Filas de Mariche, Estado Miranda",
};

export default function PrintableOrder({
  orderNumber,
  date,
  time,
  customerName,
  customerCode,
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
      <div className="po-header">
        <div className="po-header-left">
          <div className="po-company-name">{COMPANY.name}</div>
          <div className="po-company-subtitle">{COMPANY.subtitle}</div>
          <div className="po-company-rif">Rif: {COMPANY.rif}</div>
        </div>
        <div className="po-header-right">
          <div className="po-company-address">{COMPANY.address}</div>
          <div className="po-company-small">ARUCA MAQUINARIAS PARA MADERA SA</div>
        </div>
      </div>

      {/* Order info */}
      <div className="po-info">
        <div className="po-info-left">
          <div className="po-info-line">
            <span className="po-label">Cliente:</span>
            <span className="po-value">{customerName}</span>
          </div>
          {customerCode && (
            <div className="po-info-line">
              <span className="po-label">C&oacute;digo:</span>
              <span className="po-value">{customerCode}</span>
            </div>
          )}
          <div className="po-info-line">
            <span className="po-label">Direcci&oacute;n:</span>
            <span className="po-value">{customerAddress}</span>
          </div>
          <div className="po-info-line">
            <span className="po-label">R.I.F.:</span>
            <span className="po-value">{customerRif}</span>
            <span className="po-label po-ml-24">Tel&eacute;fono:</span>
            <span className="po-value">{customerPhone}</span>
          </div>
        </div>
        <div className="po-info-right">
          <div className="po-order-type">{orderType}</div>
          <div className="po-order-number">{orderNumber}</div>
          <div className="po-info-line">
            <span className="po-label">Hora:</span>
            <span className="po-value">{fullTime} ha:</span>
            <span className="po-value" style={{ marginLeft: 8 }}>{fullDate}</span>
          </div>
        </div>
      </div>

      {/* Items table */}
      <table className="po-table">
        <thead>
          <tr>
            <th className="po-th po-th-left" style={{ width: "14%" }}>C&oacute;digo</th>
            <th className="po-th po-th-left" style={{ width: "42%" }}>Descripci&oacute;n</th>
            <th className="po-th po-th-right" style={{ width: "12%" }}>Cantidad</th>
            <th className="po-th po-th-right" style={{ width: "16%" }}>Precio Unitario</th>
            <th className="po-th po-th-right" style={{ width: "16%" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="po-tr">
              <td className="po-td">{item.code}</td>
              <td className="po-td">{item.name}</td>
              <td className="po-td po-td-right">{formatVenezuela(item.quantity, 2)}</td>
              <td className="po-td po-td-right">{formatVenezuela(item.price, 4)}</td>
              <td className="po-td po-td-right">{formatVenezuela(item.price * item.quantity, 4)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Spacer to push footer to bottom */}
      <div className="po-spacer" />

      {/* Footer */}
      <div className="po-footer">
        <div className="po-footer-top">
          <div className="po-footer-left">
            <div className="po-son">
              Son: {numberToWords(total)}
            </div>
          </div>
          <div className="po-footer-right">
            <div className="po-total-line">
              <span className="po-total-label">Total Neto:</span>
              <span className="po-total-value">{formatVenezuela(subtotal, 4)}</span>
            </div>
            <div className="po-total-line">
              <span className="po-total-label">I.V.A.:</span>
              <span className="po-total-value">{formatVenezuela(subtotal, 4)}</span>
              <span className="po-total-value po-ml-12">{formatVenezuela(iva, 4)}</span>
            </div>
            <div className="po-total-line po-total-final">
              <span className="po-total-label">Total Operaci&oacute;n:</span>
              <span className="po-total-value">{formatVenezuela(total, 4)}</span>
            </div>
          </div>
        </div>
        <div className="po-footer-bottom">
          <div className="po-signature-line">
            Recibido por: ___________________________
          </div>
          <div className="po-signature-line">
            Cedula: ___________________________
          </div>
          <div className="po-signature-line">
            Fecha: ___/___/_____
          </div>
        </div>
      </div>

      {notes && (
        <div className="po-notes">
          <strong>Notas:</strong> {notes}
        </div>
      )}
    </div>
  );
}
