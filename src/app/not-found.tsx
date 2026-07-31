import { Metadata } from "next";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="pt-32 pb-20 min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-8xl font-black text-brand mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida. Verifica la URL o
          vuelve al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-all"
          >
            <Home size={18} />
            Volver al inicio
          </Link>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            <Search size={18} />
            Buscar productos
          </Link>
        </div>
      </div>
    </section>
  );
}
