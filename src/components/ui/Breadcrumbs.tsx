"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav
      className={`flex items-center gap-1.5 text-sm overflow-x-auto whitespace-nowrap ${dark ? "text-white/50" : "text-gray-400"}`}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className={`transition-colors flex items-center gap-1 ${dark ? "hover:text-white" : "hover:text-brand"}`}
      >
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={14} />
          {item.href ? (
            <Link
              href={item.href}
              className={`transition-colors ${dark ? "hover:text-white" : "hover:text-brand"}`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={dark ? "text-white font-medium" : "text-gray-700 font-medium"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
