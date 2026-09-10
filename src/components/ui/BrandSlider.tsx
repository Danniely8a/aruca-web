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
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const seen = new Set<string>();
  const displayBrands = brands.filter((b) => {
    if (!b.logo || b.active === false) return false;
    const key = b.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (displayBrands.length === 0) return null;

  return (
    <section className="bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2">
        <button
          onClick={() => scroll("left")}
          className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex-1 flex gap-4 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/catalogo?brand=${encodeURIComponent(brand.name)}`}
              className="flex-shrink-0 flex items-center justify-center w-[90px] h-[50px] hover:scale-110 transition-transform opacity-60 hover:opacity-100"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-[70px] max-h-[40px] object-contain"
              />
            </Link>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
