"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  Loader2,
  Clock,
  RefreshCw,
} from "lucide-react";

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
  user_email?: string;
  user_name?: string;
  user_phone?: string;
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
}

const STATUS_OPTIONS = [
  { value: "pending_payment", label: "Pago Pendiente", color: "bg-yellow-100 text-yellow-800" },
  { value: "payment_verification", label: "Verificando Pago", color: "bg-blue-100 text-blue-800" },
  { value: "payment_verified", label: "Pago Verificado", color: "bg-green-100 text-green-800" },
  { value: "in_process", label: "En Proceso", color: "bg-purple-100 text-purple-800" },
  { value: "shipped", label: "Enviado", color: "bg-indigo-100 text-indigo-800" },
  { value: "delivered", label: "Entregado", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelado", color: "bg-red-100 text-red-800" },
];

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveries, setDeliveries] = useState<Map<number, Delivery>>(new Map());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [trackingInput, setTrackingInput] = useState<{ [key: number]: string }>({});
  const [trackingUrlInput, setTrackingUrlInput] = useState<{ [key: number]: string }>({});

  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
      const deliveryMap = new Map<number, Delivery>();
      if (data.deliveries) {
        for (const d of data.deliveries) {
          deliveryMap.set(d.order_id, d);
        }
      }
      setDeliveries(deliveryMap);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const updateOrderStatus = async (orderId: number, status: string) => {
    setUpdatingId(orderId);
    try {
      await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status }),
      });
      await loadOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
    setUpdatingId(null);
  };

  const updateDeliveryTracking = async (deliveryId: number) => {
    const tracking = trackingInput[deliveryId] || "";
    const trackingUrl = trackingUrlInput[deliveryId] || "";

    if (!tracking) return;

    try {
      const res = await fetch("/api/admin/deliveries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: deliveryId,
          tracking_number: tracking,
          tracking_url: trackingUrl,
          status: "shipped",
        }),
      });

      if (res.ok) {
        await updateOrderStatus(orders.find((o) => {
          const delivery = deliveries.get(o.id);
          return delivery && delivery.id === deliveryId;
        })?.id || 0, "shipped");
      }
      await loadOrders();
    } catch (err) {
      console.error("Error updating tracking:", err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(order.id).includes(q) ||
      (order.user_email || "").toLowerCase().includes(q) ||
      (order.user_name || "").toLowerCase().includes(q) ||
      (order.payment_reference || "").toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-sm text-gray-500 mt-1">{orders.length} pedidos totales</p>
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm"
        >
          <RefreshCw size={14} />
          Actualizar
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por ID, email, nombre o referencia..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusInfo = STATUS_OPTIONS.find((s) => s.value === order.status) || STATUS_OPTIONS[0];
          const delivery = deliveries.get(order.id);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">Pedido #{order.id}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{new Date(order.created_at).toLocaleDateString("es-VE", { year: "numeric", month: "long", day: "numeric" })}</span>
                      {order.user_email && <span>{order.user_email}</span>}
                      {order.user_name && <span>{order.user_name}</span>}
                      {order.user_phone && <span>{order.user_phone}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      disabled={updatingId === order.id}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye size={18} className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="text-gray-600"><strong>Total:</strong> {order.total}</span>
                  {order.payment_method && (
                    <span className="text-gray-600">| <strong>Pago:</strong> {order.payment_method}</span>
                  )}
                  {order.payment_reference && (
                    <span className="text-gray-600">| <strong>Ref:</strong> {order.payment_reference}</span>
                  )}
                </div>

                {order.comprobante_url && (
                  <div className="mt-2">
                    <a
                      href={order.comprobante_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
                    >
                      <Eye size={14} /> Ver comprobante de pago
                    </a>
                  </div>
                )}

                {delivery && (
                  <div className="mt-3 bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck size={14} className="text-gray-500" />
                      <span className="font-medium">
                        {delivery.method === "pickup" ? "Retiro en Tienda" :
                         delivery.method === "delivery" ? "Delivery" :
                         delivery.method.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        delivery.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        delivery.status === "in_process" ? "bg-blue-100 text-blue-700" :
                        delivery.status === "shipped" ? "bg-purple-100 text-purple-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {delivery.status === "pending" ? "Pendiente" :
                         delivery.status === "in_process" ? "En Proceso" :
                         delivery.status === "shipped" ? "Enviado" : "Entregado"}
                      </span>
                    </div>
                    {delivery.recipient_name && (
                      <div className="text-xs text-gray-500 mt-1 ml-6">
                        <p>Destinatario: {delivery.recipient_name} - CI: {delivery.recipient_id_number}</p>
                        {delivery.address && <p>Direccion: {delivery.address}</p>}
                        {delivery.office_destiny && <p>Oficina destino: {delivery.office_destiny}</p>}
                      </div>
                    )}
                    {delivery.tracking_number && (
                      <div className="text-xs mt-1 ml-6">
                        <span className="font-medium">Guia: {delivery.tracking_number}</span>
                        {delivery.tracking_url && (
                          <a href={delivery.tracking_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-brand hover:underline">
                            Rastrear
                          </a>
                        )}
                      </div>
                    )}
                    {!delivery.tracking_number && delivery.method !== "pickup" && (
                      <div className="mt-2 ml-6 flex flex-wrap gap-2">
                        <input
                          type="text"
                          placeholder="Numero de guia"
                          value={trackingInput[delivery.id] || ""}
                          onChange={(e) => setTrackingInput((prev) => ({ ...prev, [delivery.id]: e.target.value }))}
                          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                        />
                        <input
                          type="url"
                          placeholder="URL de rastreo"
                          value={trackingUrlInput[delivery.id] || ""}
                          onChange={(e) => setTrackingUrlInput((prev) => ({ ...prev, [delivery.id]: e.target.value }))}
                          className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                        />
                        <button
                          onClick={() => updateDeliveryTracking(delivery.id)}
                          className="px-3 py-1.5 bg-brand text-white text-xs rounded-lg hover:bg-brand/90"
                        >
                          Guardar Guia
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {selectedOrder?.id === order.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Productos</h4>
                    <div className="space-y-2">
                      {(order.items as unknown as OrderItem[]).map((item) => (
                        <div key={item.id} className="flex justify-between text-sm py-1 border-b border-gray-50">
                          <span className="text-gray-600">
                            {item.brand} {item.name} - {item.model} x{item.quantity}
                          </span>
                          <span className="font-medium">{item.price || "Consultar"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Clock size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay pedidos</p>
          </div>
        )}
      </div>
    </div>
  );
}
