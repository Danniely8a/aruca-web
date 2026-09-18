"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function VerificarEmailPage() {
  const searchParams = useSearchParams();
  const { resendVerification } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      setConfirmed(true);
    }
  }, []);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: resendError } = await resendVerification(email);
    if (resendError) {
      setError(resendError);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
          >
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email confirmado</h1>
            <p className="text-gray-500 mb-6">Tu cuenta está lista. Ya puedes iniciar sesión.</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-all"
            >
              Iniciar Sesión
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-50">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
        >
          <Mail size={64} className="text-brand mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirma tu correo</h1>
          <p className="text-gray-500 mb-6">
            Te enviamos un email de confirmación. Haz clic en el enlace del correo para activar tu cuenta.
          </p>

          {!sent ? (
            <>
              <p className="text-sm text-gray-400 mb-4">
                ¿No recibiste el correo? Revisa tu carpeta de spam o solicita uno nuevo.
              </p>
              <form onSubmit={handleResend} className="space-y-3">
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
                  {loading ? <Loader2 size={18} className="animate-spin" /> : "Reenviar correo de confirmación"}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-green-50 text-green-700 text-sm py-3 rounded-lg">
              Correo enviado. Revisa tu bandeja de entrada.
            </div>
          )}

          <div className="mt-6">
            <Link href="/login" className="text-sm text-brand hover:underline">
              Volver al login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
