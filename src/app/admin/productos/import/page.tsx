"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  FileJson,
  Download,
  Check,
  AlertCircle,
  Trash2,
  ArrowLeft,
  Loader2,
  Package,
  X,
  ArrowRight,
  Columns,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ParsedProduct {
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  image: string;
  featured: boolean;
  specs: Record<string, string>;
  error?: string;
}

interface ImportResult {
  success: number;
  errors: number;
  details: { name: string; status: "success" | "error"; message?: string }[];
}

interface ColumnMapping {
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  image: string;
  featured: string;
}

const REQUIRED_FIELDS = ["name", "brand"];

const FIELD_LABELS: Record<keyof ColumnMapping, string> = {
  name: "Nombre *",
  brand: "Marca *",
  model: "Modelo",
  category: "Categoría",
  subcategory: "Subcategoría",
  description: "Descripción",
  shortDescription: "Descripción Corta",
  image: "Imagen URL",
  featured: "Destacado",
};

const FIELD_SUGGESTIONS: Record<keyof ColumnMapping, string[]> = {
  name: ["name", "nombre", "producto", "title", "titulo"],
  brand: ["brand", "marca", "fabricante", "manufacturer"],
  model: ["model", "modelo", "code", "codigo", "sku"],
  category: ["category", "categoria", "tipo", "type"],
  subcategory: ["subcategory", "subcategoria", "subtipo"],
  description: ["description", "descripcion", "desc", "detalle"],
  shortDescription: ["shortdescription", "descripcioncorta", "short", "resumen"],
  image: ["image", "imagen", "img", "foto", "photo", "url", "urlimagen"],
  featured: ["featured", "destacado", "popular", "highlight"],
};

const CSV_TEMPLATE = `name,brand,model,category,subcategory,description,shortDescription,image,featured
"Sierra de Banco 255mm","Makita","2703","Maquinaria para Madera","Sierras","Sierra de banco de alta precisión","Sierra de banco de 255mm","/assets/product-images/makita/2703.jpg",false
"Compresor de Pistón 50L","Euroair","EA-50","Compresores","Compresores de Pistón","Compresor de pistón silencioso","Compresor 50L silencioso","",false`;

export default function ImportProductsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [rawData, setRawData] = useState<Record<string, string>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({
    name: "",
    brand: "",
    model: "",
    category: "",
    subcategory: "",
    description: "",
    shortDescription: "",
    image: "",
    featured: "",
  });
  const [step, setStep] = useState<"upload" | "mapping" | "preview">("upload");
  const [parsedProducts, setParsedProducts] = useState<ParsedProduct[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const autoDetectMapping = useCallback((cols: string[]): ColumnMapping => {
    const detected: ColumnMapping = {
      name: "",
      brand: "",
      model: "",
      category: "",
      subcategory: "",
      description: "",
      shortDescription: "",
      image: "",
      featured: "",
    };

    const lowerCols = cols.map((c) => c.toLowerCase().replace(/[^a-z0-9]/g, ""));

    (Object.keys(FIELD_SUGGESTIONS) as (keyof ColumnMapping)[]).forEach((field) => {
      const suggestions = FIELD_SUGGESTIONS[field];
      for (const suggestion of suggestions) {
        const idx = lowerCols.findIndex((c) => c.includes(suggestion));
        if (idx !== -1) {
          detected[field] = cols[idx];
          break;
        }
      }
    });

    return detected;
  }, []);

  const parseCSV = useCallback((text: string) => {
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length < 2) throw new Error("El CSV debe tener al menos una fila de datos");

    const csvHeaders = lines[0]
      .split(",")
      .map((h) => h.trim().replace(/"/g, ""));
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
      const row: Record<string, string> = {};
      csvHeaders.forEach((header, index) => {
        row[header] = (values[index] || "").replace(/^"|"$/g, "").trim();
      });
      rows.push(row);
    }

    return { headers: csvHeaders, rows };
  }, []);

  const parseExcel = useCallback((buffer: ArrayBuffer) => {
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(firstSheet, {
      raw: false,
      defval: "",
    });

    if (jsonData.length === 0) throw new Error("El archivo está vacío");

    const cols = Object.keys(jsonData[0]);
    const rows = jsonData.map((row) => {
      const normalized: Record<string, string> = {};
      cols.forEach((col) => {
        normalized[col] = String(row[col] || "").trim();
      });
      return normalized;
    });

    return { headers: cols, rows };
  }, []);

  const parseJSON = useCallback((text: string) => {
    const data = JSON.parse(text);
    const items = Array.isArray(data) ? data : [data];

    if (items.length === 0) throw new Error("El JSON está vacío");

    const allKeys = new Set<string>();
    items.forEach((item: Record<string, unknown>) => {
      Object.keys(item).forEach((key) => allKeys.add(key));
    });
    const cols = Array.from(allKeys);

    const rows = items.map((item: Record<string, unknown>) => {
      const row: Record<string, string> = {};
      cols.forEach((col) => {
        const val = item[col];
        row[col] =
          typeof val === "object" ? JSON.stringify(val) : String(val ?? "").trim();
      });
      return row;
    });

    return { headers: cols, rows };
  }, []);

  const applyMapping = useCallback(
    (raw: Record<string, string>[], map: ColumnMapping): ParsedProduct[] => {
      return raw.map((row, index) => {
        const get = (field: keyof ColumnMapping) => {
          const col = map[field];
          return col ? row[col] || "" : "";
        };

        const name = get("name");
        const brand = get("brand");
        const featuredVal = get("featured").toLowerCase();

        if (!name || !brand) {
          return {
            name: name || `Fila ${index + 2}`,
            brand,
            model: get("model"),
            category: get("category") || "Sin categoría",
            subcategory: get("subcategory"),
            description: get("description"),
            shortDescription: get("shortDescription"),
            image: get("image"),
            featured: false,
            specs: {},
            error: "Faltan campos requeridos: nombre y marca",
          };
        }

        return {
          name,
          brand,
          model: get("model"),
          category: get("category") || "Sin categoría",
          subcategory: get("subcategory"),
          description: get("description"),
          shortDescription: get("shortDescription"),
          image: get("image"),
          featured: featuredVal === "true" || featuredVal === "1" || featuredVal === "si",
          specs: {},
        };
      });
    },
    []
  );

  const handleFile = useCallback(
    async (selectedFile: File) => {
      setFile(selectedFile);
      setError(null);
      setResult(null);
      setParsedProducts([]);

      try {
        const ext = selectedFile.name.split(".").pop()?.toLowerCase();
        let parsed: { headers: string[]; rows: Record<string, string>[] };

        if (ext === "json") {
          const text = await selectedFile.text();
          parsed = parseJSON(text);
        } else if (ext === "csv") {
          const text = await selectedFile.text();
          parsed = parseCSV(text);
        } else if (ext === "xlsx" || ext === "xls") {
          const buffer = await selectedFile.arrayBuffer();
          parsed = parseExcel(buffer);
        } else {
          throw new Error("Formato no soportado. Usa CSV, JSON o Excel (.xlsx/.xls).");
        }

        setHeaders(parsed.headers);
        setRawData(parsed.rows);
        setMapping(autoDetectMapping(parsed.headers));
        setStep("mapping");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al procesar el archivo");
      }
    },
    [parseCSV, parseJSON, parseExcel, autoDetectMapping]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleMappingNext = () => {
    if (!mapping.name || !mapping.brand) {
      setError("Debes mapear los campos obligatorios: Nombre y Marca");
      return;
    }
    setError(null);
    const products = applyMapping(rawData, mapping);
    setParsedProducts(products);
    setStep("preview");
  };

  const handleImport = async () => {
    const validProducts = parsedProducts.filter((p) => !p.error);
    if (validProducts.length === 0) return;

    setImporting(true);
    const supabase = createClient();
    const details: ImportResult["details"] = [];
    let success = 0;
    let errors = 0;

    for (const product of validProducts) {
      try {
        const slug = `${product.brand
          .toLowerCase()
          .replace(/\s+/g, "-")}-${product.model
          .toLowerCase()
          .replace(/\s+/g, "-")}-${product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 50)}`;

        const { error: insertError } = await supabase.from("products").insert({
          slug,
          name: product.name,
          brand: product.brand,
          model: product.model,
          category: product.category,
          subcategory: product.subcategory,
          description: product.description,
          short_description: product.shortDescription,
          image: product.image,
          featured: product.featured,
          specs: product.specs,
        });

        if (insertError) throw insertError;

        details.push({ name: product.name, status: "success" });
        success++;
      } catch (err) {
        details.push({
          name: product.name,
          status: "error",
          message: err instanceof Error ? err.message : "Error desconocido",
        });
        errors++;
      }
    }

    setResult({ success, errors, details });
    setImporting(false);
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "aruca-productos-template.csv";
    link.click();
  };

  const resetAll = () => {
    setFile(null);
    setRawData([]);
    setHeaders([]);
    setMapping({
      name: "",
      brand: "",
      model: "",
      category: "",
      subcategory: "",
      description: "",
      shortDescription: "",
      image: "",
      featured: "",
    });
    setStep("upload");
    setParsedProducts([]);
    setResult(null);
    setError(null);
  };

  const validCount = parsedProducts.filter((p) => !p.error).length;
  const errorCount = parsedProducts.filter((p) => p.error).length;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/productos"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Importar Productos</h1>
          <p className="text-sm text-gray-500">
            {step === "upload" && "Carga múltiple desde CSV, JSON o Excel"}
            {step === "mapping" && "Mapea las columnas de tu archivo a los campos del producto"}
            {step === "preview" && "Revisa los productos antes de importar"}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(["upload", "mapping", "preview"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s
                  ? "bg-brand text-white"
                  : ["mapping", "preview"].indexOf(step) > ["upload", "mapping", "preview"].indexOf(s)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {["mapping", "preview"].indexOf(step) > ["upload", "mapping", "preview"].indexOf(s) ? (
                <Check size={14} />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-sm hidden sm:block ${
                step === s ? "font-semibold text-gray-900" : "text-gray-400"
              }`}
            >
              {s === "upload" ? "Subir" : s === "mapping" ? "Mapear" : "Importar"}
            </span>
            {i < 2 && <ArrowRight size={14} className="text-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertCircle size={20} className="text-red-500 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-red-800">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* STEP 1: Upload */}
      {step === "upload" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/10 rounded-xl">
                <Download size={24} className="text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Descargar Template</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Descarga el archivo CSV con el formato correcto para importar productos.
                </p>
                <button
                  onClick={downloadTemplate}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-xl text-sm font-medium hover:bg-brand/20 transition-colors"
                >
                  <Download size={16} />
                  Descargar Template CSV
                </button>
              </div>
            </div>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              dragActive ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json,.xlsx,.xls"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gray-100 rounded-2xl mb-4">
                <Upload size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-2">
                Arrastra un archivo aquí o{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-brand font-semibold hover:underline"
                >
                  selecciona
                </button>
              </p>
              <p className="text-sm text-gray-400">Formatos: CSV, JSON, Excel (.xlsx/.xls) — máx. 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileSpreadsheet size={20} className="text-green-500" />
                <span className="font-medium text-gray-900">CSV</span>
              </div>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Separado por comas</li>
                <li>• Primera fila: encabezados</li>
                <li>• Campos con comillas</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileJson size={20} className="text-blue-500" />
                <span className="font-medium text-gray-900">JSON</span>
              </div>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Array de objetos</li>
                <li>• Un solo objeto funciona</li>
                <li>• Specs como objeto</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileSpreadsheet size={20} className="text-blue-600" />
                <span className="font-medium text-gray-900">Excel</span>
              </div>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Archivos .xlsx / .xls</li>
                <li>• Primera hoja de cálculo</li>
                <li>• Mapeo automático</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Column Mapping */}
      {step === "mapping" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 rounded-lg">
                  <Columns size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mapeo de Columnas</h3>
                  <p className="text-sm text-gray-500">
                    Relaciona las columnas de tu archivo con los campos del producto
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{rawData.length} filas</span>
                <button
                  onClick={resetAll}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {(Object.keys(FIELD_LABELS) as (keyof ColumnMapping)[]).map((field) => (
                <div key={field} className="flex items-center gap-4">
                  <label
                    className={`w-40 text-sm font-medium ${
                      REQUIRED_FIELDS.includes(field) ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {FIELD_LABELS[field]}
                  </label>
                  <ArrowRight size={14} className="text-gray-300" />
                  <select
                    value={mapping[field]}
                    onChange={(e) => setMapping((prev) => ({ ...prev, [field]: e.target.value }))}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    <option value="">— No mapear —</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Mapping Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Vista Previa del Mapeo</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.slice(0, 8).map((h) => (
                      <th key={h} className="text-left px-4 py-2 font-medium text-gray-600">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rawData.slice(0, 3).map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {headers.slice(0, 8).map((h) => (
                        <td key={h} className="px-4 py-2 text-gray-600 truncate max-w-[150px]">
                          {row[h]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setStep("upload");
                setError(null);
              }}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Atrás
            </button>
            <button
              onClick={handleMappingNext}
              className="flex-1 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors flex items-center justify-center gap-2"
            >
              Continuar
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Preview & Import */}
      {step === "preview" && (
        <div className="space-y-6">
          {/* File Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileSpreadsheet size={20} className="text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">{file?.name}</p>
                  <p className="text-sm text-gray-500">
                    {parsedProducts.length} producto{parsedProducts.length !== 1 ? "s" : ""} encontrado
                    {parsedProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={resetAll}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{parsedProducts.length}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{validCount}</p>
              <p className="text-sm text-gray-500">Válidos</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{errorCount}</p>
              <p className="text-sm text-gray-500">Con error</p>
            </div>
          </div>

          {/* Preview Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Vista Previa</h3>
              <span className="text-sm text-gray-500">
                Mostrando {Math.min(parsedProducts.length, 10)} de {parsedProducts.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Estado</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Nombre</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Marca</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Modelo</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Categoría</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {parsedProducts.slice(0, 10).map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {product.error ? (
                          <span className="inline-flex items-center gap-1 text-xs text-red-600">
                            <X size={12} /> Error
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <Check size={12} /> OK
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <p className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</p>
                        {product.error && <p className="text-xs text-red-500">{product.error}</p>}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{product.brand}</td>
                      <td className="px-4 py-2 text-gray-600">{product.model}</td>
                      <td className="px-4 py-2 text-gray-600 text-xs">{product.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("mapping")}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Atrás
            </button>
            <button
              onClick={handleImport}
              disabled={importing || validCount === 0}
              className="flex-1 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {importing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <Package size={16} />
                  Importar {validCount} Producto{validCount !== 1 ? "s" : ""}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Import Result Modal */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Importación Completada</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {result.success} producto{result.success !== 1 ? "s" : ""} importado
                  {result.success !== 1 ? "s" : ""}
                  {result.errors > 0 &&
                    `, ${result.errors} con error${result.errors !== 1 ? "es" : ""}`}
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {result.details.slice(0, 20).map((detail, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                      detail.status === "success" ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {detail.status === "success" ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <X size={14} className="text-red-600" />
                    )}
                    <span className="truncate flex-1">{detail.name}</span>
                    {detail.message && (
                      <span className="text-xs text-red-500 truncate">{detail.message}</span>
                    )}
                  </div>
                ))}
                {result.details.length > 20 && (
                  <p className="text-center text-sm text-gray-500">
                    Y {result.details.length - 20} más...
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetAll}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                <Link
                  href="/admin/productos"
                  className="flex-1 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors text-center"
                >
                  Ver Productos
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}