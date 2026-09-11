"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, LogOut, ChevronRight, Home, Search, FileText, Phone, MapPin, Info } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useAuth } from "@/lib/context/AuthContext";

const navLinks = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Catálogo", icon: Search },
  { href: "/nosotros", label: "Nosotros", icon: Info },
  { href: "/servicios", label: "Servicios", icon: FileText },
  { href: "/cotizacion", label: "Cotización", icon: FileText },
  { href: "/contacto", label: "Contacto", icon: Phone },
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-xl border-b ${
          isScrolled ? "shadow-sm border-gray-200/80" : "border-gray-100/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/assets/logo.jpg"
                alt="ARUCA Maquinarias"
                width={48}
                height={48}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
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

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl active:scale-95 transition-all"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
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
                        className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-xl active:scale-95 transition-all"
                      >
                        <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-xs font-bold overflow-hidden">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()
                          )}
                        </div>
                      </button>
                      {showUserMenu && (
                        <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="font-semibold text-sm text-gray-900 truncate">{user.name || user.email.split("@")[0]}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                          </div>
                          <Link
                            href="/perfil"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <User size={16} className="text-gray-400" />
                            Mi Perfil
                            <ChevronRight size={14} className="text-gray-300 ml-auto" />
                          </Link>
                          <button
                            onClick={() => {
                              signOut();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
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
                      className="p-2.5 text-gray-500 hover:text-brand hover:bg-gray-100 rounded-xl active:scale-95 transition-all"
                    >
                      <User size={20} />
                    </Link>
                  )}
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl active:scale-95 transition-all"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-white shadow-2xl flex flex-col animate-slide-in">
            <div className="bg-brand px-5 pt-12 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/logo.jpg"
                    alt="ARUCA"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-xl object-contain bg-white p-1"
                  />
                  <div>
                    <p className="font-bold text-white text-lg">ARUCA</p>
                    <p className="text-white/60 text-xs">Maquinarias</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
              {user && (
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center text-sm font-bold overflow-hidden">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{user.name || user.email.split("@")[0]}</p>
                    <p className="text-white/60 text-xs truncate">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="py-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-5 py-3.5 transition-all ${
                        isActive
                          ? "bg-brand/5 text-brand border-r-[3px] border-brand"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={20} className={isActive ? "text-brand" : "text-gray-400"} />
                      <span className={`text-[15px] ${isActive ? "font-semibold" : "font-medium"}`}>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 mx-5" />

              <div className="py-3">
                {user ? (
                  <>
                    <Link
                      href="/perfil"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-5 py-3.5 text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <User size={20} className="text-gray-400" />
                      <span className="text-[15px] font-medium">Mi Perfil</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 px-5 py-3.5 text-red-600 hover:bg-red-50 w-full text-left transition-all"
                    >
                      <LogOut size={20} />
                      <span className="text-[15px] font-medium">Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-5 py-3.5 text-brand hover:bg-brand/5 transition-all"
                  >
                    <User size={20} className="text-brand" />
                    <span className="text-[15px] font-medium">Iniciar Sesión</span>
                  </Link>
                )}
              </div>

              <div className="border-t border-gray-100 mx-5" />

              <div className="py-3 px-5">
                <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">Contacto</p>
                <a
                  href="https://wa.me/584126109597"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2 text-sm text-gray-600"
                >
                  <Phone size={14} className="text-gray-400" />
                  +58 412 610 9597
                </a>
                <div className="flex items-center gap-3 py-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-xs">Caracas, Venezuela</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
