"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  { src: "/assets/hero-bg.jpg", alt: "Maquinaria industrial" },
  { src: "/assets/hero-saw.jpg", alt: "Sierra de mesa profesional" },
  { src: "/assets/hero-compressor.webp", alt: "Compresor Euroair" },
  { src: "/assets/hero-test1.jpg", alt: "Engranajes industriales" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0c1829]/75" />
      {/* Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1829]/90 via-[#0c1829]/60 to-transparent" />

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === current
                ? "w-8 bg-accent-orange"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
