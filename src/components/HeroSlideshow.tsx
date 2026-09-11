"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/assets/hero-euro.png",
    brand: "EUROAIR",
    color: "#1565C0",
    message: "Aire comprimido para cada necesidad",
    logo: "/assets/brands/euroair_x2.0.jpeg",
  },
  {
    src: "/assets/hero-forza.png",
    brand: "FORZA",
    color: "#E65100",
    message: "Adhesión profesional, acabados duraderos",
    logo: "/assets/brands/forza.jpg",
  },
  {
    src: "/assets/hero-eurot.png",
    brand: "EUROTOOLS",
    color: "#E65100",
    message: "Precisión para cada instalación",
    logo: "/assets/brands/eurotools.jpg",
  },
  {
    src: "/assets/hero-caiman.png",
    brand: "CAIMAN",
    color: "#E65100",
    message: "Fijaciones firmes, resultados impecables",
    logo: "/assets/brands/caiman.jpg",
  },
  {
    src: "/assets/hero-fini.png",
    brand: "FINI",
    color: "#C62828",
    message: "Aire comprimido de nivel industrial",
    logo: "/assets/brands/fini.jpg",
  },
  {
    src: "/assets/hero-cmt.png",
    brand: "CMT",
    color: "#E65100",
    message: "Cortes precisos, acabados superiores",
    logo: "/assets/brands/cmt_x2.0.jpeg",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slide = slides[current];

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((c) => (c + 1) % slides.length);
          return 0;
        }
        return prev + 100 / 70;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }

    setIsPaused(false);
  };

  return (
    <div
      className="absolute inset-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slide.src}
          alt={slide.brand}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1829]/85 via-[#0c1829]/50 to-transparent" />

      {/* Arrow controls - hidden on mobile, shown on desktop */}
      <button
        onClick={prev}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all group"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} className="text-white group-hover:text-white" />
      </button>
      <button
        onClick={next}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all group"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} className="text-white group-hover:text-white" />
      </button>

      {/* Bottom controls */}
      <div className="absolute bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 sm:gap-3">
        {/* Brand name indicator */}
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-sm tracking-wider uppercase">
            {slide.brand}
          </span>
          <span className="text-white/40 text-xs">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-40 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: slide.color }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((s, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="transition-all duration-300 p-1"
              aria-label={s.brand}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? "w-6 sm:w-8" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
                style={
                  index === current
                    ? { backgroundColor: s.color }
                    : undefined
                }
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
