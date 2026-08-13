"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowLeft,
  LogOut,
  Lock,
  Loader2,
  ChevronRight,
  Calendar,
  FileText,
  DollarSign,
  Phone,
  MapPin,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Document {
  document_type: string;
  emission_date: string;
  due_date: string;
  days: number;
  document_number: string;
  description: string;
  amount: number;
}

interface ClientAR {
  client_code: string;
  client_name: string;
  client_rif: string;
  client_phone: string;
  client_address: string;
  total_amount: number;
  documents: Document[];
}

export default function CuentasCobrarPage() {
  const router = useRouter();
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [clients, setClients] = useState<ClientAR[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientAR | null>(null);
  const [reportDate, setReportDate] = useState("");

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
      } catch {
        router.replace("/vendedores");
      }
    })();
  }, [router]);

  useEffect(() => {
    if (!vendorName) return;
    setLoading(true);
    fetch(`/api/accounts-receivable?vendor=${encodeURIComponent(vendorName)}`)
      .then((r) => r.json())
      .then((data) => {
        setClients(data.clients || []);
        setReportDate(data.report_date || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [vendorName]);

  const filtered = clients.filter(
    (c) =>
      c.client_name.toUpperCase().includes(search.toUpperCase()) ||
      c.client_code.includes(search) ||
      c.client_rif.toUpperCase().includes(search.toUpperCase())
  );

  const totalGeneral = filtered.reduce((s, c) => s + c.total_amount, 0);

  const handleLogout = async () => {
    await fetch("/api/vendor", { method: "DELETE" });
    router.push("/vendedores");
  };

  const fmt = (n: number) =>
    n.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const fmtDate = (d: string) => {
    if (!d) return "—";
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };

  if (selectedClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-brand text-white sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 hover:bg-white/10 rounded-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <p className="font-bold text-sm">Detalle del Cliente</p>
                <p className="text-white/60 text-[10px]">{selectedClient.client_name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center text-sm font-bold">
                  {selectedClient.client_name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedClient.client_name}</p>
                  <p className="text-xs text-gray-400">Cód: {selectedClient.client_code}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                {selectedClient.client_rif && (
                  <p className="flex items-center gap-2">
                    <CreditCard size={14} className="text-gray-400" />
                    {selectedClient.client_rif}
                  </p>
                )}
                {selectedClient.client_phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    {selectedClient.client_phone}
                  </p>
                )}
                {selectedClient.client_address && (
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" />
                    {selectedClient.client_address}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-500">Total adeudado</span>
              <span className="text-xl font-bold text-accent-orange">
                ${fmt(selectedClient.total_amount)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={18} />
                Documentos ({selectedClient.documents.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase">
                    <th className="px-6 py-3">Tipo</th>
                    <th className="px-6 py-3">N° Documento</th>
                    <th className="px-6 py-3">Emisión</th>
                    <th className="px-6 py-3">Vencimiento</th>
                    <th className="px-6 py-3 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {selectedClient.documents.map((doc, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            doc.document_type === "Factura"
                              ? "bg-blue-50 text-blue-700"
                              : doc.document_type === "N/C"
                              ? "bg-green-50 text-green-700"
                              : doc.document_type === "Adelanto"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {doc.document_type}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-mono text-gray-900">
                        {doc.document_number}
                      </td>
                      <td className="px-6 py-3 text-gray-600">
                        {fmtDate(doc.emission_date)}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-gray-600">{fmtDate(doc.due_date)}</span>
                          {doc.days !== 0 && (
                            <span
                              className={`text-[10px] ml-1 ${
                                doc.days > 0 ? "text-red-500" : "text-green-500"
                              }`}
                            >
                              ({doc.days > 0 ? `${doc.days}d` : `${Math.abs(doc.days)}d ant`})
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`px-6 py-3 text-right font-semibold ${
                          doc.amount < 0 ? "text-green-600" : "text-gray-900"
                        }`}
                      >
                        ${fmt(doc.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
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
            <Link
              href="/vendedores/dashboard"
              className="p-1 hover:bg-white/10 rounded-lg"
            >
              <ArrowLeft size={20} />
            </Link>
            <Image
              src="/assets/logo.jpg"
              alt="ARUCA"
              width={32}
              height={32}
              className="w-8 h-8 object-contain rounded bg-white p-0.5"
            />
            <div>
              <p className="font-bold text-sm">Cuentas por Cobrar</p>
              {vendorName && (
                <p className="text-white/80 text-[10px]">{vendorName}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
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
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cuentas por Cobrar</h1>
          {reportDate && (
            <p className="text-gray-400 text-xs mt-1">
              Reporte: {fmtDate(reportDate.split("T")[0])}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, código o RIF..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 uppercase">Clientes</p>
            <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 uppercase">Documentos</p>
            <p className="text-2xl font-bold text-gray-900">
              {filtered.reduce((s, c) => s + c.documents.length, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 uppercase">Total Adeudado</p>
            <p className="text-2xl font-bold text-accent-orange">${fmt(totalGeneral)}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-brand" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <DollarSign size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">
              {search
                ? "No se encontraron clientes con esa búsqueda"
                : "No hay cuentas por cobrar para mostrar"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((client) => (
                <motion.button
                  key={client.client_code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedClient(client)}
                  className="w-full bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
                >
                  <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {client.client_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {client.client_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {[client.client_code, client.client_rif, client.client_phone]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-accent-orange">
                      ${fmt(client.total_amount)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {client.documents.length} doc{client.documents.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
