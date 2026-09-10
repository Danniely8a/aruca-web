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
    <section className="bg-white overflow-hidden">
      <div className="py-3 border-b border-gray-100">
        <div className="relative">
          <div className="brand-slider-track flex">
            {doubled.map((brand, index) => (
              <Link
                key={`${brand.id}-${index}`}
                href={`/catalogo?brand=${encodeURIComponent(brand.name)}`}
                className="flex-shrink-0 flex items-center justify-center w-[90px] h-[50px] hover:scale-110 transition-transform opacity-60 hover:opacity-100 mx-2"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-[70px] max-h-[40px] object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
