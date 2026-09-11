"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

const tabs = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Catálogo", icon: Search },
  { href: "/cotizacion", label: "Cotizar", icon: MessageCircle },
  { href: "https://wa.me/584126109597", label: "WhatsApp", icon: Phone, external: true },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden mobile-nav-safe">
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/80 shadow-[0_-2px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around h-[60px] px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = !tab.external && pathname === tab.href;

            if (tab.external) {
              return (
                <a
                  key={tab.href}
                  href={tab.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 text-[#25D366] active:scale-95 transition-transform"
                >
                  <div className="relative">
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  </div>
                  <span className="text-[10px] font-medium leading-tight">{tab.label}</span>
                </a>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 transition-all active:scale-95 ${
                  isActive
                    ? "text-[#1a2a5e]"
                    : "text-gray-400"
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1a2a5e] rounded-full" />
                  )}
                </div>
                <span className={`text-[10px] leading-tight ${isActive ? "font-semibold" : "font-medium"}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
