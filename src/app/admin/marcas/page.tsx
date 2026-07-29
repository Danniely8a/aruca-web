"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Brand {
  id: string;
  name: string;
  description: string;
  category: string;
  country: string;
  logo: string;
  website: string;
}

export default function AdminMarcasPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ id: "", name: "", description: "", category: "", country: "", logo: "", website: "" });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => { loadBrands(); }, []);

  async function loadBrands() {
    const supabase = createClient();
    const { data } = await supabase.from("brands").select("*").order("name");
    setBrands(data || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    const supabase = createClient();
    if (editBrand) {
      await supabase.from("brands").update(form).eq("id", editBrand.id);
    } else {
      await supabase.from("brands").insert(form);
    }
    setShowModal(false);
    setEditBrand(null);
    setForm({ id: "", name: "", description: "", category: "", country: "", logo: "", website: "" });
    loadBrands();
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("brands").delete().eq("id", id);
    setDeleteId(null);
    loadBrands();
  }

  function openEdit(brand: Brand) {
    setEditBrand(brand);
    setForm(brand);
    setShowModal(true);
  }

  function openNew() {
    setEditBrand(null);
    setForm({ id: "", name: "", description: "", category: "", country: "", logo: "", website: "" });
    setShowModal(true);
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "brand-logos");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Error al subir logo");
      } else if (data.url) {
        setForm((prev) => ({ ...prev, logo: data.url }));
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch {
      setUploadError("Error de conexión al subir logo");
    }
    setUploading(false);
    e.target.value = "";
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marcas ({brands.length})</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-all text-sm">
          <Plus size={16} /> Nueva Marca
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-10">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-brand font-bold text-sm">{brand.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{brand.name}</h3>
                  <p className="text-xs text-gray-400">{brand.category} &middot; {brand.country}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 mt-3">
                <button onClick={() => openEdit(brand)} className="p-2 text-gray-400 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeleteId(brand.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{editBrand ? "Editar" : "Nueva"} Marca</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID (slug)</label>
                <input type="text" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} disabled={!!editBrand}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand disabled:opacity-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                  <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex items-center gap-3">
                  <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-all ${
                    uploading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                  }`}>
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-brand rounded-full animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload size={16} /> Subir logo
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml,image/heic,image/heif"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {form.logo && <img src={form.logo} alt="Logo" className="w-10 h-10 object-contain rounded" />}
                </div>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, GIF, AVIF, SVG, HEIC (máx. 10MB)</p>
                {uploadError && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                    <AlertCircle size={14} />
                    {uploadError}
                  </div>
                )}
                {uploadSuccess && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                    <CheckCircle size={14} />
                    Logo subido correctamente
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input type="text" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">Cancelar</button>
                <button onClick={handleSave} className="flex-1 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90">Guardar</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Eliminar marca</h3>
            <p className="text-gray-500 text-sm mb-6">¿Estás seguro?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">Cancelar</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600">Eliminar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
