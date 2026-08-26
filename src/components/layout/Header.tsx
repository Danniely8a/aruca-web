"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useAuth } from "@/lib/context/AuthContext";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/cotizacion", label: "Cotización" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const { user, loading: authLoading, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b ${
        isScrolled ? "shadow-md border-gray-200" : "border-gray-100"
      }`}
    >
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo.jpg"
              alt="ARUCA Maquinarias"
              width={56}
              height={56}
              className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p className="font-extrabold text-brand text-base lg:text-lg leading-tight tracking-tight">ARUCA</p>
              <p className="text-brand/60 text-[10px] lg:text-xs font-semibold tracking-[0.2em] uppercase leading-tight">Maquinarias</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-brand text-white"
                      : "text-gray-600 hover:text-brand hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {!authLoading && (
              <div className="relative hidden sm:block">
                {user ? (
                  <>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-xs font-bold overflow-hidden">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700 hidden lg:block">
                        {user.name || user.email.split("@")[0]}
                      </span>
                      <ChevronDown size={14} className="text-gray-400 hidden lg:block" />
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                        <Link
                          href="/perfil"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User size={16} />
                          Mi Perfil
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut size={16} />
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="p-2 text-gray-500 hover:text-brand hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <User size={20} />
                  </Link>
                )}
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-brand text-white"
                      : "text-gray-700 hover:text-brand hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-gray-100 pt-2 mt-2">
              {user ? (
                <>
                  <Link
                    href="/perfil"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-brand hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">
                      <User size={18} />
                      Mi Perfil
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut size={18} />
                      Cerrar Sesión
                    </span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-brand hover:bg-brand/10"
                >
                  <span className="flex items-center gap-2">
                    <User size={18} />
                    Iniciar Sesión
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
