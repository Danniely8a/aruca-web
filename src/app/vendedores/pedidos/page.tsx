"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Minus, Trash2, ShoppingCart, User, Phone, Mail,
  FileText, CheckCircle, Loader2, ArrowRight, Package,
  LogOut, Menu, X, UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/lib/hooks/useProducts";

interface Client {
  id: number;
  a2_id?: string;
  name: string;
  phone: string;
  email: string;
  rif: string;
  address: string;
}

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

export default function VendedorPedidosPage() {
  const router = useRouter();
  const { products, loading: productsLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [clientSearch, setClientSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);
  const clientTimer = useRef<NodeJS.Timeout | null>(null);
  const clientDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(e.target as Node)) {
        setShowClientDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const searchClients = (q: string) => {
    setClientSearch(q);
    if (clientTimer.current) clearTimeout(clientTimer.current);

    if (!q.trim()) {
      setClients([]);
      setShowClientDropdown(false);
      return;
    }

    clientTimer.current = setTimeout(async () => {
      const res = await fetch(`/api/clients?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setClients(data);
        setShowClientDropdown(data.length > 0);
      }
    }, 200);
  };

  const selectClient = (client: Client) => {
    setCustomerName(client.name);
    setCustomerPhone(client.phone || "");
    setCustomerEmail(client.email || "");
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

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [products, search]);

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          model: product.model,
          image: product.image || "",
          quantity: 1,
          price: product.price || "",
        },
      ];
    });
    setSearch("");
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const total = cart.reduce((sum, item) => {
    if (item.price) {
      const num = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return sum + (isNaN(num) ? 0 : num * item.quantity);
    }
    return sum;
  }, 0);

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
          items: cart,
          total: total > 0 ? `$${total.toFixed(2)}` : "Consultar",
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          customer_email: customerEmail.trim(),
          customer_notes: customerNotes.trim(),
          source: "vendedor",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al crear pedido");
      }

      setMessage("Pedido creado exitosamente!");
      setMessageType("success");
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setCustomerNotes("");
    } catch (err: unknown) {
      setMessage("Error: " + ((err as Error).message || "Error al crear pedido"));
      setMessageType("error");
    }
    setSubmitting(false);
  };

  const handleLogout = async () => {
    await fetch("/api/vendor", { method: "DELETE" });
    router.push("/vendedores");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
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
              <p className="text-white/60 text-[10px]">ARUCA Maquinarias</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-xs hidden sm:inline"
            >
              Ver Sitio Web
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
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Pedido</h1>
          <p className="text-gray-500 text-sm mt-1">Selecciona productos y asigna un cliente</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Product Selector */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={18} />
                Buscar Productos
              </h2>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre, marca o modelo..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                />
              </div>

              {productsLoading && (
                <div className="mt-4 flex items-center justify-center py-8">
                  <Loader2 size={20} className="animate-spin text-brand" />
                </div>
              )}

              <AnimatePresence>
                {filteredProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 border border-gray-100 rounded-xl divide-y divide-gray-50 overflow-hidden max-h-[400px] overflow-y-auto"
                  >
                    {filteredProducts.map((product) => {
                      const inCart = cart.find((i) => i.id === product.id);
                      return (
                        <button
                          key={product.id}
                          onClick={() => addToCart(product)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-400">{product.brand} - {product.model}</p>
                          </div>
                          <div className="ml-auto flex items-center gap-2">
                            {product.price && (
                              <span className="text-xs font-bold text-accent-orange">{product.price}</span>
                            )}
                            <span className="flex items-center justify-center w-7 h-7 bg-brand text-white rounded-lg flex-shrink-0">
                              {inCart ? <CheckCircle size={14} /> : <Plus size={14} />}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {search && !productsLoading && filteredProducts.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4 mt-3">No se encontraron productos</p>
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
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.brand} - {item.model}</p>
                        {item.price && (
                          <p className="text-xs font-semibold text-accent-orange mt-0.5">{item.price}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
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
                      placeholder="Buscar cliente por nombre..."
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
                            key={c.id}
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
                                {[c.phone, c.email, c.rif].filter(Boolean).join(" · ")}
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
                  <span>{cart.reduce((s, i) => s + i.quantity, 0)}</span>
                </div>
                {total > 0 && (
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                    <span className="text-gray-900">Total</span>
                    <span className="text-accent-orange">${total.toFixed(2)}</span>
                  </div>
                )}
                {total === 0 && cart.length > 0 && (
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-400">Consultar</span>
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
