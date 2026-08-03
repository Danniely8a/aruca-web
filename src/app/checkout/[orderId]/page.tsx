"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Landmark,
  Building2,
  CreditCard,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  Store,
  Package,
  User,
  Hash,
  MapPin,
  FileText,
  Eye,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

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
  user_id: string;
  status: string;
  items: OrderItem[];
  total: string;
  payment_method: string;
  payment_reference: string;
  comprobante_url: string;
  created_at: string;
}

interface Delivery {
  id: number;
  order_id: number;
  method: string;
  status: string;
  recipient_name: string;
  recipient_id_number: string;
  address: string;
  office_destiny: string;
  tracking_number: string;
  tracking_url: string;
  courier_company: string;
  estimated_delivery: string;
  notes: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending_payment: { label: "Pago Pendiente", color: "bg-yellow-100 text-yellow-800", icon: <Clock size={20} className="text-yellow-600" /> },
  payment_verification: { label: "Verificando Pago", color: "bg-blue-100 text-blue-800", icon: <Clock size={20} className="text-blue-600" /> },
  payment_verified: { label: "Pago Verificado", color: "bg-green-100 text-green-800", icon: <CheckCircle size={20} className="text-green-600" /> },
  in_process: { label: "En Proceso", color: "bg-purple-100 text-purple-800", icon: <Package size={20} className="text-purple-600" /> },
  shipped: { label: "Enviado", color: "bg-blue-100 text-blue-800", icon: <Truck size={20} className="text-blue-600" /> },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-800", icon: <CheckCircle size={20} className="text-green-600" /> },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: <XCircle size={20} className="text-red-600" /> },
};

const DELIVERY_METHODS = [
  { value: "pickup", label: "Retiro en Tienda", icon: <Store size={20} />, desc: "Retira tu pedido en nuestra tienda en Caracas" },
  { value: "delivery", label: "Delivery", icon: <Truck size={20} />, desc: "Entrega a domicilio en Caracas y alrededores" },
  { value: "mrw", label: "Encomienda MRW", icon: <Package size={20} />, desc: "Envio nacional por MRW" },
  { value: "zoom", label: "Encomienda Zoom", icon: <Package size={20} />, desc: "Envio nacional por Zoom" },
  { value: "tealca", label: "Encomienda Tealca", icon: <Package size={20} />, desc: "Envio nacional por Tealca" },
];

export default function PaymentPortalPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  const [selectedMethod, setSelectedMethod] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientIdNumber, setRecipientIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [officeDestiny, setOfficeDestiny] = useState("");

  const [binancePolling, setBinancePolling] = useState(false);
  const [binanceAttempts, setBinanceAttempts] = useState(0);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const startBinancePolling = () => {
    if (pollingRef.current) clearTimeout(pollingRef.current);
    setBinancePolling(true);
    setBinanceAttempts(0);
    let attempts = 0;

    const poll = async () => {
      if (!order) return;
      attempts++;
      setBinanceAttempts(attempts);

      if (attempts > 120) {
        setBinancePolling(false);
        setMessage("Tiempo de verificacion agotado. Si ya pagaste, sube el comprobante abajo.");
        setMessageType("error");
        return;
      }

      try {
        const numericTotal = parseFloat((order.total || "0").replace(/[^0-9,.]/g, "").replace(",", ".")) || 0;
        const baseUrl = window.location.origin;
        const res = await fetch(`${baseUrl}/api/binance/verify?order_id=${order.id}&amount=${numericTotal.toFixed(2)}`);
        const data = await res.json();

        if (data.verified) {
          setBinancePolling(false);
          setMessage("Pago verificado automaticamente via Binance!");
          setMessageType("success");
          loadOrder();
          return;
        }
      } catch {}

      pollingRef.current = setTimeout(poll, 3000);
    };

    pollingRef.current = setTimeout(poll, 3000);
  };

  const loadOrder = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("user_id", user.id)
      .single();

    if (data) {
      setOrder(data as unknown as Order);
      setPaymentMethod(data.payment_method || "");
      setPaymentReference(data.payment_reference || "");
    }

    const { data: delData } = await supabase
      .from("deliveries")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (delData) {
      setDelivery(delData as unknown as Delivery);
      setSelectedMethod(delData.method || "");
      setRecipientName(delData.recipient_name || "");
      setRecipientIdNumber(delData.recipient_id_number || "");
      setAddress(delData.address || "");
      setOfficeDestiny(delData.office_destiny || "");
    }

    setLoading(false);
  }, [orderId, user]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    loadOrder();
  }, [user, router, loadOrder]);

  const handleUploadComprobante = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !order) return;

    setUploading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `order-${order.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("comprobantes")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("comprobantes")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      if (paymentMethod && paymentReference) {
        const res = await fetch("/api/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: order.id,
            payment_method: paymentMethod,
            payment_reference: paymentReference,
            comprobante_url: publicUrl,
            status: "payment_verification",
          }),
        });

        if (res.ok) {
          setMessage("Comprobante cargado con exito. Tu pago esta siendo verificado.");
          setMessageType("success");
          fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "comprobante_uploaded",
              orderId: order.id,
              orderTotal: order.total,
              userName: user?.name || "Cliente",
              userEmail: user?.email || "",
              comprobanteUrl: publicUrl,
            }),
          }).catch(() => {});
          loadOrder();
        }
      } else {
        const res = await fetch("/api/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: order.id,
            comprobante_url: publicUrl,
          }),
        });

        if (res.ok) {
          setMessage("Comprobante cargado con exito.");
          setMessageType("success");
          loadOrder();
        }
      }
    } catch (err: unknown) {
      setMessage("Error al subir comprobante: " + ((err as Error).message || ""));
      setMessageType("error");
    }
    setUploading(false);
  };

  const handlePaymentSubmit = async () => {
    if (!paymentMethod || !paymentReference) {
      setMessage("Selecciona un metodo de pago y escribe la referencia");
      setMessageType("error");
      return;
    }
    setMessage("");

    const res = await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: order!.id,
        payment_method: paymentMethod,
        payment_reference: paymentReference,
        status: "payment_verification",
      }),
    });

    if (res.ok) {
      setMessage("Informacion de pago enviada. Carga el comprobante para completar.");
      setMessageType("success");
      loadOrder();
    } else {
      setMessage("Error al guardar la informacion de pago");
      setMessageType("error");
    }
  };

  const handleDeliverySubmit = async () => {
    if (!selectedMethod) {
      setMessage("Selecciona un metodo de entrega");
      setMessageType("error");
      return;
    }

    if (selectedMethod !== "pickup") {
      if (!recipientName || !recipientIdNumber || !address) {
        setMessage("Completa los datos del destinatario");
        setMessageType("error");
        return;
      }
      if (["mrw", "zoom", "tealca"].includes(selectedMethod) && !officeDestiny) {
        setMessage("Indica la oficina de destino para la encomienda");
        setMessageType("error");
        return;
      }
    }

    setMessage("");

    const body: Record<string, string | number> = {
      order_id: order!.id,
      method: selectedMethod,
      status: selectedMethod === "pickup" ? "pending" : "pending",
      recipient_name: recipientName,
      recipient_id_number: recipientIdNumber,
      address: address,
      office_destiny: officeDestiny,
    };

    if (delivery) {
      body.id = delivery.id;
    }

    const res = await fetch("/api/deliveries", {
      method: delivery ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setMessage("Metodo de entrega registrado con exito");
      setMessageType("success");
      loadOrder();
    } else {
      const data = await res.json();
      setMessage("Error: " + (data.error || ""));
      setMessageType("error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gray-50 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-brand" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Orden no encontrada</h2>
          <button onClick={() => router.push("/perfil")} className="text-brand font-semibold">Volver al perfil</button>
        </div>
      </div>
    );
  }

  const statusInfo = STATUS_LABELS[order.status] || STATUS_LABELS.pending_payment;

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => router.push("/perfil")}
            className="flex items-center gap-2 text-gray-500 hover:text-brand mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Volver al perfil
          </button>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Portal de Pago - Pedido #{order.id}
          </h1>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${statusInfo.color}`}>
            {statusInfo.icon}
            {statusInfo.label}
          </div>

          {/* Invoice download */}
          {["payment_verified", "in_process", "shipped", "delivered"].includes(order.status) && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Factura</h2>
              <p className="text-sm text-gray-500 mb-3">Descarga la factura de tu pedido</p>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/invoices?order_id=${order.id}`);
                    const data = await res.json();
                    if (data.invoice_url) {
                      window.open(data.invoice_url, "_blank");
                    } else {
                      const genRes = await fetch("/api/invoices", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId: order.id }),
                      });
                      const genData = await genRes.json();
                      if (genData.invoiceUrl) {
                        window.open(genData.invoiceUrl, "_blank");
                      }
                    }
                  } catch {
                    setMessage("Error al generar factura");
                    setMessageType("error");
                  }
                }}
                className="flex items-center gap-2 px-4 py-3 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-all text-sm"
              >
                <FileText size={18} />
                Ver / Generar Factura
              </button>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
            <div className="space-y-3">
              {(order.items as unknown as OrderItem[]).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x{item.quantity}</span>
                  <span className="font-medium text-accent-orange">
                    {item.price ? (
                      item.quantity > 1 ? `${item.price} x${item.quantity}` : item.price
                    ) : "Consultar"}
                  </span>
                </div>
              ))}
            </div>
            {order.total && order.total !== "Consultar" && (
              <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 font-bold text-lg">
                <span>Total a pagar</span>
                <span className="text-accent-orange">{order.total}</span>
              </div>
            )}
            {(!order.total || order.total === "Consultar") && (
              <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 font-bold text-lg">
                <span>Total a pagar</span>
                <span className="text-gray-400">Consultar</span>
              </div>
            )}
          </div>

          {/* Bank Info Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand/10 rounded-lg">
                <Landmark size={22} className="text-brand" />
              </div>
              <h2 className="font-semibold text-gray-900">Metodos de Pago</h2>
            </div>

            <p className="text-sm text-gray-500 mb-4">Selecciona un metodo de pago para continuar</p>

            <div className="space-y-3">
              {/* Stripe */}
              <button
                onClick={() => setPaymentMethod(paymentMethod === "stripe" ? "" : "stripe")}
                className={`w-full text-left rounded-xl p-4 border-2 transition-all ${
                  paymentMethod === "stripe"
                    ? "border-[#635BFF] bg-[#635BFF]/5"
                    : "border-transparent bg-gradient-to-r from-[#635BFF] to-[#4F46E5]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-base">Tarjeta de Credito/Debito</p>
                    <p className="text-indigo-200 text-sm">Visa, Mastercard - Pago internacional</p>
                  </div>
                  {paymentMethod === "stripe" && (
                    <CheckCircle size={22} className="text-white" />
                  )}
                </div>
              </button>

              {/* Binance Pay */}
              <button
                onClick={() => setPaymentMethod(paymentMethod === "binance" ? "" : "binance")}
                className={`w-full text-left rounded-xl p-4 border-2 transition-all ${
                  paymentMethod === "binance"
                    ? "border-[#F0B90B] bg-[#F0B90B]/5"
                    : "border-transparent bg-gradient-to-br from-[#0B0E11] to-[#1E2329]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png"
                      alt="Binance"
                      className="w-7 h-7 object-contain"
                    />
                    <div>
                      <p className="font-bold text-white text-base">Binance Pay</p>
                      <p className="text-gray-400 text-xs">USDT - Transferencia crypto</p>
                    </div>
                  </div>
                  {paymentMethod === "binance" && (
                    <CheckCircle size={22} className="text-[#F0B90B]" />
                  )}
                </div>
              </button>

              {/* Zelle */}
              <button
                onClick={() => setPaymentMethod(paymentMethod === "zelle" ? "" : "zelle")}
                className={`w-full text-left rounded-xl p-4 border-2 transition-all ${
                  paymentMethod === "zelle"
                    ? "border-[#6D28D9] bg-[#6D28D9]/5"
                    : "border-transparent bg-gradient-to-r from-[#6D28D9] to-[#5B21B6]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-base">Zelle</p>
                    <p className="text-purple-200 text-sm">Transferencia desde EE.UU.</p>
                  </div>
                  {paymentMethod === "zelle" && (
                    <CheckCircle size={22} className="text-white" />
                  )}
                </div>
              </button>

              {/* Pago Movil */}
              <button
                onClick={() => setPaymentMethod(paymentMethod === "pago_movil" ? "" : "pago_movil")}
                className={`w-full text-left rounded-xl p-4 border-2 transition-all ${
                  paymentMethod === "pago_movil"
                    ? "border-brand bg-brand/5"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard size={22} className="text-blue-800" />
                    <div>
                      <p className="font-bold text-gray-800">Pago Movil</p>
                      <p className="text-gray-500 text-xs">Banesco - RIF: J-303581455</p>
                    </div>
                  </div>
                  {paymentMethod === "pago_movil" && (
                    <CheckCircle size={22} className="text-brand" />
                  )}
                </div>
              </button>

              {/* Banesco */}
              <button
                onClick={() => setPaymentMethod(paymentMethod === "transferencia_banesco" ? "" : "transferencia_banesco")}
                className={`w-full text-left rounded-xl p-4 border-2 transition-all ${
                  paymentMethod === "transferencia_banesco"
                    ? "border-brand bg-brand/5"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 size={22} className="text-blue-800" />
                    <div>
                      <p className="font-bold text-gray-800">Transferencia Banesco</p>
                      <p className="text-gray-500 text-xs">Cuenta Corriente - ARUCA MAQUINARIAS, C.A.</p>
                    </div>
                  </div>
                  {paymentMethod === "transferencia_banesco" && (
                    <CheckCircle size={22} className="text-brand" />
                  )}
                </div>
              </button>
            </div>

            {/* Detalles del metodo seleccionado */}
            {paymentMethod === "stripe" && (
              <div className="mt-4 p-4 bg-[#635BFF]/5 rounded-xl border border-[#635BFF]/20">
                <p className="text-sm text-gray-600 mb-3">Seras redirigido a Stripe para pagar con tarjeta de forma segura.</p>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/stripe", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          orderId: order.id,
                          items: order.items,
                          total: order.total,
                          userEmail: user?.email,
                          userName: user?.name,
                        }),
                      });
                      const data = await res.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        setMessage("Stripe no disponible. Usa otro metodo de pago.");
                        setMessageType("error");
                      }
                    } catch {
                      setMessage("Error al conectar con Stripe");
                      setMessageType("error");
                    }
                  }}
                  className="w-full py-3 bg-[#635BFF] text-white font-semibold rounded-xl hover:bg-[#4F46E5] transition-all"
                >
                  Pagar con Stripe
                </button>
              </div>
            )}

            {paymentMethod === "binance" && (
              <div className="mt-4 p-4 bg-[#1E2329] rounded-xl border border-[#2B3139]">
                <p className="text-sm text-gray-300 mb-3">Paga con Binance Pay o transfiere manualmente:</p>

                <button
                  onClick={async () => {
                    try {
                      const numericTotal = parseFloat((order.total || "0").replace(/[^0-9,.]/g, "").replace(",", ".")) || 0;
                      const res = await fetch("/api/binance", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          orderId: order.id,
                          amount: numericTotal.toFixed(2),
                          currency: "USDT",
                        }),
                      });
                      const data = await res.json();
                      if (data.checkoutUrl || data.qrcodeLink) {
                        window.open(data.checkoutUrl || data.qrcodeLink, "_blank");
                        startBinancePolling();
                      } else if (data.manualPayment) {
                        setMessage("Binance Pay no disponible. Usa los datos de transferencia manual abajo.");
                        setMessageType("error");
                      } else {
                        setMessage(data.error || "Error al iniciar Binance Pay");
                        setMessageType("error");
                      }
                    } catch {
                      setMessage("Error de conexion. Usa la transferencia manual abajo.");
                      setMessageType("error");
                    }
                  }}
                  className="w-full py-3 bg-[#F0B90B] text-black font-bold rounded-xl hover:bg-[#FCD535] transition-colors text-sm mb-3"
                >
                  Pagar con Binance Pay
                </button>

                {binancePolling && (
                  <div className="bg-[#F0B90B]/10 border border-[#F0B90B]/20 rounded-lg p-3 mb-3 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#F0B90B] text-sm font-medium">
                      <Loader2 size={16} className="animate-spin" />
                      Verificando pago... ({binanceAttempts}s)
                    </div>
                    <p className="text-gray-400 text-xs mt-1">No cierres esta ventana. Se verifica automaticamente.</p>
                  </div>
                )}

                <div className="border-t border-[#2B3139] pt-3 mb-3">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-2">Transferencia manual USDT</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-[#0B0E11] rounded-lg px-3 py-2 border border-[#3A3F46]">
                      <span className="text-gray-400 text-[10px] font-medium">Correo</span>
                      <p className="text-white text-sm font-semibold">Aruca.pagos@gmail.com</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("Aruca.pagos@gmail.com");
                        setMessage("Correo de Binance copiado");
                        setMessageType("success");
                      }}
                      className="px-3 py-1.5 bg-[#F0B90B]/20 text-[#F0B90B] font-bold rounded-lg hover:bg-[#F0B90B]/30 transition-colors text-xs self-end"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Referencia (TXID o numero de transferencia)</label>
                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="Ej: TXID de Binance"
                    className="w-full px-4 py-2.5 bg-[#0B0E11] border border-[#2B3139] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 focus:border-[#F0B90B]"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "zelle" && (
              <div className="mt-4 p-4 bg-[#6D28D9]/5 rounded-xl border border-[#6D28D9]/20">
                <p className="text-sm text-gray-600 mb-3">Transfiere al email de Zelle y luego sube el comprobante:</p>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                    <span className="text-gray-500 text-[10px] font-medium">Email</span>
                    <p className="text-gray-900 text-sm font-semibold">aruca.maquinarias@gmail.com</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("aruca.maquinarias@gmail.com");
                      setMessage("Email Zelle copiado");
                      setMessageType("success");
                    }}
                    className="px-3 py-1.5 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-[#5B21B6] transition-colors text-xs"
                  >
                    Copiar
                  </button>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Referencia</label>
                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="Ej: Confirmacion de Zelle"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9]"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "pago_movil" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Realiza el pago movil y sube el comprobante:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <p><span className="font-medium">RIF:</span> J-303581455</p>
                  <p><span className="font-medium">Telefono:</span> 0412-9547321</p>
                  <p><span className="font-medium">Banco:</span> Banesco</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("04129547321");
                      setMessage("Telefono PagoMovil copiado");
                      setMessageType("success");
                    }}
                    className="px-3 py-1.5 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition-colors text-xs"
                  >
                    Copiar Telefono
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("J303581455");
                      setMessage("RIF copiado");
                      setMessageType("success");
                    }}
                    className="px-3 py-1.5 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition-colors text-xs"
                  >
                    Copiar RIF
                  </button>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Referencia</label>
                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="Ej: Numero de confirmacion"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "transferencia_banesco" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Transfiere a la cuenta Banesco y sube el comprobante:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <p><span className="font-medium">Titular:</span> ARUCA MAQUINARIAS, C.A.</p>
                  <p><span className="font-medium">RIF:</span> J-303581455</p>
                  <p><span className="font-medium">Cuenta:</span> 0134-0381-3038-1100-5621</p>
                  <p><span className="font-medium">Tipo:</span> Cuenta Corriente</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("01340381303811005621");
                      setMessage("Numero de cuenta Banesco copiado");
                      setMessageType("success");
                    }}
                    className="px-3 py-1.5 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition-colors text-xs"
                  >
                    Copiar Cuenta
                  </button>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Referencia</label>
                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="Ej: Numero de transferencia"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  />
                </div>
              </div>
            )}

            {paymentMethod && paymentMethod !== "stripe" && (
              <button
                onClick={handlePaymentSubmit}
                className="w-full mt-4 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all"
              >
                Confirmar Pago
              </button>
            )}
          </div>

          {/* Comprobante Upload */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Upload size={22} className="text-green-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Cargar Comprobante de Pago</h2>
            </div>

            {order.comprobante_url ? (
              <div className="flex items-center gap-4 bg-green-50 rounded-xl p-4">
                <CheckCircle size={20} className="text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Comprobante cargado</p>
                  <a
                    href={order.comprobante_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:underline flex items-center gap-1"
                  >
                    <Eye size={14} /> Ver comprobante
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand transition-colors cursor-pointer">
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 size={32} className="animate-spin text-brand" />
                        <span className="text-sm text-gray-500">Subiendo...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={32} className="text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Click para subir comprobante</p>
                        <p className="text-xs text-gray-400">JPG, PNG o PDF (max 5MB)</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleUploadComprobante}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Delivery Method */}
          {(order.status === "payment_verified" || order.status === "in_process" || order.status === "shipped" || order.status === "delivered") && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck size={22} className="text-blue-600" />
                </div>
                <h2 className="font-semibold text-gray-900">Metodo de Entrega</h2>
              </div>

              {delivery ? (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-medium text-gray-900">
                    {DELIVERY_METHODS.find((m) => m.value === delivery.method)?.label || delivery.method}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Estado: {delivery.status === "pending" ? "Pendiente" : delivery.status === "in_process" ? "En Proceso" : delivery.status === "shipped" ? "Enviado" : "Entregado"}
                  </p>
                  {delivery.tracking_number && (
                    <div className="mt-2 text-sm">
                      <p className="text-gray-600"><span className="font-medium">Guia:</span> {delivery.tracking_number}</p>
                      {delivery.tracking_url && (
                        <a href={delivery.tracking_url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline flex items-center gap-1 mt-1">
                          <Eye size={14} /> Rastrear envio
                        </a>
                      )}
                    </div>
                  )}
                  {delivery.recipient_name && (
                    <div className="mt-2 text-xs text-gray-400">
                      <p>Destinatario: {delivery.recipient_name}</p>
                      {delivery.recipient_id_number && <p>CI: {delivery.recipient_id_number}</p>}
                      {delivery.address && <p>Direccion: {delivery.address}</p>}
                      {delivery.office_destiny && <p>Oficina destino: {delivery.office_destiny}</p>}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DELIVERY_METHODS.map((method) => (
                      <button
                        key={method.value}
                        onClick={() => setSelectedMethod(method.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          selectedMethod === method.value
                            ? "border-brand bg-brand/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-brand">{method.icon}</div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{method.label}</p>
                          <p className="text-xs text-gray-400">{method.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedMethod && selectedMethod !== "pickup" && (
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <User size={16} />
                        Datos del Destinatario
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Nombre completo</label>
                          <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Nombre del destinatario"
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Cedula de Identidad</label>
                          <input
                            type="text"
                            value={recipientIdNumber}
                            onChange={(e) => setRecipientIdNumber(e.target.value)}
                            placeholder="V-XXXXXXXX"
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Direccion</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Direccion completa de entrega"
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                        />
                      </div>
                      {["mrw", "zoom", "tealca"].includes(selectedMethod) && (
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Oficina de destino</label>
                          <input
                            type="text"
                            value={officeDestiny}
                            onChange={(e) => setOfficeDestiny(e.target.value)}
                            placeholder={`Oficina de ${selectedMethod.toUpperCase()} de destino`}
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handleDeliverySubmit}
                    className="w-full py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all"
                  >
                    Guardar Metodo de Entrega
                  </button>
                </div>
              )}
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${
              messageType === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              {message}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
