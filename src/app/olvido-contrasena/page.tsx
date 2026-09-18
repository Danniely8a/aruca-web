"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function OlvidoContrasenaPage() {
  const router = useRouter();
  const { forgotPassword, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/perfil");
    }
  }, [user, authLoading, router]);

  if (authLoading || user) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: forgotError } = await forgotPassword(email);
    if (forgotError) {
      setError(forgotError);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-50">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
        >
          <Mail size={64} className="text-brand mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Recuperar contraseña</h1>
          <p className="text-gray-500 mb-6">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
              {error && (
                <p className="text-red-500 text-sm bg-red-50 py-2 rounded-lg">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Enviar enlace de recuperación"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 text-green-700 text-sm py-3 rounded-lg flex items-center justify-center gap-2">
                <CheckCircle size={16} />
                Correo enviado. Revisa tu bandeja de entrada.
              </div>
              <Link href="/login" className="text-sm text-brand hover:underline">
                Volver al login
              </Link>
            </div>
          )}

          <div className="mt-6">
            <Link href="/login" className="text-sm text-gray-400 hover:text-brand">
              ¿Ya recuerdas tu contraseña? Inicia sesión
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
