"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Brand } from "@/lib/data/brands";

interface BrandSliderProps {
  brands: Brand[];
}

export default function BrandSlider({ brands }: BrandSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const displayBrands = brands.filter((b) => b.logo && b.active !== false);

  if (displayBrands.length === 0) return null;

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Marcas</h3>
          <div className="flex-1 h-px bg-gray-200" />
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/catalogo?brand=${encodeURIComponent(brand.name)}`}
              className="flex-shrink-0 flex flex-col items-center justify-center w-[80px] h-[60px] bg-gray-50 rounded-xl border border-gray-100 hover:border-brand/30 hover:bg-brand/5 transition-all group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
