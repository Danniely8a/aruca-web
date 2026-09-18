"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Filter,
  Search,
  Loader2,
  Eye,
  Trash2,
  ChevronDown,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: string;
  source: string;
  product: string;
  message: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  nuevo: "bg-blue-100 text-blue-700",
  contactado: "bg-yellow-100 text-yellow-700",
  convertido: "bg-green-100 text-green-700",
  perdido: "bg-red-100 text-red-700",
};

const TYPE_COLORS: Record<string, string> = {
  contacto: "bg-gray-100 text-gray-700",
  cotizacion: "bg-purple-100 text-purple-700",
  chat: "bg-cyan-100 text-cyan-700",
  whatsapp: "bg-green-100 text-green-700",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatus) params.set("status", filterStatus);
    if (filterType) params.set("type", filterType);

    const res = await fetch(`/api/leads?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads || []);
    }
    setLoading(false);
  }, [filterStatus, filterType]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLead = async (id: string, status: string, notes?: string) => {
    setUpdating(true);
    await fetch("/api/leads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, notes }),
    });
    await fetchLeads();
    setUpdating(false);
    setSelectedLead(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("¿Eliminar este lead?")) return;
    await fetch("/api/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchLeads();
  };

  const filteredLeads = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.company?.toLowerCase().includes(q) ||
      l.product?.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: leads.length,
    nuevos: leads.filter((l) => l.status === "nuevo").length,
    contactados: leads.filter((l) => l.status === "contactado").length,
    convertidos: leads.filter((l) => l.status === "convertido").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Leads</h1>
          <p className="text-gray-500 mb-6">Gestiona los contactos y solicitudes de cotización</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Nuevos</p>
              <p className="text-2xl font-bold text-blue-600">{stats.nuevos}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Contactados</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.contactados}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Convertidos</p>
              <p className="text-2xl font-bold text-green-600">{stats.convertidos}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, email, teléfono..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            >
              <option value="">Todos los estados</option>
              <option value="nuevo">Nuevo</option>
              <option value="contactado">Contactado</option>
              <option value="convertido">Convertido</option>
              <option value="perdido">Perdido</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            >
              <option value="">Todos los tipos</option>
              <option value="contacto">Contacto</option>
              <option value="cotizacion">Cotización</option>
              <option value="chat">Chat</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-brand" />
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No hay leads</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Nombre</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Contacto</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Tipo</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Producto</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Estado</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Fecha</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          {lead.company && (
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <Building2 size={10} /> {lead.company}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {lead.email && (
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <Mail size={10} /> {lead.email}
                            </p>
                          )}
                          {lead.phone && (
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <Phone size={10} /> {lead.phone}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[lead.type] || "bg-gray-100 text-gray-700"}`}>
                            {lead.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 max-w-[150px] truncate">
                          {lead.product || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-700"}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString("es-VE")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 text-gray-400 hover:text-brand rounded-lg hover:bg-gray-100"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Detalle del Lead</h2>

            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-gray-400">Nombre</p>
                <p className="font-medium">{selectedLead.name}</p>
              </div>
              {selectedLead.email && (
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
              )}
              {selectedLead.phone && (
                <div>
                  <p className="text-xs text-gray-400">Teléfono</p>
                  <p className="font-medium">{selectedLead.phone}</p>
                </div>
              )}
              {selectedLead.company && (
                <div>
                  <p className="text-xs text-gray-400">Empresa</p>
                  <p className="font-medium">{selectedLead.company}</p>
                </div>
              )}
              {selectedLead.product && (
                <div>
                  <p className="text-xs text-gray-400">Producto</p>
                  <p className="font-medium">{selectedLead.product}</p>
                </div>
              )}
              {selectedLead.message && (
                <div>
                  <p className="text-xs text-gray-400">Mensaje</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400">Fecha</p>
                <p className="font-medium">{new Date(selectedLead.created_at).toLocaleString("es-VE")}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">Estado</p>
              <div className="flex gap-2">
                {["nuevo", "contactado", "convertido", "perdido"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateLead(selectedLead.id, s)}
                    disabled={updating}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedLead.status === s
                        ? "ring-2 ring-brand ring-offset-1 " + STATUS_COLORS[s]
                        : STATUS_COLORS[s] + " opacity-60 hover:opacity-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
