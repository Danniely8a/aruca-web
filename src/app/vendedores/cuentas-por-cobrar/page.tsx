"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, FileText, DollarSign, Clock, AlertTriangle,
  LogOut, Menu, X, User, ArrowLeft, Loader2, Package,
  Lock, ChevronDown, ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ClientSummary {
  client_code: string;
  client_name: string;
  client_rif: string;
  client_phone: string;
  total_documents: number;
  total_amount: number;
}

interface Document {
  document_type: string;
  emission_date: string;
  due_date: string;
  days: number;
  document_number: string;
  description: string;
  amount: number;
}

interface ClientDetail {
  client: {
    client_code: string;
    client_name: string;
    client_rif: string;
    client_nit: string;
    client_phone: string;
    client_address: string;
    total_documents: number;
    total_amount: number;
  };
  documents: Document[];
}

export default function CuentasPorCobrarPage() {
  const router = useRouter();
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [searching, setSearching] = useState(false);

  const [selectedClient, setSelectedClient] = useState<ClientDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const [totalAmount, setTotalAmount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

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

  const loadClients = useCallback(async (q: string) => {
    setSearching(true);
    try {
      const params = q ? `?q=${encodeURIComponent(q)}` : "";
      const res = await fetch(`/api/accounts-receivable${params}`);
      if (res.ok) {
        const data = await res.json();
        const list = data.clients || [];
        setClients(list);
        const total = list.reduce((s: number, c: ClientSummary) => s + Number(c.total_amount), 0);
        setTotalAmount(total);
        const today = new Date().toISOString().split("T")[0];
        const overdue = list.filter((c: ClientSummary) => c.total_amount > 0).length;
        setOverdueCount(overdue);
      }
    } catch {
      // ignore
    }
    setSearching(false);
  }, []);

  useEffect(() => {
    if (authChecked) loadClients("");
  }, [authChecked, loadClients]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      loadClients(q);
    } else if (q.length === 0) {
      loadClients("");
    }
  };

  const loadDetail = async (code: string) => {
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/accounts-receivable?client=${code}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedClient(data);
      }
    } catch {
      // ignore
    }
    setLoadingDetail(false);
  };

  const handleLogout = async () => {
    await fetch("/api/vendor", { method: "DELETE" });
    router.push("/vendedores");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  const formatDate = (d: string) => {
    if (!d) return "-";
    return new Date(d + "T00:00:00").toLocaleDateString("es-VE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  if (selectedClient) {
    const client = selectedClient.client;
    const docs = selectedClient.documents;
    const today = new Date().toISOString().split("T")[0];

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-brand text-white sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1">
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <Image src="/assets/logo.jpg" alt="ARUCA" width={32} height={32}
                className="w-8 h-8 object-contain rounded bg-white p-0.5" />
              <div>
                <p className="font-bold text-sm">Portal de Ventas</p>
                {vendorName && (
                  <p className="text-white/80 text-[10px]">{vendorName} · {vendorEmail}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/perfil" className="flex items-center gap-1 text-white/70 hover:text-white text-xs hidden sm:inline">
                Mi Perfil
              </Link>
              <Link href="/vendedores/cambiar-contrasena" className="flex items-center gap-1 text-white/70 hover:text-white text-xs">
                <Lock size={14} /> Contraseña
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-white/70 hover:text-white text-xs">
                <LogOut size={14} /> Salir
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <button
            onClick={() => setSelectedClient(null)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-4"
          >
            <ArrowLeft size={16} /> Volver a la lista
          </button>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{client.client_name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {client.client_rif && `${client.client_rif} · `}
                  {client.client_phone && client.client_phone}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-brand">{formatCurrency(client.total_amount)}</p>
                <p className="text-xs text-gray-400">{client.total_documents} documentos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Tipo</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Emisión</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Vencimiento</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Días</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Nº Documento</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc, i) => {
                    const isOverdue = doc.due_date < today && doc.amount > 0;
                    const isNearDue = doc.due_date >= today && doc.days <= 7 && doc.days > 0 && doc.amount > 0;
                    return (
                      <tr key={i} className={`border-b border-gray-50 ${isOverdue ? "bg-red-50" : isNearDue ? "bg-yellow-50" : ""}`}>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            doc.document_type === "Factura" ? "bg-blue-100 text-blue-700" :
                            doc.document_type === "Adelanto" ? "bg-green-100 text-green-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {doc.document_type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(doc.emission_date)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(doc.due_date)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-mono text-xs ${
                            isOverdue ? "text-red-600 font-bold" :
                            isNearDue ? "text-yellow-600 font-bold" :
                            "text-gray-500"
                          }`}>
                            {doc.days}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-gray-700">{doc.document_number}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${doc.amount < 0 ? "text-green-600" : "text-gray-900"}`}>
                          {formatCurrency(doc.amount)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={5} className="px-4 py-3 text-gray-700">Total</td>
                    <td className="px-4 py-3 text-right text-brand text-lg">{formatCurrency(client.total_amount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Image src="/assets/logo.jpg" alt="ARUCA" width={32} height={32}
              className="w-8 h-8 object-contain rounded bg-white p-0.5" />
            <div>
              <p className="font-bold text-sm">Portal de Ventas</p>
              {vendorName && (
                <p className="text-white/80 text-[10px]">{vendorName} · {vendorEmail}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/perfil" className="flex items-center gap-1 text-white/70 hover:text-white text-xs hidden sm:inline">
              Mi Perfil
            </Link>
            <Link href="/vendedores/cambiar-contrasena" className="flex items-center gap-1 text-white/70 hover:text-white text-xs">
              <Lock size={14} /> Contraseña
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1 text-white/70 hover:text-white text-xs">
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 space-y-2">
            <Link href="/vendedores/pedidos" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2">
              <Package size={14} /> Pedidos
            </Link>
            <Link href="/perfil" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2">
              Mi Perfil
            </Link>
            <Link href="/vendedores/cambiar-contrasena" className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2">
              <Lock size={14} /> Cambiar Contraseña
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-white/80 hover:text-white text-sm py-2">
              <LogOut size={14} /> Salir
            </button>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/vendedores/pedidos" className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-gray-600 border border-gray-200 hover:border-brand/30">
            Pedidos
          </Link>
          <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white">
            Cuentas por Cobrar
          </span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cuentas por Cobrar</h1>
          <p className="text-gray-500 text-sm mt-1">Consulta de saldos y documentos pendientes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand/10 rounded-lg">
                <DollarSign size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total por Cobrar</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Clientes con Deuda</p>
                <p className="text-lg font-bold text-gray-900">{overdueCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Clock size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Clientes Totales</p>
                <p className="text-lg font-bold text-gray-900">{clients.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar por nombre, código o RIF..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
        </div>

        {searching && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-brand" />
          </div>
        )}

        {!searching && clients.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
              {searchQuery ? "No se encontraron clientes" : "No hay clientes con cuentas por cobrar"}
            </p>
          </div>
        )}

        {!searching && clients.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {clients.map((client) => (
                <button
                  key={client.client_code}
                  onClick={() => loadDetail(client.client_code)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-brand/10 text-brand rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {client.client_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm">{client.client_name}</p>
                      <p className="text-xs text-gray-400">
                        {[client.client_code, client.client_rif, client.client_phone].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-bold text-brand">{formatCurrency(client.total_amount)}</p>
                    <p className="text-xs text-gray-400">{client.total_documents} docs</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
