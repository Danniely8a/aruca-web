"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products, productCategories, productSubcategories } from "@/lib/data/products";
import { brands } from "@/lib/data/brands";

type ViewMode = "grid" | "list";
type SortOption = "name" | "brand" | "category";

const ITEMS_PER_PAGE = 24;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "name", label: "Nombre A-Z" },
  { value: "brand", label: "Marca" },
  { value: "category", label: "Categoría" },
];

export default function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.brand.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.model.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory =
          selectedCategory === "Todos" || product.category === selectedCategory;
        const matchesSubcategory =
          selectedSubcategory === "Todos" || product.subcategory === selectedSubcategory;
        const matchesBrand =
          selectedBrand === "Todos" || product.brand === selectedBrand;
        return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "brand":
            return a.brand.localeCompare(b.brand);
          case "category":
            return a.category.localeCompare(b.category);
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [debouncedSearch, selectedCategory, selectedSubcategory, selectedBrand, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeFilters =
    (selectedCategory !== "Todos" ? 1 : 0) +
    (selectedSubcategory !== "Todos" ? 1 : 0) +
    (selectedBrand !== "Todos" ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategory("Todos");
    setSelectedSubcategory("Todos");
    setSelectedBrand("Todos");
    setSearch("");
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 250);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-semibold rounded-full mb-4">
              Catálogo
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nuestros Productos
            </h1>
            <p className="text-white/80 text-lg">
              Explora nuestro catálogo completo de maquinaria y herramientas
              profesionales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="hidden sm:flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => handleFilterChange(setSelectedCategory)(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
              >
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedSubcategory}
                onChange={(e) => handleFilterChange(setSelectedSubcategory)(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
              >
                {productSubcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <select
                value={selectedBrand}
                onChange={(e) => handleFilterChange(setSelectedBrand)(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
              >
                <option value="Todos">Todas las Marcas</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-white text-brand shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-white text-brand shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <List size={18} />
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 bg-brand text-white rounded-xl text-sm font-medium"
            >
              <SlidersHorizontal size={18} />
              Filtros
              {activeFilters > 0 && (
                <span className="bg-white text-brand text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>

          {activeFilters > 0 && (
            <div className="pb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Filtros activos:</span>
              {selectedCategory !== "Todos" && (
                <button
                  onClick={() => handleFilterChange(setSelectedCategory)("Todos")}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full hover:bg-brand/20 transition-colors"
                >
                  {selectedCategory}<X size={14} />
                </button>
              )}
              {selectedSubcategory !== "Todos" && (
                <button
                  onClick={() => handleFilterChange(setSelectedSubcategory)("Todos")}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full hover:bg-brand/20 transition-colors"
                >
                  {selectedSubcategory}<X size={14} />
                </button>
              )}
              {selectedBrand !== "Todos" && (
                <button
                  onClick={() => handleFilterChange(setSelectedBrand)("Todos")}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full hover:bg-brand/20 transition-colors"
                >
                  {selectedBrand}<X size={14} />
                </button>
              )}
              <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-red-500 underline">
                Limpiar todo
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="p-4 space-y-4 bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleFilterChange(setSelectedCategory)(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    {productCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategoría</label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => handleFilterChange(setSelectedSubcategory)(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    {productSubcategories.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleFilterChange(setSelectedBrand)(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    <option value="Todos">Todas las Marcas</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${viewMode === "grid" ? "bg-brand text-white" : "bg-white text-gray-700 border border-gray-200"}`}
                  >
                    <Grid3X3 size={18} />Cuadrícula
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${viewMode === "list" ? "bg-brand text-white" : "bg-white text-gray-700 border border-gray-200"}`}
                  >
                    <List size={18} />Lista
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{" "}
              producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
              {totalPages > 1 && (
                <span className="text-gray-400">
                  {" "}&middot; Página {currentPage} de {totalPages}
                </span>
              )}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <Package size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Intenta con otros filtros o términos de búsqueda. Si buscas algo específico, contáctanos.
              </p>
              <button onClick={clearFilters} className="px-6 py-3 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-colors">
                Limpiar Filtros
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group h-full"
                >
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-brand font-bold text-lg">{product.brand}</p>
                        <p className="text-gray-400 text-xs mt-1">{product.model}</p>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 px-2 py-1 bg-brand text-white text-[10px] font-bold rounded-full">
                      {product.model}
                    </span>
                    {product.featured && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-accent-orange text-white text-[10px] font-bold rounded-full uppercase">
                        Destacado
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {product.brand}
                      </span>
                      <span className="text-[10px] text-gray-400">{product.category}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.shortDescription}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-orange group-hover:gap-2 transition-all">
                      Ver Detalles<ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.slug}`}
                  className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
                >
                  <div className="sm:w-48 lg:w-64 bg-gray-50 flex items-center justify-center p-4 flex-shrink-0 relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={256}
                        height={128}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-brand font-bold text-lg">{product.brand}</p>
                        <p className="text-gray-400 text-xs mt-1">{product.model}</p>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 px-2 py-1 bg-brand text-white text-[10px] font-bold rounded-full">
                      {product.model}
                    </span>
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
                            {product.brand}
                          </span>
                          <span className="text-[10px] text-gray-400">{product.category}</span>
                          {product.featured && (
                            <span className="px-2 py-0.5 bg-accent-orange text-white text-[10px] font-bold rounded-full uppercase">
                              Destacado
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">{product.shortDescription}</p>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-accent-orange group-hover:gap-2 transition-all whitespace-nowrap">
                        Ver Detalles<ArrowRight size={14} />
                      </span>
                    </div>
                    {product.specs && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                        {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                          <span key={key} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            <span className="font-medium">{key}:</span> {value}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="sm:hidden inline-flex items-center gap-1 text-sm font-semibold text-accent-orange mt-3">
                      Ver Detalles<ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              {getPageNumbers().map((page, i) =>
                page === "..." ? (
                  <span key={`dots-${i}`} className="px-2 text-gray-400">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-brand text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
