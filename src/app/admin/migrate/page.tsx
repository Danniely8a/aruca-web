"use client";

import { useState } from "react";

export default function MigratePage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function runMigration() {
    setLoading(true);
    try {
      const res = await fetch("/api/migrate/brands-active");
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch {
      setResult("Error de conexión");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Migración: Columna Active</h1>
        <p className="text-gray-500 text-sm mb-6">
          Haz clic para agregar la columna &quot;active&quot; a la tabla brands en Supabase.
        </p>
        <button
          onClick={runMigration}
          disabled={loading}
          className="w-full py-3 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 disabled:opacity-50"
        >
          {loading ? "Ejecutando..." : "Ejecutar Migración"}
        </button>
        {result && (
          <pre className="mt-4 p-4 bg-gray-50 rounded-xl text-xs text-gray-700 overflow-auto max-h-60 whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}
