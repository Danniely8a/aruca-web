"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface ProductData {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  short_description: string;
  category: string;
  subcategory: string;
  image: string;
  specs: Record<string, string>;
  included: string;
  featured: boolean;
  price: string;
  stock: number;
}

export default function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [specs, setSpecs] = useState<[string, string][]>([["", ""]]);

  const [form, setForm] = useState<ProductData>({
    id: "",
    slug: "",
    name: "",
    brand: "",
    model: "",
    description: "",
    short_description: "",
    category: "",
    subcategory: "",
    image: "",
    specs: {},
    included: "",
    featured: false,
    price: "",
    stock: 0,
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [brandsRes, catsRes, subcatsRes] = await Promise.all([
        supabase.from("brands").select("id, name").order("name"),
        import("@/lib/data/products").then((m) => m.productCategories.filter((c) => c !== "Todos")),
        import("@/lib/data/products").then((m) => m.productSubcategories.filter((s) => s !== "Todos")),
      ]);
      setBrands(brandsRes.data || []);
      setCategories(catsRes);
      setSubcategories(subcatsRes);

      if (!isNew) {
        const { data } = await supabase.from("products").select("*").eq("id", id).single();
        if (data) {
          setForm(data);
          const specEntries = Object.entries(data.specs || {}) as [string, string][];
          setSpecs(specEntries.length > 0 ? specEntries : [["", ""]]);
        }
      }
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: isNew ? slugify(name) : prev.slug,
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "product-images");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Error al subir imagen");
      } else if (data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch {
      setUploadError("Error de conexión al subir imagen");
    }
    setUploading(false);
    e.target.value = "";
  }

  async function handleSave() {
    setSaving(true);
    const specsObj: Record<string, string> = {};
    specs.forEach(([k, v]) => {
      if (k.trim()) specsObj[k.trim()] = v;
    });

    const payload = { ...form, specs: specsObj };

    if (isNew) {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push("/admin/productos");
    } else {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push("/admin/productos");
    }
    setSaving(false);
  }

  if (loading) return <p className="text-gray-500 text-center py-10">Cargando...</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/productos" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? "Nuevo Producto" : "Editar Producto"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-all text-sm disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Imagen del Producto</h3>
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden">
              {form.image ? (
                <img src={form.image} alt={form.name} className="w-full h-full object-contain p-2" />
              ) : (
                <span className="text-gray-300 text-xs text-center px-2">Sin imagen</span>
              )}
            </div>
            <div className="flex-1">
              <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all ${
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
                    <Upload size={16} />
                    Subir imagen
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml,image/heic,image/heif"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
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
                  Imagen subida correctamente
                </div>
              )}
              {form.image && !uploading && (
                <button
                  onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                  className="flex items-center gap-2 mt-2 text-sm text-red-500 hover:text-red-600"
                >
                  <Trash2 size={14} />
                  Quitar imagen
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Información Básica</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
              <select
                value={form.brand}
                onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              >
                <option value="">Seleccionar marca</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => setForm((prev) => ({ ...prev, model: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="Ej: $120.00"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm((prev) => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                min="0"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
              <select
                value={form.subcategory}
                onChange={(e) => setForm((prev) => ({ ...prev, subcategory: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              >
                <option value="">Seleccionar subcategoría</option>
                {subcategories.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Corta</label>
              <input
                type="text"
                value={form.short_description}
                onChange={(e) => setForm((prev) => ({ ...prev, short_description: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Incluido en el paquete</label>
              <textarea
                rows={2}
                value={form.included}
                onChange={(e) => setForm((prev) => ({ ...prev, included: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
                />
                <span className="text-sm font-medium text-gray-700">Producto destacado (aparece en homepage)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Especificaciones Técnicas</h3>
            <button
              onClick={() => setSpecs([...specs, ["", ""]])}
              className="text-sm text-brand font-medium hover:underline"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-2">
            {specs.map(([key, value], i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => {
                    const next = [...specs];
                    next[i] = [e.target.value, next[i][1]];
                    setSpecs(next);
                  }}
                  placeholder="Campo"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const next = [...specs];
                    next[i] = [next[i][0], e.target.value];
                    setSpecs(next);
                  }}
                  placeholder="Valor"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                />
                {specs.length > 1 && (
                  <button
                    onClick={() => setSpecs(specs.filter((_, j) => j !== i))}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
