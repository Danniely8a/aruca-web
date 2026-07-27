"use client";

import { MessageCircle } from "lucide-react";
import { company } from "@/lib/data/company";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=Hola%2C%20me%20interesa%20un%20presupuesto`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1fb95a] hover:scale-110 transition-all"
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}
