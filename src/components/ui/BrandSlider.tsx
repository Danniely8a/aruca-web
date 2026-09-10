"use client";

import Link from "next/link";
import type { Brand } from "@/lib/data/brands";

interface BrandSliderProps {
  brands: Brand[];
}

export default function BrandSlider({ brands }: BrandSliderProps) {
  const displayBrands = brands.filter((b) => b.logo && b.active !== false);

  if (displayBrands.length === 0) return null;

  const doubled = [...displayBrands, ...displayBrands];

  return (
    <section className="bg-white border-b border-gray-100 overflow-hidden">
      <div className="py-3">
        <div className="relative">
          <div className="brand-slider-track flex">
            {doubled.map((brand, index) => (
              <Link
                key={`${brand.id}-${index}`}
                href={`/catalogo?brand=${encodeURIComponent(brand.name)}`}
                className="flex-shrink-0 flex items-center justify-center w-[80px] h-[50px] bg-gray-50 rounded-lg border border-gray-100 hover:border-brand/30 hover:bg-brand/5 transition-all group mx-1.5"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-[50px] max-h-[35px] object-contain group-hover:scale-110 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
