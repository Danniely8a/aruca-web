"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, MessageCircle, Phone } from "lucide-react";

const tabs = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Catálogo", icon: Package },
  { href: "/cotizacion", label: "Cotizar", icon: MessageCircle },
  { href: "https://wa.me/584126109597", label: "WhatsApp", icon: Phone, external: true },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden">
      <nav className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 px-2 py-2 flex items-center justify-around">
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
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-green-600 hover:bg-green-50 transition-all"
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? "bg-[#1a2a5e] text-white"
                  : "text-gray-500 hover:text-[#1a2a5e] hover:bg-[#1a2a5e]/5"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
