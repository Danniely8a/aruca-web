"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Minus, Trash2, ShoppingCart, User, Phone, Mail,
  FileText, CheckCircle, Loader2, ArrowRight, Package,
  LogOut, Menu, X, UserPlus, MapPin, CreditCard, Hash,
  Printer, RotateCcw, Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useA2Products, type A2Product } from "@/lib/hooks/useA2Products";
import PrintableOrder from "@/components/PrintableOrder";

interface Client {
  a2_code?: string;
  name: string;
  phone: string;
  email: string;
  rif: string;
  nit: string;
  address: string;
  contact: string;
  fax: string;
  vendor_code: string;
  classification: string;
  balance: number;
  credit_limit: number;
  credit_days: number;
  currency: string;
}

interface OrderItem {
  id: string;
  code: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
}

interface SubmittedOrder {
  orderNumber: string;
  date: string;
  customerName: string;
  customerCode: string;
  customerRif: string;
  customerPhone: string;
  customerAddress: string;
  vendorName: string;
  items: OrderItem[];
  notes: string;
}

function generateOrderNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 900 + 100);
  return `PED-${y}${m}${d}-${rand}`;
}

export default function VendedorPedidosPage() {
  const router = useRouter();
  const { results, loading: searching, search } = useA2Products();
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orderNumber] = useState(generateOrderNumber);
  const [customerName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [customerRif, setCustomerRif] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);

  const [clientSearch, setClientSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);
  const clientTimer = useRef<NodeJS.Timeout | null>(null);
  const clientDropdownRef = useRef<HTMLDivElement>(null);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [vendorEmail, setVendorEmail] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/vendor");
        const data = await res.json();
        if (!data.authenticated) {
          router.replace("/vendedores");
          return;
        }
        setVendorName(data.name || "");
        setVendorEmail(data.email || "");
        setAuthChecked(true);
      } catch {
        router.replace("/vendedores");
      }
    })();
  }, [router]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(e.target as Node)) {
        setShowClientDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => search(q, 20), 250);
  };

  const searchClients = (q: string) => {
    setClientSearch(q);
    if (clientTimer.current) clearTimeout(clientTimer.current);

    if (!q.trim()) {
      setClients([]);
      setShowClientDropdown(false);
      return;
    }

    clientTimer.current = setTimeout(async () => {
      const vendorParam = vendorName ? `&vendor=` : "";
      const res = await fetch(`/api/clients?q=${encodeURIComponent(q)}${vendorParam}`);
      if (res.ok) {
        const data = await res.json();
        setClients(data);
        setShowClientDropdown(data.length > 0);
      }
    }, 200);
  };

  const selectClient = (client: Client) => {
    setCustomerName(client.name);
    setCustomerCode(client.a2_code || "");
    setCustomerPhone(client.phone || "");
    setCustomerEmail(client.email || "");
    setCustomerRif(client.rif || client.nit || "");
    setCustomerAddress(client.address || "");
    setClientSearch(client.name);
    setShowClientDropdown(false);
    setCreatingNew(false);
  };

  const handleCreateClient = async () => {
    if (!clientSearch.trim()) return;
    setCreatingNew(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientSearch.trim(),
          phone: customerPhone,
          email: customerEmail,
          rif: customerRif,
          address: customerAddress,
        }),
      });
      if (res.ok) {
        const newClient = await res.json();
        selectClient(newClient);
        setMessage("Cliente creado exitosamente");
        setMessageType("success");
      }
    } catch {
      setMessage("Error al crear cliente");
      setMessageType("error");
    }
    setCreatingNew(false);
  };

  const addToCart = (product: A2Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.code === product.code);
      if (existing) {
        return prev.map((i) =>
          i.code === product.code ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.code,
          code: product.code,
          name: product.description,
          quantity: 1,
          price: product.price,
          stock: product.stock,
        },
      ];
    });
    setSearchQuery("");
  };

  const updateQty = (code: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.code !== code));
      return;
    }
    setCart((prev) => prev.map((i) => (i.code === code ? { ...i, quantity: qty } : i)));
  };

  const removeItem = (code: string) => {
    setCart((prev) => prev.filter((i) => i.code !== code));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    if (cart.length === 0) return;
    if (!customerName.trim()) {
      setMessage("Nombre del cliente es obligatorio");
      setMessageType("error");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            ...item,
            brand: "",
            model: item.code,
            image: "",
            price: `$${item.price.toFixed(2)}`,
          })),
          total: total > 0 ? `$${total.toFixed(2)}` : "Consultar",
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          customer_email: customerEmail.trim(),
          customer_rif: customerRif.trim(),
          customer_address: customerAddress.trim(),
          customer_notes: customerNotes.trim(),
          vendor_name: vendorName.trim(),
          source: "vendedor",
          order_number: orderNumber,
          customer_code: customerCode.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al crear pedido");
      }

      setSubmittedOrder({
        orderNumber,
        date: new Date().toISOString(),
        customerName: customerName.trim(),
        customerCode: customerCode.trim(),
        customerRif: customerRif.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        vendorName: vendorName.trim(),
        items: [...cart],
        notes: customerNotes.trim(),
      });
      setOrderSubmitted(true);
    } catch (err: unknown) {
      setMessage("Error: " + ((err as Error).message || "Error al crear pedido"));
      setMessageType("error");
    }
    setSubmitting(false);
  };

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleNewOrder = () => {
    setOrderSubmitted(false);
    setSubmittedOrder(null);
    setCart([]);
    setCustomerName("");
    setCustomerCode("");
    setCustomerRif("");
    setCustomerAddress("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomerNotes("");
    setClientSearch("");
    setMessage("");
  };

  const handleLogout = async () => {
    await fetch("/api/vendor", { method: "DELETE" });
    router.push("/vendedores");
  };

  // SUCCESS SCREEN
  if (orderSubmitted && submittedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-brand text-white sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo.jpg"
                alt="ARUCA"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded bg-white p-0.5"
              />
              <div>
                <p className="font-bold text-sm">Portal de Ventas</p>
                <p className="text-white/60 text-[10px]">ARUCA Maquinarias</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-xs font-mono bg-white/10 px-2 py-1 rounded">
                {submittedOrder.orderNumber}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-white/70 hover:text-white text-xs"
              >
                <LogOut size={14} />
                Salir
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">
                Pedido {submittedOrder.orderNumber} creado exitosamente
              </p>
              <p className="text-sm text-green-600">
                El pedido fue guardado. Puede imprimir o exportar a A2.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6 no-print">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all"
            >
              <Printer size={18} />
              Imprimir Pedido
            </button>
            <button
              onClick={handleNewOrder}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
            >
              <RotateCcw size={18} />
              Nuevo Pedido
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <PrintableOrder
              orderNumber={submittedOrder.orderNumber}
              date={submittedOrder.date}
              time={submittedOrder.date}
              customerName={submittedOrder.customerName}
              customerCode={submittedOrder.customerCode}
              customerRif={submittedOrder.customerRif}
              customerPhone={submittedOrder.customerPhone}
              customerAddress={submittedOrder.customerAddress}
              vendorName={submittedOrder.vendorName}
              items={submittedOrder.items}
              notes={submittedOrder.notes}
              orderType="PRESUPUESTO"
            />
          </div>
        </div>
      </div>
    );
  }

  // ORDER FORM
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Image
              src="/assets/logo.jpg"
              alt="ARUCA"
              width={32}
              height={32}
              className="w-8 h-8 object-contain rounded bg-white p-0.5"
            />
            <div>
              <p className="font-bold text-sm">Portal de Ventas</p>
              {vendorName ? (
                <p className="text-white/80 text-[10px]">{vendorName} · {vendorEmail}</p>
              ) : (
                <p className="text-white/60 text-[10px]">ARUCA Maquinarias</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-xs font-mono bg-white/10 px-2 py-1 rounded">
              {orderNumber}
            </span>
            <Link
              href="/vendedores/dashboard"
              className="text-white/70 hover:text-white text-xs hidden sm:inline"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-white/70 hover:text-white text-xs hidden sm:inline"
            >
              Ver Sitio Web
            </Link>
            <Link
              href="/perfil"
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs hidden sm:inline"
            >
              Mi Perfil
            </Link>
            <Link
              href="/vendedores/cambiar-contrasena"
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs"
            >
              <Lock size={14} />
              Contraseña
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 space-y-2">
            <Link
              href="/vendedores/dashboard"
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2"
            >
              Ver Sitio Web
            </Link>
            <Link
              href="/perfil"
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2"
            >
              Mi Perfil
            </Link>
            <Link
              href="/vendedores/cambiar-contrasena"
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2"
            >
              <Lock size={14} />
              Cambiar Contraseña
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="flex items-center gap-1 bg-white rounded-lg px-1 py-0.5 border border-gray-200 w-fit">
          <Link href="/vendedores/pedidos" className="px-3 py-1.5 rounded-md text-xs font-medium bg-brand text-white">
            Pedidos
          </Link>
          <Link href="/vendedores/cuentas-por-cobrar" className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700">
            Cuentas por Cobrar
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Pedido</h1>
          <p className="text-gray-500 text-sm mt-1">
            Busca por código o descripción del producto A2
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Product Selector */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={18} />
                Buscar Productos A2
              </h2>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Código o descripción del producto..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                />
              </div>

              {searching && (
                <div className="mt-4 flex items-center justify-center py-8">
                  <Loader2 size={20} className="animate-spin text-brand" />
                </div>
              )}

              <AnimatePresence>
                {results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 border border-gray-100 rounded-xl divide-y divide-gray-50 overflow-hidden max-h-[400px] overflow-y-auto"
                  >
                    {results.map((product) => {
                      const inCart = cart.find((i) => i.code === product.code);
                      return (
                        <button
                          key={product.code}
                          onClick={() => addToCart(product)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {product.code}
                              </span>
                              {product.stock > 0 ? (
                                <span className="text-xs text-green-600 font-medium">
                                  Stock: {product.stock}
                                </span>
                              ) : (
                                <span className="text-xs text-red-500 font-medium">
                                  Sin stock
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-900 mt-1 truncate">
                              {product.description}
                            </p>
                          </div>
                          <div className="ml-auto flex items-center gap-2 flex-shrink-0">
                            {product.price > 0 && (
                              <span className="text-xs font-bold text-accent-orange">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                            <span className="flex items-center justify-center w-7 h-7 bg-brand text-white rounded-lg">
                              {inCart ? <CheckCircle size={14} /> : <Plus size={14} />}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {searchQuery && !searching && results.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4 mt-3">
                    No se encontraron productos
                  </p>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingCart size={18} />
                Productos Seleccionados ({cart.length})
              </h2>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  Busca y agrega productos para armar el pedido
                </p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.code} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                            {item.code}
                          </span>
                          <span className="text-xs text-gray-400">
                            Stock: {item.stock}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate mt-1">
                          {item.name}
                        </p>
                        <p className="text-xs font-semibold text-accent-orange mt-0.5">
                          ${item.price.toFixed(2)} c/u
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.code, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.code, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.code)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Customer Info & Submit */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Hash size={18} />
                Número de Pedido
              </h2>
              <div className="bg-gray-50 rounded-xl px-4 py-3 font-mono text-lg font-bold text-brand">
                {orderNumber}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User size={18} />
                Datos del Cliente
              </h2>
              <div className="space-y-4">
                <div ref={clientDropdownRef} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cliente <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={clientSearch || customerName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomerName(val);
                        searchClients(val);
                      }}
                      onFocus={() => {
                        if (clients.length > 0) setShowClientDropdown(true);
                      }}
                      placeholder="Buscar por nombre, código o RIF..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>

                  <AnimatePresence>
                    {showClientDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                      >
                        {clients.map((c) => (
                          <button
                            key={c.a2_code || c.name}
                            type="button"
                            onClick={() => selectClient(c)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left text-sm transition-colors"
                          >
                            <div className="w-7 h-7 bg-brand/10 text-brand rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate">{c.name}</p>
                              <p className="text-xs text-gray-400 truncate">
                                {[c.a2_code, c.rif || c.nit, c.phone].filter(Boolean).join(" · ")}
                              </p>
                            </div>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={handleCreateClient}
                          disabled={creatingNew}
                          className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-brand/5 text-brand text-sm font-medium transition-colors border-t border-gray-100"
                        >
                          <UserPlus size={14} />
                          {creatingNew ? "Creando..." : `Crear "${clientSearch}" como nuevo cliente`}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                  <div className="relative">
                    <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={customerCode}
                      readOnly
                      placeholder="Código A2 del cliente"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-700 font-mono focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0412-1234567"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="cliente@email.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">R.I.F. / Cedula</label>
                  <div className="relative">
                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={customerRif}
                      onChange={(e) => setCustomerRif(e.target.value)}
                      placeholder="V-12.345.678"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Direccion</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Direccion del cliente"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendedor</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={vendorName}
                      readOnly
                      placeholder="Vendedor conectado"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <div className="relative">
                    <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Notas adicionales..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Productos</span>
                  <span>{cart.reduce((s, i) => s + i.quantity, 0)} unidades</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Articulos</span>
                  <span>{cart.length}</span>
                </div>
                {total > 0 && (
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                    <span className="text-gray-900">Total</span>
                    <span className="text-accent-orange">${total.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-xl text-sm font-medium ${
                  messageType === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || cart.length === 0}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creando Pedido...
                </>
              ) : (
                <>
                  Crear Pedido
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
