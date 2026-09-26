"use client";

import { useState } from "react";
import Image from "next/image";

const BRAND_LOGOS: Record<string, string> = {
  makita: "/assets/brands/makita_x2.0.jpg",
  "cmt orange tools": "/assets/brands/cmt_x2.0.jpeg",
  "cmt contractor": "/assets/brands/cmt contractor_x2.0.jpeg",
  carborundum: "/assets/brands/carborundum_x2.0.jpeg",
  titebond: "/assets/brands/titebond.jpg",
  milescraft: "/assets/brands/milescraft.jpg",
  ica: "/assets/brands/ica.png",
  newco: "/assets/brands/newco.jpg",
  nastroflex: "/assets/brands/nastroflex.jpg",
  "nastroflex spa": "/assets/brands/nastroflex.jpg",
  menequim: "/assets/brands/menequim_x2.0.jpeg",
  forza: "/assets/brands/forza.jpg",
  dakin: "/assets/brands/dakin_x2.0.jpeg",
  fna: "/assets/brands/fna_x2.0.jpeg",
  thorex: "/assets/brands/thorex_x2.0.jpeg",
  tigra: "/assets/brands/tigra.jpg",
  sicar: "/assets/brands/sicar.jpg",
  wespa: "/assets/brands/wespa.jpg",
  bluexpress: "/assets/brands/bluexpress_x2.0.jpeg",
  "bluexpress ": "/assets/brands/bluexpress_x2.0.jpeg",
  ipl: "/assets/brands/ipl_x2.0.jpeg",
  isb: "/assets/brands/isb_x2.0.png",
  microflex: "/assets/brands/microflex_x2.0.webp",
  pikazo: "/assets/brands/pikazo_x2.0.jpeg",
  ppg: "/assets/brands/ppg.jpg",
  rexon: "/assets/brands/rexon_x2.0.jpeg",
  rupes: "/assets/brands/rupes_x2.0.jpeg",
  sagola: "/assets/brands/sagola_x2.0.jpeg",
  stanley: "/assets/brands/stanley_x2.0.jpeg",
  unicol: "/assets/brands/unicol.jpg",
  first: "/assets/brands/first_x2.0.jpeg",
  gav: "/assets/brands/gav_x2.0.jpeg",
  caiman: "/assets/brands/caiman.jpg",
  bremas: "/assets/brands/bremas.png",
  euro: "/assets/brands/euro_x2.0.jpeg",
  "euroair": "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/brand-logos/1785284553797-egmmbh.jpg",
  "euro air": "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/brand-logos/1785284553797-egmmbh.jpg",
  "pony jorgensen": "/assets/brands/pony.jpg",
  pony: "/assets/brands/pony.jpg",
  "prexiso": "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/brand-logos/1785242549745-bpqvcu.png",
  kdt: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/brand-logos/1785243576535-4x7bfa.webp",
  ralm: "/assets/brands/ralm_logo.jpg",
  aro: "/assets/brands/aro_logo.webp",
  eurotools: "/assets/brands/eurotools.jpg",
  "wd-40": "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/brand-logos/wd-40-logo.png",
  shamal: "https://ocuafmydwitrhxhtuole.supabase.co/storage/v1/object/public/product-images/brand-logos/1785155246070-x9blre.jpg",
  microtech: "/assets/brands/microtech_logo.jpg",
  aruca: "/assets/brands/aruca.jpg",
  kex: "/assets/brands/aruca.jpg",
};

function getBrandLogo(brand?: string): string | null {
  if (!brand) return null;
  const key = brand.toLowerCase().trim();
  return BRAND_LOGOS[key] || null;
}

interface ProductImageProps {
  src?: string;
  alt: string;
  brand?: string;
  model?: string;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  brand,
  model,
  fill = false,
  sizes,
  width,
  height,
  className = "",
}: ProductImageProps) {
  const brandLogo = getBrandLogo(brand);
  const [stage, setStage] = useState<"image" | "logo" | "text">(
    src ? "image" : brandLogo ? "logo" : "text"
  );

  const handleImageError = () => {
    if (stage === "image" && brandLogo) setStage("logo");
    else setStage("text");
  };

  if (stage === "text" || (!src && !brandLogo)) {
    return (
      <div className="text-center">
        <p className="text-brand font-bold text-lg">{brand}</p>
        <p className="text-gray-400 text-xs mt-1">{model}</p>
      </div>
    );
  }

  if (stage === "logo") {
    if (fill) {
      return (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={brandLogo!}
            alt={brand}
            className="max-w-full max-h-full object-contain opacity-80"
            loading="lazy"
          />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center p-4 w-full h-full">
        <img
          src={brandLogo!}
          alt={brand}
          className="max-w-full max-h-full object-contain opacity-80"
          loading="lazy"
        />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src!}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-contain p-4 ${className}`}
        loading="lazy"
        onError={handleImageError}
      />
    );
  }

  return (
    <Image
      src={src!}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      loading="lazy"
      onError={handleImageError}
    />
  );
}
