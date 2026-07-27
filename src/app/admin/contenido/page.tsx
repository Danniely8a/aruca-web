"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ContentItem {
  id: number;
  section: string;
  key: string;
  value: string;
}

export default function AdminContenidoPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Hero / Banner" },
    { id: "nosotros", label: "Nosotros" },
    { id: "servicios", label: "Servicios" },
    { id: "contacto", label: "Contacto" },
  ];

  useEffect(() => { loadContent(); }, []);

  async function loadContent() {
    const supabase = createClient();
    const { data } = await supabase.from("site_content").select("*").order("section");
    setItems(data || []);
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    for (const item of items) {
      await supabase
        .from("site_content")
        .upsert({ id: item.id, section: item.section, key: item.key, value: item.value }, { onConflict: "section,key" });
    }
    setSaving(false);
  }

  function updateValue(key: string, value: string) {
    setItems((prev) => prev.map((item) => (item.key === key && item.section === activeSection ? { ...item, value } : item)));
  }

  function addField() {
    const key = prompt("Nombre del campo (en inglés, snake_case):");
    if (!key) return;
    setItems((prev) => [...prev, { id: 0, section: activeSection, key, value: "" }]);
  }

  const filtered = items.filter((item) => item.section === activeSection);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contenido del Sitio</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-all text-sm disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeSection === s.id ? "bg-brand text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-10">Cargando...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">
                No hay campos para esta sección. Agrega uno nuevo.
              </p>
            ) : (
              filtered.map((item) => (
                <div key={`${item.section}-${item.key}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {item.key.replace(/_/g, " ")}
                  </label>
                  {item.value.length > 100 ? (
                    <textarea
                      rows={3}
                      value={item.value}
                      onChange={(e) => updateValue(item.key, e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateValue(item.key, e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  )}
                </div>
              ))
            )}
          </div>
          <button
            onClick={addField}
            className="mt-4 text-sm text-brand font-medium hover:underline"
          >
            + Agregar campo
          </button>
        </div>
      )}
    </div>
  );
}
