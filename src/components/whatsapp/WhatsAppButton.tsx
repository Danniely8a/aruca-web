"use client";

import { MessageCircle } from "lucide-react";
import { company } from "@/lib/data/company";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=Hola%2C%20me%20interesa%20un%20presupuesto`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 hidden lg:flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1fb95a] hover:scale-105 transition-all group"
    >
      <MessageCircle size={22} />
      <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}
